import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  features: string[];
  to: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  features, 
  to,
  index
}) => {
  // Map service title to the appropriate route
  const getServiceRoute = (title: string) => {
    switch (title) {
      case "Badumbau":
        return "/badumbau";
      case "Innenausbau":
        return "/innenausbau";
      default:
        return to;
    }
  };
  
  const serviceRoute = getServiceRoute(title);
  
  return (
    <div 
      className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <OptimizedImage
          src={imageSrc}
          alt={title}
          aspectRatio="4/3"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-2">
          {description}
        </p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <li 
              key={i} 
              className="flex items-start gap-2"
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={serviceRoute} 
          className="inline-flex items-center gap-1 text-primary font-medium transition-all duration-300 group-hover:gap-2"
        >
          Mehr erfahren 
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
