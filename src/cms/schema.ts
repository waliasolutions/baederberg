// CMS Content Schema - Single Source of Truth
// All editable content types are defined here

export type FieldType = 
  | 'text' 
  | 'richtext' 
  | 'image' 
  | 'icon' 
  | 'color' 
  | 'link' 
  | 'number' 
  | 'select' 
  | 'array';

export interface FieldSchema {
  type: FieldType;
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  default?: any;
  aspect?: string;
  options?: string[];
  item?: FieldSchema | Record<string, FieldSchema>;
  maxItems?: number;
  label?: string;
  placeholder?: string;
  helpText?: string;
}

export interface SectionSchema {
  [key: string]: FieldSchema;
}

export const contentSchema: Record<string, SectionSchema> = {
  hero: {
    slides: {
      type: 'array',
      maxItems: 5,
      label: 'Hero Slides',
      item: {
        heading: { 
          type: 'text', 
          maxLength: 60, 
          required: true,
          label: 'Überschrift',
          placeholder: 'Hauptüberschrift eingeben'
        },
        ctaText: { 
          type: 'text', 
          maxLength: 30, 
          default: 'Mehr erfahren',
          label: 'Button Text'
        },
        ctaLink: { 
          type: 'link',
          label: 'Button Link'
        },
        backgroundImage: { 
          type: 'image', 
          aspect: '16:9',
          label: 'Hintergrundbild'
        }
      }
    }
  },
  
  services: {
    heading: { 
      type: 'text', 
      maxLength: 80,
      label: 'Überschrift',
      default: 'Unsere Leistungen'
    },
    subheading: { 
      type: 'richtext', 
      maxLength: 200,
      label: 'Untertitel'
    },
    items: {
      type: 'array',
      maxItems: 6,
      label: 'Dienstleistungen',
      item: {
        title: { 
          type: 'text', 
          maxLength: 40, 
          required: true,
          label: 'Titel'
        },
        description: { 
          type: 'text', 
          maxLength: 150,
          label: 'Beschreibung'
        },
        image: { 
          type: 'image', 
          aspect: '4:3',
          label: 'Bild'
        },
        link: { 
          type: 'link',
          label: 'Link zur Seite'
        }
      }
    }
  },
  
  about: {
    heading: { 
      type: 'text', 
      maxLength: 80,
      label: 'Überschrift',
      default: 'Über uns'
    },
    paragraph1: { 
      type: 'richtext', 
      maxLength: 400,
      label: 'Absatz 1'
    },
    paragraph2: { 
      type: 'richtext', 
      maxLength: 400,
      label: 'Absatz 2'
    },
    image: { 
      type: 'image', 
      aspect: '4:3',
      label: 'Bild'
    },
    features: {
      type: 'array',
      maxItems: 4,
      label: 'Merkmale',
      item: {
        icon: { 
          type: 'icon',
          label: 'Icon'
        },
        title: { 
          type: 'text', 
          maxLength: 40,
          label: 'Titel'
        },
        description: { 
          type: 'text', 
          maxLength: 100,
          label: 'Beschreibung'
        }
      }
    }
  },
  
  contact: {
    heading: { 
      type: 'text', 
      maxLength: 60,
      label: 'Überschrift',
      default: 'Kontakt'
    },
    subheading: { 
      type: 'text', 
      maxLength: 150,
      label: 'Untertitel'
    },
    phone: { 
      type: 'text', 
      maxLength: 20,
      label: 'Telefon',
      placeholder: '+41 XX XXX XX XX'
    },
    email: { 
      type: 'text', 
      maxLength: 60,
      label: 'E-Mail'
    },
    company: { 
      type: 'text', 
      maxLength: 60,
      label: 'Firmenname'
    },
    street: { 
      type: 'text', 
      maxLength: 60,
      label: 'Strasse'
    },
    city: { 
      type: 'text', 
      maxLength: 60,
      label: 'Stadt'
    }
  },
  
  testimonials: {
    heading: { 
      type: 'text', 
      maxLength: 40,
      label: 'Überschrift',
      default: 'Zufriedene Kunden'
    },
    items: {
      type: 'array',
      maxItems: 20,
      label: 'Bewertungen',
      item: {
        author: { 
          type: 'text', 
          maxLength: 60, 
          required: true,
          label: 'Name'
        },
        quote: { 
          type: 'richtext', 
          maxLength: 500, 
          required: true,
          label: 'Bewertungstext'
        },
        rating: { 
          type: 'number', 
          min: 1, 
          max: 5, 
          default: 5,
          label: 'Sterne'
        },
        project: { 
          type: 'select', 
          options: ['Badumbau', 'Küchenumbau', 'Innenausbau'],
          label: 'Projekttyp'
        }
      }
    }
  },
  
  footer: {
    companyName: {
      type: 'text',
      maxLength: 60,
      label: 'Firmenname',
      default: 'Bäderberg GmbH'
    },
    tagline: {
      type: 'text',
      maxLength: 100,
      label: 'Slogan'
    },
    copyright: {
      type: 'text',
      maxLength: 100,
      label: 'Copyright Text'
    },
    socialLinks: {
      type: 'array',
      maxItems: 5,
      label: 'Social Media Links',
      item: {
        platform: {
          type: 'select',
          options: ['facebook', 'instagram', 'linkedin', 'twitter', 'youtube'],
          label: 'Plattform',
          required: true
        },
        url: {
          type: 'link',
          label: 'URL',
          required: true
        }
      }
    }
  },
  
  gallery: {
    heading: {
      type: 'text',
      maxLength: 80,
      label: 'Überschrift',
      default: 'Was wir für andere gestaltet haben'
    },
    subheading: {
      type: 'text',
      maxLength: 200,
      label: 'Untertitel'
    },
    items: {
      type: 'array',
      maxItems: 20,
      label: 'Projekte',
      item: {
        title: {
          type: 'text',
          maxLength: 60,
          required: true,
          label: 'Projekttitel'
        },
        image: {
          type: 'image',
          aspect: '4:3',
          label: 'Projektbild'
        },
        category: {
          type: 'select',
          options: ['Badumbau', 'Küchenumbau', 'Innenausbau'],
          label: 'Kategorie',
          required: true
        }
      }
    }
  },
  
  regions: {
    heading: {
      type: 'text',
      maxLength: 60,
      label: 'Überschrift',
      default: 'In Ihrer Nähe für Sie da'
    },
    subheading: {
      type: 'text',
      maxLength: 200,
      label: 'Untertitel'
    },
    items: {
      type: 'array',
      maxItems: 20,
      label: 'Regionen',
      item: {
        slug: {
          type: 'text',
          maxLength: 30,
          required: true,
          label: 'URL-Slug',
          placeholder: 'z.B. zurich, richterswil'
        },
        title: {
          type: 'text',
          maxLength: 60,
          required: true,
          label: 'Seitentitel'
        },
        description: {
          type: 'text',
          maxLength: 150,
          label: 'Kurzbeschreibung'
        },
        heroImage: {
          type: 'image',
          aspect: '16:9',
          label: 'Hero Bild'
        },
        badumbauText: {
          type: 'richtext',
          maxLength: 300,
          label: 'Badumbau Beschreibung'
        },
        kuechenumbauText: {
          type: 'richtext',
          maxLength: 300,
          label: 'Küchenumbau Beschreibung'
        },
        innenausbauText: {
          type: 'richtext',
          maxLength: 300,
          label: 'Innenausbau Beschreibung'
        }
      }
    }
  },
  
  seo: {
    metaTitle: {
      type: 'text',
      maxLength: 60,
      label: 'Meta-Titel',
      default: 'Bäderberg - Bad, Küche & Innenausbau'
    },
    metaDescription: {
      type: 'text',
      maxLength: 160,
      label: 'Meta-Beschreibung',
      default: 'Ihr Spezialist für hochwertige Bad-, Küchen- und Innenrenovationen in der Region Zürich und Umgebung.'
    },
    ogImage: {
      type: 'image',
      label: 'OG-Image',
      helpText: 'Falls leer, wird das erste Hero-Bild verwendet'
    },
    gtmId: {
      type: 'text',
      maxLength: 20,
      label: 'GTM Container-ID',
      placeholder: 'GTM-XXXXXXX'
    },
    gtmHead: {
      type: 'richtext',
      label: 'GTM Head Code'
    },
    gtmBody: {
      type: 'richtext',
      label: 'GTM Body Code'
    },
    language: {
      type: 'text',
      maxLength: 10,
      label: 'Sprache',
      default: 'de-CH'
    },
    timezone: {
      type: 'text',
      maxLength: 30,
      label: 'Zeitzone',
      default: 'Europe/Zurich'
    },
    hreflang: {
      type: 'text',
      maxLength: 10,
      label: 'Hreflang',
      default: 'de-CH'
    }
  },
  
  business: {
    companyName: {
      type: 'text',
      maxLength: 60,
      label: 'Firmenname',
      default: 'Bäderberg GmbH'
    },
    legalName: {
      type: 'text',
      maxLength: 100,
      label: 'Rechtlicher Name'
    },
    vatNumber: {
      type: 'text',
      maxLength: 30,
      label: 'UID/MwSt-Nummer',
      placeholder: 'CHE-123.456.789'
    },
    instagram: {
      type: 'link',
      label: 'Instagram'
    },
    facebook: {
      type: 'link',
      label: 'Facebook'
    },
    linkedin: {
      type: 'link',
      label: 'LinkedIn'
    },
    youtube: {
      type: 'link',
      label: 'YouTube'
    }
  }
};

