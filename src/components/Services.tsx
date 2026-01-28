import ServiceCard from './ServiceCard';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';

interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface ServicesContent {
  heading?: string;
  subheading?: string;
  items?: ServiceItem[];
}

// Get defaults from schema (SSOT)
const defaultServicesData = defaultContent.services;

const Services = () => {
  const servicesContent = useSectionContent<ServicesContent>('services');
  
  // Use CMS data if available, otherwise use schema defaults
  const heading = servicesContent?.heading || defaultServicesData.heading;
  const subheading = servicesContent?.subheading || defaultServicesData.subheading;
  
  // Map CMS items or fall back to defaults
  const servicesData = (servicesContent?.items?.length 
    ? servicesContent.items 
    : defaultServicesData.items
  ).map((item: ServiceItem) => ({
    title: item.title,
    description: item.description,
    imageSrc: item.image || '/images/bathroom-modern.jpg',
    features: [], // Features not in CMS schema - kept for ServiceCard compatibility
    to: item.link || '/'
  }));

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
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
