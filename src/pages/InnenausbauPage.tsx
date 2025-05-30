import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Home, Hammer, Wallpaper } from 'lucide-react';
import { motion } from 'framer-motion';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ContentEditor from '@/components/ContentEditor';
import { useState } from 'react';

const InnenausbauPage = () => {
  // State to store editable content
  const [pageContent, setPageContent] = useState({
    introTitle: "Ihr Wohnraum nach Ihren Vorstellungen",
    introParagraph1: "Die Räume, in denen wir leben, haben einen großen Einfluss auf unser Wohlbefinden. Mit unserer Erfahrung im Innenausbau möchten wir Ihnen helfen, Ihre Räume so zu gestalten, dass sie zu Ihrer Persönlichkeit und Ihrem Alltag passen.",
    introParagraph2: "Ob Sie mehr Stauraum benötigen, einen Raum neu aufteilen möchten oder bestimmte Materialien lieben – gemeinsam finden wir Lösungen, die Ihnen Freude bereiten und Ihren Alltag bereichern."
  });

  // Handler to update content
  const handleContentUpdate = (id: string, content: string) => {
    setPageContent(prev => ({
      ...prev,
      [id]: content
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-32">
        {/* Hero Section with Full-Width Header Image */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
            alt="Innenausbau" 
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
                Innenausbau
              </h1>
              
              <p className="text-xl text-white/90">
                Wir möchten Ihnen helfen, Ihre Wohnräume persönlicher und komfortabler zu gestalten – ganz nach Ihren Wünschen und Bedürfnissen.
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
                <ContentEditor 
                  id="introTitle"
                  initialContent={pageContent.introTitle}
                  type="heading"
                  className="text-3xl font-semibold mb-6"
                  onSave={handleContentUpdate}
                />
                
                <ContentEditor 
                  id="introParagraph1"
                  initialContent={pageContent.introParagraph1}
                  className="text-lg text-muted-foreground mb-6"
                  onSave={handleContentUpdate}
                />
                
                <ContentEditor 
                  id="introParagraph2"
                  initialContent={pageContent.introParagraph2}
                  className="text-lg text-muted-foreground mb-8"
                  onSave={handleContentUpdate}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <Home className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Wohnkomfort</h4>
                    <p className="text-sm text-muted-foreground">
                      Durchdachte Lösungen für maximalen Wohnkomfort
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <Hammer className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Präzision</h4>
                    <p className="text-sm text-muted-foreground">
                      Handwerkliche Perfektion bis ins Detail
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background shadow-sm">
                    <Wallpaper className="text-primary mb-3" size={32} />
                    <h4 className="font-medium mb-2">Materialvielfalt</h4>
                    <p className="text-sm text-muted-foreground">
                      Hochwertige und nachhaltige Materialien
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
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Hochwertiger Innenausbau Detail" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Rest of the sections */}
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
                Entdecken Sie die beeindruckende Transformation, die unsere Innenausbau-Projekte bewirken. Bewegen Sie den Schieberegler, um die Veränderung zu sehen.
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
                  beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  afterImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  beforeLabel="Vorher"
                  afterLabel="Nachher"
                />
                <p className="mt-4 text-center text-muted-foreground italic">
                  Komplett renoviertes Wohnzimmer mit maßgefertigten Möbeln in Richterswil
                </p>
              </div>
              
              <div>
                <BeforeAfterSlider 
                  beforeImage="https://images.unsplash.com/photo-1517581177684-8fc44a5900df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  afterImage="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  beforeLabel="Vorher"
                  afterLabel="Nachher"
                />
                <p className="mt-4 text-center text-muted-foreground italic">
                  Modernisierung eines Altbaus mit offenem Wohnkonzept
                </p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Individuelle Schreinerarbeiten", "Raumkonzepte und Trennwände", "Bodenbeläge und Wandverkleidungen", "Treppen und Geländer", "Massgeschneiderte Möbel", "Einbauschränke nach Mass"].map((feature, index) => (
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
              Unser gemeinsamer Weg
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Ideen & Wünsche",
                  description: "Wir hören Ihnen zu und erfassen Ihre Vorstellungen für Ihre Räume."
                },
                {
                  step: "2",
                  title: "Planung & Materialien",
                  description: "Gemeinsam planen wir die Umsetzung und wählen passende Materialien aus."
                },
                {
                  step: "3",
                  title: "Handwerkliche Arbeit",
                  description: "Mit Liebe zum Detail setzen wir Ihre Wünsche handwerklich um."
                },
                {
                  step: "4",
                  title: "Ihr neuer Wohnraum",
                  description: "Nach sorgfältiger Prüfung übergeben wir Ihnen Ihren neuen Wohnraum."
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
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Möchten Sie Ihre Wohnräume verändern?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Lassen Sie uns bei einem Gespräch herausfinden, wie wir Ihre Wohnträume verwirklichen können.
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

export default InnenausbauPage;
