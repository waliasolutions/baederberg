
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

interface RegionData {
  [key: string]: {
    title: string;
    description: string;
    serviceDescription: string;
    heroImage: string;
    projects: {
      title: string;
      description: string;
      images: string[];
      tags: string[];
    }[];
    testimonials: {
      quote: string;
      author: string;
      project: string;
    }[];
    contactPerson: {
      name: string;
      position: string;
      phone: string;
      email: string;
    };
    address: {
      street: string;
      city: string;
    };
  };
}

const regionData: RegionData = {
  'zurich': {
    title: 'Bäderberg in Zürich',
    description: 'Wir sind Ihr lokaler Experte für Bad- und Küchenumbau sowie Innenausbau in Zürich. Mit jahrelanger Erfahrung im Grossraum Zürich kennen wir die lokalen Gegebenheiten und Besonderheiten der Zürcher Architektur.',
    serviceDescription: 'Unsere Leistungen in Zürich umfassen die komplette Palette von der Beratung über die Planung bis zur Umsetzung. Wir berücksichtigen dabei die spezifischen Anforderungen städtischer Wohnräume.',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Penthouse-Bad mit Ausblick',
        description: 'Vollständiger Umbau eines Badezimmers in einem Penthouse mit Panoramablick über Zürich.',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Penthouse', 'Luxus']
      },
      {
        title: 'Moderne Altbauküche',
        description: 'Neugestaltung einer Küche in einer Altbauwohnung unter Beibehaltung des historischen Charakters.',
        images: [
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Küchenumbau', 'Altbau', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Unser neues Badezimmer ist ein absoluter Traum geworden. Das Team von Bäderberg hat hervorragende Arbeit geleistet und alle unsere Wünsche berücksichtigt.',
        author: 'Familie Schmid',
        project: 'Badumbau'
      },
      {
        quote: 'Die Zusammenarbeit war von Anfang bis Ende professionell und unkompliziert. Wir sind mit unserer neuen Küche mehr als zufrieden.',
        author: 'Peter und Monika Herzog',
        project: 'Küchenumbau'
      }
    ],
    contactPerson: {
      name: 'Michael Becker',
      position: 'Regionalleiter Zürich',
      phone: '+41 44 123 45 67',
      email: 'zuerich@baederberg.ch'
    },
    address: {
      street: 'Bahnhofstrasse 100',
      city: '8000 Zürich'
    }
  },
  // Add similar data structures for other regions
  'richterswil': {
    title: 'Bäderberg in Richterswil',
    description: 'In Richterswil bieten wir massgeschneiderte Lösungen für Ihre Umbauvorhaben. Wir verstehen die spezifischen Bedürfnisse der Region und setzen diese mit Schweizer Präzision um.',
    serviceDescription: 'Vom ersten Konzept bis zur finalen Umsetzung begleiten wir Ihr Projekt in Richterswil mit unserer Fachkompetenz und jahrelangen Erfahrung in der Region.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Seesicht-Badezimmer',
        description: 'Komplette Neugestaltung eines Badezimmers mit Blick auf den Zürichsee.',
        images: [
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1604014438289-3b23c7f2e4e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Seesicht', 'Naturstein']
      }
    ],
    testimonials: [
      {
        quote: 'Die Arbeit von Bäderberg hat unsere Erwartungen übertroffen. Besonders die Termintreue und die Sauberkeit auf der Baustelle haben uns beeindruckt.',
        author: 'Familie Meier',
        project: 'Badumbau'
      }
    ],
    contactPerson: {
      name: 'Sandra Weber',
      position: 'Regionalleiter Richterswil',
      phone: '+41 44 123 45 68',
      email: 'richterswil@baederberg.ch'
    },
    address: {
      street: 'Hauptstrasse 25',
      city: '8805 Richterswil'
    }
  },
  // Placeholder for other regions
  'default': {
    title: 'Bäderberg in Ihrer Region',
    description: 'Wir sind Ihr lokaler Experte für Bad- und Küchenumbau sowie Innenausbau in der gesamten Schweiz.',
    serviceDescription: 'Unsere Leistungen umfassen die komplette Palette von der Beratung über die Planung bis zur Umsetzung. Wir berücksichtigen dabei die spezifischen lokalen Anforderungen.',
    heroImage: 'https://images.unsplash.com/photo-1595514535215-9a5e0e8e39bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Badezimmer-Renovation',
        description: 'Vollständiger Umbau eines Badezimmers in modernem Design.',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        ],
        tags: ['Badumbau', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Professionelle Arbeit vom Anfang bis zum Ende. Wir sind sehr zufrieden mit dem Ergebnis.',
        author: 'Zufriedener Kunde',
        project: 'Badumbau'
      }
    ],
    contactPerson: {
      name: 'Kundenservice',
      position: 'Zentrale',
      phone: '+41 44 123 45 67',
      email: 'info@baederberg.ch'
    },
    address: {
      street: 'Musterstrasse 123',
      city: '8000 Zürich'
    }
  }
};

