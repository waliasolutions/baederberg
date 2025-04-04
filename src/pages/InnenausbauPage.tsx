
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const InnenausbauPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <motion.div 
              className="flex flex-col gap-6 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                <ArrowLeft size={16} />
                Zurück zur Startseite
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Innenausbau
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Durchdachte Raumkonzepte und präzise Ausführung für ein harmonisches Wohnerlebnis in allen Bereichen.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {/* Left column - Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Hochwertiger Innenausbau" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Right column - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-semibold mb-6">Ihr Wohnraum nach Mass</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Der Innenausbau prägt maßgeblich die Atmosphäre und Funktionalität Ihrer Wohnräume. Mit unserer Expertise in der Raumgestaltung und präzisen handwerklichen Ausführung schaffen wir einzigartige Wohnkonzepte, die perfekt zu Ihrem Lebensstil passen.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-4">Unsere Innenausbau-Leistungen umfassen:</h3>
                  <ul className="space-y-3 mb-8">
                    {["Individuelle Schreinerarbeiten", "Raumkonzepte und Trennwände", "Bodenbeläge und Wandverkleidungen", "Treppen und Geländer", "Massgeschneiderte Möbel"].map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                      >
                        <CheckCircle size={20} className="text-primary mt-1 shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Link to="/#contact">
                    <Button size="lg" className="mt-2">
                      Kostenlose Beratung vereinbaren
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Unsere Innenausbau-Projekte
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="rounded-xl overflow-hidden aspect-square">
                  <img 
                    src={`https://images.unsplash.com/photo-${1618221195710 + item}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                    alt={`Innenausbau-Projekt ${item}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </motion.div>
            
            <div className="text-center mt-12">
              <Link to="/#gallery">
                <Button variant="outline" size="lg">
                  Alle Projekte ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <motion.div 
              className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Bereit für Ihren individuellen Innenausbau?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Kontaktieren Sie uns für eine kostenlose Beratung und lassen Sie uns gemeinsam Ihre Wohnräume perfekt gestalten.
              </p>
              <Link to="/#contact">
                <Button size="lg">
                  Jetzt anfragen
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

export default InnenausbauPage;
