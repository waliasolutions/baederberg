import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import TestimonialCard from '@/components/TestimonialCard';
import { ChevronRight, MapPin, Phone, Mail, ArrowRight, Clock, Shield, Wrench } from 'lucide-react';

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
      location: string;
      images: string[];
      tags: string[];
    }[];
    testimonials: {
      quote: string;
      author: string;
      location: string;
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
    description: 'Ihr Experte für Bad- und Küchenumbauten sowie Innenausbau in Zürich',
    problem: 'Ist Ihr Badezimmer oder Ihre Küche in Zürich veraltet und unattraktiv?',
    agitation: 'In der weltoffenen Stadt Zürich spiegelt Ihr Zuhause Ihren Lebensstil wider. Veraltete Bäder und Küchen senken nicht nur den Wert Ihrer Immobilie, sondern beeinträchtigen auch Ihren täglichen Komfort und Ihre Lebensqualität.',
    solution: 'Bäderberg bietet maßgeschneiderte Renovierungslösungen speziell für Zürcher Immobilien, mit lokalem Know-how und Schweizer Präzision.',
    serviceDescription: 'Unsere Leistungen in Zürich umfassen die komplette Palette von der Beratung über die Planung bis zur Umsetzung. Wir berücksichtigen dabei die spezifischen Anforderungen von städtischen Wohnräumen.',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Penthouse-Bad mit Ausblick',
        description: 'Vollständiger Umbau eines Badezimmers in einem Penthouse mit Panoramablick über Zürich.',
        location: 'Zürich',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Penthouse', 'Luxus']
      },
      {
        title: 'Moderne Altbauküche',
        description: 'Neugestaltung einer Küche in einer Altbauwohnung unter Beibehaltung des historischen Charakters.',
        location: 'Zürich',
        images: [
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Küchenumbau', 'Altbau', 'Modern']
      },
      {
        title: 'Urbanes Loft-Konzept',
        description: 'Komplette Neugestaltung eines Loft-Apartments im Zürcher Industriequartier mit offener Küche und modernem Bad.',
        location: 'Zürich',
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
        location: 'Zürich',
        project: 'Badumbau'
      },
      {
        quote: 'Die Zusammenarbeit war von Anfang bis Ende professionell und unkompliziert. Wir sind mit unserer neuen Küche mehr als zufrieden.',
        author: 'Peter und Monika Herzog',
        location: 'Zürich',
        project: 'Küchenumbau'
      },
      {
        quote: 'Perfekte Umsetzung unserer Loft-Ideen. Termintreu, budgettreu und mit höchster handwerklicher Qualität.',
        author: 'Stefan Meier',
        location: 'Zürich',
        project: 'Loft-Renovierung'
      }
    ],
    benefits: [
      {
        title: 'Lokale Expertise',
        description: 'Wir kennen die Bauregeln und architektonischen Besonderheiten in Zürich.',
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
      },
      {
        title: 'Regionale Materialien',
        description: 'Wir setzen wo möglich auf Materialien aus der Region für nachhaltige Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie lange dauert ein typischer Badumbau in Zürich?',
        answer: 'Je nach Umfang des Projekts dauert ein Badumbau in Zürich zwischen 3 und 6 Wochen. Wir erstellen vor Projektbeginn einen detaillierten Zeitplan.'
      },
      {
        question: 'Brauche ich für einen Badumbau in Zürich eine Baugenehmigung?',
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
    agitation: 'Ein veraltetes Bad oder eine unpraktische Küche beeinträchtigt nicht nur Ihren täglichen Komfort, sondern auch den Wert Ihrer Immobilie in der begehrten Seeufer-Region. Die Topographie und spezifischen Bauregeln am Zürichsee erfordern besonderes Fachwissen.',
    solution: 'Bäderberg Richterswil verbindet lokales Know-how mit höchster Handwerkskunst, um Ihre Räume zu transformieren und dabei den einzigartigen Charakter Ihrer Wohnung am See zu bewahren.',
    serviceDescription: 'In Richterswil bieten wir maßgeschneiderte Lösungen für Ihre Umbauvorhaben. Wir verstehen die spezifischen Bedürfnisse der Region und setzen diese mit Schweizer Präzision um.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Seesicht-Badezimmer',
        description: 'Komplette Neugestaltung eines Badezimmers mit Blick auf den Zürichsee und Verwendung von natürlichen Materialien.',
        location: 'Richterswil',
        images: [
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1604014438289-3b23c7f2e4e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Seesicht', 'Naturstein']
      },
      {
        title: 'Landhaus-Küche mit modernem Touch',
        description: 'Renovierung einer Küche im traditionellen Landhaus-Stil mit modernen Funktionalitäten und hochwertigen Geräten.',
        location: 'Richterswil',
        images: [
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Küchenumbau', 'Landhaus', 'Modern']
      },
      {
        title: 'Dachgeschoss-Ausbau',
        description: 'Umwandlung eines ungenutzten Dachgeschosses in einen offenen Wohnraum mit Bad-en-suite und eindrucksvoller Seesicht.',
        location: 'Richterswil',
        images: [
          'https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Dachausbau', 'Bad-en-suite', 'Seesicht']
      }
    ],
    testimonials: [
      {
        quote: 'Die Arbeit von Bäderberg hat unsere Erwartungen übertroffen. Besonders die Termintreue und die Sauberkeit auf der Baustelle haben uns beeindruckt.',
        author: 'Familie Meier',
        location: 'Richterswil',
        project: 'Badumbau'
      },
      {
        quote: 'Unsere neue Landhaus-Küche verbindet perfekt Tradition und Moderne. Die Beratung war ausgezeichnet und die Umsetzung präzise.',
        author: 'Christine und Thomas Weber',
        location: 'Richterswil',
        project: 'Küchenumbau'
      },
      {
        quote: 'Der Dachausbau hat unser Haus komplett transformiert. Bäderberg hat aus einem ungenutzten Raum ein wahres Highlight gemacht.',
        author: 'Peter Müller',
        location: 'Richterswil',
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
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Können Sie bei Häusern am Hang arbeiten?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Renovierungen an Hanglagen in Richterswil. Unsere Expertise umfasst die besonderen Herausforderungen solcher Projekte.'
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
      position: 'Regionalleiterin Richterswil',
      phone: '+41 44 123 45 68',
      email: 'richterswil@baederberg.ch'
    },
    address: {
      street: 'Hauptstrasse 25',
      city: '8805 Richterswil'
    }
  },
  'winterthur': {
    title: 'Bäderberg in Winterthur',
    description: 'Ihr Experte für maßgeschneiderte Bad- und Küchenumbauten in Winterthur',
    problem: 'Wünschen Sie sich ein modernes Bad oder eine funktionale Küche in Ihrem Winterthurer Zuhause?',
    agitation: 'In der historischen Stadt Winterthur treffen Tradition und Moderne aufeinander. Veraltete Bäder und Küchen passen nicht mehr zum modernen Lebensstil und vermindern den Wert Ihrer Immobilie in dieser attraktiven Wohngegend.',
    solution: 'Mit unserer lokalen Expertise und einem Gespür für den Charakter von Winterthurer Bauten bietet Bäderberg individuelle Lösungen an, die den historischen Charme mit moderner Funktionalität verbinden.',
    serviceDescription: 'Wir bieten in Winterthur eine komplette Palette von Leistungen an - von der ersten Ideenskizze bis zur Schlüsselübergabe. Dabei berücksichtigen wir sowohl moderne Stadtwohnungen als auch historische Bauten.',
    heroImage: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Altstadtwohnung-Renovierung',
        description: 'Sanfte Renovierung eines Bades und einer Küche in einer denkmalgeschützten Altstadtwohnung unter Erhaltung von historischen Elementen.',
        location: 'Winterthur',
        images: [
          'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Altbau', 'Denkmalschutz', 'Sanfte Renovierung']
      },
      {
        title: 'Familienfreundliche Küche',
        description: 'Planung und Umsetzung einer großzügigen Familienküche mit kindersicheren Features und offener Wohnraumgestaltung.',
        location: 'Winterthur',
        images: [
          'https://images.unsplash.com/photo-1570739261022-01116088b768?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familienküche', 'Offener Wohnraum', 'Kindersicher']
      },
      {
        title: 'Modernes Spa-Bad',
        description: 'Umwandlung eines normalen Badezimmers in eine persönliche Wellnessoase mit Dampfdusche und freistehender Badewanne.',
        location: 'Winterthur',
        images: [
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Wellnessbad', 'Dampfdusche', 'Spa']
      }
    ],
    testimonials: [
      {
        quote: 'Die Sensibilität des Bäderberg-Teams für unser denkmalgeschütztes Haus hat uns begeistert. Sie haben es geschafft, modernen Komfort mit dem alten Charme zu verbinden.',
        author: 'Familie Keller',
        location: 'Winterthur',
        project: 'Altstadtwohnung-Renovierung'
      },
      {
        quote: 'Unsere neue Familienküche ist zum Herzstück des Hauses geworden. Die Planung ist genau auf unsere Bedürfnisse eingegangen und die Umsetzung war perfekt.',
        author: 'Stefanie und Marco Huber',
        location: 'Winterthur',
        project: 'Familienküche'
      },
      {
        quote: 'Ich bin jeden Tag wieder begeistert von meinem neuen Spa-Bad. Es ist wie ein 5-Sterne-Hotel im eigenen Zuhause.',
        author: 'Lisa Schneider',
        location: 'Winterthur',
        project: 'Spa-Bad'
      }
    ],
    benefits: [
      {
        title: 'Denkmalschutz-Erfahrung',
        description: 'Wir sind Experten für sensible Umbauten in historischen Gebäuden.',
        icon: 'Shield'
      },
      {
        title: 'Pünktliche Fertigstellung',
        description: 'Wir garantieren Termintreue und transparente Kommunikation.',
        icon: 'Clock'
      },
      {
        title: 'Winterthurer Handwerkskunst',
        description: 'Wir arbeiten mit lokalen Handwerkern für höchste Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie gehen Sie mit denkmalgeschützten Gebäuden um?',
        answer: 'Wir haben langjährige Erfahrung mit denkmalgeschützten Gebäuden in Winterthur. Wir arbeiten eng mit den Denkmalbehörden zusammen und finden Lösungen, die moderne Ansprüche mit historischen Vorgaben verbinden.'
      },
      {
        question: 'Wie lange dauert ein Badumbau in Winterthur?',
        answer: 'Ein durchschnittlicher Badumbau dauert etwa 4-6 Wochen. Bei denkmalgeschützten Gebäuden kann man mit 6-8 Wochen rechnen, da hier spezielle Verfahren und Materialien zum Einsatz kommen.'
      },
      {
        question: 'Können Sie auch barrierefreie Bäder planen?',
        answer: 'Ja, wir sind spezialisiert auf barrierefreie Badezimmer, die höchste Ästhetik mit Funktionalität verbinden. Wir beraten Sie gern zu den verschiedenen Möglichkeiten für Ihre individuelle Situation.'
      }
    ],
    contactPerson: {
      name: 'Thomas Egli',
      position: 'Regionalleiter Winterthur',
      phone: '+41 44 123 45 69',
      email: 'winterthur@baederberg.ch'
    },
    address: {
      street: 'Marktgasse 45',
      city: '8400 Winterthur'
    }
  },
  'uster': {
    title: 'Bäderberg in Uster',
    description: 'Ihr Partner für Bad- und Küchenumbauten sowie Innenausbau im Zürcher Oberland',
    problem: 'Haben Sie eine veraltete Küche oder ein Bad, das eine Renovierung benötigt im Raum Uster?',
    agitation: 'Als wachsende Stadt im Zürcher Oberland verbindet Uster ländliche Ruhe mit städtischen Vorzügen. Veraltete Bäder und Küchen passen nicht zu der hohen Lebensqualität in dieser beliebten Wohngegend und schmälern den Wert Ihrer Immobilie.',
    solution: 'Bäderberg Uster bietet maßgeschneiderte Umbaulösungen an, die sowohl für moderne Wohnungen als auch für traditionelle Häuser im Zürcher Oberland passen - mit regionalem Know-how und höchsten Qualitätsansprüchen.',
    serviceDescription: 'Unser Team in Uster bietet Ihnen eine umfassende Beratung, detaillierte Planung und präzise Umsetzung - alles aus einer Hand und optimal abgestimmt auf die regionale Bauweise.',
    heroImage: 'https://images.unsplash.com/photo-1604014438007-9847ad9e6c62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'See-Wohnung Modernisierung',
        description: 'Komplettumbau eines Bades und einer Küche in einer Wohnung mit Blick auf den Greifensee - hell, modern und funktional.',
        location: 'Uster',
        images: [
          'https://images.unsplash.com/photo-1632829882891-5047ccc421bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Seesicht', 'Modernisierung', 'Hell']
      },
      {
        title: 'Landleben im Zürcher Oberland',
        description: 'Renovierung eines traditionellen Farmhauses mit moderner Küche und rustikalem Bad unter Verwendung von natürlichen Materialien.',
        location: 'Uster',
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Landhaus', 'Rustikal', 'Natürliche Materialien']
      },
      {
        title: 'Stadtnahes Wohnen mit Komfort',
        description: 'Modernisierung eines Bades und einer Küche in einem Mehrfamilienhaus - pflegeleicht, funktional und ästhetisch anspruchsvoll.',
        location: 'Uster',
        images: [
          'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622786675-8fc421e46cd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Urban', 'Pflegeleicht', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Wir haben uns auf Anhieb wohlgefühlt mit dem Bäderberg Team. Von der Beratung bis zur Umsetzung ist alles gelaufen wie am Schnürchen.',
        author: 'Familie Bachmann',
        location: 'Uster',
        project: 'Bad- und Küchenumbau'
      },
      {
        quote: 'Der Umbau unseres alten Farmhauses war eine Herausforderung, aber das Bäderberg-Team hat diese mit Bravour gemeistert. Ein wunderschönes Resultat!',
        author: 'Hans und Vreni Studer',
        location: 'Uster',
        project: 'Landhaus-Renovierung'
      },
      {
        quote: 'Ich bin total begeistert von der Qualität und Effizienz. Meine Wohnung wurde innerhalb von nur 4 Wochen komplett transformiert.',
        author: 'Sarah Meyer',
        location: 'Uster',
        project: 'Wohnungsumbau'
      }
    ],
    benefits: [
      {
        title: 'Lokale Präsenz',
        description: 'Unser Team ist vor Ort und schnell für Sie verfügbar.',
        icon: 'MapPin'
      },
      {
        title: 'Zeitgenaue Planung',
        description: 'Detaillierte Zeitpläne und punktgenaue Umsetzung.',
        icon: 'Clock'
      },
      {
        title: 'Nachhaltige Materialien',
        description: 'Wir verwenden wo möglich regionale und ökologische Produkte.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie schnell können Sie mit einem Umbau in Uster starten?',
        answer: 'Nach der Erstberatung und Planung können wir in der Regel innerhalb von 4-6 Wochen mit Ihrem Projekt starten, je nach aktueller Auftragslage und Materialverfügbarkeit.'
      },
      {
        question: 'Haben Sie Erfahrung mit Umbauten am Seeufer des Greifensees?',
        answer: 'Ja, wir haben schon zahlreiche Projekte am Greifensee umgesetzt und kennen die Besonderheiten von Wasser- und Uferschutzvorgaben sehr genau.'
      },
      {
        question: 'Bieten Sie auch Teil-Renovierungen an?',
        answer: 'Selbstverständlich. Nicht jede Renovierung muss ein Komplettumbau sein. Wir bieten auch Teil-Modernisierungen an, wie z.B. nur die Erneuerung von Sanitäranlagen oder die Installation einer neuen Dusche.'
      }
    ],
    contactPerson: {
      name: 'Claudia Brunner',
      position: 'Regionalleiterin Uster',
      phone: '+41 44 123 45 70',
      email: 'uster@baederberg.ch'
    },
    address: {
      street: 'Zürichstrasse 30',
      city: '8610 Uster'
    }
  },
  'wetzikon': {
    title: 'Bäderberg in Wetzikon',
    description: 'Ihr spezialisierter Partner für Badezimmer, Küchen und Innenausbau im oberen Zürcher Oberland',
    problem: 'Suchen Sie nach einem professionellen Partner für Ihren Umbaupläne in Wetzikon und Umgebung?',
    agitation: 'Als pulsierendes Zentrum des oberen Zürcher Oberlands stellt Wetzikon besondere Ansprüche an Wohnraum. Veraltete Bäder und Küchen werden der modernen Lebensqualität nicht mehr gerecht und beeinträchtigen den Wohnwert Ihrer Immobilie erheblich.',
    solution: 'Bäderberg Wetzikon kombiniert lokale Kenntnisse mit schweizerischer Handwerkskunst, um Ihre Umbauträume zu verwirklichen - termingenau, im Budget und mit höchster Qualität.',
    serviceDescription: 'Von unserem Standort in Wetzikon aus betreuen wir Ihr Projekt vom ersten Beratungsgespräch bis zur Schlussabnahme - mit kurzen Wegen, schnellen Reaktionszeiten und persönlichem Kontakt.',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab8e546b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Moderne Familienküche',
        description: 'Umgestaltung einer kleinen, unpraktischen Küche in einen offenen, hellen Familienraum mit Insel und genügend Stauraum.',
        location: 'Wetzikon',
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familienküche', 'Offener Grundriss', 'Kochinsel']
      },
      {
        title: 'Barrierefreies Bad',
        description: 'Umwandlung eines konventionellen Bades in ein modernes, barrierefreies Bad für generationsübergreifendes Wohnen.',
        location: 'Wetzikon',
        images: [
          'https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Barrierefrei', 'Zugänglich', 'Modern']
      },
      {
        title: 'Einfamilienhaus-Komplettsanierung',
        description: 'Umfassende Modernisierung eines Einfamilienhauses aus den 70er Jahren mit neuen Bädern und Küche sowie energetischer Optimierung.',
        location: 'Wetzikon',
        images: [
          'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Komplettsanierung', 'Energetisch', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Der Umbau unserer Küche war ein riesiger Erfolg! Das Team von Bäderberg hat uns kompetent beraten und alles perfekt umgesetzt.',
        author: 'Familie Widmer',
        location: 'Wetzikon',
        project: 'Küchenumbau'
      },
      {
        quote: 'Ein barrierefreies Bad war für uns wichtig und das Resultat ist besser als wir es uns je hätten vorstellen können.',
        author: 'Ehepaar Baumann',
        location: 'Wetzikon',
        project: 'Barrierefreies Bad'
      },
      {
        quote: 'Die Komplettsanierung unseres Hauses ist super gelaufen. Professionell, pünktlich und im Budget. Wir können Bäderberg nur weiterempfehlen!',
        author: 'Daniel und Regula Frei',
        location: 'Wetzikon',
        project: 'Haussanierung'
      }
    ],
    benefits: [
      {
        title: 'Kurze Reaktionszeiten',
        description: 'Unser Team vor Ort reagiert schnell auf Ihre Wünsche und Fragen.',
        icon: 'Clock'
      },
      {
        title: 'Energieeffiziente Lösungen',
        description: 'Wir beraten Sie zu energiesparenden Optionen bei Ihrem Umbau.',
        icon: 'Shield'
      },
      {
        title: 'Generationsübergreifende Planung',
        description: 'Wir denken vorwärts für Lösungen, die in jedem Lebensalter passend sind.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Bieten Sie auch energetische Sanierungen an?',
        answer: 'Ja, wir bieten umfassende energetische Sanierungen an, immer in Kombination mit Bad- und Küchenumbauten. Unser Team berät Sie gern zu den verschiedenen Möglichkeiten wie Wärmepumpen oder Solarthermie.'
      },
      {
        question: 'Wie lange dauert der Umbau eines Bades in Wetzikon?',
        answer: 'Ein standardmäßiger Badumbau dauert in der Regel zwischen 3 und 5 Wochen. Wenn zusätzliche Arbeiten wie strukturelle Veränderungen nötig sind, kann es auch länger dauern.'
      },
      {
        question: 'Können Sie auch nur Teilumbauten machen?',
        answer: 'Selbstverständlich. Wir passen den Umfang des Umbaus genau an Ihre Wünsche und Ihr Budget an - von kleineren Renovierungen bis zu umfassenden Komplettlösungen.'
      }
    ],
    contactPerson: {
      name: 'Markus Berner',
      position: 'Regionalleiter Wetzikon',
      phone: '+41 44 123 45 71',
      email: 'wetzikon@baederberg.ch'
    },
    address: {
      street: 'Bahnhofstrasse 12',
      city: '8620 Wetzikon'
    }
  }
};

