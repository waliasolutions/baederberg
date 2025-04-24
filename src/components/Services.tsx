import { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const servicesData = [
  {
    title: "Badumbau",
    description: "Wir verwandeln Ihr Badezimmer in eine moderne Wohlfühloase mit eleganten Designs und hochwertigen Materialien.",
    imageSrc: "/lovable-uploads/bad-service.jpg",
    features: [
      "Komplettumbau nach Mass",
      "Barrierefreie Badlösungen",
      "Hochwertige Sanitäranlagen",
      "Stilvolle Badmöbel",
      "Innovative Beleuchtungskonzepte"
    ],
    to: "/badumbau"
  },
  {
    title: "Küchenumbau",
    description: "Perfekte Küchen, die Funktionalität und Design harmonisch verbinden, für ein optimales Koch- und Wohnerlebnis.",
    imageSrc: "/lovable-uploads/kueche-service.jpg",
    features: [
      "Massgeschneiderte Küchenplanungen",
      "Modernste Küchengeräte",
      "Hochwertige Arbeitsflächen",
      "Funktionale Stauraumlösungen",
      "Energieeffiziente Lösungen"
    ],
    to: "/kuechenumbau"
  },
  {
    title: "Innenausbau",
    description: "Durchdachte Raumkonzepte und präzise Ausführung für ein harmonisches Wohnerlebnis in allen Bereichen.",
    imageSrc: "/lovable-uploads/innenausbau-service.jpg",
    features: [
      "Individuelle Schreinerarbeiten",
      "Raumkonzepte und Trennwände",
      "Bodenbeläge und Wandverkleidungen",
      "Treppen und Geländer",
      "Massgeschneiderte Möbel"
    ],
    to: "/innenausbau"
  }
];

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-6 md:px-12">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2 
            className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Unsere Leistungen
          </motion.h2>
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Perfekte Räume mit höchster Qualität
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Vom ersten Entwurf bis zur finalen Umsetzung begleiten wir Ihr Projekt mit Schweizer Präzision und individuellem Design.
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                features={service.features}
                to={service.to}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
