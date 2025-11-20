
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Smile } from 'lucide-react';
import modernBathroom from '/lovable-uploads/modern-bathroom-interior.jpg';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={modernBathroom}
              alt="Modernes Badezimmer" 
              className="w-full rounded-2xl shadow-lg object-cover h-[500px]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Ihr Bad, Ihre Küche, Ihr Innenausbau
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Wir sind Handwerker aus der Region Zürich. Wir planen und bauen Bäder, Küchen und Innenräume – sorgfältig und nach Ihren Wünschen.
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Alles aus einer Hand. Mit persönlicher Betreuung von Anfang bis Ende.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Heart className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Persönliche Betreuung</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ihr persönlicher Bauleiter begleitet Ihr Projekt von Anfang bis Ende.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Sorgfältige Arbeit</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Wir achten auf Details und arbeiten sauber.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Smile className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Garantie inklusive</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Elektroarbeiten und Garantie sind bei uns immer dabei.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
