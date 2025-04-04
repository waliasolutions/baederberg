import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Smile } from 'lucide-react';

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
              src="/lovable-uploads/modern-bathroom-interior-with-shower-and-sink.jpg" 
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Wir sind mehr als nur Handwerker
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              Bäderberg steht für innovative Badgestaltung, hochwertige Küchen und massgeschneiderte Innenausbauten. 
              Wir verbinden traditionelles Handwerk mit modernster Technik, um Ihre Wohnträume zu verwirklichen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Heart className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Leidenschaft</h4>
                  <p className="text-sm text-muted-foreground">
                    Wir lieben, was wir tun, und das sieht man in jedem Detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Qualität</h4>
                  <p className="text-sm text-muted-foreground">
                    Wir verwenden nur die besten Materialien und Techniken.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Smile className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Kundenzufriedenheit</h4>
                  <p className="text-sm text-muted-foreground">
                    Ihre Wünsche stehen bei uns an erster Stelle.
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
