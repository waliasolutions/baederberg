import ServiceCard from './ServiceCard';
import { useSectionContent } from '@/cms/context/ContentProvider';

// Default services data (fallback)
const defaultServicesData = [
  {
    title: "Badumbau",
    description: "Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.",
    imageSrc: "/images/bathroom-modern.jpg",
    features: [
      "Persönlicher Bauleiter",
      "Individuelle Badplanung",
      "Einbau hochwertiger Sanitäranlagen",
      "Montage stilvoller Badmöbel",
      "Innovative Beleuchtungskonzepte",
      "Elektroarbeiten und Garantie inklusive"
    ],
    to: "/badumbau"
  },
  {
    title: "Küchenumbau",
    description: "Ihre neue Küche nach Mass – funktional und schön.",
    imageSrc: "/images/kitchen-modern.jpg",
    features: [
      "Individuelle Küchenplanung",
      "Persönlicher Projektleiter",
      "Installation hochwertiger Küchengeräte",
      "Einbau von Arbeitsplatten und individuellen Rückwänden",
      "Fachgerechte Montage",
      "Elektroarbeiten und Garantie inklusive"
    ],
    to: "/kuechenumbau"
  },
  {
    title: "Innenausbau",
    description: "Räume nach Ihren Wünschen – alles aus einer Hand.",
    imageSrc: "/images/interior-living.jpg",
    features: [
      "Fachgerechte Bauleitung",
      "Individuelle Raumplanung",
      "Massgeschneiderter Möbeleinbau",
      "Bodenbeläge und Wandverkleidungen",
      "Treppen und Geländer",
      "Elektroarbeiten und Garantie inklusive",
      "Alles aus einer Hand"
    ],
    to: "/innenausbau"
  }
];

interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  features?: string[];
  link?: string;
}

interface ServicesContent {
  heading?: string;
  subheading?: string;
  items?: ServiceItem[];
}

const Services = () => {
  const servicesContent = useSectionContent<ServicesContent>('services');
  
  // Use CMS data if available, otherwise use defaults
  const heading = servicesContent?.heading || 'Unsere Leistungen für Ihr Zuhause';
  const subheading = servicesContent?.subheading || 'Bad, Küche, Innenausbau – wir begleiten Sie von der Planung bis zur Fertigstellung. Alles aus einer Hand.';
  
  const servicesData = servicesContent?.items?.length 
    ? servicesContent.items.map((item, index) => ({
        title: item.title || defaultServicesData[index]?.title || '',
        description: item.description || defaultServicesData[index]?.description || '',
        imageSrc: item.image || defaultServicesData[index]?.imageSrc || '',
        features: item.features || defaultServicesData[index]?.features || [],
        to: item.link || defaultServicesData[index]?.to || '/'
      }))
    : defaultServicesData;

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-inter">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {subheading}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              features={service.features}
              to={service.to}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
