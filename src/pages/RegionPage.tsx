
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import { ChevronRight, MapPin, Phone, Mail, ArrowRight, Clock, Shield, Tool } from 'lucide-react';

interface RegionData {
  [key: string]: {
    title: string;
    description: string;
    problem: string;
    agitation: string;
    solution: string;
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
    benefits: {
      title: string;
      description: string;
      icon: string;
    }[];
    faq: {
      question: string;
      answer: string;
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
    description: 'Ihr Experte für Bad- und Küchenumbau sowie Innenausbau in Zürich',
    problem: 'Ist Ihr Badezimmer oder Ihre Küche in Zürich veraltet und unattraktiv?',
    agitation: 'In der kosmopolitischen Stadt Zürich spiegelt Ihr Zuhause Ihren Lebensstil wider. Veraltete Bäder und Küchen senken nicht nur den Wert Ihrer Immobilie, sondern beeinträchtigen auch Ihren täglichen Komfort und Ihre Lebensqualität.',
    solution: 'Bäderberg bietet massgeschneiderte Renovierungslösungen speziell für Zürcher Immobilien, mit lokalem Know-how und Schweizer Präzision.',
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
      },
      {
        title: 'Urbanes Loft-Konzept',
        description: 'Komplette Neugestaltung eines Loft-Apartments im Zürcher Industriequartier mit offener Küche und modernem Bad.',
        images: [
          'https://images.unsplash.com/photo-1595514535115-dd5b0d141038?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Komplettumbau', 'Loft', 'Urban']
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
      },
      {
        quote: 'Perfekte Umsetzung unserer Loft-Ideen. Termintreu, budgettreu und mit höchster handwerklicher Qualität.',
        author: 'Stefan Meier',
        project: 'Loft-Renovierung'
      }
    ],
    benefits: [
      {
        title: 'Lokale Expertise',
        description: 'Wir kennen die Bauvorschriften und architektonischen Besonderheiten in Zürich.',
        icon: 'MapPin'
      },
      {
        title: 'Pünktliche Fertigstellung',
        description: 'Wir halten Zeitpläne ein und respektieren Ihre Zeit.',
        icon: 'Clock'
      },
      {
        title: 'Qualitätsgarantie',
        description: '5 Jahre Garantie auf alle unsere Umbauprojekte in Zürich.',
        icon: 'Shield'
      }
    ],
    faq: [
      {
        question: 'Wie lange dauert ein typischer Badumbau in Zürich?',
        answer: 'Je nach Umfang des Projekts dauert ein Badumbau in Zürich zwischen 3 und 6 Wochen. Wir erstellen vor Projektbeginn einen detaillierten Zeitplan.'
      },
      {
        question: 'Benötige ich für einen Badumbau in Zürich eine Baugenehmigung?',
        answer: 'Für die meisten Badumbauten ist keine Baugenehmigung erforderlich, solange keine tragenden Wände entfernt werden. Wir beraten Sie zu den spezifischen Anforderungen Ihres Projekts.'
      },
      {
        question: 'Können Sie auch in bewohnten Wohnungen arbeiten?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Renovierungen in bewohnten Wohnungen. Wir planen die Arbeiten so, dass die Beeinträchtigung für Sie minimal ist.'
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
  'richterswil': {
    title: 'Bäderberg in Richterswil',
    description: 'Ihr lokaler Spezialist für Bäder, Küchen und Innenausbau am Zürichsee',
    problem: 'Benötigt Ihr Zuhause in Richterswil eine Modernisierung, die dem Charme des Zürichsees gerecht wird?',
    agitation: 'Ein veraltetes Bad oder eine unpraktische Küche beeinträchtigt nicht nur Ihren täglichen Komfort, sondern auch den Wert Ihrer Immobilie in der begehrten Seeufer-Region. Die herausfordernde Topographie und spezifischen Bauvorschriften am Zürichsee erfordern besonderes Fachwissen.',
    solution: 'Bäderberg Richterswil vereint lokales Know-how mit höchster Handwerkskunst, um Ihre Räume zu transformieren und dabei den einzigartigen Charakter Ihrer Wohnung am See zu bewahren.',
    serviceDescription: 'In Richterswil bieten wir massgeschneiderte Lösungen für Ihre Umbauvorhaben. Wir verstehen die spezifischen Bedürfnisse der Region und setzen diese mit Schweizer Präzision um.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Seesicht-Badezimmer',
        description: 'Komplette Neugestaltung eines Badezimmers mit Blick auf den Zürichsee und Verwendung natürlicher Materialien.',
        images: [
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1604014438289-3b23c7f2e4e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Seesicht', 'Naturstein']
      },
      {
        title: 'Landhaus-Küche mit modernem Touch',
        description: 'Renovierung einer Küche im traditionellen Landhaus-Stil mit modernen Funktionalitäten und hochwertigen Geräten.',
        images: [
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Küchenumbau', 'Landhaus', 'Modern']
      },
      {
        title: 'Dachgeschoss-Ausbau',
        description: 'Umwandlung eines ungenutzten Dachgeschosses in einen offenen Wohnraum mit Bad-en-suite und eindrucksvoller Seesicht.',
        images: [
          'https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Dachausbau', 'Bad-en-suite', 'Seesicht']
      }
    ],
    testimonials: [
      {
        quote: 'Die Arbeit von Bäderberg hat unsere Erwartungen übertroffen. Besonders die Termintreue und die Sauberkeit auf der Baustelle haben uns beeindruckt.',
        author: 'Familie Meier',
        project: 'Badumbau'
      },
      {
        quote: 'Unsere neue Landhaus-Küche verbindet perfekt Tradition und Moderne. Die Beratung war ausgezeichnet und die Umsetzung präzise.',
        author: 'Christine und Thomas Weber',
        project: 'Küchenumbau'
      },
      {
        quote: 'Der Dachausbau hat unser Haus komplett transformiert. Bäderberg hat aus einem ungenutzten Raum ein wahres Highlight gemacht.',
        author: 'Peter Müller',
        project: 'Dachausbau'
      }
    ],
    benefits: [
      {
        title: 'Seesicht-Expertise',
        description: 'Wir maximieren Ihre Aussicht auf den Zürichsee durch clevere Raumplanung.',
        icon: 'MapPin'
      },
      {
        title: 'Termingarantie',
        description: 'Wir garantieren die Fertigstellung Ihres Projekts zum vereinbarten Zeitpunkt.',
        icon: 'Clock'
      },
      {
        title: 'Regionale Materialien',
        description: 'Wir setzen wo möglich auf Materialien aus der Region für nachhaltige Qualität.',
        icon: 'Tool'
      }
    ],
    faq: [
      {
        question: 'Können Sie bei Häusern am Hang arbeiten?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Renovierungen an Hanglage in Richterswil. Unsere Expertise umfasst die besonderen Herausforderungen solcher Projekte.'
      },
      {
        question: 'Wie lange muss ich für einen Badumbau in Richterswil rechnen?',
        answer: 'Ein typischer Badumbau in Richterswil dauert zwischen 4 und 7 Wochen, je nach Umfang und besonderen Anforderungen.'
      },
      {
        question: 'Bieten Sie auch Beratung zur Optimierung der Seesicht an?',
        answer: 'Absolut. Unsere Planungsexperten berücksichtigen die Seesicht als zentrales Element bei der Gestaltung Ihrer Räume und empfehlen die optimale Positionierung von Fenstern und Glasfronten.'
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
  // Placeholder for other regions with complete content using PAS framework
  'default': {
    title: 'Bäderberg in Ihrer Region',
    description: 'Ihr lokaler Experte für hochwertige Umbauten und Renovierungen',
    problem: 'Kämpfen Sie mit veralteten Räumen, die nicht mehr Ihren aktuellen Bedürfnissen entsprechen?',
    agitation: 'Veraltete Bäder und Küchen sind nicht nur unansehnlich, sondern oft auch ineffizient und energieverschwendend. Sie beeinträchtigen Ihren täglichen Komfort und können sogar Ihren Immobilienwert senken.',
    solution: 'Bäderberg transformiert Ihre Räume mit massgeschneiderten Lösungen, die Funktionalität, Ästhetik und Wert vereinen – termingerecht und budgettreu.',
    serviceDescription: 'Unsere Leistungen umfassen die komplette Palette von der Beratung über die Planung bis zur Umsetzung. Wir berücksichtigen dabei die spezifischen lokalen Anforderungen.',
    heroImage: 'https://images.unsplash.com/photo-1595514535215-9a5e0e8e39bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Badezimmer-Renovation',
        description: 'Vollständiger Umbau eines Badezimmers in modernem Design mit barrierefreiem Zugang.',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Modern', 'Barrierefrei']
      },
      {
        title: 'Offene Wohnküche',
        description: 'Umgestaltung einer abgetrennten Küche in eine offene Wohnküche mit Kochinsel und Essbereich.',
        images: [
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Küchenumbau', 'Offen', 'Wohnküche']
      },
      {
        title: 'Kompletter Innenausbau',
        description: 'Umfassende Renovierung aller Wohnräume mit maßgefertigten Einbauschränken und neuen Bädern.',
        images: [
          'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Innenausbau', 'Komplett', 'Maßanfertigung']
      }
    ],
    testimonials: [
      {
        quote: 'Professionelle Arbeit vom Anfang bis zum Ende. Wir sind sehr zufrieden mit dem Ergebnis.',
        author: 'Zufriedener Kunde',
        project: 'Badumbau'
      },
      {
        quote: 'Die Planung war durchdacht, die Umsetzung präzise und das Ergebnis begeistert uns jeden Tag aufs Neue.',
        author: 'Familie Huber',
        project: 'Küchenumbau'
      },
      {
        quote: 'Von der ersten Beratung bis zur Endabnahme - ein rundum gelungenes Projekt und ein Traumresultat.',
        author: 'Daniel und Sabine Keller',
        project: 'Komplettumbau'
      }
    ],
    benefits: [
      {
        title: 'Regionale Anpassung',
        description: 'Wir berücksichtigen die besonderen Gegebenheiten Ihrer Region.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässige Zeitplanung',
        description: 'Transparente Kommunikation und Einhaltung aller Termine.',
        icon: 'Clock'
      },
      {
        title: 'Schweizer Qualitätsstandard',
        description: 'Höchste Qualität bei Materialien und Ausführung.',
        icon: 'Shield'
      }
    ],
    faq: [
      {
        question: 'Wie läuft der Planungsprozess ab?',
        answer: 'Nach einem ersten Beratungsgespräch erstellen wir ein Konzept mit 3D-Visualisierungen. Nach Ihrer Freigabe folgen detaillierte Pläne und ein verbindlicher Kostenvoranschlag.'
      },
      {
        question: 'Wie lange dauert ein typischer Umbau?',
        answer: 'Ein Badumbau dauert in der Regel 3-6 Wochen, ein Küchenumbau 4-8 Wochen und ein kompletter Innenausbau je nach Größe 2-6 Monate.'
      },
      {
        question: 'Kümmern Sie sich auch um alle behördlichen Genehmigungen?',
        answer: 'Ja, wir übernehmen den gesamten Prozess der Beantragung aller notwendigen Genehmigungen und stehen im Kontakt mit den zuständigen Behörden.'
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
        {/* Hero Section with PAS Framework */}
        <section 
          className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
          style={{ 
            backgroundImage: `url('${region.heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-primary/70" />
          
          <div className="container relative z-10 px-6 md:px-12 text-center max-w-5xl">
            <div className="animate-fade-in space-y-6">
              {/* Problem */}
              <div className="inline-block px-4 py-2 mb-4 text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-md">
                {region.problem}
              </div>
              
              {/* Agitation */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                {region.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {region.agitation}
              </p>
              
              {/* Solution */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-md mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Die Lösung
                </h2>
                <p className="text-white/90">
                  {region.solution}
                </p>
              </div>
              
              <Link 
                to="#contact" 
                className="px-8 py-4 bg-white text-primary rounded-md hover:shadow-lg hover:-translate-y-1 transition-medium text-lg font-medium inline-flex items-center gap-2"
              >
                Kostenlose Beratung anfordern
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services & Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-primary/10 rounded-md">
                  {regionId} | Unsere Leistungen
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                  Hochwertige Renovierungen in {regionId}
                </h3>
                <p className="text-gray-600 mb-8">
                  {region.serviceDescription}
                </p>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md hover:shadow-md transition-medium">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-gray-900">Badumbau</h4>
                      <p className="text-gray-600">
                        Von der kleinen Modernisierung bis zum kompletten Luxus-Wellnessbad.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md hover:shadow-md transition-medium">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-gray-900">Küchenumbau</h4>
                      <p className="text-gray-600">
                        Funktionale und ästhetische Küchenlösungen nach Ihren individuellen Wünschen.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md hover:shadow-md transition-medium">
                    <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <ChevronRight size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-gray-900">Innenausbau</h4>
                      <p className="text-gray-600">
                        Massgeschneiderte Lösungen für alle Bereiche Ihres Zuhauses.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="#contact" 
                  className="px-6 py-3 bg-primary text-white rounded-md inline-flex items-center gap-2 hover:shadow-lg transition-medium"
                >
                  Kontaktieren Sie uns
                  <ArrowRight size={18} />
                </Link>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {region.benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon === 'MapPin' ? MapPin : 
                                        benefit.icon === 'Clock' ? Clock : 
                                        benefit.icon === 'Shield' ? Shield : Tool;
                    
                    return (
                      <div 
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-medium flex flex-col items-center text-center"
                      >
                        <div className="h-14 w-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                          <IconComponent size={28} />
                        </div>
                        <h4 className="text-xl font-medium text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    );
                  })}
                  
                  <div className="bg-primary text-white p-6 rounded-lg shadow-md md:col-span-2">
                    <h4 className="text-xl font-medium mb-3">Kostenlose Beratung</h4>
                    <p className="mb-4">Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch zu Ihrem Projekt in {regionId}.</p>
                    <Link 
                      to="#contact" 
                      className="inline-flex items-center gap-2 text-white font-medium border-b border-white pb-1 hover:pb-2 transition-medium"
                    >
                      Termin vereinbaren
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-primary/10 rounded-md">
                Referenzen in {regionId}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                Unsere Projekte in {regionId}
              </h3>
              <p className="text-gray-600 text-lg">
                Entdecken Sie unsere abgeschlossenen Projekte in {regionId} und lassen Sie sich für Ihre eigene Renovation inspirieren.
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
                className="px-6 py-3 bg-primary text-white rounded-md inline-flex items-center gap-2 hover:shadow-lg transition-medium"
              >
                Alle Projekte anzeigen
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-primary/10 rounded-md">
                Kundenstimmen
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                Was unsere Kunden in {regionId} sagen
              </h3>
              <p className="text-gray-600 text-lg">
                Erfahren Sie, wie unsere Kunden in {regionId} ihre Umbau-Erfahrung mit Bäderberg beschreiben.
              </p>
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
        
        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-primary/10 rounded-md">
                Häufige Fragen
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                Antworten auf Ihre Fragen
              </h3>
              <p className="text-gray-600 text-lg">
                Wir haben die häufigsten Fragen zu Renovierungen in {regionId} für Sie beantwortet.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {region.faq.map((item, index) => (
                <div key={index} className="mb-6 bg-white p-6 rounded-md shadow-sm">
                  <h4 className="text-xl font-medium mb-3 text-gray-900">{item.question}</h4>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
              
              <div className="text-center mt-10">
                <p className="text-gray-600 mb-6">Haben Sie weitere Fragen? Kontaktieren Sie uns direkt:</p>
                <Link 
                  to="#contact" 
                  className="px-6 py-3 bg-primary text-white rounded-md inline-flex items-center gap-2 hover:shadow-lg transition-medium"
                >
                  Zum Kontaktformular
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-primary/10 rounded-md">
                  Kontakt {regionId}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                  Ihr persönlicher Ansprechpartner
                </h3>
                <p className="text-gray-600 mb-8">
                  Unser Team in {regionId} berät Sie gerne zu Ihrem Projekt. Vereinbaren Sie einen Termin für eine kostenlose Beratung.
                </p>
                
                <div className="bg-white rounded-md p-8 shadow-md hover:shadow-lg transition-medium border border-gray-100">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="h-16 w-16 rounded-md bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      {region.contactPerson.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-gray-900">{region.contactPerson.name}</h4>
                      <p className="text-gray-600">{region.contactPerson.position}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <Phone size={20} />
                      </div>
                      <p className="text-gray-700">{region.contactPerson.phone}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <Mail size={20} />
                      </div>
                      <p className="text-gray-700">{region.contactPerson.email}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={20} />
                      </div>
                      <p className="text-gray-700">
                        {region.address.street}<br />
                        {region.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-md p-8 shadow-md hover:shadow-lg transition-medium border border-gray-100">
                  <h4 className="text-xl font-medium mb-6 text-gray-900">Kontaktieren Sie uns</h4>
                  
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Leistung
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Bitte wählen</option>
                        <option value="Badumbau">Badumbau</option>
                        <option value="Küchenumbau">Küchenumbau</option>
                        <option value="Innenausbau">Innenausbau</option>
                      </select>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white rounded-md flex items-center justify-center gap-2 hover:shadow-lg transition-medium"
                    >
                      Anfrage senden
                      <ArrowRight size={18} />
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
