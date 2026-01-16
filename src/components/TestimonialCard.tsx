import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`;
  }
  return name.substring(0, 2).toUpperCase();
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  image?: string;
  project: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  project,
  rating = 5
}) => {
  return (
    <motion.div 
      className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border border-border/30 h-full flex flex-col"
      whileHover={{ 
        y: -4,
        backgroundColor: "hsl(var(--card))"
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
        "{quote}"
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary">{getInitials(author)}</span>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground font-medium">
          {project}
        </span>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
