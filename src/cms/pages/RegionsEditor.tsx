import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Save, Plus, Trash2, Loader2, MapPin, 
  MessageSquare, Star, HelpCircle, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '../components/AdminLayout';
import ImagePicker from '../components/ImagePicker';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  quote: string;
  author: string;
  project: string;
  rating: number;
}

interface RegionData {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  services: {
    badumbau: string;
    kuechenumbau: string;
    innenausbau: string;
  };
  whyUs: string[];
  testimonials: Testimonial[];
  faq: FAQ[];
}

const defaultRegion: RegionData = {
  slug: '',
  title: '',
  description: '',
  heroImage: '',
  services: {
    badumbau: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt.',
    kuechenumbau: 'Neue Küche? Wir planen, bauen ein und kümmern uns um Elektro und Anschlüsse. Alles aus einer Hand.',
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
    { question: 'Wie lange dauert ein Umbau?', answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.' },
    { question: 'Brauche ich eine Baugenehmigung?', answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.' }
  ]
};

export const RegionsEditor: React.FC = () => {
  const { regionSlug } = useParams<{ regionSlug?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Fetch regions from content table
  const fetchRegions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section_key', 'region')
        .order('content_key');

      if (error) throw error;

      const loadedRegions = data?.map(item => ({
        slug: item.content_key,
        ...(item.content as object)
      })) as RegionData[] || [];

      setRegions(loadedRegions);

      // If we have a regionSlug param, select that region
      if (regionSlug) {
        const region = loadedRegions.find(r => r.slug === regionSlug);
        if (region) {
          setSelectedRegion(region);
        }
      }
    } catch (err) {
      console.error('Error fetching regions:', err);
      toast({
        title: 'Fehler',
        description: 'Regionen konnten nicht geladen werden.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [regionSlug, toast]);

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const handleSave = async () => {
    if (!selectedRegion) return;

    setIsSaving(true);
    try {
      const { slug, ...content } = selectedRegion;
      
      // Check if region exists
      const { data: existing } = await supabase
        .from('content')
        .select('id')
        .eq('section_key', 'region')
        .eq('content_key', slug)
        .maybeSingle();

      const contentJson = content as unknown as Json;
      
      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('content')
          .update({
            content: contentJson,
            is_draft: false,
            published_at: new Date().toISOString()
          })
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('content')
          .insert([{
            section_key: 'region',
            content_key: slug,
            content: contentJson,
            is_draft: false,
            published_at: new Date().toISOString()
          }]);
        if (error) throw error;
      }

      setIsDirty(false);
      toast({
        title: 'Gespeichert',
        description: `Region "${selectedRegion.title}" wurde gespeichert.`
      });
      
      // Refresh regions list
      await fetchRegions();
    } catch (err) {
      console.error('Save error:', err);
      toast({
        title: 'Fehler',
        description: 'Region konnte nicht gespeichert werden.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateRegion = () => {
    const newRegion: RegionData = {
      ...defaultRegion,
      slug: `neue-region-${Date.now()}`,
      title: 'Neue Region'
    };
    setSelectedRegion(newRegion);
    setIsDirty(true);
  };

  const handleDeleteRegion = async () => {
    if (!selectedRegion) return;
    
    if (!confirm(`Sind Sie sicher, dass Sie "${selectedRegion.title}" löschen möchten?`)) return;

    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('section_key', 'region')
        .eq('content_key', selectedRegion.slug);

      if (error) throw error;

      toast({
        title: 'Gelöscht',
        description: `Region "${selectedRegion.title}" wurde gelöscht.`
      });
      
      setSelectedRegion(null);
      await fetchRegions();
    } catch (err) {
      console.error('Delete error:', err);
      toast({
        title: 'Fehler',
        description: 'Region konnte nicht gelöscht werden.',
        variant: 'destructive'
      });
    }
  };

  const updateField = <K extends keyof RegionData>(field: K, value: RegionData[K]) => {
    if (!selectedRegion) return;
    setSelectedRegion({ ...selectedRegion, [field]: value });
    setIsDirty(true);
  };

  const updateServiceField = (service: keyof RegionData['services'], value: string) => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      services: { ...selectedRegion.services, [service]: value }
    });
    setIsDirty(true);
  };

  const addFaq = () => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      faq: [...selectedRegion.faq, { question: '', answer: '' }]
    });
    setIsDirty(true);
    setExpandedFaq(selectedRegion.faq.length);
  };

  const updateFaq = (index: number, field: keyof FAQ, value: string) => {
    if (!selectedRegion) return;
    const newFaq = [...selectedRegion.faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setSelectedRegion({ ...selectedRegion, faq: newFaq });
    setIsDirty(true);
  };

  const removeFaq = (index: number) => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      faq: selectedRegion.faq.filter((_, i) => i !== index)
    });
    setIsDirty(true);
  };

  const addTestimonial = () => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      testimonials: [...selectedRegion.testimonials, { quote: '', author: '', project: 'Badumbau', rating: 5 }]
    });
    setIsDirty(true);
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    if (!selectedRegion) return;
    const newTestimonials = [...selectedRegion.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setSelectedRegion({ ...selectedRegion, testimonials: newTestimonials });
    setIsDirty(true);
  };

  const removeTestimonial = (index: number) => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      testimonials: selectedRegion.testimonials.filter((_, i) => i !== index)
    });
    setIsDirty(true);
  };

  const updateWhyUs = (index: number, value: string) => {
    if (!selectedRegion) return;
    const newWhyUs = [...selectedRegion.whyUs];
    newWhyUs[index] = value;
    setSelectedRegion({ ...selectedRegion, whyUs: newWhyUs });
    setIsDirty(true);
  };

  const addWhyUs = () => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      whyUs: [...selectedRegion.whyUs, '']
    });
    setIsDirty(true);
  };

  const removeWhyUs = (index: number) => {
    if (!selectedRegion) return;
    setSelectedRegion({
      ...selectedRegion,
      whyUs: selectedRegion.whyUs.filter((_, i) => i !== index)
    });
    setIsDirty(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/content')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Regionen verwalten
              </h1>
              {isDirty && (
                <Badge variant="outline" className="text-amber-600 border-amber-600 mt-1">
                  Ungespeicherte Änderungen
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleCreateRegion}>
              <Plus className="w-4 h-4 mr-2" />
              Neue Region
            </Button>
            {selectedRegion && (
              <>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={handleDeleteRegion}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button onClick={handleSave} disabled={isSaving || !isDirty}>
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Speichern
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Regions List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Regionen</CardTitle>
              <CardDescription>{regions.length} Regionen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {regions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Keine Regionen vorhanden</p>
              ) : (
                regions.map(region => (
                  <button
                    key={region.slug}
                    onClick={() => {
                      setSelectedRegion(region);
                      setIsDirty(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedRegion?.slug === region.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <p className="font-medium truncate">{region.title}</p>
                    <p className="text-xs opacity-70">/{region.slug}</p>
                  </button>
                ))
              )}
            </CardContent>
          </Card>

          {/* Editor */}
          <div className="lg:col-span-3">
            {!selectedRegion ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Keine Region ausgewählt</p>
                  <p className="text-muted-foreground mb-4">Wählen Sie eine Region aus der Liste oder erstellen Sie eine neue.</p>
                  <Button onClick={handleCreateRegion}>
                    <Plus className="w-4 h-4 mr-2" />
                    Neue Region erstellen
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general">Allgemein</TabsTrigger>
                  <TabsTrigger value="services">Leistungen</TabsTrigger>
                  <TabsTrigger value="testimonials">
                    <Star className="w-4 h-4 mr-1" />
                    Bewertungen
                  </TabsTrigger>
                  <TabsTrigger value="faq">
                    <HelpCircle className="w-4 h-4 mr-1" />
                    FAQ
                  </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grundeinstellungen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>URL-Slug</Label>
                          <Input
                            value={selectedRegion.slug}
                            onChange={(e) => updateField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            placeholder="z.B. zurich"
                          />
                          <p className="text-xs text-muted-foreground">/region/{selectedRegion.slug}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Seitentitel</Label>
                          <Input
                            value={selectedRegion.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="z.B. Bäderberg in Zürich"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Kurzbeschreibung</Label>
                        <Textarea
                          value={selectedRegion.description}
                          onChange={(e) => updateField('description', e.target.value)}
                          placeholder="Kurze Beschreibung für SEO und Vorschau..."
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hero Bild</Label>
                        <ImagePicker
                          value={selectedRegion.heroImage}
                          onChange={(url) => updateField('heroImage', url)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Warum wir? (Vorteile)</Label>
                        {selectedRegion.whyUs.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateWhyUs(index, e.target.value)}
                              placeholder="Vorteil..."
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeWhyUs(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addWhyUs}>
                          <Plus className="w-4 h-4 mr-2" />
                          Vorteil hinzufügen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Services Tab */}
                <TabsContent value="services" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Leistungsbeschreibungen</CardTitle>
                      <CardDescription>Regionale Texte für jede Leistung</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Badumbau</Label>
                        <Textarea
                          value={selectedRegion.services.badumbau}
                          onChange={(e) => updateServiceField('badumbau', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Küchenumbau</Label>
                        <Textarea
                          value={selectedRegion.services.kuechenumbau}
                          onChange={(e) => updateServiceField('kuechenumbau', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Innenausbau</Label>
                        <Textarea
                          value={selectedRegion.services.innenausbau}
                          onChange={(e) => updateServiceField('innenausbau', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Testimonials Tab */}
                <TabsContent value="testimonials" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Kundenbewertungen</CardTitle>
                      <CardDescription>Regionale Bewertungen für diese Region</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedRegion.testimonials.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Keine Bewertungen vorhanden</p>
                      ) : (
                        selectedRegion.testimonials.map((testimonial, index) => (
                          <Card key={index} className="bg-muted/30">
                            <CardContent className="pt-4 space-y-3">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      onClick={() => updateTestimonial(index, 'rating', star)}
                                      className={`text-lg ${star <= testimonial.rating ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
                                    >
                                      ★
                                    </button>
                                  ))}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeTestimonial(index)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <Textarea
                                value={testimonial.quote}
                                onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                                placeholder="Bewertungstext..."
                                rows={2}
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  value={testimonial.author}
                                  onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                                  placeholder="Name des Kunden"
                                />
                                <select
                                  value={testimonial.project}
                                  onChange={(e) => updateTestimonial(index, 'project', e.target.value)}
                                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                >
                                  <option value="Badumbau">Badumbau</option>
                                  <option value="Küchenumbau">Küchenumbau</option>
                                  <option value="Innenausbau">Innenausbau</option>
                                </select>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                      <Button variant="outline" onClick={addTestimonial}>
                        <Plus className="w-4 h-4 mr-2" />
                        Bewertung hinzufügen
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* FAQ Tab */}
                <TabsContent value="faq" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Häufige Fragen (FAQ)</CardTitle>
                      <CardDescription>Regionale FAQ für diese Region</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedRegion.faq.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Keine FAQ vorhanden</p>
                      ) : (
                        selectedRegion.faq.map((faq, index) => (
                          <Card key={index} className="bg-muted/30">
                            <CardContent className="pt-4">
                              <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              >
                                <p className="font-medium">{faq.question || `Frage ${index + 1}`}</p>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFaq(index);
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                  {expandedFaq === index ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </div>
                              </div>
                              {expandedFaq === index && (
                                <div className="mt-4 space-y-3">
                                  <div className="space-y-2">
                                    <Label>Frage</Label>
                                    <Input
                                      value={faq.question}
                                      onChange={(e) => updateFaq(index, 'question', e.target.value)}
                                      placeholder="Frage eingeben..."
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Antwort</Label>
                                    <Textarea
                                      value={faq.answer}
                                      onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                                      placeholder="Antwort eingeben..."
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))
                      )}
                      <Button variant="outline" onClick={addFaq}>
                        <Plus className="w-4 h-4 mr-2" />
                        Frage hinzufügen
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
