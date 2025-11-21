import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { realTestimonials } from '@/data/testimonials';
import zurichHero from '@/assets/regions/zurich-interior.jpg';
import richterswilHero from '@/assets/regions/richterswil-interior.jpg';
import pfaffikonHero from '@/assets/regions/pfaffikon-interior.jpg';

interface RegionData {
  [key: string]: {
    title: string;
    description: string;
    heroImage: string;
    services: {
      badumbau: string;
      kuechenumbau: string;
      innenausbau: string;
    };
    whyUs: string[];
    testimonials: {
      quote: string;
      author: string;
      project: string;
      rating?: number;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
    contact: {
      phone: string;
      email: string;
      address: {
        street: string;
        city: string;
      };
    };
  };
}

const regionData: RegionData = {
  'zurich': {
    title: 'Bäderberg in Zürich',
    description: 'Bad, Küche und Innenausbau in Zürich',
    heroImage: zurichHero,
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
    testimonials: [
      realTestimonials[2],  // Christian Hess
      realTestimonials[0],  // Motorcycle Driver
      realTestimonials[4]   // Kodeli
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'richterswil': {
    title: 'Bäderberg in Richterswil',
    description: 'Bad, Küche und Innenausbau in Richterswil',
    heroImage: richterswilHero,
    services: {
      badumbau: 'Badumbau – individuell geplant und professionell ausgeführt.',
      kuechenumbau: 'Küchenumbau mit allem drum und dran. Wir koordinieren alle Gewerke für Sie.',
      innenausbau: 'Möbeleinbau, Böden, Wandverkleidungen – alles fachgerecht umgesetzt.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[1],  // Nicoleta Salvadori-Curniuc
      realTestimonials[6],  // Patricia Schmid
      realTestimonials[5]   // Derk Mous
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'waedenswil': {
    title: 'Bäderberg in Wädenswil',
    description: 'Bad, Küche und Innenausbau in Wädenswil',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Kompletter Badumbau – persönlich geplant, fachgerecht ausgeführt.',
      kuechenumbau: 'Küchen nach Maß. Wir planen, bauen und montieren – alles aus einer Hand.',
      innenausbau: 'Raumgestaltung und Möbeleinbau. Professionell umgesetzt, zuverlässig fertiggestellt.'
    },
    whyUs: [
      'Alles aus einer Hand – eine Anlaufstelle für Ihr Projekt',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[15], // Coiffure Vogue Wädenswil
      realTestimonials[9],  // Lionel Sigrist
      realTestimonials[8]   // Márton Szőnyi
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'lachen': {
    title: 'Bäderberg in Lachen',
    description: 'Bad, Küche und Innenausbau in Lachen',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau komplett – von der Planung bis zur fertigen Ausführung. Persönlich betreut.',
      kuechenumbau: 'Ihre neue Küche – individuell geplant, fachgerecht eingebaut.',
      innenausbau: 'Innenausbau nach Ihren Wünschen. Böden, Wände, Einbauten – alles aus einer Hand.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[10], // Claudio Hofer
      realTestimonials[17], // Albert Peter
      realTestimonials[11]  // Benjamin Tacquet
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'pfaeffikon': {
    title: 'Bäderberg in Pfäffikon SZ',
    description: 'Bad, Küche und Innenausbau in Pfäffikon SZ',
    heroImage: pfaffikonHero,
    services: {
      badumbau: 'Badumbau – barrierefrei oder modern, individuell nach Ihren Bedürfnissen.',
      kuechenumbau: 'Küchenumbau mit Planung und Montage. Wir kümmern uns um alles.',
      innenausbau: 'Umbau und Sanierung von Wohnräumen. Fachgerecht und zuverlässig.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[3],  // Acilas Physiotherapie
      realTestimonials[13], // Katharina Gut
      realTestimonials[7]   // Boris Radoicic
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'zollikon': {
    title: 'Bäderberg in Zollikon',
    description: 'Bad, Küche und Innenausbau in Zollikon',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau mit hochwertigen Materialien. Individuell geplant.',
      kuechenumbau: 'Küchenumbau mit guter Ausstattung und sorgfältiger Ausführung.',
      innenausbau: 'Innenausbau für Wohnungen. Hochwertig und detailgenau.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[12], // Kay Moeller-Heske
      realTestimonials[4],  // Kodeli
      realTestimonials[18]  // Läubli Daniel
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'kilchberg': {
    title: 'Bäderberg in Kilchberg',
    description: 'Bad, Küche und Innenausbau in Kilchberg',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau – hochwertig geplant und präzise ausgeführt.',
      kuechenumbau: 'Offene Wohnküchen oder klassische Küchen – individuell nach Ihren Wünschen.',
      innenausbau: 'Innenausbau mit Auge fürs Detail.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[0],  // Motorcycle Driver
      realTestimonials[11], // Benjamin Tacquet
      realTestimonials[6]   // Patricia Schmid
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'kuesnacht': {
    title: 'Bäderberg in Küsnacht',
    description: 'Bad, Küche und Innenausbau in Küsnacht',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau mit hochwertigen Materialien und sorgfältiger Planung.',
      kuechenumbau: 'Massgeschneiderte Küchen individuell nach Ihren Wünschen.',
      innenausbau: 'Innenausbau und individuelle Raumkonzepte.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[2],  // Christian Hess
      realTestimonials[5],  // Derk Mous
      realTestimonials[9]   // Lionel Sigrist
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'meilen': {
    title: 'Bäderberg in Meilen',
    description: 'Bad, Küche und Innenausbau in Meilen',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau – funktional und schön.',
      kuechenumbau: 'Küchen individuell nach Ihren Wünschen geplant.',
      innenausbau: 'Gäste-WCs und Wohnraumumbauten – fachgerecht umgesetzt.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[8],  // Márton Szőnyi
      realTestimonials[1],  // Nicoleta Salvadori-Curniuc
      realTestimonials[10]  // Claudio Hofer
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
    ],
    contact: {
      phone: '+41 76 753 44 78',
      email: 'info@baederberg.ch',
      address: {
        street: 'Zugerstrasse 18',
        city: 'Richterswil'
      }
    }
  },
  'erlenbach': {
    title: 'Bäderberg in Erlenbach',
    description: 'Bad, Küche und Innenausbau in Erlenbach',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: {
      badumbau: 'Badumbau mit hochwertigen Materialien. Sorgfältig geplant.',
      kuechenumbau: 'Küchen individuell nach Ihren Wünschen.',
      innenausbau: 'Duschbäder und individuelle Raumgestaltungen.'
    },
    whyUs: [
      'Alles aus einer Hand',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[17], // Albert Peter
      realTestimonials[19], // Marzia Mura
      realTestimonials[7]   // Boris Radoicic
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Umbau?',
        answer: 'Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab.'
      },
      {
        question: 'Brauche ich eine Baugenehmigung?',
        answer: 'Für die meisten Umbauten ist keine Baugenehmigung nötig. Wir prüfen das für Sie und beraten Sie zu den Anforderungen.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden und weiter in Ihrer Wohnung leben können.'
      },
      {
        question: 'Was ist im Preis inbegriffen?',
        answer: 'Planung, Material, Einbau, Elektro- und Sanitärarbeiten sowie Entsorgung. Wir besprechen alle Kosten vorab transparent mit Ihnen.'
      },
      {
        question: 'Wie gehen Sie mit unvorhergesehenen Problemen um?',
        answer: 'Sollten während des Umbaus Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen gemeinsam.'
      }
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

const RegionPage = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const region = regionData[regionId as keyof typeof regionData];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Bäderberg - ${region?.title || 'Region'}`;
  }, [region]);

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Region nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Die gesuchte Region ist nicht verfügbar.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url('${region.heroImage}')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">{region.title}</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">{region.description}</p>
          <a href="#contact" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Unsere Leistungen in {region.contact.address.city}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Badumbau */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Badumbau</h3>
              <p className="text-gray-600 mb-6">{region.services.badumbau}</p>
              <Link to="/badumbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Küchenumbau */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Küchenumbau</h3>
              <p className="text-gray-600 mb-6">{region.services.kuechenumbau}</p>
              <Link to="/kuechenumbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Innenausbau */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innenausbau</h3>
              <p className="text-gray-600 mb-6">{region.services.innenausbau}</p>
              <Link to="/innenausbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Warum Bäderberg in {region.contact.address.city}?</h2>
            
            <ul className="space-y-4">
              {region.whyUs.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-lg text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Was unsere Kunden sagen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {region.testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                project={testimonial.project}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Häufige Fragen</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {region.faq.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Kontaktieren Sie uns</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? Kontaktieren Sie uns:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{region.contact.address.street}</p>
                      <p className="text-gray-600">{region.contact.address.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href={`tel:${region.contact.phone}`} className="text-gray-800 hover:text-primary transition-colors">
                      {region.contact.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href={`mailto:${region.contact.email}`} className="text-gray-800 hover:text-primary transition-colors">
                      {region.contact.email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Anfrage senden</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
                  >
                    Anfrage senden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Regions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Weitere Regionen</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {Object.keys(regionData)
              .filter(key => key !== regionId)
              .map((key) => (
                <Link
                  key={key}
                  to={`/region/${key}`}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary hover:shadow-md transition-all text-center"
                >
                  <span className="text-gray-800 hover:text-primary transition-colors font-medium">
                    {regionData[key].contact.address.city}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export { RegionPage };
