
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
              Wir möchten Ihr Zuhause schöner machen
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8">
              Bei Baederberg kümmern wir uns um Ihr Badezimmer, Ihre Küche und den Innenausbau. Wir sind ein kleines Team von Handwerkern, die mit Leidenschaft bei der Sache sind und Ihre Wünsche verstehen wollen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Heart className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Mit Leidenschaft</h4>
                  <p className="text-sm text-muted-foreground">
                    Wir lieben unsere Arbeit und freuen uns, wenn Sie sich in Ihrem neuen Raum wohlfühlen.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Mit Sorgfalt</h4>
                  <p className="text-sm text-muted-foreground">
                    Wir arbeiten sorgfältig und achten auf jedes Detail.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Smile className="text-primary" size={24} />
                <div>
                  <h4 className="font-semibold">Für Ihr Wohlbefinden</h4>
                  <p className="text-sm text-muted-foreground">
                    Ihre Zufriedenheit liegt uns am Herzen.
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
