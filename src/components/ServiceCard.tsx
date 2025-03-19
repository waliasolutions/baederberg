
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  const delay = index * 100; // Stagger the animations
  
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden card-hover bg-white shadow-sm"
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="image-hover aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-medium"
        />
      </div>
      
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <ul className="space-y-2 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link 
          to={to} 
          className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-medium"
        >
          Mehr erfahren <ArrowRight size={18} className="transition-medium" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
