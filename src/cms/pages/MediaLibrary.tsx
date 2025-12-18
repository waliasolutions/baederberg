import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Search, Trash2, Copy, Check, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '../components/AdminLayout';
import { useMedia } from '../hooks/useMedia';
import type { MediaItem } from '../types';

export const MediaLibrary: React.FC = () => {
  const { toast } = useToast();
  const { media, isLoading, error, uploadProgress, fetchMedia, uploadImage, deleteImage, updateAltText } = useMedia();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [editingAltText, setEditingAltText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    for (const file of files) {
      const { error } = await uploadImage(file);
      if (error) {
        toast({
          title: 'Upload failed',
          description: error,
          variant: 'destructive',
        });
      }
    }

    if (files.length > 0) {
      toast({
        title: 'Upload complete',
        description: `${files.length} image(s) uploaded successfully.`,
      });
    }
  }, [uploadImage, toast]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      const { error } = await uploadImage(file);
      if (error) {
        toast({
          title: 'Upload failed',
          description: error,
          variant: 'destructive',
        });
      }
    }

    if (files.length > 0) {
      toast({
        title: 'Upload complete',
        description: `${files.length} image(s) uploaded successfully.`,
      });
    }
    
    e.target.value = '';
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const storagePath = item.original_url.split('/cms-media/')[1];
    const { error } = await deleteImage(item.id, storagePath);
    
    if (error) {
      toast({
        title: 'Delete failed',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Image deleted successfully.',
      });
      setSelectedImage(null);
    }
  };

  const handleSaveAltText = async () => {
    if (!selectedImage) return;

    const { error } = await updateAltText(selectedImage.id, editingAltText);
    
    if (error) {
      toast({
        title: 'Update failed',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Updated',
        description: 'Alt text updated successfully.',
      });
      setSelectedImage({ ...selectedImage, alt_text: editingAltText });
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: 'Copied',
      description: 'URL copied to clipboard.',
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Media Library</h1>
          <label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Upload Images
              </span>
            </Button>
          </label>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <Loader2 className="w-5 h-5 animate-spin" />
                <div className="flex-1">
                  <Progress value={uploadProgress} className="h-2" />
                </div>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
        >
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium">Drag and drop images here</p>
          <p className="text-sm text-muted-foreground mt-1">
            or click the Upload button above
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: JPG, PNG, WebP, GIF, SVG (max 20MB)
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
            {error}
          </div>
        )}

        {/* Image Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">No images found</p>
            <p className="text-muted-foreground">Upload some images to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary transition-all"
                onClick={() => {
                  setSelectedImage(item);
                  setEditingAltText(item.alt_text || '');
                }}
              >
                <div className="aspect-square relative bg-muted">
                  <img
                    src={item.original_url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-2">
                  <p className="text-xs font-medium truncate">{item.filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(item.size_bytes)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Image Detail Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedImage?.filename}</DialogTitle>
            </DialogHeader>
            
            {selectedImage && (
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedImage.original_url}
                    alt={selectedImage.alt_text || selectedImage.filename}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="ml-2">
                      {selectedImage.width && selectedImage.height
                        ? `${selectedImage.width} × ${selectedImage.height}px`
                        : 'Unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-2">{formatFileSize(selectedImage.size_bytes)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2">{selectedImage.mime_type || 'Unknown'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uploaded:</span>
                    <span className="ml-2">
                      {selectedImage.created_at
                        ? new Date(selectedImage.created_at).toLocaleDateString('de-CH')
                        : 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Alt Text (for accessibility)</Label>
                  <Input
                    value={editingAltText}
                    onChange={(e) => setEditingAltText(e.target.value)}
                    placeholder="Describe this image..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      value={selectedImage.original_url}
                      readOnly
                      className="bg-muted"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyUrl(selectedImage.original_url, selectedImage.id)}
                    >
                      {copiedId === selectedImage.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => selectedImage && handleDelete(selectedImage)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button onClick={handleSaveAltText}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};
