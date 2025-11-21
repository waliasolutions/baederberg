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
      badumbau: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt, mit Garantie.',
      kuechenumbau: 'Neue Küche? Wir planen, bauen ein und kümmern uns um Elektro und Anschlüsse. Alles aus einer Hand.',
      innenausbau: 'Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um.'
    },
    whyUs: [
      'Alles aus einer Hand – vom ersten Gespräch bis zur Übergabe',
      '5 Jahre Garantie auf unsere Handwerksleistungen',
      'Sorgfältige Arbeit mit hochwertigen Materialien',
      'Erfahrung mit Altbauten und modernen Wohnungen in Zürich'
    ],
    testimonials: [
      realTestimonials[2],  // Christian Hess
      realTestimonials[0],  // Motorcycle Driver
      realTestimonials[4]   // Kodeli
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Badumbau?',
        answer: 'Je nach Umfang dauert ein Badumbau zwischen 3 und 6 Wochen. Wir erstellen vor Beginn einen Zeitplan mit Ihnen.'
      },
      {
        question: 'Brauche ich für einen Badumbau eine Genehmigung?',
        answer: 'Für die meisten Badumbauten ist keine Baugenehmigung nötig. Wir beraten Sie zu den Anforderungen für Ihr Projekt.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir haben viel Erfahrung mit Renovierungen in bewohnten Räumen. Wir planen die Arbeiten so, dass Sie möglichst wenig gestört werden.'
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
      badumbau: 'Badumbau am Zürichsee – individuell geplant und professionell ausgeführt. Mit Garantie.',
      kuechenumbau: 'Küchenumbau mit allem drum und dran. Wir koordinieren alle Gewerke für Sie.',
      innenausbau: 'Möbeleinbau, Böden, Wandverkleidungen – alles fachgerecht umgesetzt.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Erfahrung mit Häusern am Hang und besonderen Gegebenheiten',
      'Zuverlässige Termine und Absprachen',
      'Hochwertige Materialien und saubere Arbeit'
    ],
    testimonials: [
      realTestimonials[1],  // Nicoleta Salvadori-Curniuc
      realTestimonials[6],  // Patricia Schmid
      realTestimonials[5]   // Derk Mous
    ],
    faq: [
      {
        question: 'Könnt ihr auch an Hanglage arbeiten?',
        answer: 'Ja, wir haben viel Erfahrung mit Häusern am Hang in Richterswil und kennen die Herausforderungen.'
      },
      {
        question: 'Wie lange dauert ein Badumbau bei euch?',
        answer: 'Ein normaler Badumbau dauert bei uns etwa 4 bis 7 Wochen, je nach Größe und Aufwand.'
      },
      {
        question: 'Helft ihr auch bei der Planung?',
        answer: 'Natürlich! Wir beraten Sie gerne bei der Gestaltung und finden gemeinsam die beste Lösung für Ihre Räume.'
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
      badumbau: 'Kompletter Badumbau – persönlich geplant, fachgerecht ausgeführt. Mit 5 Jahren Garantie.',
      kuechenumbau: 'Küchen nach Maß. Wir planen, bauen und montieren – alles aus einer Hand.',
      innenausbau: 'Raumgestaltung und Möbeleinbau. Professionell umgesetzt, zuverlässig fertiggestellt.'
    },
    whyUs: [
      'Alles aus einer Hand – eine Anlaufstelle für Ihr Projekt',
      'Transparente Planung mit klaren Zeitplänen',
      'Fachkundige Beratung für passende Lösungen',
      '5 Jahre Garantie'
    ],
    testimonials: [
      realTestimonials[15], // Coiffure Vogue Wädenswil
      realTestimonials[9],  // Lionel Sigrist
      realTestimonials[8]   // Márton Szőnyi
    ],
    faq: [
      {
        question: 'Kann ich während des Umbaus in der Wohnung bleiben?',
        answer: 'Ja, in den meisten Fällen ist das möglich. Wir planen die Arbeiten so, dass Sie möglichst wenig eingeschränkt werden.'
      },
      {
        question: 'Wie lange dauert ein Küchenumbau?',
        answer: 'Eine Küche braucht etwa 3-5 Wochen für den Umbau, je nach Größe und Umfang der Arbeiten.'
      },
      {
        question: 'Kümmert ihr euch um alles?',
        answer: 'Ja, wir sind Ihr Ansprechpartner für alle Gewerke und koordinieren den gesamten Umbau für Sie.'
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
      kuechenumbau: 'Ihre neue Küche – individuell geplant, fachgerecht eingebaut, mit Garantie.',
      innenausbau: 'Innenausbau nach Ihren Wünschen. Böden, Wände, Einbauten – alles aus einer Hand.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Pünktliche Umsetzung und regelmäßige Information',
      'Erfahrene Handwerker mit Auge fürs Detail',
      'Transparente Preise ohne versteckte Kosten'
    ],
    testimonials: [
      realTestimonials[10], // Claudio Hofer
      realTestimonials[17], // Albert Peter
      realTestimonials[11]  // Benjamin Tacquet
    ],
    faq: [
      {
        question: 'Kommen auch versteckte Kosten auf mich zu?',
        answer: 'Wir bemühen uns um transparente Preise. Sollten während des Umbaus unvorhersehbare Probleme auftauchen, informieren wir Sie sofort und besprechen das weitere Vorgehen.'
      },
      {
        question: 'Wie läuft der erste Beratungstermin ab?',
        answer: 'Beim ersten Termin schauen wir uns Ihre Räume an, hören Ihre Wünsche und geben erste Ideen. Anschließend erarbeiten wir einen konkreten Vorschlag mit Kostenrahmen.'
      },
      {
        question: 'Arbeitet ihr mit lokalen Lieferanten?',
        answer: 'Ja, wir arbeiten wo möglich mit Partnern aus der Region zusammen und unterstützen so die lokale Wirtschaft.'
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
      badumbau: 'Badumbau in Pfäffikon – barrierefrei oder modern, individuell nach Ihren Bedürfnissen.',
      kuechenumbau: 'Küchenumbau mit Planung und Montage. Wir kümmern uns um alles.',
      innenausbau: 'Umbau und Sanierung von Wohnräumen. Fachgerecht und zuverlässig.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Verlässliche Planung und Einhaltung von Zeitplänen',
      'Erfahrene Handwerker mit Liebe zum Detail',
      'Beratung zu Fördermitteln für barrierefreie Umbauten'
    ],
    testimonials: [
      realTestimonials[3],  // Acilas Physiotherapie
      realTestimonials[13], // Katharina Gut
      realTestimonials[7]   // Boris Radoicic
    ],
    faq: [
      {
        question: 'Welche Fördermittel gibt es für barrierefreie Umbauten?',
        answer: 'Es gibt verschiedene Möglichkeiten zur Förderung, besonders für altersgerechte Umbauten. Wir beraten Sie gerne zu den aktuellen Optionen.'
      },
      {
        question: 'Wie lange dauert ein Küchenumbau bei Ihnen?',
        answer: 'Je nach Umfang rechnen Sie mit 2-4 Wochen. Darin ist alles enthalten: Demontage, eventuell nötige Elektro- und Sanitärarbeiten, Einbau der neuen Küche und Feinarbeiten.'
      },
      {
        question: 'Kann ich meine alten Geräte behalten?',
        answer: 'Ja, wenn sie noch in gutem Zustand sind und zu Ihren neuen Möbeln passen, können wir bestehende Geräte in die neue Küche integrieren.'
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
      badumbau: 'Badumbau mit hochwertigen Materialien und Schweizer Präzision. Individuell geplant.',
      kuechenumbau: 'Küchenumbau auf höchstem Niveau – mit exklusiver Ausstattung und perfekter Ausführung.',
      innenausbau: 'Innenausbau für anspruchsvolle Wohnungen. Hochwertig und detailgenau.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Premium-Materialien und erstklassige Ausführung',
      'Diskrete Arbeitsweise mit minimalen Störungen',
      'Massgeschneiderte Lösungen für Ihre Wünsche'
    ],
    testimonials: [
      realTestimonials[12], // Kay Moeller-Heske
      realTestimonials[4],  // Kodeli
      realTestimonials[18]  // Läubli Daniel
    ],
    faq: [
      {
        question: 'Können Sie auch besondere Materialwünsche erfüllen?',
        answer: 'Natürlich, wir arbeiten mit exklusiven Lieferanten zusammen und können nahezu jeden Materialwunsch erfüllen.'
      },
      {
        question: 'Wie wird der Baulärm minimiert?',
        answer: 'Wir nutzen modernste Werkzeuge und Techniken zur Lärmreduzierung und stimmen laute Arbeiten mit Ihnen ab.'
      },
      {
        question: 'Übernehmen Sie auch die Inneneinrichtung?',
        answer: 'Ja, auf Wunsch arbeiten wir mit renommierten Innenarchitekten zusammen, um ein stimmiges Gesamtkonzept zu erstellen.'
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
      badumbau: 'Badumbau mit Stil – hochwertig geplant und präzise ausgeführt.',
      kuechenumbau: 'Offene Wohnküchen oder klassische Küchen – individuell nach Ihren Wünschen.',
      innenausbau: 'Innenausbau mit Auge fürs Detail. Für Räume mit Charakter.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Designkompetenz und Gespür für Ästhetik',
      'Qualitätshandwerk mit Liebe zum Detail',
      'Termintreue und Budgeteinhaltung'
    ],
    testimonials: [
      realTestimonials[0],  // Motorcycle Driver
      realTestimonials[11], // Benjamin Tacquet
      realTestimonials[6]   // Patricia Schmid
    ],
    faq: [
      {
        question: 'Können Sie auch nach Feng Shui planen?',
        answer: 'Ja, wir haben Erfahrung mit Feng Shui und berücksichtigen diese Prinzipien gerne in der Planung Ihrer Räume.'
      },
      {
        question: 'Bieten Sie auch eine 3D-Visualisierung an?',
        answer: 'Natürlich, wir erstellen für Sie realistische 3D-Visualisierungen, damit Sie sich Ihr neues Bad oder Ihre neue Küche besser vorstellen können.'
      },
      {
        question: 'Wie lange dauert ein kompletter Küchenumbau?',
        answer: 'Ein umfassender Küchenumbau dauert in der Regel 4-6 Wochen. Wir planen den Ablauf so, dass Sie möglichst wenig Einschränkungen haben.'
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
      badumbau: 'Exklusive Badumbauten mit edlen Materialien und intelligenter Technik.',
      kuechenumbau: 'Massgeschneiderte Küchen mit Naturstein und hochwertigen Geräten.',
      innenausbau: 'Spa-Bereiche, Wellnesszonen und individuelle Raumkonzepte.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Exklusive Materialien für langlebige Qualität',
      'Höchste Präzision in der Ausführung',
      'Persönliche Betreuung durch einen festen Ansprechpartner'
    ],
    testimonials: [
      realTestimonials[2],  // Christian Hess
      realTestimonials[5],  // Derk Mous
      realTestimonials[9]   // Lionel Sigrist
    ],
    faq: [
      {
        question: 'Arbeiten Sie auch mit eigenen Innenarchitekten zusammen?',
        answer: 'Ja, wir kooperieren gerne mit Ihrem Innenarchitekten oder empfehlen Ihnen bei Bedarf einen aus unserem Netzwerk.'
      },
      {
        question: 'Können Sie auch besondere Materialien importieren?',
        answer: 'Natürlich, wir haben Zugang zu exklusiven Materialien aus aller Welt und organisieren den Import für Ihr Projekt.'
      },
      {
        question: 'Bieten Sie auch Smart-Home-Integration an?',
        answer: 'Ja, wir integrieren moderne Smart-Home-Technologien in Ihre Bäder und Küchen für mehr Komfort und Effizienz.'
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
      badumbau: 'Moderner Badumbau – funktional und schön. Mit Garantie.',
      kuechenumbau: 'Küchen mit Seeblick – wir nutzen Ihre Aussicht optimal.',
      innenausbau: 'Gäste-WCs und Wohnraumumbauten – stilsicher umgesetzt.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Lokales Handwerk aus der Region',
      'Zuverlässige Termine und saubere Arbeit',
      'Persönliche Beratung für individuelle Wünsche'
    ],
    testimonials: [
      realTestimonials[8],  // Márton Szőnyi
      realTestimonials[1],  // Nicoleta Salvadori-Curniuc
      realTestimonials[10]  // Claudio Hofer
    ],
    faq: [
      {
        question: 'Wie lange dauert ein Badumbau in Meilen?',
        answer: 'Ein Badumbau dauert in der Regel 3-5 Wochen, abhängig vom Umfang der Arbeiten und den baulichen Gegebenheiten.'
      },
      {
        question: 'Können Sie auch den Rückbau übernehmen?',
        answer: 'Ja, wir kümmern uns um den kompletten Rückbau und die fachgerechte Entsorgung der alten Einrichtung.'
      },
      {
        question: 'Arbeiten Sie auch in bewohnten Räumen?',
        answer: 'Natürlich, wir haben viel Erfahrung mit Umbauten in bewohnten Wohnungen und Häusern und minimieren die Belastung für Sie.'
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
      badumbau: 'Luxuriöse Bäder mit Marmor und hochwertigen Materialien. Perfekt geplant.',
      kuechenumbau: 'Gourmetküchen für Hobbyköche – mit erstklassiger Ausstattung.',
      innenausbau: 'Moderne Duschbäder und individuelle Raumgestaltungen.'
    },
    whyUs: [
      'Alles aus einer Hand',
      'Hochwertige Materialien für langlebige Qualität',
      'Termingerechte Ausführung ohne Verzögerungen',
      'Detailliebe und Präzision'
    ],
    testimonials: [
      realTestimonials[17], // Albert Peter
      realTestimonials[19], // Marzia Mura
      realTestimonials[7]   // Boris Radoicic
    ],
    faq: [
      {
        question: 'Können Sie spezielle Wünsche umsetzen?',
        answer: 'Natürlich, wir spezialisieren uns auf individuelle Lösungen und setzen auch ausgefallene Ideen professionell um.'
      },
      {
        question: 'Arbeiten Sie auch mit bestehenden Möbeln?',
        answer: 'Ja, wir integrieren gerne vorhandene Möbelstücke oder andere Elemente, die Ihnen wichtig sind, in das neue Konzept.'
      },
      {
        question: 'Wie wird der Staub während der Bauarbeiten minimiert?',
        answer: 'Wir arbeiten mit speziellen Staubschutztüren und leistungsstarken Absauganlagen, um die Belastung für Sie so gering wie möglich zu halten.'
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
