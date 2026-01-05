import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
}

const defaultPages: Record<string, PageSEO> = {
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

export function usePageContent(pageKey: string): PageSEO {
  const [content, setContent] = useState<PageSEO>(defaultPages[pageKey] || defaultPages.home);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('content')
          .select('content')
          .eq('section_key', 'pages')
          .eq('content_key', pageKey)
          .maybeSingle();

        if (error) {
          console.error('Error fetching page content:', error);
          return;
        }

        if (data?.content) {
          const contentData = data.content as unknown as PageSEO;
          setContent({
            ...defaultPages[pageKey],
            ...contentData
          });
        }
      } catch (err) {
        console.error('Unexpected error fetching page content:', err);
      }
    };

    fetchContent();
  }, [pageKey]);

  return content;
}
