import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OptimizeRequest {
  mediaId: string;
  storagePath: string;
  mimeType: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { mediaId, storagePath, mimeType }: OptimizeRequest = await req.json();

    console.log(`[optimize-image] Starting optimization for media ${mediaId}, path: ${storagePath}`);

    // Skip SVG and GIF (animated)
    if (mimeType === 'image/svg+xml' || mimeType === 'image/gif') {
      console.log(`[optimize-image] Skipping ${mimeType} - not optimizable`);
      return new Response(
        JSON.stringify({ success: true, skipped: true, reason: 'Format not optimizable' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download original image from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('cms-media')
      .download(storagePath);

    if (downloadError || !fileData) {
      console.error(`[optimize-image] Download failed:`, downloadError);
      throw new Error(`Failed to download original: ${downloadError?.message}`);
    }

    console.log(`[optimize-image] Downloaded original, size: ${fileData.size} bytes`);

    // Convert to array buffer for processing
    const arrayBuffer = await fileData.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Use native Deno image APIs via canvas or external service
    // Since Deno doesn't have native image processing, we'll use a simpler approach:
    // Upload to WebP using sharp via a fetch to an image processing service
    // OR use the browser-compatible approach with canvas

    // For now, we'll create a WebP version using the modern approach
    // by re-encoding via ImageBitmap and OffscreenCanvas (if available in Deno Deploy)

    let webpData: Uint8Array | null = null;
    let optimizedData: Uint8Array | null = null;

    try {
      // Try to use the native image APIs if available
      const blob = new Blob([uint8Array], { type: mimeType });
      
      // Create ImageBitmap
      const imageBitmap = await createImageBitmap(blob);
      
      const width = imageBitmap.width;
      const height = imageBitmap.height;
      
      // Calculate new dimensions (max 1920px width, maintain aspect ratio)
      const maxWidth = 1920;
      let newWidth = width;
      let newHeight = height;
      
      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = Math.round((height / width) * maxWidth);
      }

      console.log(`[optimize-image] Original: ${width}x${height}, Resized: ${newWidth}x${newHeight}`);

      // Create OffscreenCanvas for resizing
      const canvas = new OffscreenCanvas(newWidth, newHeight);
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(imageBitmap, 0, 0, newWidth, newHeight);
        
        // Convert to WebP
        const webpBlob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.8 });
        webpData = new Uint8Array(await webpBlob.arrayBuffer());
        console.log(`[optimize-image] WebP created, size: ${webpData.length} bytes`);

        // Create optimized JPEG version
        const jpegBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
        optimizedData = new Uint8Array(await jpegBlob.arrayBuffer());
        console.log(`[optimize-image] Optimized JPEG created, size: ${optimizedData.length} bytes`);
      }
      
      imageBitmap.close();
    } catch (imageError) {
      console.error(`[optimize-image] Image processing error:`, imageError);
      // Fall back to just storing the original in optimized paths
      optimizedData = uint8Array;
    }

    // Generate paths for optimized versions
    const filename = storagePath.split('/').pop() || storagePath;
    const baseName = filename.replace(/\.[^/.]+$/, '');
    const webpPath = `webp/${baseName}.webp`;
    const optimizedPath = `optimized/${baseName}.jpg`;

    let webpUrl: string | null = null;
    let optimizedUrl: string | null = null;

    // Upload WebP version
    if (webpData) {
      const { error: webpUploadError } = await supabase.storage
        .from('cms-media')
        .upload(webpPath, webpData, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (webpUploadError) {
        console.error(`[optimize-image] WebP upload failed:`, webpUploadError);
      } else {
        const { data: webpUrlData } = supabase.storage
          .from('cms-media')
          .getPublicUrl(webpPath);
        webpUrl = webpUrlData.publicUrl;
        console.log(`[optimize-image] WebP uploaded: ${webpUrl}`);
      }
    }

    // Upload optimized version
    if (optimizedData) {
      const { error: optimizedUploadError } = await supabase.storage
        .from('cms-media')
        .upload(optimizedPath, optimizedData, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (optimizedUploadError) {
        console.error(`[optimize-image] Optimized upload failed:`, optimizedUploadError);
      } else {
        const { data: optimizedUrlData } = supabase.storage
          .from('cms-media')
          .getPublicUrl(optimizedPath);
        optimizedUrl = optimizedUrlData.publicUrl;
        console.log(`[optimize-image] Optimized uploaded: ${optimizedUrl}`);
      }
    }

    // Update media record with optimized URLs
    const updateData: Record<string, string> = {};
    if (webpUrl) updateData.webp_url = webpUrl;
    if (optimizedUrl) updateData.optimized_url = optimizedUrl;

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from('media')
        .update(updateData)
        .eq('id', mediaId);

      if (updateError) {
        console.error(`[optimize-image] Database update failed:`, updateError);
      } else {
        console.log(`[optimize-image] Media record updated with optimized URLs`);
      }
    }

    // Calculate savings
    const originalSize = uint8Array.length;
    const webpSize = webpData?.length || originalSize;
    const savingsPercent = Math.round((1 - webpSize / originalSize) * 100);

    return new Response(
      JSON.stringify({
        success: true,
        mediaId,
        webpUrl,
        optimizedUrl,
        originalSize,
        webpSize,
        savingsPercent,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error(`[optimize-image] Error:`, error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
