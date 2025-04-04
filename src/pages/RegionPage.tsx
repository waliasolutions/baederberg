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
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
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
        images: [
          'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Altbau', 'Denkmalschutz', 'Sanfte Renovierung']
      },
      {
        title: 'Familienfreundliche Küche',
        description: 'Planung und Umsetzung einer großzügigen Familienküche mit kindersicheren Features und offener Wohnraumgestaltung.',
        images: [
          'https://images.unsplash.com/photo-1570739261022-01116088b768?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familienküche', 'Offener Wohnraum', 'Kindersicher']
      },
      {
        title: 'Modernes Spa-Bad',
        description: 'Umwandlung eines normalen Badezimmers in eine persönliche Wellnessoase mit Dampfdusche und freistehender Badewanne.',
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
        project: 'Altstadtwohnung-Renovierung'
      },
      {
        quote: 'Unsere neue Familienküche ist zum Herzstück des Hauses geworden. Die Planung ist genau auf unsere Bedürfnisse eingegangen und die Umsetzung war perfekt.',
        author: 'Stefanie und Marco Huber',
        project: 'Familienküche'
      },
      {
        quote: 'Ich bin jeden Tag wieder begeistert von meinem neuen Spa-Bad. Es ist wie ein 5-Sterne-Hotel im eigenen Zuhause.',
        author: 'Lisa Schneider',
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
        images: [
          'https://images.unsplash.com/photo-1632829882891-5047ccc421bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Seesicht', 'Modernisierung', 'Hell']
      },
      {
        title: 'Landleben im Zürcher Oberland',
        description: 'Renovierung eines traditionellen Farmhauses mit moderner Küche und rustikalem Bad unter Verwendung von natürlichen Materialien.',
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Landhaus', 'Rustikal', 'Natürliche Materialien']
      },
      {
        title: 'Stadtnahes Wohnen mit Komfort',
        description: 'Modernisierung eines Bades und einer Küche in einem Mehrfamilienhaus - pflegeleicht, funktional und ästhetisch anspruchsvoll.',
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
        project: 'Bad- und Küchenumbau'
      },
      {
        quote: 'Der Umbau unseres alten Farmhauses war eine Herausforderung, aber das Bäderberg-Team hat diese mit Bravour gemeistert. Ein wunderschönes Resultat!',
        author: 'Hans und Vreni Studer',
        project: 'Landhaus-Renovierung'
      },
      {
        quote: 'Ich bin total begeistert von der Qualität und Effizienz. Meine Wohnung wurde innerhalb von nur 4 Wochen komplett transformiert.',
        author: 'Sarah Meyer',
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
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familienküche', 'Offener Grundriss', 'Kochinsel']
      },
      {
        title: 'Barrierefreies Bad',
        description: 'Umwandlung eines konventionellen Bades in ein modernes, barrierefreies Bad für generationsübergreifendes Wohnen.',
        images: [
          'https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Barrierefrei', 'Zugänglich', 'Modern']
      },
      {
        title: 'Einfamilienhaus-Komplettsanierung',
        description: 'Umfassende Modernisierung eines Einfamilienhauses aus den 70er Jahren mit neuen Bädern und Küche sowie energetischer Optimierung.',
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
        project: 'Küchenumbau'
      },
      {
        quote: 'Ein barrierefreies Bad war für uns wichtig und das Resultat ist besser als wir es uns je hätten vorstellen können.',
        author: 'Ehepaar Baumann',
        project: 'Barrierefreies Bad'
      },
      {
        quote: 'Die Komplettsanierung unseres Hauses ist super gelaufen. Professionell, pünktlich und im Budget. Wir können Bäderberg nur weiterempfehlen!',
        author: 'Daniel und Regula Frei',
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
      street: 'Bahnhofstrasse 120',
      city: '8620 Wetzikon'
    }
  }
};

