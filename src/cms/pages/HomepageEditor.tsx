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
import { Save, Loader2, Plus, Trash2, GripVertical, Home, Layers, Users, Image, Star, Phone } from 'lucide-react';
import ImagePicker from '../components/ImagePicker';
import IconPicker from '../components/IconPicker';
import { defaultContent } from '../schema';
import type { Json } from '@/integrations/supabase/types';

// Types
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

interface TestimonialItem {
  author: string;
  quote: string;
  rating: number;
  project: string;
}

interface HomepageData {
  hero: { slides: HeroSlide[] };
  services: { heading: string; subheading: string; items: ServiceItem[] };
  about: { heading: string; paragraph1: string; paragraph2: string; image: string; features: AboutFeature[] };
  gallery: { heading: string; subheading: string; items: GalleryItem[] };
  testimonials: { heading: string; items: TestimonialItem[] };
  contact: { heading: string; subheading: string; phone: string; email: string; company: string; street: string; city: string };
}

const defaultHomepageData: HomepageData = {
  hero: defaultContent.hero,
  services: defaultContent.services,
  about: defaultContent.about,
  gallery: defaultContent.gallery,
  testimonials: defaultContent.testimonials,
  contact: defaultContent.contact
};

export default function HomepageEditor() {
  const { toast } = useToast();
  const [data, setData] = useState<HomepageData>(defaultHomepageData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const sections = ['hero', 'services', 'about', 'gallery', 'testimonials', 'contact'];
      const { data: rows, error } = await supabase
        .from('content')
        .select('section_key, content_key, content')
        .in('section_key', sections);

      if (error) {
        console.error('Error fetching homepage data:', error);
        return;
      }

      if (rows && rows.length > 0) {
        const newData = { ...defaultHomepageData };
        rows.forEach((row) => {
          const section = row.section_key as keyof HomepageData;
          if (section in newData && row.content_key === 'default') {
            (newData as any)[section] = { ...defaultHomepageData[section], ...(row.content as object) };
          }
        });
        setData(newData);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Nicht angemeldet', variant: 'destructive' });
        return;
      }

      const sections: (keyof HomepageData)[] = ['hero', 'services', 'about', 'gallery', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const { error } = await supabase
          .from('content')
          .upsert({
            section_key: section,
            content_key: 'default',
            content: data[section] as unknown as Json,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
            is_draft: false,
            published_at: new Date().toISOString()
          }, { onConflict: 'section_key,content_key' });

        if (error) {
          console.error(`Error saving ${section}:`, error);
          toast({ title: 'Fehler', description: `${section}: ${error.message}`, variant: 'destructive' });
          return;
        }
      }

      toast({ title: 'Gespeichert', description: 'Alle Startseiten-Inhalte wurden gespeichert.' });
      setIsDirty(false);
    } catch (err) {
      console.error('Save error:', err);
      toast({ title: 'Fehler', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = <K extends keyof HomepageData>(section: K, value: HomepageData[K]) => {
    setData(prev => ({ ...prev, [section]: value }));
    setIsDirty(true);
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
          <div className="flex items-center gap-3">
            <Home className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Startseite bearbeiten</h1>
              <p className="text-muted-foreground">Alle Inhalte der Startseite verwalten</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isDirty && <span className="text-sm text-amber-600">Ungespeicherte Änderungen</span>}
            <Button onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Speichern
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero" className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="services">Leistungen</TabsTrigger>
            <TabsTrigger value="about">
              <Users className="h-4 w-4 mr-1" />
              Über uns
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Image className="h-4 w-4 mr-1" />
              Galerie
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Star className="h-4 w-4 mr-1" />
              Bewertungen
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Phone className="h-4 w-4 mr-1" />
              Kontakt
            </TabsTrigger>
          </TabsList>

          {/* Hero Tab */}
          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Slides</CardTitle>
                <CardDescription>Die Slides im Hero-Bereich der Startseite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.hero.slides.map((slide, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Slide {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newSlides = data.hero.slides.filter((_, i) => i !== index);
                          updateSection('hero', { slides: newSlides });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Überschrift</Label>
                      <Input
                        value={slide.heading}
                        onChange={(e) => {
                          const newSlides = [...data.hero.slides];
                          newSlides[index] = { ...slide, heading: e.target.value };
                          updateSection('hero', { slides: newSlides });
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={slide.ctaText}
                          onChange={(e) => {
                            const newSlides = [...data.hero.slides];
                            newSlides[index] = { ...slide, ctaText: e.target.value };
                            updateSection('hero', { slides: newSlides });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Link</Label>
                        <Input
                          value={slide.ctaLink}
                          onChange={(e) => {
                            const newSlides = [...data.hero.slides];
                            newSlides[index] = { ...slide, ctaLink: e.target.value };
                            updateSection('hero', { slides: newSlides });
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Hintergrundbild</Label>
                      <ImagePicker
                        value={slide.backgroundImage}
                        onChange={(url) => {
                          const newSlides = [...data.hero.slides];
                          newSlides[index] = { ...slide, backgroundImage: url };
                          updateSection('hero', { slides: newSlides });
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newSlide: HeroSlide = { heading: '', ctaText: 'Mehr erfahren', ctaLink: '/', backgroundImage: '' };
                    updateSection('hero', { slides: [...data.hero.slides, newSlide] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Slide hinzufügen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Leistungen</CardTitle>
                <CardDescription>Die Leistungs-Karten auf der Startseite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Überschrift</Label>
                    <Input
                      value={data.services.heading}
                      onChange={(e) => updateSection('services', { ...data.services, heading: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Untertitel</Label>
                    <Input
                      value={data.services.subheading}
                      onChange={(e) => updateSection('services', { ...data.services, subheading: e.target.value })}
                    />
                  </div>
                </div>

                {data.services.items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Leistung {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newItems = data.services.items.filter((_, i) => i !== index);
                          updateSection('services', { ...data.services, items: newItems });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Titel</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...data.services.items];
                            newItems[index] = { ...item, title: e.target.value };
                            updateSection('services', { ...data.services, items: newItems });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Link</Label>
                        <Input
                          value={item.link}
                          onChange={(e) => {
                            const newItems = [...data.services.items];
                            newItems[index] = { ...item, link: e.target.value };
                            updateSection('services', { ...data.services, items: newItems });
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Beschreibung</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const newItems = [...data.services.items];
                          newItems[index] = { ...item, description: e.target.value };
                          updateSection('services', { ...data.services, items: newItems });
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bild</Label>
                      <ImagePicker
                        value={item.image}
                        onChange={(url) => {
                          const newItems = [...data.services.items];
                          newItems[index] = { ...item, image: url };
                          updateSection('services', { ...data.services, items: newItems });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Über uns</CardTitle>
                <CardDescription>Der Über-uns-Bereich auf der Startseite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Überschrift</Label>
                  <Input
                    value={data.about.heading}
                    onChange={(e) => updateSection('about', { ...data.about, heading: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Absatz 1</Label>
                  <Textarea
                    value={data.about.paragraph1}
                    onChange={(e) => updateSection('about', { ...data.about, paragraph1: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Absatz 2</Label>
                  <Textarea
                    value={data.about.paragraph2}
                    onChange={(e) => updateSection('about', { ...data.about, paragraph2: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bild</Label>
                  <ImagePicker
                    value={data.about.image || ''}
                    onChange={(url) => updateSection('about', { ...data.about, image: url })}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Merkmale</Label>
                  {data.about.features?.map((feature, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Merkmal {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newFeatures = data.about.features.filter((_, i) => i !== index);
                            updateSection('about', { ...data.about, features: newFeatures });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Icon</Label>
                          <IconPicker
                            value={feature.icon}
                            onChange={(icon) => {
                              const newFeatures = [...data.about.features];
                              newFeatures[index] = { ...feature, icon };
                              updateSection('about', { ...data.about, features: newFeatures });
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Titel</Label>
                          <Input
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [...data.about.features];
                              newFeatures[index] = { ...feature, title: e.target.value };
                              updateSection('about', { ...data.about, features: newFeatures });
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Beschreibung</Label>
                        <Textarea
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...data.about.features];
                            newFeatures[index] = { ...feature, description: e.target.value };
                            updateSection('about', { ...data.about, features: newFeatures });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newFeature: AboutFeature = { icon: 'Star', title: '', description: '' };
                      updateSection('about', { ...data.about, features: [...(data.about.features || []), newFeature] });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Merkmal hinzufügen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Galerie</CardTitle>
                <CardDescription>Die Projekt-Galerie auf der Startseite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Überschrift</Label>
                    <Input
                      value={data.gallery.heading}
                      onChange={(e) => updateSection('gallery', { ...data.gallery, heading: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Untertitel</Label>
                    <Textarea
                      value={data.gallery.subheading}
                      onChange={(e) => updateSection('gallery', { ...data.gallery, subheading: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {data.gallery.items?.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Projekt {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newItems = data.gallery.items.filter((_, i) => i !== index);
                            updateSection('gallery', { ...data.gallery, items: newItems });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Titel"
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...data.gallery.items];
                          newItems[index] = { ...item, title: e.target.value };
                          updateSection('gallery', { ...data.gallery, items: newItems });
                        }}
                      />
                      <select
                        className="w-full border rounded-md p-2 text-sm"
                        value={item.category}
                        onChange={(e) => {
                          const newItems = [...data.gallery.items];
                          newItems[index] = { ...item, category: e.target.value };
                          updateSection('gallery', { ...data.gallery, items: newItems });
                        }}
                      >
                        <option value="Badumbau">Badumbau</option>
                        <option value="Küchenumbau">Küchenumbau</option>
                        <option value="Innenausbau">Innenausbau</option>
                      </select>
                      <ImagePicker
                        value={item.image}
                        onChange={(url) => {
                          const newItems = [...data.gallery.items];
                          newItems[index] = { ...item, image: url };
                          updateSection('gallery', { ...data.gallery, items: newItems });
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    const newItem: GalleryItem = { title: '', image: '', category: 'Badumbau' };
                    updateSection('gallery', { ...data.gallery, items: [...(data.gallery.items || []), newItem] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Projekt hinzufügen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kundenbewertungen</CardTitle>
                <CardDescription>Bewertungen von zufriedenen Kunden</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Überschrift</Label>
                  <Input
                    value={data.testimonials.heading}
                    onChange={(e) => updateSection('testimonials', { ...data.testimonials, heading: e.target.value })}
                  />
                </div>

                {data.testimonials.items?.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Bewertung {index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newItems = data.testimonials.items.filter((_, i) => i !== index);
                          updateSection('testimonials', { ...data.testimonials, items: newItems });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={item.author}
                          onChange={(e) => {
                            const newItems = [...data.testimonials.items];
                            newItems[index] = { ...item, author: e.target.value };
                            updateSection('testimonials', { ...data.testimonials, items: newItems });
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Projekttyp</Label>
                        <select
                          className="w-full border rounded-md p-2"
                          value={item.project}
                          onChange={(e) => {
                            const newItems = [...data.testimonials.items];
                            newItems[index] = { ...item, project: e.target.value };
                            updateSection('testimonials', { ...data.testimonials, items: newItems });
                          }}
                        >
                          <option value="Badumbau">Badumbau</option>
                          <option value="Küchenumbau">Küchenumbau</option>
                          <option value="Innenausbau">Innenausbau</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Sterne</Label>
                        <select
                          className="w-full border rounded-md p-2"
                          value={item.rating}
                          onChange={(e) => {
                            const newItems = [...data.testimonials.items];
                            newItems[index] = { ...item, rating: parseInt(e.target.value) };
                            updateSection('testimonials', { ...data.testimonials, items: newItems });
                          }}
                        >
                          <option value={5}>5 Sterne</option>
                          <option value={4}>4 Sterne</option>
                          <option value={3}>3 Sterne</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bewertungstext</Label>
                      <Textarea
                        value={item.quote}
                        onChange={(e) => {
                          const newItems = [...data.testimonials.items];
                          newItems[index] = { ...item, quote: e.target.value };
                          updateSection('testimonials', { ...data.testimonials, items: newItems });
                        }}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const newItem: TestimonialItem = { author: '', quote: '', rating: 5, project: 'Badumbau' };
                    updateSection('testimonials', { ...data.testimonials, items: [...(data.testimonials.items || []), newItem] });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Bewertung hinzufügen
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kontaktdaten</CardTitle>
                <CardDescription>Kontaktinformationen auf der Startseite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Überschrift</Label>
                    <Input
                      value={data.contact.heading}
                      onChange={(e) => updateSection('contact', { ...data.contact, heading: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Untertitel</Label>
                    <Input
                      value={data.contact.subheading}
                      onChange={(e) => updateSection('contact', { ...data.contact, subheading: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefon</Label>
                    <Input
                      value={data.contact.phone}
                      onChange={(e) => updateSection('contact', { ...data.contact, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-Mail</Label>
                    <Input
                      value={data.contact.email}
                      onChange={(e) => updateSection('contact', { ...data.contact, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Firmenname</Label>
                  <Input
                    value={data.contact.company}
                    onChange={(e) => updateSection('contact', { ...data.contact, company: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Strasse</Label>
                    <Input
                      value={data.contact.street}
                      onChange={(e) => updateSection('contact', { ...data.contact, street: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PLZ & Ort</Label>
                    <Input
                      value={data.contact.city}
                      onChange={(e) => updateSection('contact', { ...data.contact, city: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
