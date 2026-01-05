import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Save, Globe, Code, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImagePicker from '../components/ImagePicker';
import type { Json } from '@/integrations/supabase/types';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  gtmId: string;
  gtmHead: string;
  gtmBody: string;
  language: string;
  timezone: string;
  hreflang: string;
}

interface BusinessData {
  companyName: string;
  legalName: string;
  vatNumber: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

const defaultSEO: SEOData = {
  metaTitle: 'Bäderberg - Bad, Küche & Innenausbau',
  metaDescription: 'Ihr Spezialist für hochwertige Bad-, Küchen- und Innenrenovationen in der Region Zürich und Umgebung.',
  ogImage: '',
  gtmId: '',
  gtmHead: '',
  gtmBody: '',
  language: 'de-CH',
  timezone: 'Europe/Zurich',
  hreflang: 'de-CH'
};

const defaultBusiness: BusinessData = {
  companyName: 'Bäderberg GmbH',
  legalName: 'Bäderberg GmbH',
  vatNumber: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  youtube: ''
};

export function SEOEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>(defaultSEO);
  const [businessData, setBusinessData] = useState<BusinessData>(defaultBusiness);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch SEO data
      const { data: seoRow } = await supabase
        .from('content')
        .select('content')
        .eq('section_key', 'seo')
        .eq('content_key', 'default')
        .maybeSingle();
      
      if (seoRow?.content) {
        setSeoData({ ...defaultSEO, ...(seoRow.content as unknown as SEOData) });
      }

      // Fetch Business data
      const { data: businessRow } = await supabase
        .from('content')
        .select('content')
        .eq('section_key', 'business')
        .eq('content_key', 'default')
        .maybeSingle();
      
