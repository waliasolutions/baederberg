import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContent } from '../hooks/useContent';
import { useMedia } from '../hooks/useMedia';
import { sectionLabels } from '../schema';
import { 
  FileText, 
  Image, 
  Palette, 
  Clock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export function AdminDashboard() {
  const { content, isLoading: contentLoading, isDirty, lastSaved } = useContent();
  const { media, fetchMedia } = useMedia();

  React.useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const sectionCount = Object.keys(content).length;
  const mediaCount = media.length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Willkommen im Content Management System
          </p>
        </div>

        {/* Status Alert */}
        {isDirty && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-amber-800">Ungespeicherte Änderungen</p>
              <p className="text-sm text-amber-600">
                Es gibt Änderungen, die noch nicht veröffentlicht wurden.
              </p>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Inhaltsbereiche</CardDescription>
              <CardTitle className="text-3xl">{sectionCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/admin/content" className="text-sm text-primary hover:underline">
                Inhalte bearbeiten →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Medien</CardDescription>
              <CardTitle className="text-3xl">{mediaCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/admin/media" className="text-sm text-primary hover:underline">
                Medien verwalten →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Letzte Speicherung</CardDescription>
              <CardTitle className="text-lg">
                {lastSaved 
                  ? new Intl.DateTimeFormat('de-CH', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                      timeZone: 'Europe/Zurich'
                    }).format(lastSaved)
                  : 'Noch nicht gespeichert'
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-slate-500">
                Autosave alle 30 Sekunden
              </span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Website</CardDescription>
              <CardTitle className="text-lg">Live ansehen</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                Öffnen <ExternalLink size={14} />
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <CardTitle className="text-lg">Inhalte bearbeiten</CardTitle>
                  <CardDescription>Texte, Überschriften, Beschreibungen</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/admin/content">Inhalte öffnen</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Image className="text-green-600" size={24} />
                </div>
                <div>
                  <CardTitle className="text-lg">Bilder verwalten</CardTitle>
                  <CardDescription>Upload, bearbeiten, organisieren</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/media">Medien öffnen</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Palette className="text-purple-600" size={24} />
                </div>
                <div>
                  <CardTitle className="text-lg">Design anpassen</CardTitle>
                  <CardDescription>Farben und Themes</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin/themes">Design öffnen</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Content Sections Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Inhaltsbereiche</CardTitle>
            <CardDescription>
              Klicken Sie auf einen Bereich, um ihn zu bearbeiten
            </CardDescription>
          </CardHeader>
          <CardContent>
            {contentLoading ? (
              <div className="text-slate-500">Laden...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(sectionLabels).map(key => (
                  <Link
                    key={key}
                    to={`/admin/content/${key}`}
                    className="p-4 border border-slate-200 rounded-lg hover:border-primary hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-slate-900">
                      {sectionLabels[key]}
                    </span>
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
