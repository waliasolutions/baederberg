
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, ShowerHead, Droplets, Paintbrush } from 'lucide-react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

const BadumbauPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section with Full-Width Header Image */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
            alt="Badezimmer" 
            className="w-full h-full object-cover"
          />
          <div className="container px-6 md:px-12 absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div 
              className="flex flex-col gap-6 max-w-3xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-fit">
                <ArrowLeft size={16} />
                Zurück zur Startseite
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Badumbau
              </h1>
              
              <p className="text-xl text-white/90">
                Ihr Bad soll ein Ort sein, an dem Sie sich erholen und entspannen können. Wir helfen Ihnen, es nach Ihren Wünschen zu gestalten.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Introduction Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-semibold mb-6">Ein Bad ganz nach Ihren Vorstellungen</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Das Badezimmer ist mehr als nur ein funktionaler Raum – es ist der Ort, an dem Ihr Tag beginnt und oft auch endet. Wir moechten mit Ihnen gemeinsam herausfinden, wie wir diesen Raum so gestalten koennen, dass er Ihnen Freude bereitet.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Mit unserer Erfahrung und Ihren Ideen koennen wir ein Bad schaffen, das Ihren Alltag bereichert. Wir begleiten Sie von den ersten Gedanken bis zum fertigen Bad.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <ShowerHead className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Moderne Anlagen</h4>
                    <p className="text-sm text-muted-foreground">
                      Hochwertige Sanitäranlagen für maximalen Komfort
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <Droplets className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Wassersparend</h4>
                    <p className="text-sm text-muted-foreground">
                      Umweltfreundliche und energieeffiziente Lösungen
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <Paintbrush className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Individuelle Designs</h4>
                    <p className="text-sm text-muted-foreground">
                      Massgeschneiderte Lösungen für jeden Geschmack
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Modernes Badezimmer Detail" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Before/After Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Vor und Nach der Verwandlung</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Sehen Sie selbst, wie wir Bäder komplett umgestalten und ihnen ein völlig neues Leben einhauchen. Bewegen Sie den Schieberegler, um die Transformation zu entdecken.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  afterImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  beforeLabel="Altes Bad"
                  afterLabel="Neues Bad"
                />
                <p className="mt-4 text-center text-muted-foreground italic">
                  Vollständige Renovierung eines veralteten Bades in Richterswil
                </p>
              </div>
              
              <div>
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  afterImage="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  beforeLabel="Vorher"
                  afterLabel="Nachher"
                />
                <p className="mt-4 text-center text-muted-foreground italic">
                  Moderne Umgestaltung mit neuer Dusche und Waschtisch
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Komplettumbau nach Mass", "Barrierefreie Badlösungen", "Hochwertige Sanitäranlagen", "Stilvolle Badmöbel", "Innovative Beleuchtungskonzepte", "Energieeffiziente Lösungen"].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-3 bg-background p-4 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <CheckCircle size={20} className="text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              So gehen wir gemeinsam vor
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Gespräch & Ideen",
                  description: "Wir lernen uns kennen und sprechen über Ihre Wünsche und Vorstellungen für Ihr neues Bad."
                },
                {
                  step: "2",
                  title: "Gemeinsame Planung",
                  description: "Wir erstellen Entwürfe und besprechen mit Ihnen die Details und Materialien."
                },
                {
                  step: "3",
                  title: "Sorgfältige Umsetzung",
                  description: "Unsere Handwerker setzen den Plan mit Geschick und Sorgfalt um."
                },
                {
                  step: "4",
                  title: "Ihr neues Bad",
                  description: "Nach einer gründlichen Prüfung übergeben wir Ihnen Ihr neues Bad."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-background p-6 rounded-xl shadow-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container px-6 md:px-12">
            <motion.div 
              className="rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Möchten Sie mit uns über Ihr Bad sprechen?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Wir nehmen uns gerne Zeit für Sie und besprechen gemeinsam, wie wir Ihr Bad nach Ihren Wünschen gestalten können.
              </p>
              <Link to="/#contact">
                <Button size="lg" className="px-8">
                  Gespräch vereinbaren
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BadumbauPage;
