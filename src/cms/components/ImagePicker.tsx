import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon, Upload, X, Search, Loader2 } from 'lucide-react';
import { useMedia } from '../hooks/useMedia';
import { useToast } from '@/hooks/use-toast';
import type { MediaItem } from '../types';

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  aspect?: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ value, onChange, aspect }) => {
  const { toast } = useToast();
  const { media, isLoading, uploadProgress, fetchMedia, uploadImage } = useMedia();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
    }
  }, [isOpen, fetchMedia]);

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item: MediaItem) => {
    // Prefer optimized versions: webp > optimized > original
    const url = item.webp_url || item.optimized_url || item.original_url;
    onChange(url);
    setIsOpen(false);
  };

  // Get the best available URL for display
  const getBestUrl = (item: MediaItem) => {
    return item.webp_url || item.optimized_url || item.original_url;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await uploadImage(file);
    
    if (error) {
      toast({
        title: 'Upload failed',
        description: error,
        variant: 'destructive',
      });
    } else if (data) {
      onChange(data.original_url);
      setIsOpen(false);
      toast({
        title: 'Uploaded',
        description: 'Image uploaded and selected.',
      });
    }
    
    e.target.value = '';
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {/* Preview */}
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Selected"
            className="w-full max-w-xs h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-xs h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-8 h-8 mx-auto mb-1" />
            <p className="text-xs">No image selected</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Choose from Library
        </Button>
        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button type="button" variant="outline" size="sm" asChild>
            <span>
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </span>
          </Button>
        </label>
      </div>

      {/* URL Input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or enter image URL directly"
        className="text-xs"
      />

      {/* Media Library Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>

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

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Uploading... {uploadProgress}%</span>
            </div>
          )}

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No images found</p>
                <label className="mt-4 inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload an image
                    </span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
                {filteredMedia.map((item) => {
                  const bestUrl = getBestUrl(item);
                  const isSelected = value === item.original_url || value === item.webp_url || value === item.optimized_url;
                  return (
                    <Card
                      key={item.id}
                      className={`cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary ${
                        isSelected ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <div className="aspect-square relative bg-muted">
                        <img
                          src={bestUrl}
                          alt={item.alt_text || item.filename}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {item.webp_url && (
                          <span className="absolute top-1 right-1 px-1 py-0.5 text-[9px] bg-green-500/90 text-white rounded">
                            WebP
                          </span>
                        )}
                      </div>
                      <CardContent className="p-2">
                        <p className="text-xs truncate">{item.filename}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePicker;
