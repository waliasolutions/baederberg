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
  
  theme: {
    primaryColor: { 
      type: 'color', 
      default: '#0ea5e9',
      label: 'Primärfarbe'
    },
    secondaryColor: { 
      type: 'color', 
      default: '#f1f5f9',
      label: 'Sekundärfarbe'
    },
    accentColor: { 
      type: 'color', 
      default: '#0284c7',
      label: 'Akzentfarbe'
    },
    backgroundColor: {
      type: 'color',
      default: '#ffffff',
      label: 'Hintergrundfarbe'
    },
    textColor: {
      type: 'color',
      default: '#1e293b',
      label: 'Textfarbe'
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
  footer: 'Footer',
  theme: 'Farben & Design'
};

// Default content values
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
  theme: {
    primaryColor: '#0ea5e9',
    secondaryColor: '#f1f5f9',
    accentColor: '#0284c7',
    backgroundColor: '#ffffff',
    textColor: '#1e293b'
  }
};
