import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { MediaItem } from '../types';

export function useMedia() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [optimizingIds, setOptimizingIds] = useState<Set<string>>(new Set());

  // Fetch all media
  const fetchMedia = useCallback(async (folder?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('media').select('*').order('created_at', { ascending: false });
      
      if (folder) {
        query = query.eq('folder', folder);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setMedia(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch media');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Optimize image via edge function
  const optimizeImage = useCallback(async (mediaId: string, storagePath: string, mimeType: string) => {
    setOptimizingIds(prev => new Set(prev).add(mediaId));
    
    try {
      const { data, error } = await supabase.functions.invoke('optimize-image', {
        body: { mediaId, storagePath, mimeType },
      });

      if (error) {
        console.error('Optimization failed:', error);
        return { success: false, error: error.message };
      }

      if (data?.success && !data?.skipped) {
        // Update local state with optimized URLs
        setMedia(prev => prev.map(m => 
          m.id === mediaId 
            ? { ...m, webp_url: data.webpUrl, optimized_url: data.optimizedUrl }
            : m
        ));
        return { success: true, data };
      }

      return { success: true, skipped: data?.skipped };
    } catch (err) {
      console.error('Optimization error:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    } finally {
      setOptimizingIds(prev => {
        const next = new Set(prev);
        next.delete(mediaId);
        return next;
      });
    }
  }, []);

  // Upload image
  const uploadImage = useCallback(async (
    file: File,
    folder: string = '/',
    altText?: string
  ) => {
    setUploadProgress(0);
    setError(null);
    
    try {
      // Validate file
      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        throw new Error('File too large. Maximum size is 20MB.');
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG');
      }
      
      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${timestamp}-${sanitizedName}`;
      const path = folder === '/' ? filename : `${folder}/${filename}`;
      
      setUploadProgress(20);
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (uploadError) throw uploadError;
      
      setUploadProgress(50);
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('cms-media')
        .getPublicUrl(uploadData.path);
      
      // Get image dimensions
      let width: number | undefined;
      let height: number | undefined;
      
      if (file.type.startsWith('image/')) {
        const dimensions = await getImageDimensions(file);
        width = dimensions.width;
        height = dimensions.height;
      }
      
      setUploadProgress(70);
      
      // Save to database
      const { data: mediaData, error: dbError } = await supabase
        .from('media')
        .insert({
          filename: file.name,
          original_url: urlData.publicUrl,
          alt_text: altText || file.name.replace(/\.[^/.]+$/, ''),
          mime_type: file.type,
          size_bytes: file.size,
          width,
          height,
          folder,
        })
        .select()
        .single();
      
      if (dbError) throw dbError;
      
      setUploadProgress(90);
      setMedia(prev => [mediaData, ...prev]);
      
      // Trigger optimization in background (non-blocking)
      if (file.type !== 'image/svg+xml' && file.type !== 'image/gif') {
        optimizeImage(mediaData.id, uploadData.path, file.type);
      }
      
      setUploadProgress(100);
      
      return { data: mediaData, error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMsg);
      return { data: null, error: errorMsg };
    }
  }, [optimizeImage]);

  // Delete image
  const deleteImage = useCallback(async (mediaId: string, storagePath: string) => {
    try {
      // Delete from storage (original)
      const { error: storageError } = await supabase.storage
        .from('cms-media')
        .remove([storagePath]);
      
      if (storageError) throw storageError;
      
      // Try to delete optimized versions (ignore errors if they don't exist)
      const baseName = storagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
      await supabase.storage.from('cms-media').remove([`webp/${baseName}.webp`]);
      await supabase.storage.from('cms-media').remove([`optimized/${baseName}.jpg`]);
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', mediaId);
      
      if (dbError) throw dbError;
      
      setMedia(prev => prev.filter(m => m.id !== mediaId));
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, []);

  // Update alt text
  const updateAltText = useCallback(async (mediaId: string, altText: string) => {
    try {
      const { error: updateError } = await supabase
        .from('media')
        .update({ alt_text: altText })
        .eq('id', mediaId);
      
      if (updateError) throw updateError;
      
      setMedia(prev => prev.map(m => 
        m.id === mediaId ? { ...m, alt_text: altText } : m
      ));
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Update failed';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, []);

  // Check if an image is currently being optimized
  const isOptimizing = useCallback((mediaId: string) => {
    return optimizingIds.has(mediaId);
  }, [optimizingIds]);

  // Sync existing project images to media library
  const syncProjectImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const projectImages = [
      // Hero and service images
      { url: '/lovable-uploads/bad-hero.jpg', filename: 'bad-hero.jpg', folder: 'hero' },
      { url: '/lovable-uploads/bad-service.jpg', filename: 'bad-service.jpg', folder: 'services' },
      { url: '/lovable-uploads/kueche-hero.jpg', filename: 'kueche-hero.jpg', folder: 'hero' },
      { url: '/lovable-uploads/kueche-service.jpg', filename: 'kueche-service.jpg', folder: 'services' },
      { url: '/lovable-uploads/innenausbau-hero.jpg', filename: 'innenausbau-hero.jpg', folder: 'hero' },
      { url: '/lovable-uploads/innenausbau-service.jpg', filename: 'innenausbau-service.jpg', folder: 'services' },
      { url: '/lovable-uploads/modern-bathroom-interior.jpg', filename: 'modern-bathroom-interior.jpg', folder: 'general' },
      { url: '/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png', filename: 'logo-1.png', folder: 'branding' },
      { url: '/lovable-uploads/7b5a5a87-6002-4a90-aa3a-50bb91b165bf.png', filename: 'logo-2.png', folder: 'branding' },
      // Public images
      { url: '/images/bathroom-modern.jpg', filename: 'bathroom-modern.jpg', folder: 'gallery' },
      { url: '/images/interior-living.jpg', filename: 'interior-living.jpg', folder: 'gallery' },
      { url: '/images/interior-modern.jpg', filename: 'interior-modern.jpg', folder: 'gallery' },
      { url: '/images/kitchen-modern.jpg', filename: 'kitchen-modern.jpg', folder: 'gallery' },
    ];
    
    let syncedCount = 0;
    
    try {
      for (const img of projectImages) {
        // Check if already exists
        const { data: existing } = await supabase
          .from('media')
          .select('id')
          .eq('original_url', img.url)
          .maybeSingle();
        
        if (!existing) {
          const altText = img.filename
            .replace(/[-_]/g, ' ')
            .replace(/\.[^/.]+$/, '')
            .replace(/^\w/, c => c.toUpperCase());
          
          const { error: insertError } = await supabase.from('media').insert({
            filename: img.filename,
            original_url: img.url,
            alt_text: altText,
            folder: img.folder,
            mime_type: img.filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
          });
          
          if (!insertError) syncedCount++;
        }
      }
      
      await fetchMedia();
      return { syncedCount, error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Sync failed';
      setError(errorMsg);
      return { syncedCount: 0, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, [fetchMedia]);

  return {
    media,
    isLoading,
    error,
    uploadProgress,
    fetchMedia,
    uploadImage,
    deleteImage,
    updateAltText,
    optimizeImage,
    isOptimizing,
    syncProjectImages,
  };
}

// Helper to get image dimensions
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
