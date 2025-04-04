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
          "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        tags: ['Badumbau', 'Hell', 'Ausblick']
      }
    ],
    testimonials: [
      {
        quote: 'Ein tolles Bad mit Blick ins Grüne - wir sind sehr zufrieden mit der Arbeit von Bäderberg.',
        author: 'Familie Weber',
        location: 'Menzingen',
        project: 'Badumbau'
      }
    ],
    benefits: [
      {
        title: 'Erfahrung vor Ort',
        description: 'Wir kennen die besondere Lage und Bauweise in Menzingen.',
        icon: 'MapPin'
      },
      {
        title: 'Zuverlässiger Service',
        description: 'Pünktlichkeit und Qualität stehen für uns an erster Stelle.',
        icon: 'Clock'
      },
      {
        title: 'Handwerkliches Können',
        description: 'Unser Team arbeitet mit Präzision und Sorgfalt.',
        icon: 'Wrench'
      }
    ],
    faq: [
      {
        question: 'Wie lange ist die übliche Bauzeit bei einem Badezimmerumbau?',
        answer: 'Die Dauer für einen Badumbau beträgt in der Regel 3-5 Wochen, abhängig vom Umfang der Arbeiten.'
      },
      {
        question: 'Arbeiten Sie auch in Altbauten?',
        answer: 'Ja, wir haben viel Erfahrung mit dem Umbau in bestehenden Gebäuden und passen unsere Lösungen an die jeweiligen Gegebenheiten an.'
      }
    ],
    contactPerson: {
      name: 'Thomas Müller',
      position: 'Ansprechpartner Menzingen',
      phone: '+41 41 755 45 72',
      email: 'menzingen@baederberg.ch'
    },
    address: {
      street: 'Dorfstrasse 15',
      city: '6313 Menzingen'
    }
  }
};

export const RegionPage = () => {
  const { regionId } = useParams();
  const region = regionId && regionData[regionId] ? regionData[regionId] : null;

  useEffect(() => {
    if (!region) {
      console.error(`Region not found: ${regionId}`);
    }
    window.scrollTo(0, 0);
  }, [region, regionId]);

  if (!region) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-20 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Region nicht gefunden</h1>
          <p className="mb-8 text-muted-foreground">Die gesuchte Region konnte leider nicht gefunden werden.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowRight size={16} className="mr-1" />
            Zurück zur Startseite
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={region.heroImage} 
            alt={`Bäderberg in ${regionId}`} 
            className="w-full h-full object-cover"
          />
          <div className="container px-4 absolute inset-0 z-20 flex flex-col justify-center">
            <div className="max-w-3xl">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-4 md:mb-6">
                <ArrowRight size={16} className="rotate-180" />
                Zurück zur Startseite
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{region.title}</h1>
              <p className="text-lg md:text-xl text-white/80">{region.description}</p>
            </div>
          </div>
        </section>
        
        {/* PAS Framework Section */}
        <section className="py-16 bg-secondary/10">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Problem</h3>
                <p className="text-lg mb-4">{region.problem}</p>
                <p className="text-muted-foreground">{region.agitation}</p>
              </div>
              
              <div className="bg-primary/5 p-6 md:p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Angebot</h3>
                <p className="text-lg mb-4">{region.solution}</p>
                <p className="text-muted-foreground">{region.serviceDescription}</p>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary">Service</h3>
                <div className="space-y-4">
                  {region.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {benefit.icon === 'MapPin' && <MapPin size={20} className="text-primary mt-1 shrink-0" />}
                      {benefit.icon === 'Clock' && <Clock size={20} className="text-primary mt-1 shrink-0" />}
                      {benefit.icon === 'Shield' && <Shield size={20} className="text-primary mt-1 shrink-0" />}
                      {benefit.icon === 'Wrench' && <Wrench size={20} className="text-primary mt-1 shrink-0" />}
                      <div>
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-16">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Unsere Projekte in {regionId}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {region.projects.map((project, index) => (
                <ProjectCard 
                  key={project.title}
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
        
        {/* Testimonials */}
        <section className="py-16 bg-secondary/10">
          <div className="container px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Das sagen unsere Kunden</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="py-16">
          <div className="container px-4 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Häufige Fragen</h2>
            
            <div className="space-y-6">
              {region.faq.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-medium mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Kontaktieren Sie uns</h2>
                <p className="mb-8 text-lg text-muted-foreground max-w-2xl">
                  Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Unser Team ist gerne für Sie da und hilft Ihnen bei Ihrem Projekt weiter.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-2xl">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Adresse</h4>
                      <p className="text-muted-foreground text-sm">{region.address.street}<br />{region.address.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Telefon</h4>
                      <p className="text-muted-foreground text-sm">{region.contactPerson.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">E-Mail</h4>
                      <p className="text-muted-foreground text-sm">{region.contactPerson.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1 shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <div>
                      <h4 className="font-medium mb-1">Ansprechpartner</h4>
                      <p className="text-muted-foreground text-sm">{region.contactPerson.name}<br />{region.contactPerson.position}</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/#contact">
                  <button className="bg-primary hover:bg-primary/90 text-white py-2 px-6 rounded-md text-sm font-medium flex items-center gap-2">
                    Kontaktformular
                    <ChevronRight size={16} />
                  </button>
                </Link>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl shadow-md aspect-square">
                  <iframe
                    title="Standortkarte"
                    className="w-full h-full rounded-lg border-0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=8.5%2C47.3%2C8.6%2C47.4&amp;layer=mapnik&amp;marker=47.35%2C8.55`}
                    style={{ border: "none" }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegionPage;