export const RegionPage = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const region = regionId && regionData[regionId] ? regionData[regionId] : null;

  useEffect(() => {
    if (region) {
      window.scrollTo(0, 0);
    }
  }, [region]);

  if (!region) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Region nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">Die angeforderte Region existiert leider nicht.</p>
          <Link to="/" className="text-primary hover:underline flex items-center">
            <ChevronRight className="mr-1 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-16 md:pt-32 md:pb-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${region.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">{region.title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl text-white/90">{region.description}</p>
        </div>
      </section>
      
      {/* Problem-Agitation-Solution Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Das Problem</h3>
              <p className="text-lg">{region.problem}</p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Die Situation</h3>
              <p className="text-lg">{region.agitation}</p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Unsere Lösung</h3>
              <p className="text-lg">{region.solution}</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Unsere Leistungen in {region.title.split(' in ')[1]}</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">{region.serviceDescription}</p>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Unsere Projekte in {region.title.split(' in ')[1]}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {region.projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                title={project.title}
                description={project.description}
                location={project.location}
                images={project.images}
                tags={project.tags}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ihre Vorteile in {region.title.split(' in ')[1]}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {region.benefits.map((benefit, index) => {
              let Icon;
              if (benefit.icon === 'MapPin') Icon = MapPin;
              else if (benefit.icon === 'Clock') Icon = Clock;
              else if (benefit.icon === 'Shield') Icon = Shield;
              else if (benefit.icon === 'Wrench') Icon = Wrench;

              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
                  <div className="flex items-center mb-4">
                    {Icon && <Icon className="text-primary mr-3 h-6 w-6" />}
                    <h3 className="font-bold text-xl">{benefit.title}</h3>
                  </div>
                  <p>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Was unsere Kunden sagen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {region.testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                project={testimonial.project}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Häufig gestellte Fragen</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {region.faq.map((item, index) => (
              <div key={index} className="bg-secondary/5 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontaktieren Sie uns</h2>
              <p className="text-lg mb-8">Wir freuen uns darauf, Ihr Projekt in {region.title.split(' in ')[1]} zu besprechen und Ihnen ein unverbindliches Angebot zu erstellen.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded mr-4">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Adresse</h4>
                    <p>{region.address.street}<br/>{region.address.city}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded mr-4">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Telefon</h4>
                    <p>{region.contactPerson.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded mr-4">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">E-Mail</h4>
                    <p>{region.contactPerson.email}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Ihr Ansprechpartner</h3>
              
              <div className="flex items-center mb-6">
                <div className="bg-secondary/20 h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold">
                  {region.contactPerson.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-lg">{region.contactPerson.name}</p>
                  <p className="text-muted-foreground">{region.contactPerson.position}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Link 
                  to="/#contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded w-full text-center block font-medium"
                >
                  Jetzt Kontakt aufnehmen
                </Link>
                
                <Link 
                  to={`tel:${region.contactPerson.phone.replace(/\s/g, '')}`}
                  className="border border-primary text-primary hover:bg-primary/5 py-3 px-6 rounded w-full text-center block font-medium"
                >
                  <Phone className="h-4 w-4 inline-block mr-2" />
                  Anrufen
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
