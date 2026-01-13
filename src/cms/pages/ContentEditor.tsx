import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Save, Loader2, Plus, Trash2, Home, Layers, Users, Image, Star, Phone, 
  MapPin, FileEdit, RefreshCw, ChevronRight 
} from 'lucide-react';
import ImagePicker from '../components/ImagePicker';
import IconPicker from '../components/IconPicker';
import { SeoEditor, HeroEditor, FeaturesEditor, FaqEditor, TestimonialsEditor, ServicesEditor } from '../components/editors';
import type { FaqItem, TestimonialItem } from '../components/editors';
import { defaultContent } from '../schema';
import type { Json } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';

// ========== TYPES ==========

interface HeroSlide {
  heading: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

interface GalleryItem {
  title: string;
  image: string;
  category: string;
}

interface HomepageData {
  hero: { slides: HeroSlide[] };
  services: { heading: string; subheading: string; items: ServiceItem[] };
  about: { heading: string; paragraph1: string; paragraph2: string; image: string; features: AboutFeature[] };
  gallery: { heading: string; subheading: string; items: GalleryItem[] };
  testimonials: { heading: string; items: TestimonialItem[] };
  contact: { heading: string; subheading: string; phone: string; email: string; company: string; street: string; city: string };
}

interface PageContent {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  introText: string;
  features: string[];
}

interface RegionData {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  metaTitle: string;
  metaDescription: string;
  services: { badumbau: string; kuechenumbau: string; innenausbau: string };
  whyUs: string[];
  testimonials: TestimonialItem[];
  faq: FaqItem[];
}

type PageType = 'home' | 'badumbau' | 'kuechenumbau' | 'innenausbau' | 'regions';

// ========== DEFAULTS ==========

const defaultHomepageData: HomepageData = {
  hero: defaultContent.hero,
  services: defaultContent.services,
  about: defaultContent.about,
  gallery: defaultContent.gallery,
  testimonials: defaultContent.testimonials,
  contact: defaultContent.contact
};

const defaultPageContent: PageContent = {
  metaTitle: '',
  metaDescription: '',
  heroHeading: '',
  heroSubheading: '',
  heroImage: '',
  introText: '',
  features: []
};

const defaultRegion: RegionData = {
  slug: '',
  title: '',
  description: '',
  heroImage: '',
  metaTitle: '',
  metaDescription: '',
  services: {
    badumbau: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne.',
    kuechenumbau: 'Neue Küche? Wir planen, bauen ein und kümmern uns um Elektro und Anschlüsse.',
    innenausbau: 'Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um.'
  },
  whyUs: [
    'Alles aus einer Hand – vom ersten Gespräch bis zur Übergabe',
    '5 Jahre Garantie auf unsere Handwerksleistungen',
    'Sorgfältige Arbeit mit hochwertigen Materialien',
    'Transparente Preise ohne versteckte Kosten'
  ],
  testimonials: [],
  faq: [
    { question: 'Wie lange dauert ein Umbau?', answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen.' },
    { question: 'Brauche ich eine Baugenehmigung?', answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig.' }
  ]
};

const staticRegionsData = [
  { slug: 'zurich', title: 'Bäderberg in Zürich', description: 'Bad, Küche und Innenausbau in Zürich', heroImage: '/src/assets/regions/zurich-interior.jpg' },
  { slug: 'richterswil', title: 'Bäderberg in Richterswil', description: 'Bad, Küche und Innenausbau in Richterswil', heroImage: '/src/assets/regions/richterswil-interior.jpg' },
  { slug: 'waedenswil', title: 'Bäderberg in Wädenswil', description: 'Bad, Küche und Innenausbau in Wädenswil', heroImage: '' },
  { slug: 'lachen', title: 'Bäderberg in Lachen', description: 'Bad, Küche und Innenausbau in Lachen', heroImage: '' },
  { slug: 'pfaeffikon', title: 'Bäderberg in Pfäffikon SZ', description: 'Bad, Küche und Innenausbau in Pfäffikon SZ', heroImage: '/src/assets/regions/pfaffikon-interior.jpg' },
  { slug: 'zollikon', title: 'Bäderberg in Zollikon', description: 'Bad, Küche und Innenausbau in Zollikon', heroImage: '' },
  { slug: 'kilchberg', title: 'Bäderberg in Kilchberg', description: 'Bad, Küche und Innenausbau in Kilchberg', heroImage: '' },
  { slug: 'kuesnacht', title: 'Bäderberg in Küsnacht', description: 'Bad, Küche und Innenausbau in Küsnacht', heroImage: '' },
  { slug: 'meilen', title: 'Bäderberg in Meilen', description: 'Bad, Küche und Innenausbau in Meilen', heroImage: '' },
  { slug: 'erlenbach', title: 'Bäderberg in Erlenbach', description: 'Bad, Küche und Innenausbau in Erlenbach', heroImage: '' },
];

const pageConfig = {
  home: { name: 'Startseite', path: '/', icon: Home },
  badumbau: { name: 'Badumbau', path: '/badumbau', icon: Layers },
  kuechenumbau: { name: 'Küchenumbau', path: '/kuechenumbau', icon: Layers },
  innenausbau: { name: 'Innenausbau', path: '/innenausbau', icon: Layers },
};

// ========== COMPONENT ==========

export default function ContentEditor() {
  const { pageType: urlPageType, regionSlug } = useParams<{ pageType?: string; regionSlug?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [selectedPage, setSelectedPage] = useState<PageType>('home');
  const [homepageData, setHomepageData] = useState<HomepageData>(defaultHomepageData);
  const [pagesData, setPagesData] = useState<Record<string, PageContent>>({
    badumbau: { ...defaultPageContent, metaTitle: 'Badumbau - Bäderberg', heroHeading: 'Badumbau' },
    kuechenumbau: { ...defaultPageContent, metaTitle: 'Küchenumbau - Bäderberg', heroHeading: 'Küchenumbau' },
    innenausbau: { ...defaultPageContent, metaTitle: 'Innenausbau - Bäderberg', heroHeading: 'Innenausbau' },
  });
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // ========== DATA FETCHING ==========

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: rows, error } = await supabase
        .from('content')
        .select('section_key, content_key, content')
        .or('section_key.eq.hero,section_key.eq.services,section_key.eq.about,section_key.eq.gallery,section_key.eq.testimonials,section_key.eq.contact,section_key.eq.pages,section_key.eq.region');

      if (error) throw error;

      if (rows) {
        // Homepage data
        const newHomepage = { ...defaultHomepageData };
        const homepageSections = ['hero', 'services', 'about', 'gallery', 'testimonials', 'contact'];
        rows.filter(r => homepageSections.includes(r.section_key) && r.content_key === 'default').forEach(row => {
          const section = row.section_key as keyof HomepageData;
          (newHomepage as any)[section] = { ...defaultHomepageData[section], ...(row.content as object) };
        });
        setHomepageData(newHomepage);

        // Pages data
        const newPages = { ...pagesData };
        rows.filter(r => r.section_key === 'pages').forEach(row => {
          if (row.content_key in newPages) {
            newPages[row.content_key] = { ...newPages[row.content_key], ...(row.content as object) };
          }
        });
        setPagesData(newPages);

        // Regions data
        const loadedRegions = rows
          .filter(r => r.section_key === 'region')
          .map(r => ({ slug: r.content_key, ...(r.content as object) } as RegionData));
        setRegions(loadedRegions);

        // Set selected region from URL
        if (regionSlug) {
          const region = loadedRegions.find(r => r.slug === regionSlug);
          if (region) {
            setSelectedRegion(region);
            setSelectedPage('regions');
          }
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      toast({ title: 'Fehler beim Laden', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [regionSlug, toast]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (urlPageType && urlPageType !== 'regions') {
      setSelectedPage(urlPageType as PageType);
    } else if (urlPageType === 'regions') {
      setSelectedPage('regions');
    }
  }, [urlPageType]);

  // ========== SAVE LOGIC ==========

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Nicht angemeldet', variant: 'destructive' });
        return;
      }

      if (selectedPage === 'home') {
        // Save homepage sections
        const sections: (keyof HomepageData)[] = ['hero', 'services', 'about', 'gallery', 'testimonials', 'contact'];
        for (const section of sections) {
          await supabase.from('content').upsert({
            section_key: section,
            content_key: 'default',
            content: homepageData[section] as unknown as Json,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
            is_draft: false,
            published_at: new Date().toISOString()
          }, { onConflict: 'section_key,content_key' });
        }
      } else if (selectedPage === 'regions' && selectedRegion) {
        // Save region
        const { slug, ...content } = selectedRegion;
        await supabase.from('content').upsert({
          section_key: 'region',
          content_key: slug,
          content: content as unknown as Json,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
          is_draft: false,
          published_at: new Date().toISOString()
        }, { onConflict: 'section_key,content_key' });
      } else {
        // Save service page
        await supabase.from('content').upsert({
          section_key: 'pages',
          content_key: selectedPage,
          content: pagesData[selectedPage] as unknown as Json,
          updated_by: user.id,
          updated_at: new Date().toISOString(),
          is_draft: false,
          published_at: new Date().toISOString()
        }, { onConflict: 'section_key,content_key' });
      }

      toast({ title: 'Gespeichert' });
      setIsDirty(false);
      await fetchAllData();
    } catch (err) {
      console.error('Save error:', err);
      toast({ title: 'Fehler beim Speichern', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // ========== SYNC REGIONS ==========

  const syncRegions = async () => {
    setIsSyncing(true);
    let syncedCount = 0;
    try {
      for (const region of staticRegionsData) {
        const exists = regions.some(r => r.slug === region.slug);
        if (!exists) {
          const contentData: RegionData = {
            ...defaultRegion,
            slug: region.slug,
            title: region.title,
            description: region.description,
            heroImage: region.heroImage,
            metaTitle: `${region.title} - Bäderberg`,
            metaDescription: region.description,
          };
          const { slug, ...content } = contentData;
          // Add contact from SSOT (regionDefaults)
          const contentWithContact = {
            ...content,
            contact: defaultContent.regionDefaults?.contact || {
              phone: '+41 76 753 44 78',
              email: 'info@baederberg.ch',
              address: { street: 'Zugerstrasse 18', city: 'Richterswil' }
            }
          };
          await supabase.from('content').insert({
            section_key: 'region',
            content_key: slug,
            content: contentWithContact as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          });
          syncedCount++;
        }
      }
      toast({ 
        title: 'Synchronisiert', 
        description: syncedCount > 0 ? `${syncedCount} Regionen importiert.` : 'Alle Regionen vorhanden.' 
      });
      await fetchAllData();
    } catch (err) {
      console.error('Sync error:', err);
      toast({ title: 'Fehler', variant: 'destructive' });
    } finally {
      setIsSyncing(false);
    }
  };

  const syncServicePages = async () => {
    setIsSyncing(true);
    let syncedCount = 0;
    try {
      const servicePages = ['badumbau', 'kuechenumbau', 'innenausbau'];
      for (const pageKey of servicePages) {
        const { data: existing } = await supabase
          .from('content')
          .select('id')
          .eq('section_key', 'pages')
          .eq('content_key', pageKey)
          .maybeSingle();

        if (!existing) {
          const pageDefaults = defaultContent.pages?.[pageKey] || {};
          await supabase.from('content').insert({
            section_key: 'pages',
            content_key: pageKey,
            content: pageDefaults as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          });
          syncedCount++;
        }
      }
      toast({ 
        title: 'Synchronisiert', 
        description: syncedCount > 0 ? `${syncedCount} Leistungsseiten importiert.` : 'Alle Leistungsseiten vorhanden.' 
      });
      await fetchAllData();
    } catch (err) {
      console.error('Sync error:', err);
      toast({ title: 'Fehler', variant: 'destructive' });
    } finally {
      setIsSyncing(false);
    }
  };

  // ========== UPDATE HELPERS ==========

  const updateHomepageSection = <K extends keyof HomepageData>(section: K, value: HomepageData[K]) => {
    setHomepageData(prev => ({ ...prev, [section]: value }));
    setIsDirty(true);
  };

  const updatePageField = (page: string, field: keyof PageContent, value: string | string[]) => {
    setPagesData(prev => ({ ...prev, [page]: { ...prev[page], [field]: value } }));
    setIsDirty(true);
  };

  const updateRegionField = <K extends keyof RegionData>(field: K, value: RegionData[K]) => {
    if (!selectedRegion) return;
    setSelectedRegion({ ...selectedRegion, [field]: value });
    setIsDirty(true);
  };

  const handleCreateRegion = () => {
    const newRegion: RegionData = { ...defaultRegion, slug: `neue-region-${Date.now()}`, title: 'Neue Region' };
    setSelectedRegion(newRegion);
    setIsDirty(true);
  };

  const handleDeleteRegion = async () => {
    if (!selectedRegion || !confirm(`"${selectedRegion.title}" löschen?`)) return;
    try {
      await supabase.from('content').delete().eq('section_key', 'region').eq('content_key', selectedRegion.slug);
      toast({ title: 'Gelöscht' });
      setSelectedRegion(null);
      await fetchAllData();
    } catch (err) {
      toast({ title: 'Fehler', variant: 'destructive' });
    }
  };

  // ========== LOADING STATE ==========

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  // ========== RENDER HOMEPAGE EDITOR ==========

  const renderHomepageEditor = () => (
    <Tabs defaultValue="hero" className="space-y-4">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="hero"><Layers className="h-4 w-4 mr-1" />Hero</TabsTrigger>
        <TabsTrigger value="services">Leistungen</TabsTrigger>
        <TabsTrigger value="about"><Users className="h-4 w-4 mr-1" />Über uns</TabsTrigger>
        <TabsTrigger value="gallery"><Image className="h-4 w-4 mr-1" />Galerie</TabsTrigger>
        <TabsTrigger value="testimonials"><Star className="h-4 w-4 mr-1" />Bewertungen</TabsTrigger>
        <TabsTrigger value="contact"><Phone className="h-4 w-4 mr-1" />Kontakt</TabsTrigger>
      </TabsList>

      <TabsContent value="hero" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Hero Slides</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {homepageData.hero.slides.map((slide, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Slide {index + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => {
                    const newSlides = homepageData.hero.slides.filter((_, i) => i !== index);
                    updateHomepageSection('hero', { slides: newSlides });
                  }}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  <Label>Überschrift</Label>
                  <Input value={slide.heading} onChange={(e) => {
                    const newSlides = [...homepageData.hero.slides];
                    newSlides[index] = { ...slide, heading: e.target.value };
                    updateHomepageSection('hero', { slides: newSlides });
                  }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input value={slide.ctaText} onChange={(e) => {
                      const newSlides = [...homepageData.hero.slides];
                      newSlides[index] = { ...slide, ctaText: e.target.value };
                      updateHomepageSection('hero', { slides: newSlides });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input value={slide.ctaLink} onChange={(e) => {
                      const newSlides = [...homepageData.hero.slides];
                      newSlides[index] = { ...slide, ctaLink: e.target.value };
                      updateHomepageSection('hero', { slides: newSlides });
                    }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Hintergrundbild</Label>
                  <ImagePicker value={slide.backgroundImage} onChange={(url) => {
                    const newSlides = [...homepageData.hero.slides];
                    newSlides[index] = { ...slide, backgroundImage: url };
                    updateHomepageSection('hero', { slides: newSlides });
                  }} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => {
              updateHomepageSection('hero', { slides: [...homepageData.hero.slides, { heading: '', ctaText: 'Mehr erfahren', ctaLink: '/', backgroundImage: '' }] });
            }}><Plus className="h-4 w-4 mr-2" />Slide hinzufügen</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="services" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Leistungen</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Überschrift</Label>
                <Input value={homepageData.services.heading} onChange={(e) => updateHomepageSection('services', { ...homepageData.services, heading: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Untertitel</Label>
                <Input value={homepageData.services.subheading} onChange={(e) => updateHomepageSection('services', { ...homepageData.services, subheading: e.target.value })} />
              </div>
            </div>
            {homepageData.services.items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Leistung {index + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => {
                    const newItems = homepageData.services.items.filter((_, i) => i !== index);
                    updateHomepageSection('services', { ...homepageData.services, items: newItems });
                  }}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titel</Label>
                    <Input value={item.title} onChange={(e) => {
                      const newItems = [...homepageData.services.items];
                      newItems[index] = { ...item, title: e.target.value };
                      updateHomepageSection('services', { ...homepageData.services, items: newItems });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Link</Label>
                    <Input value={item.link} onChange={(e) => {
                      const newItems = [...homepageData.services.items];
                      newItems[index] = { ...item, link: e.target.value };
                      updateHomepageSection('services', { ...homepageData.services, items: newItems });
                    }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Beschreibung</Label>
                  <Textarea value={item.description} onChange={(e) => {
                    const newItems = [...homepageData.services.items];
                    newItems[index] = { ...item, description: e.target.value };
                    updateHomepageSection('services', { ...homepageData.services, items: newItems });
                  }} />
                </div>
                <div className="space-y-2">
                  <Label>Bild</Label>
                  <ImagePicker value={item.image} onChange={(url) => {
                    const newItems = [...homepageData.services.items];
                    newItems[index] = { ...item, image: url };
                    updateHomepageSection('services', { ...homepageData.services, items: newItems });
                  }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Über uns</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Überschrift</Label>
              <Input value={homepageData.about.heading} onChange={(e) => updateHomepageSection('about', { ...homepageData.about, heading: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Absatz 1</Label>
              <Textarea value={homepageData.about.paragraph1} onChange={(e) => updateHomepageSection('about', { ...homepageData.about, paragraph1: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Absatz 2</Label>
              <Textarea value={homepageData.about.paragraph2} onChange={(e) => updateHomepageSection('about', { ...homepageData.about, paragraph2: e.target.value })} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Bild</Label>
              <ImagePicker value={homepageData.about.image || ''} onChange={(url) => updateHomepageSection('about', { ...homepageData.about, image: url })} />
            </div>
            <div className="space-y-4">
              <Label className="text-base font-semibold">Merkmale</Label>
              {homepageData.about.features?.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Merkmal {index + 1}</span>
                    <Button variant="ghost" size="icon" onClick={() => {
                      const newFeatures = homepageData.about.features.filter((_, i) => i !== index);
                      updateHomepageSection('about', { ...homepageData.about, features: newFeatures });
                    }}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <IconPicker value={feature.icon} onChange={(icon) => {
                      const newFeatures = [...homepageData.about.features];
                      newFeatures[index] = { ...feature, icon };
                      updateHomepageSection('about', { ...homepageData.about, features: newFeatures });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Titel</Label>
                    <Input value={feature.title} onChange={(e) => {
                      const newFeatures = [...homepageData.about.features];
                      newFeatures[index] = { ...feature, title: e.target.value };
                      updateHomepageSection('about', { ...homepageData.about, features: newFeatures });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Beschreibung</Label>
                    <Textarea value={feature.description} onChange={(e) => {
                      const newFeatures = [...homepageData.about.features];
                      newFeatures[index] = { ...feature, description: e.target.value };
                      updateHomepageSection('about', { ...homepageData.about, features: newFeatures });
                    }} rows={2} />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => {
                updateHomepageSection('about', { ...homepageData.about, features: [...(homepageData.about.features || []), { icon: 'CheckCircle', title: '', description: '' }] });
              }}><Plus className="h-4 w-4 mr-2" />Merkmal hinzufügen</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="gallery" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Galerie</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Überschrift</Label>
                <Input value={homepageData.gallery.heading} onChange={(e) => updateHomepageSection('gallery', { ...homepageData.gallery, heading: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Untertitel</Label>
                <Input value={homepageData.gallery.subheading} onChange={(e) => updateHomepageSection('gallery', { ...homepageData.gallery, subheading: e.target.value })} />
              </div>
            </div>
            {homepageData.gallery.items.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Bild {index + 1}</span>
                  <Button variant="ghost" size="icon" onClick={() => {
                    const newItems = homepageData.gallery.items.filter((_, i) => i !== index);
                    updateHomepageSection('gallery', { ...homepageData.gallery, items: newItems });
                  }}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titel</Label>
                    <Input value={item.title} onChange={(e) => {
                      const newItems = [...homepageData.gallery.items];
                      newItems[index] = { ...item, title: e.target.value };
                      updateHomepageSection('gallery', { ...homepageData.gallery, items: newItems });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Kategorie</Label>
                    <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" value={item.category} onChange={(e) => {
                      const newItems = [...homepageData.gallery.items];
                      newItems[index] = { ...item, category: e.target.value };
                      updateHomepageSection('gallery', { ...homepageData.gallery, items: newItems });
                    }}>
                      <option value="Badezimmer">Badezimmer</option>
                      <option value="Küche">Küche</option>
                      <option value="Innenausbau">Innenausbau</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Bild</Label>
                  <ImagePicker value={item.image} onChange={(url) => {
                    const newItems = [...homepageData.gallery.items];
                    newItems[index] = { ...item, image: url };
                    updateHomepageSection('gallery', { ...homepageData.gallery, items: newItems });
                  }} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={() => {
              updateHomepageSection('gallery', { ...homepageData.gallery, items: [...homepageData.gallery.items, { title: '', image: '', category: 'Badezimmer' }] });
            }}><Plus className="h-4 w-4 mr-2" />Bild hinzufügen</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="testimonials" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Bewertungen</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Überschrift</Label>
              <Input value={homepageData.testimonials.heading} onChange={(e) => updateHomepageSection('testimonials', { ...homepageData.testimonials, heading: e.target.value })} />
            </div>
            <TestimonialsEditor 
              testimonials={homepageData.testimonials.items} 
              onChange={(items) => updateHomepageSection('testimonials', { ...homepageData.testimonials, items })} 
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="contact" className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Kontakt</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Überschrift</Label>
                <Input value={homepageData.contact.heading} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, heading: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Untertitel</Label>
                <Input value={homepageData.contact.subheading} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, subheading: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefon</Label>
                <Input value={homepageData.contact.phone} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>E-Mail</Label>
                <Input value={homepageData.contact.email} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, email: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Firma</Label>
              <Input value={homepageData.contact.company} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, company: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Strasse</Label>
                <Input value={homepageData.contact.street} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, street: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Stadt</Label>
                <Input value={homepageData.contact.city} onChange={(e) => updateHomepageSection('contact', { ...homepageData.contact, city: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  // ========== RENDER SERVICE PAGE EDITOR ==========

  const renderServicePageEditor = (pageKey: string) => {
    const page = pagesData[pageKey];
    const config = pageConfig[pageKey as keyof typeof pageConfig];
    
    return (
      <div className="space-y-6">
        <SeoEditor
          metaTitle={page.metaTitle}
          metaDescription={page.metaDescription}
          path={config.path}
          onChange={(field, value) => updatePageField(pageKey, field, value)}
        />
        <HeroEditor
          heading={page.heroHeading}
          subheading={page.heroSubheading}
          image={page.heroImage}
          showImage={true}
          onChange={(field, value) => updatePageField(pageKey, field, value)}
        />
        <FeaturesEditor
          introText={page.introText}
          features={page.features}
          showIntro={true}
          onChange={(field, value) => updatePageField(pageKey, field, value)}
        />
      </div>
    );
  };

  // ========== RENDER REGION EDITOR ==========

  const renderRegionEditor = () => {
    if (!selectedRegion) {
      return (
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">Keine Region ausgewählt</p>
            <p className="text-muted-foreground mb-4">Wählen Sie eine Region oder erstellen Sie eine neue.</p>
            <Button onClick={handleCreateRegion}>
              <Plus className="w-4 h-4 mr-2" />Neue Region
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Allgemein</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="services">Leistungen</TabsTrigger>
          <TabsTrigger value="testimonials"><Star className="w-4 h-4 mr-1" />Bewertungen</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Grundeinstellungen</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL-Slug</Label>
                  <Input value={selectedRegion.slug} onChange={(e) => updateRegionField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="z.B. zurich" />
                  <p className="text-xs text-muted-foreground">/region/{selectedRegion.slug}</p>
                </div>
                <div className="space-y-2">
                  <Label>Seitentitel</Label>
                  <Input value={selectedRegion.title} onChange={(e) => updateRegionField('title', e.target.value)} placeholder="z.B. Bäderberg in Zürich" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Kurzbeschreibung</Label>
                <Textarea value={selectedRegion.description} onChange={(e) => updateRegionField('description', e.target.value)} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Hero Bild</Label>
                <ImagePicker value={selectedRegion.heroImage} onChange={(url) => updateRegionField('heroImage', url)} />
              </div>
              <div className="space-y-2">
                <Label>Warum wir? (Vorteile)</Label>
                {selectedRegion.whyUs.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input value={item} onChange={(e) => {
                      const newWhyUs = [...selectedRegion.whyUs];
                      newWhyUs[index] = e.target.value;
                      updateRegionField('whyUs', newWhyUs);
                    }} />
                    <Button variant="ghost" size="icon" onClick={() => {
                      updateRegionField('whyUs', selectedRegion.whyUs.filter((_, i) => i !== index));
                    }}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateRegionField('whyUs', [...selectedRegion.whyUs, ''])}>
                  <Plus className="w-4 h-4 mr-2" />Vorteil hinzufügen
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <SeoEditor
            metaTitle={selectedRegion.metaTitle || `${selectedRegion.title} - Bäderberg`}
            metaDescription={selectedRegion.metaDescription || selectedRegion.description}
            path={`/region/${selectedRegion.slug}`}
            onChange={(field, value) => updateRegionField(field, value)}
          />
        </TabsContent>

        <TabsContent value="services">
          <ServicesEditor
            services={selectedRegion.services}
            onChange={(field, value) => updateRegionField('services', { ...selectedRegion.services, [field]: value })}
          />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialsEditor
            testimonials={selectedRegion.testimonials}
            onChange={(testimonials) => updateRegionField('testimonials', testimonials)}
          />
        </TabsContent>

        <TabsContent value="faq">
          <FaqEditor
            faqs={selectedRegion.faq}
            onChange={(faqs) => updateRegionField('faq', faqs)}
          />
        </TabsContent>
      </Tabs>
    );
  };

  // ========== MAIN RENDER ==========

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Seiten</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {/* Main pages */}
                <div className="space-y-1 mb-4">
                  <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase">Hauptseiten</p>
                  {Object.entries(pageConfig).map(([key, config]) => {
                    const Icon = config.icon;
                    const isActive = selectedPage === key;
                    return (
                      <button
                        key={key}
                        onClick={() => { setSelectedPage(key as PageType); setSelectedRegion(null); }}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {config.name}
                      </button>
                    );
                  })}
                </div>

                {/* Regions */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-1.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Regionen</p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={syncRegions} disabled={isSyncing}>
                        <RefreshCw className={cn("w-3 h-3", isSyncing && "animate-spin")} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCreateRegion}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {regions.map(region => (
                    <button
                      key={region.slug}
                      onClick={() => { setSelectedPage('regions'); setSelectedRegion(region); }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedPage === 'regions' && selectedRegion?.slug === region.slug
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{region.title.replace('Bäderberg in ', '')}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <FileEdit className="w-6 h-6" />
                  Inhalte bearbeiten
                </h1>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                  {selectedPage === 'regions' && selectedRegion ? (
                    <>Regionen <ChevronRight className="w-3 h-3" /> {selectedRegion.title}</>
                  ) : (
                    pageConfig[selectedPage as keyof typeof pageConfig]?.name || 'Startseite'
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isDirty && <Badge variant="outline" className="text-amber-600 border-amber-600">Ungespeichert</Badge>}
                {selectedPage === 'regions' && selectedRegion && (
                  <Button variant="destructive" size="icon" onClick={handleDeleteRegion}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button onClick={handleSave} disabled={isSaving || !isDirty}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Speichern
                </Button>
              </div>
            </div>

            {/* Content */}
            {selectedPage === 'home' && renderHomepageEditor()}
            {selectedPage === 'regions' && renderRegionEditor()}
            {['badumbau', 'kuechenumbau', 'innenausbau'].includes(selectedPage) && renderServicePageEditor(selectedPage)}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
