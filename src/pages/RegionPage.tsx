
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
    title: 'Bäderberg z\'Züri',
    description: 'Ihre Experte für Bad- und Chuchiumbaute sowie Inneusbau z\'Züri',
    problem: 'Isch Ihres Badezimmer oder Ihri Chuchi z\'Züri veraltet und nöd attraktiv?',
    agitation: 'I de weltoffene Stadt Züri spieglet Ihres Dehai Ihre Läbesstil wider. Veralteti Bäder und Chuchine sänket nöd nur de Wert vo Ihrer Liegeschaft, sondern beeiträchtigt au Ihre täglichi Komfort und Ihri Läbesqualität.',
    solution: 'Bäderberg bietet massgeschnideri Renovierigslösige speziell für Zürcher Liegeschafte, mit lokalem Know-how und Schwiizer Präzision.',
    serviceDescription: 'Eusi Leistige z\'Züri umfasset die komplett Palette vo de Beratig über d\'Planig bis zur Umsetztig. Mir berücksichtiget debi die spezifische Aforderige vo städtische Wohnrüüm.',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Penthouse-Bad mit Usblick',
        description: 'Vollständige Umbau vomene Badezimmer imene Penthouse mit Panoramablick über Züri.',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Penthouse', 'Luxus']
      },
      {
        title: 'Moderni Altbauchuchi',
        description: 'Neugstaltig vonere Chuchi inere Altbauwohnig unter Bibhaltig vom historische Charakter.',
        images: [
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Chuchiumbaute', 'Altbau', 'Modern']
      },
      {
        title: 'Urbanes Loft-Konzept',
        description: 'Kompletti Neugestaltig vomene Loft-Apartment im Zürcher Industriequartier mit offener Chuchi und modernem Bad.',
        images: [
          'https://images.unsplash.com/photo-1595514535115-dd5b0d141038?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Komplettumbau', 'Loft', 'Urban']
      }
    ],
    testimonials: [
      {
        quote: 'Euses neus Badezimmer isch en absolute Traum worde. S\'Team vo Bäderberg het hervorragendi Arbet gleistet und alli eusi Wünsch berücksichtiget.',
        author: 'Familie Schmid',
        project: 'Badumbau'
      },
      {
        quote: 'D\'Zämearbet isch vo Afang bis Änd professionell und unkompliziert gsi. Mir sind mit eusere neue Chuchi meh als zfriede.',
        author: 'Peter und Monika Herzog',
        project: 'Chuchiumbaute'
      },
      {
        quote: 'Perfekti Umsetztig vo eusne Loft-Idee. Termintreu, budgettreu und mit höchster handwerklicher Qualität.',
        author: 'Stefan Meier',
        project: 'Loft-Renovierig'
      }
    ],
    benefits: [
      {
        title: 'Lokali Expertise',
        description: 'Mir kännet d\'Buuregle und architektonische Bsunderheite z\'Züri.',
        icon: 'MapPin'
      },
      {
        title: 'Pünktlichi Fertigstellig',
        description: 'Mir haltet Zitplän i und respektieret Ihri Zit.',
        icon: 'Clock'
      },
      {
        title: 'Qualitätsgarantie',
        description: '5 Jahr Garantie uf alli eusi Umbauproji z\'Züri.',
        icon: 'Shield'
      },
      {
        title: 'Regionali Materialie',
        description: 'Mir setzet wo möglich uf Materialie us de Region für nachhalitigi Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie lang duret en typische Badumbau z\'Züri?',
        answer: 'Je nach Umfang vom Projekt duret en Badumbau z\'Züri zwüsche 3 und 6 Wuche. Mir erstellet vor Projektbeginn en detaillierte Zitplan.'
      },
      {
        question: 'Bruuch ich für en Badumbau z\'Züri e Buubewilligig?',
        answer: 'Für die meiste Badumbaute isch kei Buubewilligig erforderlich, solang kei tragendi Wänd entfernt werdet. Mir beratet Sie zu de spezifische Aforderige vo Ihrem Projekt.'
      },
      {
        question: 'Chönd Sie au i bewohnti Wohnige schaffe?',
        answer: 'Ja, mir händ umfangrichi Erfahrig mit Renovierige i bewohnti Wohnige. Mir planet d\'Arbete so, dass d\'Beiiträchtigig für Sie minimal isch.'
      }
    ],
    contactPerson: {
      name: 'Michael Becker',
      position: 'Regionalleiter Züri',
      phone: '+41 44 123 45 67',
      email: 'zuerich@baederberg.ch'
    },
    address: {
      street: 'Bahnhofstrasse 100',
      city: '8000 Züri'
    }
  },
  'richterswil': {
    title: 'Bäderberg z\'Richterswil',
    description: 'Ihre lokali Spezialist für Bäder, Chuchine und Inneusbau am Zürisee',
    problem: 'Bruchet Ihres Dehai z\'Richterswil e Modernisierig, wo em Charme vom Zürisee grächt wird?',
    agitation: 'Es veraltets Bad oder e unpraktischi Chuchi beiiträchtigt nöd nur Ihre täglichi Komfort, sondern au de Wert vo Ihrer Liegeschaft i de begehrte Seeufer-Region. D\'Topographie und spezifischi Buuregle am Zürisee erforderet bsunders Fachwüsse.',
    solution: 'Bäderberg Richterswil veriidet lokals Know-how mit höchster Handwerkskunst, zum Ihri Rüüm z\'transformiere und debi de einzigartig Charakter vo Ihrer Wohnig am See z\'bewahre.',
    serviceDescription: 'Z\'Richterswil bietet mir massgeschnideri Lösige für Ihri Umbauvorhabe. Mir verstönd die spezifische Bedürfnis vo de Region und setzet die mit Schwiizer Präzision um.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Seesicht-Badezimmer',
        description: 'Kompletti Neugstaltig vomene Badezimmer mit Blick uf de Zürisee und Verwendig vo natürliche Materialie.',
        images: [
          'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1604014438289-3b23c7f2e4e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Seesicht', 'Naturstei']
      },
      {
        title: 'Landhuus-Chuchi mit modernem Touch',
        description: 'Renovierig vonere Chuchi im traditionelle Landhuus-Stil mit moderne Funktionalitäte und hochwärtige Grät.',
        images: [
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Chuchiumbaute', 'Landhuus', 'Modern']
      },
      {
        title: 'Dachgschoss-Usbu',
        description: 'Umwandlig vomene ungnutzte Dachgschoss inene offene Wohnruum mit Bad-en-suite und idrucksvoller Seesicht.',
        images: [
          'https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Dachusbu', 'Bad-en-suite', 'Seesicht']
      }
    ],
    testimonials: [
      {
        quote: 'D\'Arbet vo Bäderberg het eusi Erwartige übertroffe. Bsunders d\'Termintreui und d\'Suberkeit uf de Buste händ eus beiidruckt.',
        author: 'Familie Meier',
        project: 'Badumbau'
      },
      {
        quote: 'Eusi neui Landhuus-Chuchi verbindet perfekt Tradition und Moderne. D\'Beratig isch usgezeichnet gsi und d\'Umseztig präzis.',
        author: 'Christine und Thomas Weber',
        project: 'Chuchiumbaute'
      },
      {
        quote: 'De Dachusbu het euses Huus komplett transformiert. Bäderberg het useme ungnutzte Ruum es wahrs Highlight gmacht.',
        author: 'Peter Müller',
        project: 'Dachusbu'
      }
    ],
    benefits: [
      {
        title: 'Seesicht-Expertise',
        description: 'Mir maximieret Ihri Ussicht uf de Zürisee durch cleveri Raumplanig.',
        icon: 'MapPin'
      },
      {
        title: 'Termingarantie',
        description: 'Mir garantieret d\'Fertigstellig vo Ihrem Projekt zum vereinbarte Zitpunkt.',
        icon: 'Clock'
      },
      {
        title: 'Regionali Materialie',
        description: 'Mir setzet wo möglich uf Materialie us de Region für nachhalitigi Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Chönd ihr bi Hüser am Hang schaffe?',
        answer: 'Ja, mir händ umfangrichi Erfahrig mit Renovierige a Hanglage z\'Richterswil. Eusi Expertise umfasst die bsundere Useforderige vo sötige Projekt.'
      },
      {
        question: 'Wie lang muess ich für en Badumbau z\'Richterswil rechne?',
        answer: 'En typische Badumbau z\'Richterswil duret zwüsche 4 und 7 Wuche, je nach Umfang und bsundere Aforderige.'
      },
      {
        question: 'Bietet ihr au Beratig zur Optimierig vo de Seesicht a?',
        answer: 'Absolut. Eusi Planigsexperte berücksichtiget d\'Seesicht als zentrals Element bi de Gestaltig vo Ihre Rüüm und empfehlet die optimal Positionierig vo Fänster und Glasfronte.'
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
    title: 'Bäderberg z\'Winterthur',
    description: 'Ihre Experte für massgeschnideri Bad- und Chuchiumbaute z\'Winterthur',
    problem: 'Wänd Sie es moderns Bad oder e funktionali Chuchi i Ihrem Winterthurer Dehai?',
    agitation: 'I de historische Stadt Winterthur träffet Tradition und Moderne ufenand. Veralteti Bäder und Chuchine passe nüme zum moderne Läbesstil und verminderet de Wert vo Ihrer Liegeschaft i dere attraktive Wohngegend.',
    solution: 'Mit eusere lokale Expertise und eme Gespür für de Charakter vo Winterthurer Bute bietet Bäderberg individuelle Lösige a, wo de historischi Charme mit moderne Funktionalität verbindet.',
    serviceDescription: 'Mir bietet z\'Winterthur e komplett Palette vo Leistige a - vo de erste Ideeskizze bis zur Schlüsselübergab. Debii berücksichtiget mir sowohl moderni Stadtwohhig als au historischi Bute.',
    heroImage: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Altstadtwohnig-Renovierig',
        description: 'Sanfte Renovierig vomene Bad und Chuchi inere denkmalgeschützte Altstadtwohnig unter Bhaltig vo historische Element.',
        images: [
          'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Altbau', 'Denkmalschutz', 'Sanft Renovierig']
      },
      {
        title: 'Familiefreundlichi Chuchi',
        description: 'Planig und Umsetzig vonere grosszügige Familiechuchi mit chindersichere Features und offener Wohnrumgstaltig.',
        images: [
          'https://images.unsplash.com/photo-1570739261022-01116088b768?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familiechuchi', 'Offe Wohnruum', 'Chindersicher']
      },
      {
        title: 'Moderns Spa-Bad',
        description: 'Umwandlig vomene normale Badezimmer inene persönlichi Wellnessoase mit Dampfdusche und freistehender Badwanne.',
        images: [
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Wellnessbad', 'Dampfdusche', 'Spa']
      }
    ],
    testimonials: [
      {
        quote: 'D\'Sensibilität vom Bäderberg-Team für euses denkmalgeschützte Huus het eus begeisteret. Sie händ es gschafft, moderni Komfort mit dem alte Charme z\'verbinde.',
        author: 'Familie Keller',
        project: 'Altstadtwohnig-Renovierig'
      },
      {
        quote: 'Eusi neui Familiechuchi isch zum Herzstück vom Huus worde. Die Planig isch gnieau uf eusi Bedürfnis igange und d\'Umsetztig isch perfekt gsi.',
        author: 'Stefanie und Marco Huber',
        project: 'Familiechuchi'
      },
      {
        quote: 'Ich bin jede Tag wieder begeisteret vo miim neue Spa-Bad. Es isch wie es 5-Sterne-Hotel im eigene Dehai.',
        author: 'Lisa Schneider',
        project: 'Spa-Bad'
      }
    ],
    benefits: [
      {
        title: 'Denkmalschutz-Erfahrig',
        description: 'Mir sind Experte für sensibli Umbaute i historische Gebäude.',
        icon: 'Shield'
      },
      {
        title: 'Pünktlichi Fertigstellig',
        description: 'Mir garantieret Ihri Termintreui und transparenti Kommunikation.',
        icon: 'Clock'
      },
      {
        title: 'Winterthurer Handwerkskunst',
        description: 'Mir schaffer mit lokale Handwerker für höchsti Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie gänd ihr mit denkmalgeschützte Gebäude um?',
        answer: 'Mir händ langjährigi Erfahrig mit denkmalgeschützte Gebäude z\'Winterthur. Mir arbeitet eng mit de Denkmalbehörde zäme und finded Lösige, wo moderni Asprüch mit historische Vorgabe verbiindet.'
      },
      {
        question: 'Wie lang duret en Badumbau z\'Winterthur?',
        answer: 'En durchschnittliche Badumbau duret öppe 4-6 Wuche. Bi denkmalgeschützte Gebäude chamer mit 6-8 Wuche rechne, will da spezielli Verfahre und Material zum Isatz chömed.'
      },
      {
        question: 'Chönd ihr au barrierefreii Bäder plane?',
        answer: 'Ja, mir sind spezialisiert uf barrierefreii Badezimmer, wo höchsti Ästhetik mit Funktionalität verbindet. Mir beratet Sie gern zu de verschiedene Möglichkeite für Ihri individuelli Situation.'
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
    title: 'Bäderberg z\'Uster',
    description: 'Ihre Partner für Bad- und Chuchiumbaute sowie Inneusbau im Zürcher Oberland',
    problem: 'Händ Sie e veralteti Chuchi oder es Bad, wo ei Renovierig brucht im Ruum Uster?',
    agitation: 'Als wachsendi Stadt im Zürcher Oberland verbindet Uster ländlichi Rueh mit städtische Vorzüg. Veralteti Bäder und Chuchine passe nöd zu de hohe Läbensqualität i dere beliebte Wohngegend und schmäleret de Wert vo Ihrer Liegeschaft.',
    solution: 'Bäderberg Uster bietet massgeschnideri Umbuilösige a, wo sowohl für moderni Wohnige als au für traditionelli Hüser im Zürcher Oberland passet - mit regionalem Know-how und höchste Qualitätsasprüch.',
    serviceDescription: 'Euses Team z\'Uster bietet Ihne en umfassendi Beratig, detaillierti Planig und präzisi Umsetztig - alli us einer Hand und optimal abgstimmt uf die regionali Buwiis.',
    heroImage: 'https://images.unsplash.com/photo-1604014438007-9847ad9e6c62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'See-Wohnig Modernisierig',
        description: 'Komplettumbau vomene Bad und Chuchi inere Wohnig mit Blick uf de Greifesee - hell, modern und funktional.',
        images: [
          'https://images.unsplash.com/photo-1632829882891-5047ccc421bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Seesicht', 'Modernisierig', 'Hell']
      },
      {
        title: 'Landlebe im Zürcher Oberland',
        description: 'Renovierig vomene traditionelle Farmhuus mit moderner Chuchi und rustikalem Bad unter Verwendig vo natürliche Materialie.',
        images: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Landhuus', 'Rustikal', 'Natürlichi Materialie']
      },
      {
        title: 'Stadtnahs Wohne mit Komfort',
        description: 'Modernisierig vomene Bad und Chuchi ineme Mehrfamiliehus - pflegliicht, funktional und ästhetisch aspruchsvoll.',
        images: [
          'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622786675-8fc421e46cd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Urban', 'Pflegliicht', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Mir händ eus uf Ahieb wohlgfühlt mit em Bäderberg Team. Vo de Beratig bis zur Umsetzig isch alles glauffe wie am Schnüerli.',
        author: 'Familie Bachmann',
        project: 'Bad- und Chuchiumbu'
      },
      {
        quote: 'De Umbau vo eusem alte Farmhuus isch e Herausforderig gsi, aber s\'Bäderberg-Team het die mit Bravour gmeisteret. Es wunderschöns Resultat!',
        author: 'Hans und Vreni Studer',
        project: 'Landhuus-Renovierig'
      },
      {
        quote: 'Ich bin total begeisteret vo de Qualität und Effizienz. Mini Wohnig isch innerhalb vo nur 4 Wuche komplett transformiert worde.',
        author: 'Sarah Meyer',
        project: 'Wohnigsumbau'
      }
    ],
    benefits: [
      {
        title: 'Lokali Präsenz',
        description: 'Euses Team isch vor Ort und schnell für Sie verfüegbar.',
        icon: 'MapPin'
      },
      {
        title: 'Zitgenau Planig',
        description: 'Detaillierti Zitplän und punktgenau Umsetztig.',
        icon: 'Clock'
      },
      {
        title: 'Nachhaltigi Materialie',
        description: 'Mir verwende wo möglich regionali und ökologischi Produkt.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie schnell chönnt ihr mit emene Umbau z\'Uster starte?',
        answer: 'Nach de Erstberatig und Planig chönemer i de Regel innerhalb vo 4-6 Wuche mit Ihrem Projekt starte, je nach aktueller Uftragslag und Materialverfüegbarkeit.'
      },
      {
        question: 'Händ ihr Erfahrig mit Umbaute a Seeufer vom Greifesee?',
        answer: 'Ja, mir händ scho zahlrichi Projekt am Greifesee umgsetzt und kännet d\'Bsunderheite vo Wasser- und Uferschutzvorgabe sehr genau.'
      },
      {
        question: 'Bietet ihr au Teil-Renovierige a?',
        answer: 'Selbstverständlich. Nöd jedi Renovierig muess en Komplettumbau sii. Mir bietet au Teil-Modernisierige a, wie z.B. nur d\'Erneuerig vo Sanitäralag oder d\'Installierig vonere neue Dusch.'
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
    title: 'Bäderberg z\'Wetzikon',
    description: 'Ihre spezialisierte Partner für Badezimmer, Chuchine und Inneusbau im obere Zürcher Oberland',
    problem: 'Sueched Sie nach eme professionelle Partner für Ihri Umbauplän i Wetzikon und Umgebiig?',
    agitation: 'Als pulsierends Zentrum vom obere Zürcher Oberland stellt Wetzikon bsunderi Asprüch an Wohnrum. Veralteti Bäder und Chuchine werded de moderne Läbesqualität nüme gerecht und beiiträchtigt de Wohnwert vo Ihrer Liegeschaft erheblich.',
    solution: 'Bäderberg Wetzikon kombiniert lokali Kenntniss mit schwiizerischer Handwerkskunst, zum Ihri Umbuträum z\'verwürkliche - termingenau, im Budget und mit höchster Qualität.',
    serviceDescription: 'Vo eusem Standort z\'Wetzikon us betreut mir Ihres Projekt vom erste Beratigsgespräch bis zur Schlussabnahm - mit kurze Wege, schnelle Reaktionszitte und persönlichem Kontakt.',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab8e546b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Moderni Familiechuchi',
        description: 'Umgestaltung vonere chliine, unpraktische Chuchi in en offene, helle Familieruum mit Insel und gnüegend Stauraum.',
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Familiechuchi', 'Offe Grundriss', 'Kochinsle']
      },
      {
        title: 'Barrierefreies Bad',
        description: 'Umwandlig vomene konventionelle Bad in es moderns, barrierefreies Bad für generationsübergreifends Wohne.',
        images: [
          'https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Barrierefrei', 'Zugänglich', 'Modern']
      },
      {
        title: 'Eifamiliehuus-Komplettsanierig',
        description: 'Umfassendi Modernisierig vomene Eifamiliehuus us de 70er Jahr mit neue Bäder und Chuchi sowie energetischer Optimierig.',
        images: [
          'https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Komplettsanierig', 'Energetisch', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'De Umbau vo euserer Chuchi isch e riesige Erfolg! S\'Team vo Bäderberg het eus kompetent berate und alles perfekt umgsetzt.',
        author: 'Familie Widmer',
        project: 'Chuchiumbu'
      },
      {
        quote: 'Es barrierefreies Bad isch für eus wichtig gsi und s\'Resultat isch besser als mir eus je händ chönne vorstelle.',
        author: 'Ehepaar Baumann',
        project: 'Barrierefreies Bad'
      },
      {
        quote: 'D\'Komplettsanierig vo eusem Huus isch super gloffe. Professionell, pünktlich und im Budget. Mir chönd Bäderberg nur witerempfähle!',
        author: 'Daniel und Regula Frei',
        project: 'Haussanierig'
      }
    ],
    benefits: [
      {
        title: 'Kurzi Reaktionszitte',
        description: 'Euses Team vor Ort reagiert schnell uf Ihri Wünsch und Frage.',
        icon: 'Clock'
      },
      {
        title: 'Energieeffizient Lösige',
        description: 'Mir berate Sie zu energiesparende Optione bi Ihrem Umbau.',
        icon: 'Shield'
      },
      {
        title: 'Generationsübergreifendi Planig',
        description: 'Mir denked vorwärts für Lösige, wo i jedem Lebensalter passend.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Bietet ihr au energetischi Sanierige a?',
        answer: 'Ja, mir bietet umfassendi energetischi Sanierige a, immer in Kombination mit Bad- und Chuchinumbaute. Euses Team beratet Sie gern zu de verschiedene Möglichkeite wie Wärmepumpe oder Solarthermie.'
      },
      {
        question: 'Wie lang dauret de Umbau vomene Bad z\'Wetzikon?',
        answer: 'En standardmässige Badumbau dauret i de Regel zwüsche 3 und 5 Wuche. Wänn zuesätzlichi Arbete wie strukturelli Veränderige nötig sind, chans au länger dauere.'
      },
      {
        question: 'Chönder ihr au nur Teilumbaut mache?',
        answer: 'Selbstverständlich. Mir passe de Umfang vom Umbau genau a Ihri Wünsch und Ihres Budget a - vo chliinere Renovierige bis zu umfassende Komplettlösige.'
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
  },
  'default': {
    title: 'Bäderberg i Ihrer Region',
    description: 'Ihre lokali Experte für hochwertigi Umbaute und Renovierige',
    problem: 'Händ Sie veralteti Rüüm, wo nüme Ihre aktuelle Bedürfnis entsprechet?',
    agitation: 'Veralteti Bäder und Chuchine sind nöd nur uaaschaulich, sondern oft au ineffizient und energieverschwänderisch. Sie beiiträchtigt Ihre täglichi Komfort und chönd sogar Ihre Immobiliewert senke.',
    solution: 'Bäderberg transformiert Ihri Rüüm mit massgschniderte Lösige, wo Funktionalität, Ästhetik und Wert veriidet - termingerecht und budgettreu.',
    serviceDescription: 'Eusi Leistige umfasset die komplett Palettte vo de Beratig über d\'Planig bis zur Umsetztig. Mir berücksichtiget debii die spezifische lokale Aforderige.',
    heroImage: 'https://images.unsplash.com/photo-1595514535215-9a5e0e8e39bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Badezimmer-Renovation',
        description: 'Vollständige Umbau vomene Badezimmer in modernem Design mit barrierefreiem Zugang.',
        images: [
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Badumbau', 'Modern', 'Barrierefrei']
      },
      {
        title: 'Offeni Wohnchuchi',
        description: 'Umgestaltig vonere abtrennnte Chuchi in e offeni Wohnchuchi mit Chochinsle und Essbereich.',
        images: [
          'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Chuchiumbu', 'Offe', 'Wohnchuchi']
      },
      {
        title: 'Komplette Inneusbau',
        description: 'Umfassendi Renovierig vo alle Wohnrüüm mit massgfertigte Ibuschränk und neue Bäder.',
        images: [
          'https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        ],
        tags: ['Inneusbau', 'Komplett', 'Massafertigig']
      }
    ],
    testimonials: [
      {
        quote: 'Professionelli Arbet vom Afang bis zum End. Mir sind sehr zfriede mit em Ergebnis.',
        author: 'Zfridene Chund',
        project: 'Badumbau'
      },
      {
        quote: 'D\'Planig isch duredenkt gsi, d\'Umsetztig präzis und s\'Ergebnis begeisteret eus jede Tag ufs Neue.',
        author: 'Familie Huber',
        project: 'Chuchiumbu'
      },
      {
        quote: 'Vo de erste Beratig bis zur Endabnahm - es rundrum glungenes Projekt und es Traumresultat.',
        author: 'Daniel und Sabine Keller',
        project: 'Komplettumbau'
      }
    ],
    benefits: [
      {
        title: 'Regional Apassig',
        description: 'Mir berücksichtiget die bsundere Gegebeheite vo Ihrer Region.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässigi Zitplanig',
        description: 'Transparenti Kommunikation und Ihaltig vo alle Termine.',
        icon: 'Clock'
      },
      {
        title: 'Schwiizer Qualitätsstandard',
        description: 'Höchsti Qualität bi Materialie und Usführig.',
        icon: 'Shield'
      },
      {
        title: 'Regionali Materialie',
        description: 'Mir setzed wo möglich uf Materialie us de Region für nachhaltigi Qualität.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie lauft de Planigsprozeß ab?',
        answer: 'Nach eme erste Beratigsgespräch erstelled mir es Konzept mit 3D-Visualisierige. Nach Ihrer Freigab folget detaillierti Plän und en verbindliche Kostenvoraschlag.'
      },
      {
        question: 'Wie lang duret en typische Umbau?',
        answer: 'En Badumbau duret i de Regel 3-6 Wuche, en Chuchiumbu 4-8 Wuche und en komplette Inneusbau je nach Grössi 2-6 Mönet.'
      },
      {
        question: 'Chümmered ihr euch au um alli behördliche Genehmigihe?',
        answer: 'Ja, mir übernehmed de gsamt Prozess vo de Beantragig vo alle nötige Genehmigige und stönd im Kontakt mit de zuständige Behörde.'
      }
    ],
    contactPerson: {
      name: 'Kundedienst',
      position: 'Zentrale',
      phone: '+41 44 123 45 67',
      email: 'info@baederberg.ch'
    },
    address: {
      street: 'Musterstrasse 123',
      city: '8000 Züri'
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
                                        benefit.icon === 'Shield' ? Shield : Wrench;
                    
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
                  Kontakt
                </div>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">
                  Kontaktieren Sie uns
                </h3>
                <p className="text-gray-600 text-lg">
                  Wir sind Ihr persönlicher Berater für Renovierungen in {regionId}.
                </p>
                
                <div className="mt-8">
                  <div className="flex items-center gap-4">
                    <Phone size={24} />
                    <p className="text-gray-600">{region.contactPerson.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail size={24} />
                    <p className="text-gray-600">{region.contactPerson.email}</p>
                  </div>
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
