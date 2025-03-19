
import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  image?: string;
  project: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  location, 
  image,
  project
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="absolute top-6 right-6 text-primary/20"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Quote size={42} />
      </motion.div>
      
      <motion.p 
        className="text-base italic mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {quote}
      </motion.p>
      
      <motion.div 
        className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          {image ? (
            <motion.img 
              src={image} 
              alt={author}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          ) : (
            <motion.div 
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <User size={20} className="text-primary/70" />
            </motion.div>
          )}
          <div>
            <motion.h4 
              className="font-medium text-gray-900"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {author}
            </motion.h4>
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {location}
            </motion.p>
          </div>
        </div>
        <motion.div 
          className="text-xs px-3 py-1.5 rounded-full bg-secondary/70 text-primary font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--secondary), 0.9)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {project}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
