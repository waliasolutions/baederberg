import { useState, useEffect, useCallback } from 'react';
import { AdminLayout } from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Globe, Code, Building2, Loader2, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

interface FooterData {
  companyName: string;
  tagline: string;
  copyright: string;
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

const defaultFooter: FooterData = {
  companyName: 'Bäderberg GmbH',
  tagline: 'Ihr Partner für Bad, Küche und Innenausbau',
  copyright: '© 2024 Bäderberg GmbH. Alle Rechte vorbehalten.'
};

export default function SettingsEditor() {
  const { toast } = useToast();
  const [seoData, setSeoData] = useState<SEOData>(defaultSEO);
  const [businessData, setBusinessData] = useState<BusinessData>(defaultBusiness);
  const [footerData, setFooterData] = useState<FooterData>(defaultFooter);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: rows, error } = await supabase
        .from('content')
        .select('section_key, content')
        .in('section_key', ['seo', 'business', 'footer'])
        .eq('content_key', 'default');

      if (error) throw error;

      rows?.forEach(row => {
        if (row.section_key === 'seo') {
          setSeoData({ ...defaultSEO, ...(row.content as object) });
        } else if (row.section_key === 'business') {
          setBusinessData({ ...defaultBusiness, ...(row.content as object) });
        } else if (row.section_key === 'footer') {
          setFooterData({ ...defaultFooter, ...(row.content as object) });
        }
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
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

      const updates = [
        { section_key: 'seo', content: seoData },
        { section_key: 'business', content: businessData },
        { section_key: 'footer', content: footerData }
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('content')
          .upsert({
            section_key: update.section_key,
            content_key: 'default',
            content: update.content as unknown as Json,
            updated_by: user.id,
            updated_at: new Date().toISOString(),
            is_draft: false,
            published_at: new Date().toISOString()
          }, { onConflict: 'section_key,content_key' });

        if (error) throw error;
      }

      setIsDirty(false);
      toast({ title: 'Gespeichert', description: 'Alle Einstellungen wurden gespeichert.' });
    } catch (error) {
      console.error('Error saving:', error);
      toast({ title: 'Fehler', description: 'Beim Speichern ist ein Fehler aufgetreten.', variant: 'destructive' });
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

  const updateFooter = (field: keyof FooterData, value: string) => {
    setFooterData(prev => ({ ...prev, [field]: value }));
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
            <Settings className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Einstellungen</h1>
              <p className="text-muted-foreground">SEO, Unternehmensdaten und Footer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isDirty && <span className="text-sm text-amber-600 font-medium">Ungespeicherte Änderungen</span>}
            <Button onClick={handleSave} disabled={isSaving || !isDirty}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Speichern
            </Button>
          </div>
        </div>

        <Tabs defaultValue="seo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              SEO & Meta
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Unternehmen
            </TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meta-Daten (Standard)</CardTitle>
                <CardDescription>Standard-Meta-Daten für alle Seiten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta-Titel ({seoData.metaTitle.length}/60)</Label>
                  <Input
                    id="metaTitle"
                    value={seoData.metaTitle}
                    onChange={(e) => updateSEO('metaTitle', e.target.value)}
                    maxLength={60}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta-Beschreibung ({seoData.metaDescription.length}/160)</Label>
                  <Textarea
                    id="metaDescription"
                    value={seoData.metaDescription}
                    onChange={(e) => updateSEO('metaDescription', e.target.value)}
                    maxLength={160}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>OG-Image (Social Media)</Label>
                  <ImagePicker value={seoData.ogImage} onChange={(url) => updateSEO('ogImage', url)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sprache & Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Sprache</Label>
                    <Input value={seoData.language} onChange={(e) => updateSEO('language', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Hreflang</Label>
                    <Input value={seoData.hreflang} onChange={(e) => updateSEO('hreflang', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Zeitzone</Label>
                    <Input value={seoData.timezone} onChange={(e) => updateSEO('timezone', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Tag Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="gtmId">GTM Container-ID</Label>
                  <Input
                    id="gtmId"
                    value={seoData.gtmId}
                    onChange={(e) => updateSEO('gtmId', e.target.value)}
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benutzerdefinierter Code (Head)</Label>
                  <Textarea
                    value={seoData.gtmHead}
                    onChange={(e) => updateSEO('gtmHead', e.target.value)}
                    rows={4}
                    className="font-mono text-sm"
                    placeholder="<!-- Zusätzlicher Code für den Head-Bereich -->"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Benutzerdefinierter Code (Body)</Label>
                  <Textarea
                    value={seoData.gtmBody}
                    onChange={(e) => updateSEO('gtmBody', e.target.value)}
                    rows={4}
                    className="font-mono text-sm"
                    placeholder="<!-- Zusätzlicher Code für den Body-Bereich -->"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Unternehmensdaten</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Firmenname</Label>
                    <Input
                      value={businessData.companyName}
                      onChange={(e) => updateBusiness('companyName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rechtlicher Name</Label>
                    <Input
                      value={businessData.legalName}
                      onChange={(e) => updateBusiness('legalName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>UID/MwSt-Nummer</Label>
                  <Input
                    value={businessData.vatNumber}
                    onChange={(e) => updateBusiness('vatNumber', e.target.value)}
                    placeholder="CHE-123.456.789"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Instagram</Label>
                    <Input
                      value={businessData.instagram}
                      onChange={(e) => updateBusiness('instagram', e.target.value)}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Facebook</Label>
                    <Input
                      value={businessData.facebook}
                      onChange={(e) => updateBusiness('facebook', e.target.value)}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>LinkedIn</Label>
                    <Input
                      value={businessData.linkedin}
                      onChange={(e) => updateBusiness('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube</Label>
                    <Input
                      value={businessData.youtube}
                      onChange={(e) => updateBusiness('youtube', e.target.value)}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Footer Einstellungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Firmenname im Footer</Label>
                  <Input
                    value={footerData.companyName}
                    onChange={(e) => updateFooter('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slogan / Tagline</Label>
                  <Input
                    value={footerData.tagline}
                    onChange={(e) => updateFooter('tagline', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Copyright Text</Label>
                  <Input
                    value={footerData.copyright}
                    onChange={(e) => updateFooter('copyright', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
