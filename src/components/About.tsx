
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <motion.div
          ref={ref} 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -top-4 -left-4 w-64 h-64 bg-secondary rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
              <motion.img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Bäderberg Team"
                className="rounded-lg shadow-xl relative z-10 w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
          >
            <motion.h2 
              className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Über Bäderberg
            </motion.h2>
            <motion.h3 
              className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ihr vertrauensvoller Partner für hochwertige Umbauprojekte
            </motion.h3>
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Seit über 20 Jahren sind wir Ihr kompetenter Partner für anspruchsvolle Umbau- und Renovationsprojekte. Mit Schweizer Präzision und handwerklichem Können verwandeln wir Ihre Räume in funktionale Kunstwerke.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Unsere Mission",
                  text: "Wir schaffen perfekt auf Ihre Bedürfnisse zugeschnittene Räume mit höchster handwerklicher Qualität und innovativem Design."
                },
                {
                  title: "Unsere Werte",
                  text: "Präzision, Verlässlichkeit und Kundennähe stehen bei uns an erster Stelle, kombiniert mit nachhaltigen Lösungen."
                },
                {
                  title: "Unser Team",
                  text: "Unser erfahrenes Team aus Fachleuten verschiedener Gewerke arbeitet Hand in Hand für Ihr perfektes Ergebnis."
                },
                {
                  title: "Unsere Expertise",
                  text: "Vom ersten Konzept bis zur finalen Umsetzung bieten wir Ihnen Komplettlösungen aus einer Hand."
                }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.text}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                className="flex items-center gap-4 bg-secondary p-4 rounded-lg"
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.div 
                  className="text-4xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
                >
                  20+
                </motion.div>
                <div className="text-sm">Jahre Erfahrung in der Branche</div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 bg-secondary p-4 rounded-lg"
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.div 
                  className="text-4xl font-bold text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
                >
                  500+
                </motion.div>
                <div className="text-sm">Erfolgreich abgeschlossene Projekte</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