const RegionPage = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const region = regionData[regionId as keyof typeof regionData] || {
    title: 'Bäderberg in Ihrer Region',
    description: 'Ihr lokaler Experte für Bäder, Küchen und Innenausbau',
    problem: 'Suchen Sie nach einem zuverlässigen Partner für Ihren Umbau?',
    agitation: 'Veraltete Bäder und Küchen beeinträchtigen nicht nur Ihren Wohnkomfort, sondern auch den Wert Ihrer Immobilie. Die Suche nach qualifizierten Handwerkern kann frustrierend sein.',
    solution: 'Bäderberg bietet Ihnen eine Komplettlösung aus einer Hand - mit erfahrenen Handwerkern, termingerechter Ausführung und höchster Qualität.',
    serviceDescription: 'Unsere Leistungen umfassen die vollständige Betreuung Ihres Projekts von der ersten Idee bis zur finalen Umsetzung. Wir bieten maßgeschneiderte Lösungen für Ihre individuellen Bedürfnisse.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [],
    testimonials: [],
    benefits: [
      {
        title: 'Lokale Expertise',
        description: 'Unsere Teams kennen die regionalen Besonderheiten und Bauvorschriften.',
        icon: 'MapPin'
      },
      {
        title: 'Termingarantie',
        description: 'Wir halten vereinbarte Termine ein und respektieren Ihre Zeit.',
        icon: 'Clock'
      },
      {
        title: 'Schweizer Qualität',
        description: 'Wir arbeiten nach höchsten Schweizer Qualitätsstandards.',
        icon: 'Shield'
      }
    ],
    faq: [
      {
        question: 'Wie lange dauert ein typischer Badumbau?',
        answer: 'Ein durchschnittlicher Badumbau dauert zwischen 3 und 6 Wochen, abhängig vom Umfang der Arbeiten und der Größe des Raumes.'
      },
      {
        question: 'Muss ich für einen Badumbau eine Baugenehmigung beantragen?',
        answer: 'In den meisten Fällen ist für einen Badumbau keine Baugenehmigung erforderlich, sofern keine tragenden Wände verändert werden. Wir beraten Sie gerne zu den Anforderungen in Ihrer Region.'
      },
      {
        question: 'Können Sie auch nur Teilrenovierungen durchführen?',
        answer: 'Ja, wir bieten auch Teil-Modernisierungen an, wie z.B. nur die Erneuerung der Sanitäranlagen oder den Austausch einzelner Elemente.'
      }
    ],
    contactPerson: {
      name: 'Kundenservice',
      position: 'Zentrale',
      phone: '+41 44 123 45 60',
      email: 'info@baederberg.ch'
    },
    address: {
      street: 'Hauptstrasse 1',
      city: '8000 Zürich'
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${region.title} | Bäderberg`;
  }, [region.title]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="h-6 w-6 text-primary" />;
      case 'Clock':
        return <Clock className="h-6 w-6 text-primary" />;
      case 'Shield':
        return <Shield className="h-6 w-6 text-primary" />;
      case 'Wrench':
        return <Wrench className="h-6 w-6 text-primary" />;
      default:
        return <MapPin className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <section 
          className="relative h-[60vh] min-h-[400px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${region.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container px-6 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{region.title}</h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">{region.description}</p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="#contact" 
                  className="px-5 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all flex items-center gap-2"
                >
                  Kontakt aufnehmen <ChevronRight size={18} />
                </a>
                <a 
                  href="#services" 
                  className="px-5 py-3 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-all backdrop-blur-sm"
                >
                  Unsere Leistungen
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="py-16 bg-background">
          <div className="container px-6 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-primary">Das Problem</h2>
                <p className="text-lg text-foreground/90">{region.problem}</p>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-destructive">Die Situation</h2>
                <p className="text-lg text-foreground/90">{region.agitation}</p>
              </div>
              
              <div className="bg-primary/10 p-6 md:p-8 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-primary">Unsere Lösung</h2>
                <p className="text-lg text-foreground/90">{region.solution}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 bg-secondary/10">
          <div className="container px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Unsere Leistungen in {regionId ? regionId.charAt(0).toUpperCase() + regionId.slice(1) : 'Ihrer Region'}</h2>
              <p className="text-lg text-muted-foreground">{region.serviceDescription}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1604014438233-89453e2dc8e1')] bg-cover bg-center">
                  <div className="w-full h-full bg-black/30 group-hover:bg-black/20 transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Badumbau</h3>
                  <p className="text-muted-foreground mb-4">Komplettlösungen für Ihr neues Badezimmer - von der Planung bis zur finalen Umsetzung.</p>
                  <Link to="#projects" className="text-primary font-medium flex items-center gap-1">
                    Referenzprojekte <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1556910638-3c34e919eed4')] bg-cover bg-center">
                  <div className="w-full h-full bg-black/30 group-hover:bg-black/20 transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Küchenumbau</h3>
                  <p className="text-muted-foreground mb-4">Funktionale und ästhetische Küchenlösungen, die Ihren individuellen Bedürfnissen entsprechen.</p>
                  <Link to="#projects" className="text-primary font-medium flex items-center gap-1">
                    Referenzprojekte <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-all">
                <div className="h-48 bg-[url('https://images.unsplash.com/photo-1600566752355-35792bedcfea')] bg-cover bg-center">
                  <div className="w-full h-full bg-black/30 group-hover:bg-black/20 transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Innenausbau</h3>
                  <p className="text-muted-foreground mb-4">Umfassende Lösungen für Ihren individuellen Innenausbau - hochwertig und maßgeschneidert.</p>
                  <Link to="#projects" className="text-primary font-medium flex items-center gap-1">
                    Mehr erfahren <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16">
          <div className="container px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Unsere Projekte in {regionId ? regionId.charAt(0).toUpperCase() + regionId?.slice(1) : 'Ihrer Region'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.projects.map((project, index) => (
                <ProjectCard 
                  key={`${regionId}-project-${index}`}
                  title={project.title}
                  description={project.description}
                  images={project.images}
                  tags={project.tags}
                  location={regionId?.charAt(0).toUpperCase() + regionId?.slice(1) || 'Region'}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-primary/5">
          <div className="container px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Das sagen unsere Kunden</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${regionId}-testimonial-${index}`}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  project={testimonial.project}
                  location={regionId?.charAt(0).toUpperCase() + regionId?.slice(1) || 'Region'}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="benefits" className="py-16 bg-white">
          <div className="container px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ihre Vorteile mit Bäderberg</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    {getIconComponent(benefit.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-secondary/10">
          <div className="container px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Häufig gestellte Fragen</h2>
            
            <div className="space-y-6">
              {region.faq.map((item, index) => (
                <div key={`faq-${index}`} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Nehmen Sie Kontakt auf</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Unser Team in {regionId ? regionId.charAt(0).toUpperCase() + regionId.slice(1) : 'Ihrer Region'} steht Ihnen gerne für eine persönliche Beratung zur Verfügung. Kontaktieren Sie uns für ein unverbindliches Angebot.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{region.contactPerson.name}</p>
                      <p className="text-sm text-muted-foreground mb-1">{region.contactPerson.position}</p>
                      <a href={`tel:${region.contactPerson.phone.replace(/\s/g, '')}`} className="text-primary hover:text-primary/80 font-medium">
                        {region.contactPerson.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <a href={`mailto:${region.contactPerson.email}`} className="text-primary hover:text-primary/80 font-medium">
                        {region.contactPerson.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">{region.address.street}</p>
                      <p className="text-muted-foreground">{region.address.city}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-6">Anfrage senden</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Ihr Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Ihre E-Mail"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Ihre Telefonnummer"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Wie können wir Ihnen helfen?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Anfrage absenden
                  </button>
                </form>
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
