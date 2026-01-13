import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import ImagePicker from '../ImagePicker';

interface HeroEditorProps {
  heading: string;
  subheading: string;
  image?: string;
  showImage?: boolean;
  onChange: (field: 'heroHeading' | 'heroSubheading' | 'heroImage', value: string) => void;
}

export function HeroEditor({ heading, subheading, image, showImage = true, onChange }: HeroEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Image className="h-4 w-4" />
          Hero-Bereich
        </CardTitle>
        <CardDescription>Überschriften und Bild im Hero-Bereich</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={showImage ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Überschrift</Label>
              <Input
                value={heading}
                onChange={(e) => onChange('heroHeading', e.target.value)}
                placeholder="Hauptüberschrift"
              />
            </div>

            <div className="space-y-2">
              <Label>Hero Untertitel</Label>
              <Input
                value={subheading}
                onChange={(e) => onChange('heroSubheading', e.target.value)}
                placeholder="Untertitel"
              />
            </div>
          </div>

          {showImage && (
            <div className="space-y-2">
              <Label>Hero Bild</Label>
              <ImagePicker
                value={image || ''}
                onChange={(url) => onChange('heroImage', url)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
