import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContent } from '../hooks/useContent';
import { useMedia } from '../hooks/useMedia';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { sectionLabels } from '../schema';
import { ThemePreview } from '../components/ThemePreview';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Image, 
  Palette, 
  ExternalLink,
  AlertCircle,
  Database,
  Loader2,
  CheckCircle
} from 'lucide-react';

export function AdminDashboard() {
  const { content, isLoading: contentLoading, isDirty, lastSaved, refetch } = useContent();
  const { media, fetchMedia } = useMedia();
  const { activeTheme, fetchThemes } = useTheme();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasSeeded, setHasSeeded] = useState(false);

  React.useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const sectionCount = Object.keys(content).length;
  const mediaCount = media.length;

  const handleSeedContent = async () => {
    setIsSeeding(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-content');
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: 'Erfolg', description: 'Inhalte wurden initialisiert' });
      setHasSeeded(true);
      await Promise.all([refetch(), fetchThemes()]);
    } catch (err: any) {
      toast({
        title: 'Fehler',
        description: err.message || 'Inhalte konnten nicht initialisiert werden',
        variant: 'destructive'
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Willkommen im Content Management System</p>
        </div>

        {isAdmin && !hasSeeded && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Database className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle className="text-lg">CMS einrichten</CardTitle>
                  <CardDescription>Initialisieren Sie das CMS mit Standardinhalten</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Klicken Sie auf den Button, um das CMS mit Standardinhalten zu befüllen.
                </p>
                <Button onClick={handleSeedContent} disabled={isSeeding}>
                  {isSeeding ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Wird initialisiert...</>
                  ) : (
                    'Inhalte initialisieren'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {hasSeeded && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
            <CheckCircle size={20} />
            <span>Inhalte wurden erfolgreich initialisiert!</span>
          </div>
        )}

        {isDirty && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-amber-800">Ungespeicherte Änderungen</p>
              <p className="text-sm text-amber-600">Es gibt Änderungen, die noch nicht veröffentlicht wurden.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Inhaltsbereiche</CardDescription>
              <CardTitle className="text-3xl">{sectionCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/admin/content" className="text-sm text-primary hover:underline">Inhalte bearbeiten →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Medien</CardDescription>
              <CardTitle className="text-3xl">{mediaCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/admin/media" className="text-sm text-primary hover:underline">Medien verwalten →</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Letzte Speicherung</CardDescription>
              <CardTitle className="text-lg">
                {lastSaved ? new Intl.DateTimeFormat('de-CH', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Zurich' }).format(lastSaved) : 'Noch nicht gespeichert'}
              </CardTitle>
            </CardHeader>
            <CardContent><span className="text-sm text-slate-500">Autosave alle 30 Sekunden</span></CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Website</CardDescription>
              <CardTitle className="text-lg">Live ansehen</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Öffnen <ExternalLink size={14} />
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg"><FileText className="text-blue-600" size={24} /></div>
                <div>
                  <CardTitle className="text-lg">Inhalte bearbeiten</CardTitle>
                  <CardDescription>Texte, Überschriften, Beschreibungen</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent><Button asChild className="w-full"><Link to="/admin/content">Inhalte öffnen</Link></Button></CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg"><Image className="text-green-600" size={24} /></div>
                <div>
                  <CardTitle className="text-lg">Bilder verwalten</CardTitle>
                  <CardDescription>Upload, bearbeiten, organisieren</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent><Button asChild variant="outline" className="w-full"><Link to="/admin/media">Medien öffnen</Link></Button></CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg"><Palette className="text-purple-600" size={24} /></div>
                  <div>
                    <CardTitle className="text-lg">Design anpassen</CardTitle>
                    <CardDescription>Farben und Themes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent><Button asChild variant="outline" className="w-full"><Link to="/admin/themes">Design öffnen</Link></Button></CardContent>
            </Card>
          )}
        </div>

        {isAdmin && <ThemePreview colors={activeTheme?.colors} themeName={activeTheme?.name} />}

        <Card>
          <CardHeader>
            <CardTitle>Inhaltsbereiche</CardTitle>
            <CardDescription>Klicken Sie auf einen Bereich, um ihn zu bearbeiten</CardDescription>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="text-slate-500">Laden...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(sectionLabels).map(key => (
                  <Link key={key} to={`/admin/content/${key}`} className="p-4 border border-slate-200 rounded-lg hover:border-primary hover:bg-slate-50 transition-colors">
                    <span className="font-medium text-slate-900">{sectionLabels[key]}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
