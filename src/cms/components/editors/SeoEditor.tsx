import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe } from 'lucide-react';

interface SeoEditorProps {
  metaTitle: string;
  metaDescription: string;
  path: string;
  onChange: (field: 'metaTitle' | 'metaDescription', value: string) => void;
}

export function SeoEditor({ metaTitle, metaDescription, path, onChange }: SeoEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Globe className="h-4 w-4" />
          SEO Einstellungen
        </CardTitle>
        <CardDescription>Meta-Daten für Suchmaschinen</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Preview */}
        <div className="bg-muted p-4 rounded-lg space-y-1">
          <p className="text-xs text-muted-foreground mb-2">Google Vorschau:</p>
          <div className="text-primary text-lg hover:underline cursor-pointer truncate">
            {metaTitle || 'Seitentitel'}
          </div>
          <div className="text-xs text-green-700">
            baederberg.ch{path}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {metaDescription || 'Meta-Beschreibung wird hier angezeigt...'}
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Meta-Titel
            <span className="text-muted-foreground ml-2 text-xs">
              ({metaTitle.length}/60 Zeichen)
            </span>
          </Label>
          <Input
            value={metaTitle}
            onChange={(e) => onChange('metaTitle', e.target.value)}
            maxLength={60}
            placeholder="Seitentitel für Google"
          />
        </div>

        <div className="space-y-2">
          <Label>
            Meta-Beschreibung
            <span className="text-muted-foreground ml-2 text-xs">
              ({metaDescription.length}/160 Zeichen)
            </span>
          </Label>
          <Textarea
            value={metaDescription}
            onChange={(e) => onChange('metaDescription', e.target.value)}
            maxLength={160}
            rows={3}
            placeholder="Kurze Beschreibung für Suchergebnisse"
          />
        </div>
      </CardContent>
    </Card>
  );
}
