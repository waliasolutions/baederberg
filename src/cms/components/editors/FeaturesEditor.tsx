import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, FileText } from 'lucide-react';

interface FeaturesEditorProps {
  introText?: string;
  features: string[];
  showIntro?: boolean;
  onChange: (field: 'introText' | 'features', value: string | string[]) => void;
}

export function FeaturesEditor({ introText = '', features, showIntro = true, onChange }: FeaturesEditorProps) {
  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    onChange('features', updated);
  };

  const addFeature = () => {
    onChange('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    onChange('features', features.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Seiteninhalt
        </CardTitle>
        <CardDescription>Einleitungstext und Features</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showIntro && (
          <div className="space-y-2">
            <Label>Einleitungstext</Label>
            <Textarea
              value={introText}
              onChange={(e) => onChange('introText', e.target.value)}
              rows={3}
              placeholder="Kurze Einleitung zur Leistung..."
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Features / Highlights</Label>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Feature..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4 mr-2" />
              Feature hinzufügen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
