import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, Globe, FileText } from 'lucide-react';

interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
}

interface PagesData {
  badumbau: PageSEO;
  kuechenumbau: PageSEO;
  innenausbau: PageSEO;
  home: PageSEO;
}

const defaultPagesData: PagesData = {
  home: {
    metaTitle: 'Bäderberg - Ihr Partner für Küchen- und Badumbau',
    metaDescription: 'Professioneller Küchen- und Badumbau in der Region Zürich. Persönliche Beratung, hochwertige Materialien und handwerkliche Perfektion.',
    heroHeading: 'Ihr Partner für Küchen- und Badumbau',
    heroSubheading: 'Professionelle Umbaulösungen aus einer Hand'
  },
  badumbau: {
    metaTitle: 'Badumbau - Bäderberg',
    metaDescription: 'Wir bauen Ihr Bad um – persönlich geplant und realisiert. Professioneller Badumbau in der Region Zürich mit hochwertigen Materialien.',
    heroHeading: 'Badumbau',
    heroSubheading: 'Ihr Traumbad, professionell geplant und umgesetzt'
  },
  kuechenumbau: {
    metaTitle: 'Küchenumbau - Bäderberg',
    metaDescription: 'Professioneller Küchenumbau in der Region Zürich. Moderne Küchen nach Ihren Wünschen, handwerklich perfekt umgesetzt.',
    heroHeading: 'Küchenumbau',
    heroSubheading: 'Ihre Traumküche, massgeschneidert für Sie'
  },
  innenausbau: {
    metaTitle: 'Innenausbau - Bäderberg',
    metaDescription: 'Hochwertiger Innenausbau in der Region Zürich. Massgeschneiderte Lösungen für Ihr Zuhause.',
    heroHeading: 'Innenausbau',
    heroSubheading: 'Innenausbau nach Ihren Vorstellungen'
  }
};

const pageLabels = {
  home: { name: 'Startseite', path: '/' },
  badumbau: { name: 'Badumbau', path: '/badumbau' },
  kuechenumbau: { name: 'Küchenumbau', path: '/kuechenumbau' },
  innenausbau: { name: 'Innenausbau', path: '/innenausbau' }
};

export default function PagesEditor() {
  const { toast } = useToast();
  const [pagesData, setPagesData] = useState<PagesData>(defaultPagesData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fetchPagesData = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('content_key, content')
        .eq('section_key', 'pages');

      if (error) {
        console.error('Error fetching pages data:', error);
        toast({
          title: 'Fehler beim Laden',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }

      if (data && data.length > 0) {
        const loadedData = { ...defaultPagesData };
        data.forEach((item) => {
          const key = item.content_key as keyof PagesData;
          if (key in loadedData) {
            const contentData = item.content as unknown as PageSEO;
            loadedData[key] = {
              ...defaultPagesData[key],
              ...contentData
            };
          }
        });
        setPagesData(loadedData);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPagesData();
  }, [fetchPagesData]);

  const updatePageField = (
    pageKey: keyof PagesData,
    field: keyof PageSEO,
    value: string
  ) => {
    setPagesData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [field]: value
      }
    }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Nicht angemeldet',
          description: 'Bitte melden Sie sich an, um Änderungen zu speichern.',
          variant: 'destructive'
        });
        return;
      }

      // Save each page's data
      for (const [pageKey, pageData] of Object.entries(pagesData)) {
        const { error } = await supabase
          .from('content')
          .upsert({
            section_key: 'pages',
            content_key: pageKey,
            content: pageData,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
            is_draft: false,
            published_at: new Date().toISOString()
          }, {
            onConflict: 'section_key,content_key'
          });

        if (error) {
          console.error(`Error saving ${pageKey}:`, error);
          toast({
            title: 'Fehler beim Speichern',
            description: `${pageKey}: ${error.message}`,
            variant: 'destructive'
          });
          return;
        }
      }

      toast({
        title: 'Gespeichert',
        description: 'Alle Seiteneinstellungen wurden gespeichert.'
      });
      setIsDirty(false);
    } catch (err) {
      console.error('Save error:', err);
      toast({
        title: 'Fehler',
        description: 'Unerwarteter Fehler beim Speichern.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderPageEditor = (pageKey: keyof PagesData) => {
    const page = pagesData[pageKey];
    const label = pageLabels[pageKey];

    return (
      <div className="space-y-6">
        {/* SEO Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Google Suchergebnis-Vorschau
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg space-y-1">
              <div className="text-primary text-lg hover:underline cursor-pointer truncate">
                {page.metaTitle || 'Seitentitel'}
              </div>
              <div className="text-xs text-green-700">
                baederberg.ch{label.path}
              </div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {page.metaDescription || 'Meta-Beschreibung wird hier angezeigt...'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta Fields */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">SEO Einstellungen</CardTitle>
            <CardDescription>
              Meta-Titel und Beschreibung für Suchmaschinen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${pageKey}-title`}>
                Meta-Titel
                <span className="text-muted-foreground ml-2 text-xs">
                  ({page.metaTitle.length}/60 Zeichen)
                </span>
              </Label>
              <Input
                id={`${pageKey}-title`}
                value={page.metaTitle}
                onChange={(e) => updatePageField(pageKey, 'metaTitle', e.target.value)}
                maxLength={60}
                placeholder="Seitentitel für Google"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${pageKey}-desc`}>
                Meta-Beschreibung
                <span className="text-muted-foreground ml-2 text-xs">
                  ({page.metaDescription.length}/160 Zeichen)
                </span>
              </Label>
              <Textarea
                id={`${pageKey}-desc`}
                value={page.metaDescription}
                onChange={(e) => updatePageField(pageKey, 'metaDescription', e.target.value)}
                maxLength={160}
                rows={3}
                placeholder="Kurze Beschreibung für Suchergebnisse"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hero Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Hero-Bereich
            </CardTitle>
            <CardDescription>
              Überschriften im Hero-Bereich der Seite
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${pageKey}-hero-heading`}>Hero Überschrift</Label>
              <Input
                id={`${pageKey}-hero-heading`}
                value={page.heroHeading}
                onChange={(e) => updatePageField(pageKey, 'heroHeading', e.target.value)}
                placeholder="Hauptüberschrift"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${pageKey}-hero-sub`}>Hero Untertitel</Label>
              <Input
                id={`${pageKey}-hero-sub`}
                value={page.heroSubheading}
                onChange={(e) => updatePageField(pageKey, 'heroSubheading', e.target.value)}
                placeholder="Untertitel"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Seiten bearbeiten</h1>
            <p className="text-muted-foreground">
              SEO und Inhalte für alle Seiten verwalten
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isDirty && (
              <span className="text-sm text-amber-600">Ungespeicherte Änderungen</span>
            )}
            <Button onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Speichern
            </Button>
          </div>
        </div>

        {/* Tabs for each page */}
        <Tabs defaultValue="home" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="home">Startseite</TabsTrigger>
            <TabsTrigger value="badumbau">Badumbau</TabsTrigger>
            <TabsTrigger value="kuechenumbau">Küchenumbau</TabsTrigger>
            <TabsTrigger value="innenausbau">Innenausbau</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            {renderPageEditor('home')}
          </TabsContent>
          <TabsContent value="badumbau">
            {renderPageEditor('badumbau')}
          </TabsContent>
          <TabsContent value="kuechenumbau">
            {renderPageEditor('kuechenumbau')}
          </TabsContent>
          <TabsContent value="innenausbau">
            {renderPageEditor('innenausbau')}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
