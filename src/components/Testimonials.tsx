
import { useInView } from 'react-intersection-observer';
import TestimonialsCarousel from './TestimonialsCarousel';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { realTestimonials } from '@/data/testimonials';

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30" id="testimonials">
      <div className="container px-6 md:px-12">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <MessageCircle size={20} className="text-primary" />
            <h2 className="text-sm md:text-base text-primary font-medium">
              Kundenstimmen
            </h2>
          </motion.div>
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Zufriedene Kunden
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Echte Erfahrungen von unseren Kunden aus der Region
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <TestimonialsCarousel 
            testimonials={realTestimonials}
            autoplay={true}
            autoplayDelay={6000}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
