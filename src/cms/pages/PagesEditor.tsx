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
import { Save, Loader2, Globe, FileText, Image, Plus, Trash2 } from 'lucide-react';
import ImagePicker from '../components/ImagePicker';

interface PageContent {
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Hero
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  // Content
  introText: string;
  features: string[];
}

interface PagesData {
  badumbau: PageContent;
  kuechenumbau: PageContent;
  innenausbau: PageContent;
  home: PageContent;
}

const defaultPagesData: PagesData = {
  home: {
    metaTitle: 'Bäderberg - Ihr Partner für Küchen- und Badumbau',
    metaDescription: 'Professioneller Küchen- und Badumbau in der Region Zürich. Persönliche Beratung, hochwertige Materialien und handwerkliche Perfektion.',
    heroHeading: 'Ihr Partner für Küchen- und Badumbau',
    heroSubheading: 'Professionelle Umbaulösungen aus einer Hand',
    heroImage: '',
    introText: '',
    features: []
  },
  badumbau: {
    metaTitle: 'Badumbau - Bäderberg',
    metaDescription: 'Wir bauen Ihr Bad um – persönlich geplant und realisiert. Professioneller Badumbau in der Region Zürich mit hochwertigen Materialien.',
    heroHeading: 'Badumbau',
    heroSubheading: 'Ihr Traumbad, professionell geplant und umgesetzt',
    heroImage: '/lovable-uploads/bad-hero.jpg',
    introText: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt.',
    features: [
      'Komplette Badumbauten aus einer Hand',
      'Barrierefreie Bäder und altersgerechte Umbauten',
      'Hochwertige Materialien und moderne Designs',
      'Festpreisgarantie ohne versteckte Kosten'
    ]
  },
  kuechenumbau: {
    metaTitle: 'Küchenumbau - Bäderberg',
    metaDescription: 'Professioneller Küchenumbau in der Region Zürich. Moderne Küchen nach Ihren Wünschen, handwerklich perfekt umgesetzt.',
    heroHeading: 'Küchenumbau',
    heroSubheading: 'Ihre Traumküche, massgeschneidert für Sie',
    heroImage: '/lovable-uploads/kueche-hero.jpg',
    introText: 'Neue Küche? Wir planen, bauen ein und kümmern uns um Elektro und Anschlüsse. Alles aus einer Hand.',
    features: [
      'Individuelle Küchenplanung nach Ihren Wünschen',
      'Demontage und Entsorgung der alten Küche',
      'Elektro- und Sanitärinstallationen',
      'Einbau und Montage der neuen Küche'
    ]
  },
  innenausbau: {
    metaTitle: 'Innenausbau - Bäderberg',
    metaDescription: 'Hochwertiger Innenausbau in der Region Zürich. Massgeschneiderte Lösungen für Ihr Zuhause.',
    heroHeading: 'Innenausbau',
    heroSubheading: 'Innenausbau nach Ihren Vorstellungen',
    heroImage: '/lovable-uploads/innenausbau-hero.jpg',
    introText: 'Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um.',
    features: [
      'Einbauschränke und Garderobenlösungen',
      'Boden- und Wandverkleidungen',
      'Trennwände und Raumteiler',
      'Individuelle Möbeleinbauten'
    ]
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
            const contentData = item.content as unknown as PageContent;
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
    field: keyof PageContent,
    value: string | string[]
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

  const updateFeature = (pageKey: keyof PagesData, index: number, value: string) => {
    const features = [...pagesData[pageKey].features];
    features[index] = value;
    updatePageField(pageKey, 'features', features);
  };

  const addFeature = (pageKey: keyof PagesData) => {
    const features = [...pagesData[pageKey].features, ''];
    updatePageField(pageKey, 'features', features);
  };

  const removeFeature = (pageKey: keyof PagesData, index: number) => {
    const features = pagesData[pageKey].features.filter((_, i) => i !== index);
    updatePageField(pageKey, 'features', features);
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
    const isServicePage = pageKey !== 'home';

    return (
      <div className="space-y-6">
        {/* SEO Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO Einstellungen
            </CardTitle>
            <CardDescription>
              Meta-Daten für Suchmaschinen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Preview */}
            <div className="bg-muted p-4 rounded-lg space-y-1">
              <p className="text-xs text-muted-foreground mb-2">Google Vorschau:</p>
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

        {/* Hero Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Image className="h-4 w-4" />
              Hero-Bereich
            </CardTitle>
            <CardDescription>
              Überschriften und Bild im Hero-Bereich
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
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
              </div>

              {isServicePage && (
                <div className="space-y-2">
                  <Label>Hero Bild</Label>
                  <ImagePicker
                    value={page.heroImage}
                    onChange={(url) => updatePageField(pageKey, 'heroImage', url)}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Card - Only for service pages */}
        {isServicePage && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Seiteninhalt
              </CardTitle>
              <CardDescription>
                Einleitungstext und Features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${pageKey}-intro`}>Einleitungstext</Label>
                <Textarea
                  id={`${pageKey}-intro`}
                  value={page.introText}
                  onChange={(e) => updatePageField(pageKey, 'introText', e.target.value)}
                  rows={3}
                  placeholder="Kurze Einleitung zur Leistung..."
                />
              </div>

              <div className="space-y-2">
                <Label>Features / Highlights</Label>
                <div className="space-y-2">
                  {page.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(pageKey, index, e.target.value)}
                        placeholder="Feature..."
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(pageKey, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addFeature(pageKey)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Feature hinzufügen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
              SEO, Hero und Inhalte für alle Seiten verwalten
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
