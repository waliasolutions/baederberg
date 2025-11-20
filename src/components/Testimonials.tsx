
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from './TestimonialCard';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Unser Bad ist genau geworden wie wir es wollten. Der Bauleiter hat uns gut beraten und alles lief reibungslos.",
    author: "Lisa Müller",
    location: "Zürich",
    project: "Badumbau",
    rating: 5
  },
  {
    quote: "Die Küche wurde termingerecht fertig. Saubere Arbeit, freundliches Team. Wir sind sehr zufrieden.",
    author: "Thomas Weber",
    location: "Richterswil",
    project: "Küchenumbau",
    rating: 5
  },
  {
    quote: "Das barrierefreie Bad für meine Mutter ist perfekt geworden. Praktisch und schön. Danke!",
    author: "Claudia Schmidt",
    location: "Lachen",
    project: "Barrierefreies Bad",
    rating: 5
  }
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <TestimonialCard 
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                project={testimonial.project}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
