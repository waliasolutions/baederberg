
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const delay = index * 100;
  
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5
      }
    })
  };
  
  // Map service title to the appropriate route
  const getServiceRoute = (title: string) => {
    switch (title) {
      case "Badumbau":
        return "/badumbau";
      case "Küchenumbau":
        return "/kuechenumbau";
      case "Innenausbau":
        return "/innenausbau";
      default:
        return to;
    }
  };
  
  const serviceRoute = getServiceRoute(title);
  
  return (
    <motion.div 
      className="group relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }}
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <motion.img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
        />
      </div>
      
      <div className="p-6">
        <motion.h3 
          className="text-xl font-semibold mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-muted-foreground mb-6 line-clamp-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {description}
        </motion.p>
        
        <motion.ul className="space-y-2 mb-6">
          {features.map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-start gap-2"
              custom={i}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link 
            to={serviceRoute} 
            className="inline-flex items-center gap-1 text-primary font-medium transition-all duration-300 group-hover:gap-2"
          >
            Mehr erfahren 
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
