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
          options: ['Badumbau', 'Innenausbau'],
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
          options: ['Badumbau', 'Innenausbau'],
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
      default: 'Bäderberg - Bad & Innenausbau'
    },
    metaDescription: {
      type: 'text',
      maxLength: 160,
      label: 'Meta-Beschreibung',
      default: 'Ihr Spezialist für hochwertige Bad- und Innenrenovationen in der Region Zürich und Umgebung.'
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
        heading: 'Facharbeiten im Innenausbau',
        ctaText: 'Mehr erfahren',
        ctaLink: '/innenausbau',
        backgroundImage: '/images/interior-living.jpg'
      }
    ]
  },
  services: {
    heading: 'Unsere Leistungen für Ihr Zuhause',
    subheading: 'Bad und Innenausbau – wir begleiten Sie von der Planung bis zur Fertigstellung. Alles aus einer Hand.',
    items: [
      {
        title: 'Badumbau',
        description: 'Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.',
        image: '/images/bathroom-modern.jpg',
        link: '/badumbau'
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
    heading: 'Ihr Bad, Ihr Innenausbau',
    paragraph1: 'Wir sind Handwerker aus der Region Zürich. Wir planen und bauen Bäder und Innenräume – sorgfältig und nach Ihren Wünschen.',
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
    tagline: 'Ihr Partner für Bad und Innenausbau',
    copyright: '© 2024 Bäderberg GmbH. Alle Rechte vorbehalten.'
  },
  gallery: {
    heading: 'Was wir für andere gestaltet haben',
    subheading: 'Hier sehen Sie einige unserer abgeschlossenen Projekte. Vielleicht entdecken Sie etwas, das Ihnen gefällt und Sie inspiriert.',
    items: [
      { title: 'Badezimmer Walk-In Dusche', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Gäste-WC Kompakt', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Badezimmer Spa Design', image: '/images/bathroom-modern.jpg', category: 'Badumbau' },
      { title: 'Einbauschrank Modern', image: '/images/interior-living.jpg', category: 'Innenausbau' },
      { title: 'Wohnzimmer Renovation', image: '/images/interior-modern.jpg', category: 'Innenausbau' },
      { title: 'Eingang Garderobe', image: '/images/interior-living.jpg', category: 'Innenausbau' }
    ]
  },
  regions: {
    heading: 'In Ihrer Nähe für Sie da',
    subheading: 'Wir sind in verschiedenen Regionen aktiv und betreuen Ihr Projekt mit lokaler Expertise und persönlichem Service.',
    items: [
      { slug: 'zurich', title: 'Bäderberg in Zürich', description: 'Bad und Innenausbau in Zürich', heroImage: '/src/assets/regions/zurich-interior.jpg' },
      { slug: 'richterswil', title: 'Bäderberg in Richterswil', description: 'Bad und Innenausbau in Richterswil', heroImage: '/src/assets/regions/richterswil-interior.jpg' },
      { slug: 'waedenswil', title: 'Bäderberg in Wädenswil', description: 'Bad und Innenausbau in Wädenswil', heroImage: '' },
      { slug: 'lachen', title: 'Bäderberg in Lachen', description: 'Bad und Innenausbau in Lachen', heroImage: '' },
      { slug: 'pfaeffikon', title: 'Bäderberg in Pfäffikon SZ', description: 'Bad und Innenausbau in Pfäffikon SZ', heroImage: '/src/assets/regions/pfaffikon-interior.jpg' },
      { slug: 'zollikon', title: 'Bäderberg in Zollikon', description: 'Bad und Innenausbau in Zollikon', heroImage: '' },
      { slug: 'kilchberg', title: 'Bäderberg in Kilchberg', description: 'Bad und Innenausbau in Kilchberg', heroImage: '' },
      { slug: 'kuesnacht', title: 'Bäderberg in Küsnacht', description: 'Bad und Innenausbau in Küsnacht', heroImage: '' },
      { slug: 'meilen', title: 'Bäderberg in Meilen', description: 'Bad und Innenausbau in Meilen', heroImage: '' },
      { slug: 'erlenbach', title: 'Bäderberg in Erlenbach', description: 'Bad und Innenausbau in Erlenbach', heroImage: '' }
    ]
  },
  seo: {
    metaTitle: 'Bäderberg - Bad & Innenausbau',
    metaDescription: 'Ihr Spezialist für hochwertige Bad- und Innenrenovationen in der Region Zürich und Umgebung.',
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
      ],
      whyProfessional: {
        heading: 'Warum professioneller Badumbau?',
        items: [
          { title: 'Fachgerechte Planung spart Geld', description: 'Ein professionell geplantes Bad vermeidet teure Fehler. Wasserschäden durch falsch verlegte Leitungen oder undichte Abdichtungen kosten Sie später ein Vielfaches. Unsere Bauleiter kennen jede Norm und jedes Detail.' },
          { title: 'Qualität, die bleibt', description: 'Ein Bad nutzen Sie täglich für viele Jahre. Hochwertige Materialien und fachgerechte Montage bedeuten weniger Reparaturen und mehr Freude am Raum. Wir verbauen nur, was wir auch selbst nutzen würden.' },
          { title: 'Zeitersparnis durch Koordination', description: 'Sanitär, Elektrik, Fliesen, Maler – alles muss perfekt zusammenpassen. Ihr persönlicher Bauleiter koordiniert alle Gewerke. Sie haben nur einen Ansprechpartner und sparen wertvolle Zeit.' },
          { title: 'Garantie und Sicherheit', description: 'Nach dem Umbau sind wir weiter für Sie da. Mit unserer Garantie sind Sie abgesichert. Bei Problemen ist Ihr Bauleiter nur einen Anruf entfernt – ohne Diskussion, ohne Verzögerung.' }
        ],
        promise: 'Wir bauen Ihr Bad so, wie wir es für uns selbst bauen würden. Sorgfältig geplant, sauber ausgeführt, mit Materialien die halten. Kein Marketing-Versprechen – sondern unser Standard.'
      },
      processSteps: {
        heading: 'So läuft es ab',
        subheading: 'Einfach und klar',
        steps: [
          { title: '1. Erstgespräch', description: 'Wir besprechen Ihre Wünsche und Ihr Budget.' },
          { title: '2. Planung', description: 'Ihr Bauleiter plant mit Ihnen gemeinsam.' },
          { title: '3. Umbau', description: 'Unser Team baut sauber und termingerecht.' },
          { title: '4. Übergabe', description: 'Sie bekommen Ihr fertiges Bad mit Garantie.' }
        ]
      },
      cta: {
        heading: 'Jetzt Termin vereinbaren',
        subheading: 'Wir beraten Sie gerne – kostenlos und unverbindlich.',
        buttonText: 'Jetzt Kontakt aufnehmen',
        buttonLink: '/#contact'
      }
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
      ],
      whyProfessional: {
        heading: 'Warum professioneller Innenausbau?',
        items: [
          { title: 'Komplexe Arbeiten gehören in Profihände', description: 'Innenausbau ist mehr als Wände streichen. Bodenbeläge müssen eben verlegt werden, Möbel passgenau eingebaut, Elektrik fachgerecht verlegt. Ein Fehler kann teuer werden. Unsere Fachkräfte wissen, worauf es ankommt.' },
          { title: 'Alles aus einer Hand spart Zeit und Nerven', description: 'Verschiedene Handwerker zu koordinieren kostet Sie Zeit und Nerven. Bei uns läuft alles über Ihren persönlichen Bauleiter – von der Planung bis zur Übergabe. Sie haben nur einen Ansprechpartner.' },
          { title: 'Qualität macht den Unterschied', description: 'Billige Materialien und unsaubere Arbeit sehen Sie schnell – und ärgern sich lange. Wir verbauen nur Materialien, die halten. Unsere Handwerker arbeiten sauber und präzise. Das sehen und spüren Sie jeden Tag.' },
          { title: 'Garantie und Sicherheit inklusive', description: 'Nach dem Projekt sind wir weiter für Sie da. Mit Garantie auf alle Arbeiten. Bei Fragen oder Problemen ist Ihr Bauleiter nur einen Anruf entfernt – schnell, unkompliziert, zuverlässig.' }
        ],
        promise: 'Vom Boden bis zur Decke – alles aus einer Hand. Sorgfältige Planung, präzise Ausführung, verlässliche Betreuung. Keine leeren Versprechen, sondern ehrliche Handwerksarbeit.'
      },
      processSteps: {
        heading: 'So läuft es ab',
        subheading: 'Einfach und klar',
        steps: [
          { title: '1. Erstgespräch', description: 'Wir besprechen Ihre Wünsche und Ihr Budget.' },
          { title: '2. Planung', description: 'Ihr Bauleiter plant mit Ihnen gemeinsam.' },
          { title: '3. Umbau', description: 'Unser Team arbeitet sauber und termingerecht.' },
          { title: '4. Übergabe', description: 'Sie bekommen Ihr fertiges Projekt mit Garantie.' }
        ]
      },
      cta: {
        heading: 'Jetzt Termin vereinbaren',
        subheading: 'Wir beraten Sie gerne – kostenlos und unverbindlich.',
        buttonText: 'Jetzt Kontakt aufnehmen',
        buttonLink: '/#contact'
      }
    }
  },

  // ========== REGION DEFAULTS (SSOT) ==========
  regionDefaults: {
    services: {
      badumbau: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt.',
      innenausbau: 'Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um.'
    },
    whyUs: [
      'Alles aus einer Hand – vom ersten Gespräch bis zur Übergabe',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    faq: [
      { question: 'Wie lange dauert ein Umbau?', answer: 'Ein Badumbau dauert 3-6 Wochen, ein Innenausbau-Projekt je nach Umfang 2-6 Wochen. Der genaue Zeitplan hängt vom Umfang ab.' },
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