// Helper to get section labels for the UI
export const sectionLabels: Record<string, string> = {
  hero: 'Hero Bereich',
  services: 'Leistungen',
  about: 'Über uns',
  contact: 'Kontakt',
  testimonials: 'Kundenbewertungen',
  gallery: 'Galerie',
  regions: 'Regionen',
  footer: 'Footer',
  seo: 'SEO & Analytics',
  business: 'Unternehmensdaten'
};

// Default content values - SINGLE SOURCE OF TRUTH
export const defaultContent: Record<string, any> = {
  hero: {
    slides: [
      {
        heading: 'Wir bauen Ihr Bad gemeinsam um',
        ctaText: 'Mehr erfahren',
        ctaLink: '/badumbau',
        backgroundImage: '/images/bathroom-modern.jpg'
      },
      {
        heading: 'Küchenbau Spezialist',
        ctaText: 'Mehr erfahren',
        ctaLink: '/kuechenumbau',
        backgroundImage: '/images/kitchen-modern.jpg'
      },
      {
        heading: 'Facharbeiten im Innenausbau',
        ctaText: 'Mehr erfahren',
        ctaLink: '/innenausbau',
        backgroundImage: '/images/interior-living.jpg'
      }
    ]
  },
  services: {
    heading: 'Unsere Leistungen für Ihr Zuhause',
    subheading: 'Bad, Küche, Innenausbau – wir begleiten Sie von der Planung bis zur Fertigstellung. Alles aus einer Hand.',
    items: [
      {
        title: 'Badumbau',
        description: 'Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.',
        image: '/images/bathroom-modern.jpg',
        link: '/badumbau'
      },
      {
        title: 'Küchenumbau',
        description: 'Ihre neue Küche nach Mass – funktional und schön.',
        image: '/images/kitchen-modern.jpg',
        link: '/kuechenumbau'
      },
      {
        title: 'Innenausbau',
        description: 'Räume nach Ihren Wünschen – alles aus einer Hand.',
        image: '/images/interior-living.jpg',
        link: '/innenausbau'
      }
    ]
  },
  contact: {
    heading: 'Kontakt',
    subheading: 'Wir freuen uns auf Ihre Anfrage',
    phone: '+41 76 753 44 78',
    email: 'info@baederberg.ch',
    company: 'Bäderberg GmbH',
    street: 'Zugerstrasse 18',
    city: '8805 Richterswil'
  },
  about: {
    heading: 'Ihr Bad, Ihre Küche, Ihr Innenausbau',
    paragraph1: 'Wir sind Handwerker aus der Region Zürich. Wir planen und bauen Bäder, Küchen und Innenräume – sorgfältig und nach Ihren Wünschen.',
    paragraph2: 'Alles aus einer Hand. Mit persönlicher Betreuung von Anfang bis Ende.',
    features: [
      {
        icon: 'Heart',
        title: 'Persönliche Betreuung',
        description: 'Ihr persönlicher Bauleiter begleitet Ihr Projekt von Anfang bis Ende.'
      },
      {
        icon: 'Award',
        title: 'Sorgfältige Arbeit',
        description: 'Wir achten auf Details und arbeiten sauber.'
      },
      {
        icon: 'Smile',
        title: 'Garantie inklusive',
        description: 'Elektroarbeiten und Garantie sind bei uns immer dabei.'
      }
    ]
  },
  testimonials: {
    heading: 'Zufriedene Kunden',
    items: []
  },
  footer: {
    companyName: 'Bäderberg GmbH',
    tagline: 'Ihr Partner für Bad, Küche und Innenausbau',
    copyright: '© 2024 Bäderberg GmbH. Alle Rechte vorbehalten.'
  },
  gallery: {
    heading: 'Was wir für andere gestaltet haben',
    subheading: 'Hier sehen Sie einige unserer abgeschlossenen Projekte. Vielleicht entdecken Sie etwas, das Ihnen gefällt und Sie inspiriert.',
    items: [
      { title: 'Badezimmer Walk-In Dusche', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Küche mit Kochinsel', image: '/images/kitchen-modern.jpg', category: 'Küchenumbau' },
      { title: 'Gäste-WC Kompakt', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Badezimmer Spa Design', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Küche Induktion Modern', image: '/images/kitchen-modern.jpg', category: 'Küchenumbau' },
      { title: 'Einbauschrank Modern', image: '/images/interior-living.jpg', category: 'Innenausbau' }
    ]
  },
  regions: {
    heading: 'In Ihrer Nähe für Sie da',
    subheading: 'Wir sind in verschiedenen Regionen der Schweiz aktiv und betreuen Ihr Projekt mit lokaler Expertise und persönlichem Service.',
    items: [
      { slug: 'zurich', title: 'Bäderberg in Zürich', description: 'Bad, Küche und Innenausbau in Zürich' },
      { slug: 'richterswil', title: 'Bäderberg in Richterswil', description: 'Bad, Küche und Innenausbau in Richterswil' },
      { slug: 'pfaeffikon', title: 'Bäderberg in Pfäffikon SZ', description: 'Bad, Küche und Innenausbau in Pfäffikon SZ' }
    ]
  },
  seo: {
    metaTitle: 'Bäderberg - Bad, Küche & Innenausbau',
    metaDescription: 'Ihr Spezialist für hochwertige Bad-, Küchen- und Innenrenovationen in der Region Zürich und Umgebung.',
    ogImage: '',
    gtmId: '',
    gtmHead: '',
    gtmBody: '',
    language: 'de-CH',
    timezone: 'Europe/Zurich',
    hreflang: 'de-CH'
  },
  business: {
    companyName: 'Bäderberg GmbH',
    legalName: 'Bäderberg GmbH',
    vatNumber: '',
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: ''
  },
  
  // ========== SERVICE PAGES (SSOT) ==========
  pages: {
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
  },

  // ========== REGION DEFAULTS (SSOT) ==========
  regionDefaults: {
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
    faq: [
      { question: 'Wie lange dauert ein Umbau?', answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.' },
      { question: 'Brauche ich eine Baugenehmigung?', answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.' },
      { question: 'Können Sie auch in bewohnten Wohnungen arbeiten?', answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.' },
      { question: 'Was ist im Preis inbegriffen?', answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.' },
      { question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?', answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.' }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  }
};
