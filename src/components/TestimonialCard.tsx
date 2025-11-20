import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0].toUpperCase()}. ${names[names.length - 1][0].toUpperCase()}`;
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
  location, 
  image,
  project,
  rating = 5
}) => {
  return (
    <motion.div 
      className="bg-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="absolute top-6 right-6 text-primary/10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Quote size={56} strokeWidth={1.5} />
      </motion.div>
      
      {/* Star Rating */}
      <motion.div 
        className="flex gap-1 mb-6"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
        ))}
      </motion.div>
      
      <motion.p 
        className="text-lg italic mb-8 relative z-10 text-foreground leading-relaxed font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        "{quote}"
      </motion.p>
      
      <motion.div 
        className="flex items-center justify-between mt-auto pt-6 border-t border-border/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <motion.h4 
            className="font-semibold text-foreground text-lg"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {getInitials(author)}
          </motion.h4>
        </div>
        <motion.div 
          className="text-sm px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20"
          whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.15)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {project}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
