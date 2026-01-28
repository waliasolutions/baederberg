import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Layers } from 'lucide-react';

interface ServicesData {
  badumbau: string;
  innenausbau: string;
}

interface ServicesEditorProps {
  services: ServicesData;
  onChange: (field: keyof ServicesData, value: string) => void;
}

export function ServicesEditor({ services, onChange }: ServicesEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Leistungsbeschreibungen
        </CardTitle>
        <CardDescription>Regionale Texte für jede Leistung</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Badumbau</Label>
          <Textarea
            value={services.badumbau}
            onChange={(e) => onChange('badumbau', e.target.value)}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Innenausbau</Label>
          <Textarea
            value={services.innenausbau}
            onChange={(e) => onChange('innenausbau', e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
