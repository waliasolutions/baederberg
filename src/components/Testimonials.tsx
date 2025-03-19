
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from './TestimonialCard';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Bäderberg hat unsere Vorstellungen nicht nur erfüllt, sondern übertroffen. Das neue Bad ist ein Traum und wurde pünktlich und im Budget fertiggestellt.",
    author: "Familie Müller",
    location: "Zürich",
    project: "Badumbau"
  },
  {
    quote: "Die Beratung war kompetent und individuell. Unsere neue Küche ist nicht nur optisch ein Highlight, sondern auch funktional durchdacht.",
    author: "Thomas Weber",
    location: "Richterswil",
    project: "Küchenumbau"
  },
  {
    quote: "Von der ersten Skizze bis zur letzten Schraube alles perfekt. Der gesamte Umbau lief reibungslos und das Ergebnis ist beeindruckend.",
    author: "Christina Huber",
    location: "Wädenswil",
    project: "Innenausbau"
  },
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
    <section className="py-24 md:py-32 bg-secondary/20">
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Was unsere Kunden sagen
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Erfahren Sie, wie wir die Erwartungen unserer Kunden erfüllen und übertreffen.
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
