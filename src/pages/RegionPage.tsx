
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
    problem: 'Ist Ihr Badezimmer oder Ihre Küche veraltet und funktioniert nicht mehr richtig?',
    agitation: 'In Zürich spiegelt sich Ihr Zuhause in Ihrer Wohn- und Lebensqualität wider. Veraltete Bäder und Küchen können den Alltag erschweren und den Wert Ihrer Wohnung oder Ihres Hauses mindern.',
    solution: 'Bäderberg bietet kompetente Renovierungslösungen für Zürcher Wohnungen und Häuser mit lokalem Fachwissen.',
    serviceDescription: 'Unser Team in Zürich unterstützt Sie von der ersten Idee bis zur Fertigstellung. Wir kennen die örtlichen Gegebenheiten und finden passende Lösungen für Ihr Zuhause.',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Modernes Badezimmer',
        description: 'Umbau eines Badezimmers in einer Wohnung mit optimaler Raumnutzung.',
        location: 'Zürich',
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Modern', 'Stadthaus']
      },
      {
        title: 'Küche mit Charakter',
        description: 'Neugestaltung einer Altbauküche mit Erhalt des historischen Flairs.',
        location: 'Zürich',
        images: [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Altbau', 'Modern']
      },
      {
        title: 'Offenes Wohnkonzept',
        description: 'Umgestaltung einer Wohnung mit neuer Raumaufteilung für mehr Weite und Licht.',
        location: 'Zürich',
        images: [
          "https://images.unsplash.com/photo-1595514535115-dd5b0d141038?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Komplettumbau', 'Wohnkonzept', 'Modern']
      }
    ],
    testimonials: [
      {
        quote: 'Unser neues Bad ist super geworden! Das Team hat tolle Arbeit geleistet und alles lief nach Plan.',
        author: 'Familie Huber',
        location: 'Zürich',
        project: 'Badumbau'
      },
      {
        quote: 'Die Zusammenarbeit war unkompliziert und professionell. Unsere Küche ist jetzt viel praktischer und schöner.',
        author: 'Peter und Anna Meyer',
        location: 'Zürich',
        project: 'Küchenumbau'
      },
      {
        quote: 'Wir sind mit dem Umbau sehr zufrieden. Die Handwerker waren pünktlich, freundlich und haben sauber gearbeitet.',
        author: 'Stefan Keller',
        location: 'Zürich',
        project: 'Wohnungsumbau'
      }
    ],
    benefits: [
      {
        title: 'Lokales Team',
        description: 'Wir kennen die Bausubstanz und Besonderheiten in Zürich.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässige Termine',
        description: 'Wir halten, was wir versprechen.',
        icon: 'Clock'
      },
      {
        title: 'Garantie',
        description: '5 Jahre Garantie auf unsere Handwerksleistungen.',
        icon: 'Shield'
      },
      {
        title: 'Gute Materialien',
        description: 'Wir arbeiten mit hochwertigen Materialien für lange Freude.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Michael Becker',
      position: 'Ansprechpartner Zürich',
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
    description: 'Ihr Spezialist für Bäder, Küchen und Innenausbau am Zürichsee',
    problem: 'Braucht Ihr Zuhause in Richterswil eine Modernisierung?',
    agitation: 'Ein veraltetes Bad oder eine unpraktische Küche macht den Alltag mühsam und mindert den Wohnkomfort. Die besonderen Gegebenheiten am Zürichsee erfordern Fachwissen beim Umbau.',
    solution: 'Bäderberg verbindet lokales Handwerk mit moderner Planung, um Ihre Räume zu verschönern und praktischer zu machen.',
    serviceDescription: 'In Richterswil bieten wir passende Lösungen für Ihre Umbauvorhaben, die zur Region und Ihrem Zuhause passen.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Helles Badezimmer',
        description: 'Neugestaltung eines Badezimmers mit viel Tageslicht und natürlichen Materialien.',
        location: 'Richterswil',
        images: [
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1604014438289-3b23c7f2e4e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Hell', 'Naturstein']
      },
      {
        title: 'Gemütliche Küche',
        description: 'Umbau einer Küche mit traditionellen Elementen und modernen Geräten.',
        location: 'Richterswil',
        images: [
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Gemütlich', 'Modern']
      },
      {
        title: 'Dachgeschoss-Ausbau',
        description: 'Umbau eines ungenutzten Dachbodens zu einem hellen Wohnraum mit Bad.',
        location: 'Richterswil',
        images: [
          "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Dachausbau', 'Badezimmer', 'Wohnraum']
      }
    ],
    testimonials: [
      {
        quote: 'Die Arbeit von Bäderberg hat uns überzeugt. Alles wurde pünktlich fertig und die Baustelle war immer ordentlich.',
        author: 'Familie Meier',
        location: 'Richterswil',
        project: 'Badumbau'
      },
      {
        quote: 'Unsere neue Küche ist genau so geworden, wie wir sie uns vorgestellt haben. Die Beratung war sehr hilfreich.',
        author: 'Christine und Thomas',
        location: 'Richterswil',
        project: 'Küchenumbau'
      },
      {
        quote: 'Der Dachausbau hat unser Haus völlig verändert. Wir haben jetzt viel mehr Platz und Licht.',
        author: 'Peter Müller',
        location: 'Richterswil',
        project: 'Dachausbau'
      }
    ],
    benefits: [
      {
        title: 'Lokale Erfahrung',
        description: 'Wir kennen die Besonderheiten der Häuser am Zürichsee.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässigkeit',
        description: 'Wir halten Termine und Absprachen ein.',
        icon: 'Clock'
      },
      {
        title: 'Qualität',
        description: 'Wir setzen auf gute Materialien und saubere Arbeit.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Sandra Weber',
      position: 'Ansprechpartnerin Richterswil',
      phone: '+41 44 123 45 68',
      email: 'richterswil@baederberg.ch'
    },
    address: {
      street: 'Hauptstrasse 25',
      city: '8805 Richterswil'
    }
  },
  'waedenswil': {
    title: 'Bäderberg in Wädenswil',
    description: 'Ihr Partner für moderne Bad- und Küchenrenovierungen in Wädenswil',
    problem: 'Ist Ihr Bad oder Ihre Küche in Wädenswil nicht mehr zeitgemäss?',
    agitation: 'Ein altes Bad oder eine veraltete Küche verbraucht oft zu viel Energie und passt nicht mehr zu den heutigen Bedürfnissen. In Wädenswil mit seiner Nähe zum See sollte das Zuhause ein Ort zum Wohlfühlen sein.',
    solution: 'Bäderberg bietet durchdachte Umbauten, die Ihren Wohnraum in Wädenswil schöner und funktionaler machen.',
    serviceDescription: 'Unser Team in Wädenswil plant und baut Ihr neues Bad oder Ihre Küche nach Ihren Wünschen – persönlich, zuverlässig und mit regionaler Verbundenheit.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Familienbad mit Dusche und Wanne',
        description: 'Neues Badezimmer mit großer Dusche und komfortabler Badewanne für eine Familie.',
        location: 'Wädenswil',
        images: [
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Familienbad', 'Dusche']
      },
      {
        title: 'Offene Wohnküche',
        description: 'Umbau einer alten Küche zu einem offenen Koch- und Essbereich mit viel Licht.',
        location: 'Wädenswil',
        images: [
          "https://images.unsplash.com/photo-1586208958839-06c17cacf2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Offene Küche', 'Wohnküche']
      },
      {
        title: 'Kleines Gäste-WC',
        description: 'Geschmackvolle Gestaltung eines kleinen Gäste-WCs mit cleverer Raumnutzung.',
        location: 'Wädenswil',
        images: [
          "https://images.unsplash.com/photo-1599639668273-ce573e036294?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Gäste-WC', 'Kleiner Raum']
      }
    ],
    testimonials: [
      {
        quote: 'Wir sind sehr zufrieden mit unserem neuen Badezimmer. Die Beratung war kompetent und die Handwerker sehr freundlich.',
        author: 'Familie Schmidt',
        location: 'Wädenswil',
        project: 'Badumbau'
      },
      {
        quote: 'Unsere offene Küche ist ein Traum geworden! Wir kochen jetzt viel öfter zusammen und genießen den neuen Raum.',
        author: 'Thomas und Maria',
        location: 'Wädenswil',
        project: 'Küchenumbau'
      },
      {
        quote: 'Das kleine Gäste-WC sieht jetzt viel größer aus. Die Ideen des Bäderberg-Teams haben uns überzeugt.',
        author: 'Familie Berger',
        location: 'Wädenswil',
        project: 'Gäste-WC'
      }
    ],
    benefits: [
      {
        title: 'Vor Ort für Sie da',
        description: 'Unser Team ist in Wädenswil und Umgebung schnell bei Ihnen.',
        icon: 'MapPin'
      },
      {
        title: 'Transparente Planung',
        description: 'Sie wissen immer, wann was passiert und was es kostet.',
        icon: 'Clock'
      },
      {
        title: 'Fachkundige Beratung',
        description: 'Wir finden die passende Lösung für Ihre Räume und Budget.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Martin Brunner',
      position: 'Ansprechpartner Wädenswil',
      phone: '+41 44 123 45 69',
      email: 'waedenswil@baederberg.ch'
    },
    address: {
      street: 'Seestrasse 45',
      city: '8820 Wädenswil'
    }
  },
  'lachen': {
    title: 'Bäderberg in Lachen',
    description: 'Ihr kompetenter Partner für Bad- und Küchenrenovierungen in Lachen',
    problem: 'Passt Ihr Bad oder Ihre Küche nicht mehr zu Ihren Bedürfnissen?',
    agitation: 'Veraltete Sanitäranlagen und Küchen können den Alltag erschweren und den Wohnkomfort erheblich mindern. In Lachen am oberen Zürichsee sollte Ihr Zuhause Ihren Wünschen entsprechen.',
    solution: 'Bäderberg gestaltet Ihren Wohnraum neu – mit praktischen Lösungen und ansprechendem Design, abgestimmt auf Ihre persönlichen Bedürfnisse.',
    serviceDescription: 'Unsere Handwerker und Planer kennen sich in Lachen gut aus und setzen Ihr Projekt zuverlässig und fachkundig um.',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Modernes Familienbad',
        description: 'Umbau eines alten Bades zu einem modernen Familienbad mit viel Stauraum und praktischer Aufteilung.',
        location: 'Lachen',
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Modern', 'Familienfreundlich']
      },
      {
        title: 'Helle Küche mit Essbereich',
        description: 'Neugestaltung einer Küche mit integriertem Essbereich und großen Fenstern für viel Tageslicht.',
        location: 'Lachen',
        images: [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Hell', 'Essbereich']
      },
      {
        title: 'Renovierung Altbau-Bad',
        description: 'Behutsame Renovierung eines Bades in einem Altbau mit Erhalt historischer Elemente.',
        location: 'Lachen',
        images: [
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1599639668273-ce573e036294?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Altbau', 'Renovation']
      }
    ],
    testimonials: [
      {
        quote: 'Der Umbau unseres Bades lief reibungslos und das Ergebnis ist genau das, was wir uns gewünscht haben.',
        author: 'Familie Huber',
        location: 'Lachen',
        project: 'Badumbau'
      },
      {
        quote: 'Endlich haben wir eine Küche, in der das Kochen wirklich Spaß macht! Das Team war super und die Arbeit ist top.',
        author: 'Andreas und Lisa',
        location: 'Lachen',
        project: 'Küchenumbau'
      },
      {
        quote: 'Die alte Substanz wurde respektiert und trotzdem haben wir jetzt ein modernes Bad. Vielen Dank!',
        author: 'Familie Schneider',
        location: 'Lachen',
        project: 'Altbau-Renovation'
      }
    ],
    benefits: [
      {
        title: 'Regionalität',
        description: 'Wir kennen uns in Lachen und Umgebung gut aus.',
        icon: 'MapPin'
      },
      {
        title: 'Pünktlichkeit',
        description: 'Wir halten Termine ein und informieren Sie regelmäßig.',
        icon: 'Clock'
      },
      {
        title: 'Handwerkskunst',
        description: 'Unsere erfahrenen Handwerker arbeiten präzise und sorgfältig.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Daniel Meyer',
      position: 'Ansprechpartner Lachen',
      phone: '+41 44 123 45 70',
      email: 'lachen@baederberg.ch'
    },
    address: {
      street: 'Marktgasse 12',
      city: '8853 Lachen'
    }
  },
  'pfaeffikon': {
    title: 'Bäderberg in Pfäffikon SZ',
    description: 'Ihr zuverlässiger Partner für Bad- und Küchenumbauten in Pfäffikon und Umgebung',
    problem: 'Möchten Sie Ihr Bad oder Ihre Küche in Pfäffikon modernisieren?',
    agitation: 'Viele Bäder und Küchen in Pfäffikon entsprechen nicht mehr den heutigen Standards in Bezug auf Komfort, Energieeffizienz und Design. Eine Modernisierung steigert die Wohnqualität erheblich.',
    solution: 'Bäderberg realisiert Ihren Umbau fachkundig, termintreu und nach Ihren individuellen Wünschen – für mehr Freude am Wohnen.',
    serviceDescription: 'In Pfäffikon SZ und Umgebung bieten wir umfassende Beratung, detaillierte Planung und sorgfältige Umsetzung für Ihre Umbauvorhaben.',
    heroImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Barrierefreies Bad',
        description: 'Umbau eines herkömmlichen Bades zu einem komfortablen, barrierefreien Bad für alle Generationen.',
        location: 'Pfäffikon SZ',
        images: [
          "https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Barrierefrei', 'Komfort']
      },
      {
        title: 'Moderne Einbauküche',
        description: 'Einbau einer neuen Küche mit praktischen Schränken und modernsten Geräten.',
        location: 'Pfäffikon SZ',
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586208958839-06c17cacf2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Modern', 'Einbauküche']
      },
      {
        title: 'Wohnraum-Sanierung',
        description: 'Umfassende Sanierung eines Wohnbereichs mit neuer Küche und angrenzenden Räumen.',
        location: 'Pfäffikon SZ',
        images: [
          "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1595514535115-dd5b0d141038?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Sanierung', 'Wohnraum', 'Küche']
      }
    ],
    testimonials: [
      {
        quote: 'Unser barrierefreies Bad ist ein echter Gewinn für die ganze Familie. Die Beratung war kompetent und einfühlsam.',
        author: 'Ehepaar Müller',
        location: 'Pfäffikon SZ',
        project: 'Barrierefreies Bad'
      },
      {
        quote: 'Die neue Küche ist super praktisch und sieht toll aus. Alles wurde pünktlich fertig und hat gut geklappt.',
        author: 'Julia und Marco',
        location: 'Pfäffikon SZ',
        project: 'Küchenumbau'
      },
      {
        quote: 'Die Sanierung hat unser Haus aufgewertet. Das Team war immer freundlich und hat sauber gearbeitet.',
        author: 'Familie Keller',
        location: 'Pfäffikon SZ',
        project: 'Wohnraum-Sanierung'
      }
    ],
    benefits: [
      {
        title: 'Nähe zum Kunden',
        description: 'Wir sind vor Ort und schnell für Sie da.',
        icon: 'MapPin'
      },
      {
        title: 'Verlässliche Planung',
        description: 'Wir halten uns an Absprachen und Zeitpläne.',
        icon: 'Clock'
      },
      {
        title: 'Erfahrene Handwerker',
        description: 'Unser Team arbeitet präzise und mit Liebe zum Detail.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Sabine Meier',
      position: 'Ansprechpartnerin Pfäffikon',
      phone: '+41 44 123 45 71',
      email: 'pfaeffikon@baederberg.ch'
    },
    address: {
      street: 'Zürcherstrasse 28',
      city: '8808 Pfäffikon SZ'
    }
  },
  'menzingen': {
    title: 'Bäderberg in Menzingen',
    description: 'Ihr kompetenter Ansprechpartner für Bad- und Küchenumbauten in Menzingen',
    problem: 'Ist Ihr Bad oder Ihre Küche in die Jahre gekommen und benötigt eine Auffrischung?',
    agitation: 'Ältere Bäder und Küchen können den Alltag erschweren und entsprechen oft nicht mehr den heutigen Ansprüchen an Komfort und Energieeffizienz. In Menzingen mit seiner besonderen Topografie braucht es durchdachte Lösungen.',
    solution: 'Bäderberg realisiert Ihren Umbau nach Ihren Wünschen – mit lokaler Erfahrung und einem Gespür für die regionalen Besonderheiten.',
    serviceDescription: 'In Menzingen bieten wir von der ersten Skizze bis zur fertigen Umsetzung alles aus einer Hand – mit persönlicher Betreuung und kurzen Wegen.',
    heroImage: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Badezimmer mit Naturblick',
        description: 'Umbau eines kleinen Bades zu einem hellen Wohlfühlraum mit optimaler Raumnutzung.',
        location: 'Menzingen',
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Hell', 'Naturmaterialien']
      },
      {
        title: 'Landhaus-Küche',
        description: 'Gestaltung einer rustikalen Küche mit modernen Elementen für ein Haus im Grünen.',
        location: 'Menzingen',
        images: [
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Landhausstil', 'Modern']
      },
      {
        title: 'Barrierefreier Umbau',
        description: 'Umgestaltung eines Bades für mehr Komfort und Sicherheit im Alter.',
        location: 'Menzingen',
        images: [
          "https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Barrierefrei', 'Seniorengerecht']
      }
    ],
    testimonials: [
      {
        quote: 'Das Team von Bäderberg hat unsere Vorstellungen perfekt umgesetzt. Das neue Bad ist genau so, wie wir es uns gewünscht haben.',
        author: 'Familie Weber',
        location: 'Menzingen',
        project: 'Badumbau'
      },
      {
        quote: 'Die neue Küche passt wunderbar zu unserem Haus. Die Beratung war top und die Arbeit wurde sauber ausgeführt.',
        author: 'Hans und Monika',
        location: 'Menzingen',
        project: 'Küchenumbau'
      },
      {
        quote: 'Der barrierefreie Umbau war die beste Entscheidung. Jetzt können wir noch lange in unserem Haus bleiben.',
        author: 'Ehepaar Meier',
        location: 'Menzingen',
        project: 'Barrierefreier Umbau'
      }
    ],
    benefits: [
      {
        title: 'Regionale Expertise',
        description: 'Wir kennen die Gegebenheiten in Menzingen sehr gut.',
        icon: 'MapPin'
      },
      {
        title: 'Pünktliche Umsetzung',
        description: 'Wir halten unsere Zeitpläne zuverlässig ein.',
        icon: 'Clock'
      },
      {
        title: 'Hochwertige Materialien',
        description: 'Wir verwenden nur Qualitätsprodukte für Ihren Umbau.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Können Sie auch Umbauten in älteren Häusern durchführen?',
        answer: 'Ja, wir haben viel Erfahrung mit Umbauten in älteren Gebäuden und kennen die typischen Herausforderungen.'
      },
      {
        question: 'Wie lange dauert ein Badumbau in Menzingen?',
        answer: 'Ein Badumbau dauert je nach Umfang zwischen 3 und 6 Wochen. Wir erstellen vorab einen detaillierten Zeitplan.'
      },
      {
        question: 'Gibt es Fördermittel für barrierefreie Umbauten?',
        answer: 'Ja, für barrierefreie Umbauten gibt es verschiedene Fördermöglichkeiten. Wir beraten Sie gerne zu den aktuellen Programmen.'
      }
    ],
    contactPerson: {
      name: 'Markus Fischer',
      position: 'Ansprechpartner Menzingen',
      phone: '+41 44 123 45 72',
      email: 'menzingen@baederberg.ch'
    },
    address: {
      street: 'Bergstrasse 15',
      city: '6313 Menzingen'
    }
  },
  'zollikon': {
    title: 'Bäderberg in Zollikon',
    description: 'Ihr Spezialist für hochwertige Bad- und Küchenumbauten in Zollikon',
    problem: 'Suchen Sie nach einem verlässlichen Partner für Ihren Umbau in Zollikon?',
    agitation: 'In den exklusiven Wohnlagen Zollikons sind Qualität und Präzision bei Umbauten besonders wichtig. Veraltete Bäder und Küchen entsprechen oft nicht mehr dem gehobenen Anspruch.',
    solution: 'Bäderberg setzt Ihre Wünsche mit Schweizer Präzision und einem Gespür für hochwertige Materialien um.',
    serviceDescription: 'Für unsere Kunden in Zollikon bieten wir erstklassige Beratung, detaillierte Planung und exzellente Handwerksarbeit für anspruchsvolle Umbauprojekte.',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Luxusbad mit Seeblick',
        description: 'Komplette Neugestaltung eines Badezimmers mit edlen Materialien und perfekter Aussicht.',
        location: 'Zollikon',
        images: [
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Luxus', 'Seeblick']
      },
      {
        title: 'Designer-Küche',
        description: 'Einbau einer modernen Designerküche mit hochwertigen Geräten und exklusiver Ausstattung.',
        location: 'Zollikon',
        images: [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Design', 'Luxusausstattung']
      },
      {
        title: 'Wellness-Oase',
        description: 'Umbau eines Kellers zu einem privaten Spa-Bereich mit Sauna und Regendusche.',
        location: 'Zollikon',
        images: [
          "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Wellness', 'Spa', 'Sauna']
      }
    ],
    testimonials: [
      {
        quote: 'Die Qualität der Arbeit ist aussergewöhnlich. Unser neues Bad ist ein echtes Schmuckstück geworden.',
        author: 'Familie Berger',
        location: 'Zollikon',
        project: 'Badumbau'
      },
      {
        quote: 'Die Zusammenarbeit mit Bäderberg war stets professionell. Das Ergebnis übertrifft unsere Erwartungen.',
        author: 'Dr. und Fr. Mayer',
        location: 'Zollikon',
        project: 'Designer-Küche'
      },
      {
        quote: 'Unser Spa-Bereich ist nun der Lieblingsort im Haus. Die Umsetzung war perfekt.',
        author: 'Thomas Schmidt',
        location: 'Zollikon',
        project: 'Wellness-Oase'
      }
    ],
    benefits: [
      {
        title: 'Premium-Qualität',
        description: 'Wir verwenden nur erstklassige Materialien und Produkte.',
        icon: 'Shield'
      },
      {
        title: 'Diskrete Umsetzung',
        description: 'Wir arbeiten rücksichtsvoll und mit minimalen Störungen.',
        icon: 'Clock'
      },
      {
        title: 'Massgeschneiderte Lösungen',
        description: 'Jedes Projekt wird individuell nach Ihren Wünschen gestaltet.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Christina Huber',
      position: 'Ansprechpartnerin Zollikon',
      phone: '+41 44 123 45 73',
      email: 'zollikon@baederberg.ch'
    },
    address: {
      street: 'Seestrasse 120',
      city: '8702 Zollikon'
    }
  },
  'kilchberg': {
    title: 'Bäderberg in Kilchberg',
    description: 'Ihr Partner für stilvolle Bad- und Küchenrenovierungen in Kilchberg',
    problem: 'Entspricht Ihr Bad oder Ihre Küche in Kilchberg nicht mehr Ihren Ansprüchen?',
    agitation: 'In den schönen Häusern Kilchbergs sollten auch die Bäder und Küchen dem hohen Wohnstandard entsprechen. Veraltete Räume mindern den Wohnkomfort und die Freude am Zuhause.',
    solution: 'Bäderberg gestaltet Ihre Räume nach Ihren Wünschen – stilsicher, hochwertig und mit einem Blick für das Besondere.',
    serviceDescription: 'In Kilchberg bieten wir massgeschneiderte Lösungen für anspruchsvolle Kunden, die Wert auf Qualität und durchdachte Konzepte legen.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Elegantes Badezimmer',
        description: 'Umbau eines Badezimmers zu einem eleganten Wohlfühlraum mit hochwertiger Ausstattung.',
        location: 'Kilchberg',
        images: [
          "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Eleganz', 'Hochwertig']
      },
      {
        title: 'Offene Wohnküche',
        description: 'Gestaltung einer offenen Küche mit Kochinsel und nahtlosem Übergang zum Wohnbereich.',
        location: 'Kilchberg',
        images: [
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586208958839-06c17cacf2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Wohnküche', 'Kochinsel']
      },
      {
        title: 'Gästebad im Vintage-Stil',
        description: 'Gestaltung eines kleinen Gästebades mit Charakter und besonderen Details.',
        location: 'Kilchberg',
        images: [
          "https://images.unsplash.com/photo-1599639668273-ce573e036294?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Vintage', 'Gästebad']
      }
    ],
    testimonials: [
      {
        quote: 'Unser neues Bad ist ein Traum geworden. Die Handwerker waren sehr professionell und die Arbeit ist tadellos.',
        author: 'Familie Schneider',
        location: 'Kilchberg',
        project: 'Badumbau'
      },
      {
        quote: 'Die offene Küche hat unser Wohnkonzept komplett verändert. Wir sind begeistert von der Qualität und dem Design.',
        author: 'Peter und Sarah',
        location: 'Kilchberg',
        project: 'Wohnküche'
      },
      {
        quote: 'Das kleine Gästebad hat so viel Charakter bekommen! Die kreativen Ideen des Teams haben uns überzeugt.',
        author: 'Claudia Müller',
        location: 'Kilchberg',
        project: 'Gästebad'
      }
    ],
    benefits: [
      {
        title: 'Designkompetenz',
        description: 'Wir haben ein Auge für Ästhetik und aktuelle Trends.',
        icon: 'MapPin'
      },
      {
        title: 'Qualitätshandwerk',
        description: 'Unsere Handwerker arbeiten präzise und mit Liebe zum Detail.',
        icon: 'Wrench'
      },
      {
        title: 'Termintreue',
        description: 'Wir halten uns an vereinbarte Zeitpläne und Budgets.',
        icon: 'Clock'
      }
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
    contactPerson: {
      name: 'Stefan Wagner',
      position: 'Ansprechpartner Kilchberg',
      phone: '+41 44 123 45 74',
      email: 'kilchberg@baederberg.ch'
    },
    address: {
      street: 'Seestrasse 85',
      city: '8802 Kilchberg'
    }
  },
  'kuesnacht': {
    title: 'Bäderberg in Küsnacht',
    description: 'Ihr Experte für exklusive Bad- und Küchenumbauten in Küsnacht',
    problem: 'Suchen Sie einen zuverlässigen Partner für Ihren hochwertigen Umbau in Küsnacht?',
    agitation: 'In der gehobenen Wohnlage Küsnachts sind Qualität und Exklusivität bei Umbauten besonders wichtig. Ihr Zuhause verdient Räume, die Ihrem Lebensstil entsprechen.',
    solution: 'Bäderberg realisiert anspruchsvolle Umbauprojekte mit höchster Präzision und einem feinen Gespür für exklusive Materialien und Details.',
    serviceDescription: 'Für unsere Kunden in Küsnacht bieten wir massgeschneiderte Konzepte, persönliche Betreuung und erstklassige Handwerkskunst.',
    heroImage: 'https://images.unsplash.com/photo-1589395937772-7c69f7cf1a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Luxuriöses Masterbad',
        description: 'Komplettsanierung eines grosszügigen Masterbads mit edlen Materialien und intelligenter Technik.',
        location: 'Küsnacht',
        images: [
          "https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Luxus', 'Smart Home']
      },
      {
        title: 'Exklusive Küche',
        description: 'Massgeschneiderte Küche mit Naturstein, hochwertigen Geräten und perfekter Funktionalität.',
        location: 'Küsnacht',
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Exklusiv', 'Naturstein']
      },
      {
        title: 'Spa & Wellness',
        description: 'Gestaltung eines privaten Spa-Bereichs mit Sauna, Dampfbad und Erlebnisdusche.',
        location: 'Küsnacht',
        images: [
          "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1583417319070-4a69db38a482?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Wellness', 'Spa', 'Premium']
      }
    ],
    testimonials: [
      {
        quote: 'Die Arbeit von Bäderberg war in jeder Hinsicht erstklassig. Das Ergebnis übertrifft unsere hohen Erwartungen.',
        author: 'Dr. Müller',
        location: 'Küsnacht',
        project: 'Masterbad'
      },
      {
        quote: 'Unsere neue Küche ist ein wahres Meisterwerk. Die Beratung war exzellent und die Umsetzung makellos.',
        author: 'Familie Zimmermann',
        location: 'Küsnacht',
        project: 'Küchenumbau'
      },
      {
        quote: 'Der Wellness-Bereich ist die perfekte Ergänzung zu unserem Zuhause. Eine Investition, die sich jeden Tag lohnt.',
        author: 'Alexandra und Thomas',
        location: 'Küsnacht',
        project: 'Spa & Wellness'
      }
    ],
    benefits: [
      {
        title: 'Exklusive Materialien',
        description: 'Wir arbeiten mit den besten Materialien für langlebige Qualität.',
        icon: 'Shield'
      },
      {
        title: 'Präzision',
        description: 'Unsere Handwerker arbeiten mit höchster Genauigkeit.',
        icon: 'Wrench'
      },
      {
        title: 'Persönliche Betreuung',
        description: 'Ein fester Ansprechpartner begleitet Ihr Projekt von Anfang bis Ende.',
        icon: 'MapPin'
      }
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
    contactPerson: {
      name: 'Dr. Andreas Baumann',
      position: 'Ansprechpartner Küsnacht',
      phone: '+41 44 123 45 75',
      email: 'kuesnacht@baederberg.ch'
    },
    address: {
      street: 'Seestrasse 160',
      city: '8700 Küsnacht'
    }
  },
  'meilen': {
    title: 'Bäderberg in Meilen',
    description: 'Ihr zuverlässiger Partner für stilvolle Bad- und Küchenumbauten in Meilen',
    problem: 'Ist es Zeit für eine Modernisierung Ihres Bades oder Ihrer Küche in Meilen?',
    agitation: 'Viele Bewohner in Meilen leben in Häusern mit veralteten Bädern und Küchen, die nicht mehr zeitgemäss sind. Ein moderner Umbau steigert nicht nur den Wohnkomfort, sondern auch den Wert Ihrer Immobilie.',
    solution: 'Bäderberg realisiert Ihren Umbau mit Schweizer Qualitätsarbeit, termingerecht und nach Ihren individuellen Wünschen.',
    serviceDescription: 'In Meilen bieten wir ein Rundum-Sorglos-Paket für Ihren Umbau – von der ersten Beratung über die detaillierte Planung bis zur fachgerechten Umsetzung.',
    heroImage: 'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Modernes Familienbad',
        description: 'Umbau eines veralteten Bades zu einem modernen Familienbad mit viel Stauraum und praktischer Aufteilung.',
        location: 'Meilen',
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Modern', 'Familie']
      },
      {
        title: 'Küche mit Seeblick',
        description: 'Gestaltung einer offenen Küche, die die herrliche Aussicht auf den See optimal einbezieht.',
        location: 'Meilen',
        images: [
          "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Seeblick', 'Offene Küche']
      },
      {
        title: 'Gäste-WC mit Stil',
        description: 'Neugestaltung eines kleinen Gäste-WCs mit effektvoller Beleuchtung und hochwertigen Materialien.',
        location: 'Meilen',
        images: [
          "https://images.unsplash.com/photo-1599639668273-ce573e036294?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Gäste-WC', 'Design']
      }
    ],
    testimonials: [
      {
        quote: 'Die Zusammenarbeit mit Bäderberg war sehr angenehm. Unser neues Badezimmer ist praktisch und schön zugleich.',
        author: 'Familie Brunner',
        location: 'Meilen',
        project: 'Familienbad'
      },
      {
        quote: 'Die Küche ist jetzt unser Lieblingsraum. Die Aussicht auf den See kommt viel besser zur Geltung.',
        author: 'Thomas und Lisa',
        location: 'Meilen',
        project: 'Küche mit Seeblick'
      },
      {
        quote: 'Das kleine Gäste-WC hat eine grosse Wirkung. Unsere Gäste sind jedes Mal beeindruckt.',
        author: 'Markus Schmid',
        location: 'Meilen',
        project: 'Gäste-WC'
      }
    ],
    benefits: [
      {
        title: 'Lokales Handwerk',
        description: 'Wir arbeiten mit Handwerkern aus der Region zusammen.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässigkeit',
        description: 'Wir halten unsere Termine ein und arbeiten sauber.',
        icon: 'Clock'
      },
      {
        title: 'Persönliche Beratung',
        description: 'Wir nehmen uns Zeit für Ihre individuellen Wünsche.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Martin Keller',
      position: 'Ansprechpartner Meilen',
      phone: '+41 44 123 45 76',
      email: 'meilen@baederberg.ch'
    },
    address: {
      street: 'Dorfstrasse 42',
      city: '8706 Meilen'
    }
  },
  'erlenbach': {
    title: 'Bäderberg in Erlenbach',
    description: 'Ihr Partner für hochwertige Bad- und Küchenrenovierungen in Erlenbach',
    problem: 'Ist Ihr Bad oder Ihre Küche in Erlenbach nicht mehr zeitgemäss?',
    agitation: 'In den schönen Wohnlagen Erlenbachs sollte jedes Detail stimmen. Veraltete Bäder und Küchen mindern nicht nur den Wohnkomfort, sondern passen auch optisch nicht mehr zu Ihrem gepflegten Zuhause.',
    solution: 'Bäderberg gestaltet Ihre Räume neu – mit hochwertigen Materialien, durchdachter Planung und perfekter Umsetzung.',
    serviceDescription: 'Für unsere Kunden in Erlenbach bieten wir massgeschneiderte Lösungen, die zu ihrem individuellen Lebensstil und den hohen Ansprüchen der Region passen.',
    heroImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    projects: [
      {
        title: 'Elegantes Marmorbad',
        description: 'Gestaltung eines luxuriösen Badezimmers mit hochwertigen Marmorelementen und goldenen Akzenten.',
        location: 'Erlenbach',
        images: [
          "https://images.unsplash.com/photo-1603825491103-bd638b1873b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Marmor', 'Luxus']
      },
      {
        title: 'Gourmetküche',
        description: 'Einbau einer professionellen Küche für Hobbyköche mit erstklassiger Ausstattung.',
        location: 'Erlenbach',
        images: [
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1586208958839-06c17cacf2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Küchenumbau', 'Gourmet', 'Profi-Ausstattung']
      },
      {
        title: 'Duschbad mit Glaswand',
        description: 'Modernes, helles Badezimmer mit grosszügiger Dusche und eleganter Glasabtrennung.',
        location: 'Erlenbach',
        images: [
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Modern', 'Glas']
      }
    ],
    testimonials: [
      {
        quote: 'Die Qualität und Präzision der Arbeit von Bäderberg hat uns überzeugt. Unser Marmorbad ist ein echtes Highlight.',
        author: 'Familie Weber',
        location: 'Erlenbach',
        project: 'Marmorbad'
      },
      {
        quote: 'Als Hobbykoch habe ich jetzt endlich eine Küche, die keine Wünsche offen lässt. Die Beratung war erstklassig.',
        author: 'Michael Steiner',
        location: 'Erlenbach',
        project: 'Gourmetküche'
      },
      {
        quote: 'Das neue Duschbad ist nicht nur schön, sondern auch praktisch. Die Glaswand war eine hervorragende Idee.',
        author: 'Sabine und Peter',
        location: 'Erlenbach',
        project: 'Duschbad'
      }
    ],
    benefits: [
      {
        title: 'Hochwertige Materialen',
        description: 'Wir verwenden nur die besten Materialien für langlebige Qualität.',
        icon: 'Shield'
      },
      {
        title: 'Termingerechte Ausführung',
        description: 'Wir halten uns strikt an vereinbarte Zeitpläne.',
        icon: 'Clock'
      },
      {
        title: 'Detailliebe',
        description: 'Wir achten auf jedes noch so kleine Detail.',
        icon: 'Wrench'
      }
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
    contactPerson: {
      name: 'Laura Brunner',
      position: 'Ansprechpartnerin Erlenbach',
      phone: '+41 44 123 45 77',
      email: 'erlenbach@baederberg.ch'
    },
    address: {
      street: 'Seestrasse 78',
      city: '8703 Erlenbach'
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
            <Link to="/" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors">
              Zurück zur Startseite
            </Link>
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
      
      {/* Problem-Agitation-Solution Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ihre Herausforderung, unsere Lösung</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Die Herausforderung</h3>
                <p className="text-gray-600">{region.problem}</p>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Das Problem</h3>
                <p className="text-gray-600">{region.agitation}</p>
              </div>
              
              <div className="bg-primary p-6 md:p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-white mb-3">Unsere Lösung</h3>
                <p className="text-white/90">{region.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Description */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Unser Service für {region.address.city}</h2>
            <p className="text-lg text-gray-600 mb-10">{region.serviceDescription}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {region.benefits.map((benefit, index) => {
                const IconComponent = 
                  benefit.icon === 'MapPin' ? MapPin :
                  benefit.icon === 'Clock' ? Clock :
                  benefit.icon === 'Shield' ? Shield : Wrench;
                
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Unsere Projekte in {region.address.city}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {region.projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                location={project.location}
                images={project.images}
                tags={project.tags}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Was unsere Kunden sagen</h2>
          
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
      
      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Häufige Fragen</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {region.faq.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Kontaktieren Sie uns</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Haben Sie Fragen oder möchten Sie ein unverbindliches Angebot? Kontaktieren Sie uns:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">{region.address.street}</p>
                      <p className="text-gray-600">{region.address.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <p>
                      <a href={`tel:${region.contactPerson.phone}`} className="text-gray-800 hover:text-primary transition-colors">
                        {region.contactPerson.phone}
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <p>
                      <a href={`mailto:${region.contactPerson.email}`} className="text-gray-800 hover:text-primary transition-colors">
                        {region.contactPerson.email}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Ihr Ansprechpartner</h3>
                  <p className="font-medium text-gray-800">{region.contactPerson.name}</p>
                  <p className="text-gray-600">{region.contactPerson.position}</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Schreiben Sie uns</h3>
                
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-1">E-Mail</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 mb-1">Betreff</label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-1">Nachricht</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Nachricht senden
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Regions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Weitere Regionen entdecken</h2>
          
          <div className="flex overflow-x-auto pb-4 space-x-4 -mx-4 px-4 scrollbar-hide">
            {Object.entries(regionData)
              .filter(([key]) => key !== regionId)
              .slice(0, 5)
              .map(([key, value]) => (
                <Link
                  key={key}
                  to={`/region/${key}`}
                  className="min-w-[280px] flex-shrink-0 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{value.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    Mehr erfahren <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
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
