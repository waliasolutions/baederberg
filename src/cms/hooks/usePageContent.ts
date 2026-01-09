import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  introText: string;
  features: string[];
}

const defaultPages: Record<string, PageContent> = {
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
    heroSubheading: 'Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.',
    heroImage: '/lovable-uploads/bad-hero.jpg',
    introText: 'Ein persönlicher Bauleiter übernimmt Ihr Projekt von Anfang bis Ende. Sie haben einen Ansprechpartner für alles. Wir planen das Bad gemeinsam mit Ihnen, bauen es um und übergeben es fertig. Elektroarbeiten, Sanitär, Fliesen – alles inklusive. Fester Preis, fester Termin, 5 Jahre Garantie auf unsere Arbeit.',
    features: [
      'Persönlicher Bauleiter',
      'Individuelle Badplanung',
      'Einbau hochwertiger Sanitäranlagen',
      'Montage stilvoller Badmöbel',
      'Innovative Beleuchtungskonzepte',
      'Elektroarbeiten und Garantie inklusive'
    ]
  },
  kuechenumbau: {
    metaTitle: 'Küchenumbau - Bäderberg',
    metaDescription: 'Professioneller Küchenumbau in der Region Zürich. Moderne Küchen nach Ihren Wünschen, handwerklich perfekt umgesetzt.',
    heroHeading: 'Küchenumbau',
    heroSubheading: 'Ihre neue Küche nach Mass – funktional und schön.',
    heroImage: '/lovable-uploads/kueche-hero.jpg',
    introText: 'Ein persönlicher Projektleiter betreut Sie durch das ganze Projekt. Von der ersten Planung bis zur fertigen Küche. Wir koordinieren alle Arbeiten: Ausbau der alten Küche, Anpassung von Elektrik und Wasser, Einbau der neuen Küche. Alles aus einer Hand. Fester Preis, fester Termin, 5 Jahre Garantie.',
    features: [
      'Individuelle Küchenplanung',
      'Persönlicher Projektleiter',
      'Installation hochwertiger Küchengeräte',
      'Einbau von Arbeitsplatten und individuellen Rückwänden',
      'Fachgerechte Montage',
      'Elektroarbeiten und Garantie inklusive'
    ]
  },
  innenausbau: {
    metaTitle: 'Innenausbau - Bäderberg',
    metaDescription: 'Hochwertiger Innenausbau in der Region Zürich. Massgeschneiderte Lösungen für Ihr Zuhause.',
    heroHeading: 'Innenausbau',
    heroSubheading: 'Räume nach Ihren Wünschen – alles aus einer Hand.',
    heroImage: '/lovable-uploads/innenausbau-hero.jpg',
    introText: 'Ein persönlicher Bauleiter koordiniert alle Arbeiten für Sie. Vom Boden bis zur Decke – Sie haben nur einen Ansprechpartner. Bodenbeläge, Wandverkleidungen, Möbeleinbau, Treppen, Elektrik – wir übernehmen alle Gewerke. Alles aus einer Hand. Fester Preis, fester Termin, 5 Jahre Garantie auf die Handwerksleistungen.',
    features: [
      'Fachgerechte Bauleitung',
      'Individuelle Raumplanung',
      'Massgeschneiderter Möbeleinbau',
      'Bodenbeläge und Wandverkleidungen',
      'Treppen und Geländer',
      'Elektroarbeiten und Garantie inklusive',
      'Alles aus einer Hand'
    ]
  }
};

export function usePageContent(pageKey: string): PageContent {
  const [content, setContent] = useState<PageContent>(defaultPages[pageKey] || defaultPages.home);

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
          const contentData = data.content as unknown as Partial<PageContent>;
          setContent({
            ...defaultPages[pageKey],
            ...contentData,
            // Ensure features is always an array
            features: Array.isArray(contentData.features) 
              ? contentData.features 
              : defaultPages[pageKey]?.features || []
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

export type { PageContent };
