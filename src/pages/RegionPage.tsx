import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { realTestimonials } from '@/data/testimonials';
import { usePublicContent } from '@/cms/context/ContentProvider';
import SEOHead from '@/components/SEOHead';
import zurichHero from '@/assets/regions/zurich-interior.jpg';
import richterswilHero from '@/assets/regions/richterswil-interior.jpg';
import pfaffikonHero from '@/assets/regions/pfaffikon-interior.jpg';

interface RegionData {
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
}

// Default contact info shared across all regions
const defaultContact = {
  phone: '+41 76 753 44 78',
  email: 'info@baederberg.ch',
  address: {
    street: 'Zugerstrasse 18',
    city: 'Richterswil'
  }
};

// Default FAQ shared across regions
const defaultFaq = [
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
];

// Default why us points
const defaultWhyUs = [
  'Alles aus einer Hand – vom ersten Gespräch bis zur Übergabe',
  '5 Jahre Garantie auf unsere Handwerksleistungen',
  'Sorgfältige Arbeit mit hochwertigen Materialien',
  'Transparente Preise ohne versteckte Kosten'
];

// Default services text
const defaultServices = {
  badumbau: 'Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt.',
  kuechenumbau: 'Neue Küche? Wir planen, bauen ein und kümmern uns um Elektro und Anschlüsse. Alles aus einer Hand.',
  innenausbau: 'Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um.'
};

// Static fallback data for regions (used when CMS data is not available)
const fallbackRegionData: Record<string, RegionData> = {
  'zurich': {
    title: 'Bäderberg in Zürich',
    description: 'Bad, Küche und Innenausbau in Zürich',
    heroImage: zurichHero,
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[2],
      realTestimonials[0],
      realTestimonials[4]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'richterswil': {
    title: 'Bäderberg in Richterswil',
    description: 'Bad, Küche und Innenausbau in Richterswil',
    heroImage: richterswilHero,
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[1],
      realTestimonials[6],
      realTestimonials[5]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'waedenswil': {
    title: 'Bäderberg in Wädenswil',
    description: 'Bad, Küche und Innenausbau in Wädenswil',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[15],
      realTestimonials[9],
      realTestimonials[8]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'lachen': {
    title: 'Bäderberg in Lachen',
    description: 'Bad, Küche und Innenausbau in Lachen',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[10],
      realTestimonials[17],
      realTestimonials[11]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'pfaeffikon': {
    title: 'Bäderberg in Pfäffikon SZ',
    description: 'Bad, Küche und Innenausbau in Pfäffikon SZ',
    heroImage: pfaffikonHero,
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[3],
      realTestimonials[13],
      realTestimonials[7]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'zollikon': {
    title: 'Bäderberg in Zollikon',
    description: 'Bad, Küche und Innenausbau in Zollikon',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[12],
      realTestimonials[4],
      realTestimonials[18]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'kilchberg': {
    title: 'Bäderberg in Kilchberg',
    description: 'Bad, Küche und Innenausbau in Kilchberg',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[0],
      realTestimonials[11],
      realTestimonials[6]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'kuesnacht': {
    title: 'Bäderberg in Küsnacht',
    description: 'Bad, Küche und Innenausbau in Küsnacht',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[2],
      realTestimonials[5],
      realTestimonials[9]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'meilen': {
    title: 'Bäderberg in Meilen',
    description: 'Bad, Küche und Innenausbau in Meilen',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[8],
      realTestimonials[1],
      realTestimonials[10]
    ],
    faq: defaultFaq,
    contact: defaultContact
  },
  'erlenbach': {
    title: 'Bäderberg in Erlenbach',
    description: 'Bad, Küche und Innenausbau in Erlenbach',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    services: defaultServices,
    whyUs: defaultWhyUs,
    testimonials: [
      realTestimonials[17],
      realTestimonials[19],
      realTestimonials[7]
    ],
    faq: defaultFaq,
    contact: defaultContact
  }
};

// Custom hook to fetch region data from CMS
function useRegionData(regionId: string | undefined) {
  const { content, isLoading } = usePublicContent();
  
  return useMemo(() => {
    if (!regionId) {
      return { region: null, isLoading };
    }

    // Try to get CMS data for this specific region
    const cmsRegionData = content?.region?.[regionId];
    
    if (cmsRegionData) {
      // Merge CMS data with defaults
      const region: RegionData = {
        title: cmsRegionData.title || fallbackRegionData[regionId]?.title || `Bäderberg in ${regionId}`,
        description: cmsRegionData.description || fallbackRegionData[regionId]?.description || '',
        heroImage: cmsRegionData.heroImage || fallbackRegionData[regionId]?.heroImage || '',
        services: {
          badumbau: cmsRegionData.services?.badumbau || cmsRegionData.badumbauText || defaultServices.badumbau,
          kuechenumbau: cmsRegionData.services?.kuechenumbau || cmsRegionData.kuechenumbauText || defaultServices.kuechenumbau,
          innenausbau: cmsRegionData.services?.innenausbau || cmsRegionData.innenausbauText || defaultServices.innenausbau
        },
        whyUs: cmsRegionData.whyUs?.length > 0 ? cmsRegionData.whyUs : defaultWhyUs,
        testimonials: cmsRegionData.testimonials?.length > 0 
          ? cmsRegionData.testimonials 
          : fallbackRegionData[regionId]?.testimonials || [],
        faq: cmsRegionData.faq?.length > 0 ? cmsRegionData.faq : defaultFaq,
        contact: cmsRegionData.contact || defaultContact
      };
      return { region, isLoading };
    }

    // Fall back to static data
    const fallbackData = fallbackRegionData[regionId];
    return { region: fallbackData || null, isLoading };
  }, [regionId, content, isLoading]);
}

const RegionPage = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const { region, isLoading } = useRegionData(regionId);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [region]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Laden...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Region nicht gefunden</h1>
            <p className="text-muted-foreground mb-8">Die gesuchte Region ist nicht verfügbar.</p>
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              Zurück zur Startseite <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${region.title} - Bäderberg`}
        description={region.description}
      />
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url('${region.heroImage}')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">{region.title}</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">{region.description}</p>
          <a href="#contact" className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Unsere Leistungen in {region.contact.address.city}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Badumbau */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Badumbau</h3>
              <p className="text-muted-foreground mb-6">{region.services.badumbau}</p>
              <Link to="/badumbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Küchenumbau */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Küchenumbau</h3>
              <p className="text-muted-foreground mb-6">{region.services.kuechenumbau}</p>
              <Link to="/kuechenumbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Innenausbau */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Innenausbau</h3>
              <p className="text-muted-foreground mb-6">{region.services.innenausbau}</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-8">Warum Bäderberg in {region.contact.address.city}?</h2>
            
            <ul className="space-y-4">
              {region.whyUs.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-lg text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      {region.testimonials.length > 0 && (
        <section id="testimonials" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-10">Was unsere Kunden sagen</h2>
            
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
      )}
      
      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">Häufige Fragen</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {region.faq.map((item, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Kontaktieren Sie uns</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? Kontaktieren Sie uns:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{region.contact.address.street}</p>
                      <p className="text-muted-foreground">{region.contact.address.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href={`tel:${region.contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                      {region.contact.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a href={`mailto:${region.contact.email}`} className="text-foreground hover:text-primary transition-colors">
                      {region.contact.email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-background p-8 rounded-lg shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-6">Anfrage senden</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">E-Mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Nachricht</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
                  >
                    Anfrage senden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export { RegionPage };
