import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Palette, Eye } from 'lucide-react';

interface ThemeColors {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface ThemePreviewProps {
  colors?: ThemeColors;
  themeName?: string;
}

export function ThemePreview({ colors, themeName }: ThemePreviewProps) {
  const defaultColors: ThemeColors = {
    primaryColor: '#0ea5e9',
    secondaryColor: '#f1f5f9',
    accentColor: '#0284c7',
    backgroundColor: '#ffffff',
    textColor: '#1e293b'
  };

  const c = { ...defaultColors, ...colors };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Palette className="text-purple-600" size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">Theme Vorschau</CardTitle>
              {themeName && (
                <p className="text-sm text-slate-500">Aktiv: {themeName}</p>
              )}
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/themes">
              <Eye size={16} className="mr-2" />
              Bearbeiten
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Color Swatches */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          <div className="text-center">
            <div 
              className="h-12 w-full rounded-lg border shadow-sm mb-2"
              style={{ backgroundColor: c.primaryColor }}
            />
            <span className="text-xs text-slate-500">Primär</span>
          </div>
          <div className="text-center">
            <div 
              className="h-12 w-full rounded-lg border shadow-sm mb-2"
              style={{ backgroundColor: c.secondaryColor }}
            />
            <span className="text-xs text-slate-500">Sekundär</span>
          </div>
          <div className="text-center">
            <div 
              className="h-12 w-full rounded-lg border shadow-sm mb-2"
              style={{ backgroundColor: c.accentColor }}
            />
            <span className="text-xs text-slate-500">Akzent</span>
          </div>
          <div className="text-center">
            <div 
              className="h-12 w-full rounded-lg border shadow-sm mb-2"
              style={{ backgroundColor: c.backgroundColor }}
            />
            <span className="text-xs text-slate-500">Hintergrund</span>
          </div>
          <div className="text-center">
            <div 
              className="h-12 w-full rounded-lg border shadow-sm mb-2"
              style={{ backgroundColor: c.textColor }}
            />
            <span className="text-xs text-slate-500">Text</span>
          </div>
        </div>

        {/* Live Preview */}
        <div 
          className="p-6 rounded-lg border"
          style={{ backgroundColor: c.backgroundColor }}
        >
          <h3 
            className="text-lg font-semibold mb-2"
            style={{ color: c.textColor }}
          >
            Live Vorschau
          </h3>
          <p 
            className="text-sm mb-4"
            style={{ color: c.textColor, opacity: 0.7 }}
          >
            So werden Ihre Farben auf der Website erscheinen.
          </p>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: c.primaryColor }}
            >
              Primär Button
            </button>
            <button
              className="px-4 py-2 rounded-md text-sm font-medium border"
              style={{ 
                backgroundColor: c.secondaryColor,
                color: c.textColor,
                borderColor: c.primaryColor
              }}
            >
              Sekundär Button
            </button>
          </div>
          <div 
            className="mt-4 p-3 rounded-md"
            style={{ backgroundColor: c.accentColor + '20' }}
          >
            <p 
              className="text-sm"
              style={{ color: c.accentColor }}
            >
              Akzent-Hinweis: Diese Farbe wird für Hervorhebungen verwendet.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
