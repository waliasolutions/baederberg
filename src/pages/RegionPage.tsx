import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialCard from '@/components/TestimonialCard';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { realTestimonials } from '@/data/testimonials';
import { usePublicContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';
import SEOHead from '@/components/SEOHead';
import zurichHero from '@/assets/regions/zurich-interior.jpg';
import richterswilHero from '@/assets/regions/richterswil-interior.jpg';
import pfaffikonHero from '@/assets/regions/pfaffikon-interior.jpg';

interface RegionData {
  title: string;
  description: string;
  heroImage: string;
  metaTitle?: string;
  metaDescription?: string;
  services: {
    badumbau: string;
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

// Get defaults from SSOT (schema.ts)
const regionDefaults = defaultContent.regionDefaults;

// Static hero images for specific regions
const regionHeroImages: Record<string, string> = {
  'zurich': zurichHero,
  'richterswil': richterswilHero,
  'pfaeffikon': pfaffikonHero,
};

// Static testimonials assignments for regions (when CMS has none)
const regionTestimonialFallback: Record<string, number[]> = {
  'zurich': [2, 0, 4],
  'richterswil': [1, 6, 5],
  'waedenswil': [15, 9, 8],
  'lachen': [10, 17, 11],
  'pfaeffikon': [3, 13, 7],
  'zollikon': [12, 4, 18],
  'kilchberg': [0, 11, 6],
  'kuesnacht': [2, 5, 9],
  'meilen': [8, 1, 10],
  'erlenbach': [17, 19, 7],
};

// Custom hook to fetch region data from CMS with SSOT fallbacks
function useRegionData(regionId: string | undefined) {
  const { content, isLoading } = usePublicContent();
  
  return useMemo(() => {
    if (!regionId) {
      return { region: null, isLoading };
    }

    // Try to get CMS data for this specific region
    const cmsRegionData = content?.region?.[regionId];
    
    // Get testimonials from fallback if not in CMS
    const testimonialIndices = regionTestimonialFallback[regionId] || [0, 1, 2];
    const fallbackTestimonials = testimonialIndices.map(i => realTestimonials[i]).filter(Boolean);
    
    // Get hero image from static map or use generic
    const fallbackHeroImage = regionHeroImages[regionId] || 
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
    
    if (cmsRegionData) {
      // Merge CMS data with SSOT defaults, prioritizing CMS content
      const region: RegionData = {
        title: cmsRegionData.title || `Bäderberg in ${regionId}`,
        description: cmsRegionData.description || '',
        heroImage: cmsRegionData.heroImage || fallbackHeroImage,
        metaTitle: cmsRegionData.metaTitle || `${cmsRegionData.title || `Bäderberg in ${regionId}`} - Bäderberg`,
        metaDescription: cmsRegionData.metaDescription || cmsRegionData.description || '',
        services: {
          badumbau: cmsRegionData.services?.badumbau || regionDefaults.services.badumbau,
          innenausbau: cmsRegionData.services?.innenausbau || regionDefaults.services.innenausbau
        },
        whyUs: Array.isArray(cmsRegionData.whyUs) && cmsRegionData.whyUs.length > 0 
          ? cmsRegionData.whyUs 
          : regionDefaults.whyUs,
        testimonials: Array.isArray(cmsRegionData.testimonials) && cmsRegionData.testimonials.length > 0 
          ? cmsRegionData.testimonials 
          : fallbackTestimonials,
        faq: Array.isArray(cmsRegionData.faq) && cmsRegionData.faq.length > 0 
          ? cmsRegionData.faq 
          : regionDefaults.faq,
        contact: cmsRegionData.contact || regionDefaults.contact
      };
      return { region, isLoading };
    }

    // No CMS data - create minimal fallback from SSOT defaults
    const region: RegionData = {
      title: `Bäderberg in ${regionId.charAt(0).toUpperCase() + regionId.slice(1)}`,
      description: `Bad und Innenausbau in ${regionId.charAt(0).toUpperCase() + regionId.slice(1)}`,
      heroImage: fallbackHeroImage,
      metaTitle: `Bäderberg in ${regionId.charAt(0).toUpperCase() + regionId.slice(1)} - Bäderberg`,
      metaDescription: `Bad und Innenausbau in ${regionId.charAt(0).toUpperCase() + regionId.slice(1)}`,
      services: regionDefaults.services,
      whyUs: regionDefaults.whyUs,
      testimonials: fallbackTestimonials,
      faq: regionDefaults.faq,
      contact: regionDefaults.contact
    };
    
    return { region, isLoading };
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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Region nicht gefunden</h1>
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

  // Get city name from contact or extract from title
  const cityName = region.contact?.address?.city || region.title.replace('Bäderberg in ', '');

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={region.metaTitle || `${region.title} - Bäderberg`}
        description={region.metaDescription || region.description}
      />
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url('${region.heroImage}')` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center items-start relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 break-words hyphens-auto max-w-full">{region.title}</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">{region.description}</p>
          <a href="#contact" className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Kontakt aufnehmen <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Services Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">Unsere Leistungen in {cityName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Badumbau */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Badumbau</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">{region.services.badumbau}</p>
              <Link to="/badumbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Innenausbau */}
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Innenausbau</h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">{region.services.innenausbau}</p>
              <Link to="/innenausbau" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Warum Bäderberg in {cityName}?</h2>
            
            <ul className="space-y-4">
              {region.whyUs.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span className="text-base md:text-lg text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      {region.testimonials.length > 0 && (
        <section id="testimonials" className="py-16 bg-secondary">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Was unsere Kunden sagen</h2>
            
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
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Häufige Fragen</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {region.faq.map((item, index) => (
                <div key={index} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{item.question}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Kontaktieren Sie uns</h2>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
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
                    <a href={`tel:${region.contact.phone.replace(/\s/g, '')}`} className="text-foreground hover:text-primary transition-colors">
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
              
              <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">Kostenlose Beratung</h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base">
                  Rufen Sie uns an oder schreiben Sie uns eine E-Mail. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
                <Link 
                  to="/#contact" 
                  className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors w-full justify-center"
                >
                  Zum Kontaktformular <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default RegionPage;