      if (businessRow?.content) {
        setBusinessData({ ...defaultBusiness, ...(businessRow.content as unknown as BusinessData) });
      }
    } catch (error) {
      console.error('Error fetching SEO/Business data:', error);
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
      // Check if SEO record exists
      const { data: existingSeo } = await supabase
        .from('content')
        .select('id')
        .eq('section_key', 'seo')
        .eq('content_key', 'default')
        .maybeSingle();

      if (existingSeo) {
        await supabase
          .from('content')
          .update({
            content: seoData as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          })
          .eq('section_key', 'seo')
          .eq('content_key', 'default');
      } else {
        await supabase
          .from('content')
          .insert({
            section_key: 'seo',
            content_key: 'default',
            content: seoData as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          });
      }

      // Check if Business record exists
      const { data: existingBusiness } = await supabase
        .from('content')
        .select('id')
        .eq('section_key', 'business')
        .eq('content_key', 'default')
        .maybeSingle();

      if (existingBusiness) {
        await supabase
          .from('content')
          .update({
            content: businessData as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          })
          .eq('section_key', 'business')
          .eq('content_key', 'default');
      } else {
        await supabase
          .from('content')
          .insert({
            section_key: 'business',
            content_key: 'default',
            content: businessData as unknown as Json,
            is_draft: false,
            published_at: new Date().toISOString()
          });
      }

      setIsDirty(false);
      toast({
        title: 'Gespeichert',
        description: 'SEO- und Unternehmensdaten wurden gespeichert.'
      });
    } catch (error) {
      console.error('Error saving:', error);
      toast({
        title: 'Fehler',
        description: 'Beim Speichern ist ein Fehler aufgetreten.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSEO = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const updateBusiness = (field: keyof BusinessData, value: string) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">SEO & Unternehmen</h1>
              <p className="text-sm text-slate-500">Meta-Daten, Analytics und Firmendaten</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isDirty && (
              <span className="text-sm text-amber-600 font-medium">Ungespeicherte Änderungen</span>
            )}
            <Button onClick={handleSave} disabled={isSaving || !isDirty}>
              <Save size={16} className="mr-2" />
              {isSaving ? 'Speichern...' : 'Speichern'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="seo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe size={16} />
              SEO & Meta
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Code size={16} />
              Analytics & GTM
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building2 size={16} />
              Unternehmen
            </TabsTrigger>
          </TabsList>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Meta-Daten</h3>
              
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta-Titel (max. 60 Zeichen)</Label>
                <Input
                  id="metaTitle"
                  value={seoData.metaTitle}
                  onChange={(e) => updateSEO('metaTitle', e.target.value)}
                  maxLength={60}
                  placeholder="Bäderberg - Bad, Küche & Innenausbau"
                />
                <p className="text-xs text-slate-500">{seoData.metaTitle.length}/60 Zeichen</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta-Beschreibung (max. 160 Zeichen)</Label>
                <Textarea
                  id="metaDescription"
                  value={seoData.metaDescription}
                  onChange={(e) => updateSEO('metaDescription', e.target.value)}
                  maxLength={160}
                  rows={3}
                  placeholder="Ihr Spezialist für hochwertige Bad-, Küchen- und Innenrenovationen..."
                />
                <p className="text-xs text-slate-500">{seoData.metaDescription.length}/160 Zeichen</p>
              </div>

              <div className="space-y-2">
                <Label>OG-Image (Social Media Vorschau)</Label>
                <ImagePicker
                  value={seoData.ogImage}
                  onChange={(url) => updateSEO('ogImage', url)}
                />
                <p className="text-xs text-slate-500">
                  Falls leer, wird das erste Hero-Bild verwendet
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Sprache & Region</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Sprache</Label>
                  <Input
                    id="language"
                    value={seoData.language}
                    onChange={(e) => updateSEO('language', e.target.value)}
                    placeholder="de-CH"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hreflang">Hreflang</Label>
                  <Input
                    id="hreflang"
                    value={seoData.hreflang}
                    onChange={(e) => updateSEO('hreflang', e.target.value)}
                    placeholder="de-CH"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Zeitzone</Label>
                  <Input
                    id="timezone"
                    value={seoData.timezone}
                    onChange={(e) => updateSEO('timezone', e.target.value)}
                    placeholder="Europe/Zurich"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Google Tag Manager</h3>
              
              <div className="space-y-2">
                <Label htmlFor="gtmId">GTM Container-ID</Label>
                <Input
                  id="gtmId"
                  value={seoData.gtmId}
                  onChange={(e) => updateSEO('gtmId', e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
                <p className="text-xs text-slate-500">
                  Die Container-ID aus Google Tag Manager (z.B. GTM-ABC123)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gtmHead">Benutzerdefinierter Code (Head)</Label>
                <Textarea
                  id="gtmHead"
                  value={seoData.gtmHead}
                  onChange={(e) => updateSEO('gtmHead', e.target.value)}
                  rows={4}
                  placeholder="<!-- Zusätzlicher Code für den Head-Bereich -->"
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gtmBody">Benutzerdefinierter Code (Body)</Label>
                <Textarea
                  id="gtmBody"
                  value={seoData.gtmBody}
                  onChange={(e) => updateSEO('gtmBody', e.target.value)}
                  rows={4}
                  placeholder="<!-- Zusätzlicher Code für den Body-Bereich (noscript) -->"
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Unternehmensdaten</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname</Label>
                  <Input
                    id="companyName"
                    value={businessData.companyName}
                    onChange={(e) => updateBusiness('companyName', e.target.value)}
                    placeholder="Bäderberg GmbH"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legalName">Rechtlicher Name</Label>
                  <Input
                    id="legalName"
                    value={businessData.legalName}
                    onChange={(e) => updateBusiness('legalName', e.target.value)}
                    placeholder="Bäderberg GmbH"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatNumber">UID/MwSt-Nummer</Label>
                <Input
                  id="vatNumber"
                  value={businessData.vatNumber}
                  onChange={(e) => updateBusiness('vatNumber', e.target.value)}
                  placeholder="CHE-123.456.789"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Social Media</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    value={businessData.instagram}
                    onChange={(e) => updateBusiness('instagram', e.target.value)}
                    placeholder="https://instagram.com/baederberg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={businessData.facebook}
                    onChange={(e) => updateBusiness('facebook', e.target.value)}
                    placeholder="https://facebook.com/baederberg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={businessData.linkedin}
                    onChange={(e) => updateBusiness('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/company/baederberg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    value={businessData.youtube}
                    onChange={(e) => updateBusiness('youtube', e.target.value)}
                    placeholder="https://youtube.com/@baederberg"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