const RegionPage = () => {
  const { regionId = '' } = useParams<{ regionId: string }>();
  
  const region = regionData[regionId] || regionData.default;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [regionId]);
  
  return (
    <>
      <Header />
      
      <main className="pt-20">
        <section 
          className="relative h-[60vh] min-h-[400px] flex items-center justify-center"
          style={{ 
            backgroundImage: `url('${region.heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="container relative z-10 px-6 md:px-12 text-center">
            <div className="animate-fade-in">
              <div className="inline-block px-3 py-1 mb-6 text-sm text-white/80 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
                Willkommen bei Bäderberg
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                {region.title}
              </h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 mb-10">
                {region.description}
              </p>
              
              <Link 
                to="#contact" 
                className="px-8 py-4 bg-white text-black rounded-full hover:shadow-lg hover:-translate-y-1 transition-medium text-lg font-medium inline-block"
              >
                Jetzt kostenlos beraten lassen
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-slide-in-right">
                <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full">
                  {regionId} | Unsere Leistungen
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Hochwertige Renovierungen in {regionId}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {region.serviceDescription}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                      <ChevronRight size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Badumbau</h4>
                      <p className="text-sm text-muted-foreground">
                        Von der kleinen Modernisierung bis zum kompletten Luxus-Wellnessbad.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                      <ChevronRight size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Küchenumbau</h4>
                      <p className="text-sm text-muted-foreground">
                        Funktionale und ästhetische Küchenlösungen nach Ihren individuellen Wünschen.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                      <ChevronRight size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Innenausbau</h4>
                      <p className="text-sm text-muted-foreground">
                        Massgeschneiderte Lösungen für alle Bereiche Ihres Zuhauses.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="#contact" 
                  className="px-6 py-3 bg-primary text-white rounded-lg inline-block hover:shadow-lg transition-medium"
                >
                  Kontaktieren Sie uns
                </Link>
              </div>
              
              <div className="order-1 lg:order-2 animate-fade-in">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-64 h-64 bg-secondary rounded-lg -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt={`Bäderberg in ${regionId}`}
                    className="rounded-lg shadow-xl relative z-10 w-full"
                  />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-secondary/30">
          <div className="container px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full">
                Referenzen in {regionId}
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Unsere Projekte in Ihrer Region
              </h3>
              <p className="text-muted-foreground text-lg">
                Entdecken Sie einige unserer abgeschlossenen Projekte in {regionId} und lassen Sie sich inspirieren.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.projects.map((project, index) => (
                <div 
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    location={regionId}
                    description={project.description}
                    images={project.images}
                    tags={project.tags}
                    index={index}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/" 
                className="px-6 py-3 bg-primary text-white rounded-lg inline-block hover:shadow-lg transition-medium"
              >
                Alle Projekte anzeigen
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full">
                Kundenstimmen
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Was unsere Kunden in {regionId} sagen
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <TestimonialCard
                    quote={testimonial.quote}
                    author={testimonial.author}
                    location={regionId}
                    project={testimonial.project}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-24 bg-secondary/30">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full">
                  Kontakt {regionId}
                </h2>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Ihr persönlicher Ansprechpartner
                </h3>
                <p className="text-muted-foreground mb-8">
                  Unser Team in {regionId} berät Sie gerne zu Ihrem Projekt. Vereinbaren Sie einen Termin für eine kostenlose Beratung.
                </p>
                
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-xl font-bold">
                      {region.contactPerson.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{region.contactPerson.name}</h4>
                      <p className="text-muted-foreground">{region.contactPerson.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Phone size={16} />
                      </div>
                      <p>{region.contactPerson.phone}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mail size={16} />
                      </div>
                      <p>{region.contactPerson.email}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={16} />
                      </div>
                      <p>
                        {region.address.street}<br />
                        {region.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-slide-in-right">
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h4 className="text-xl font-semibold mb-6">Kontaktieren Sie uns</h4>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1">
                        Leistung
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Badumbau">Badumbau</option>
                        <option value="Küchenumbau">Küchenumbau</option>
                        <option value="Innenausbau">Innenausbau</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-medium"
                    >
                      Anfrage senden
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default RegionPage;
