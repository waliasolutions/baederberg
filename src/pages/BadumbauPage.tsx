import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { useTestimonialsByProject } from '@/cms/hooks/useTestimonials';
import SEOHead from '@/components/SEOHead';
import { usePageContent } from '@/cms/hooks/usePageContent';

const BadumbauPage = () => {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const { testimonials } = useTestimonialsByProject('Badumbau');
  const pageContent = usePageContent('badumbau');

  // Use CMS features or fallback
  const features = pageContent.features.length > 0 ? pageContent.features : [
    "Persönlicher Bauleiter",
    "Individuelle Badplanung",
    "Einbau hochwertiger Sanitäranlagen",
    "Montage stilvoller Badmöbel",
    "Innovative Beleuchtungskonzepte",
    "Elektroarbeiten und Garantie inklusive"
  ];

  // Use CMS hero image or fallback
  const heroImage = pageContent.heroImage || '/images/bathroom-modern.jpg';

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={pageContent.metaTitle}
        description={pageContent.metaDescription}
      />
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <motion.img 
            src={heroImage} 
            alt="Badezimmer" 
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          <div className="container px-6 md:px-12 absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div 
              className="flex flex-col gap-6 max-w-3xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-inter">
                {pageContent.heroHeading}
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed">
                {pageContent.heroSubheading}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Introduction Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl font-semibold mb-6 leading-tight">Was Sie bekommen</h2>
                {pageContent.introText ? (
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {pageContent.introText}
                  </p>
                ) : (
                  <>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Ein persönlicher Bauleiter übernimmt Ihr Projekt von Anfang bis Ende. Sie haben einen Ansprechpartner für alles.
                    </p>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      Wir planen das Bad gemeinsam mit Ihnen, bauen es um und übergeben es fertig. Elektroarbeiten, Sanitär, Fliesen – alles inklusive.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Fester Preis, fester Termin, 5 Jahre Garantie auf unsere Arbeit.
                    </p>
                  </>
                )}
              </motion.div>
              
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 bg-background p-4 rounded-lg shadow-sm">
                    <CheckCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Why Professional Service Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 md:px-12">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center leading-tight">
                Warum professioneller Badumbau?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Fachgerechte Planung spart Geld</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ein professionell geplantes Bad vermeidet teure Fehler. Wasserschäden durch falsch verlegte Leitungen oder undichte Abdichtungen kosten Sie später ein Vielfaches. Unsere Bauleiter kennen jede Norm und jedes Detail.
                  </p>
                </div>
                
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Qualität, die bleibt</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ein Bad nutzen Sie täglich für viele Jahre. Hochwertige Materialien und fachgerechte Montage bedeuten weniger Reparaturen und mehr Freude am Raum. Wir verbauen nur, was wir auch selbst nutzen würden.
                  </p>
                </div>
                
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Zeitersparnis durch Koordination</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sanitär, Elektrik, Fliesen, Maler – alles muss perfekt zusammenpassen. Ihr persönlicher Bauleiter koordiniert alle Gewerke. Sie haben nur einen Ansprechpartner und sparen wertvolle Zeit.
                  </p>
                </div>
                
                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Garantie und Sicherheit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nach dem Umbau sind wir weiter für Sie da. Mit unserer Garantie sind Sie abgesichert. Bei Problemen ist Ihr Bauleiter nur einen Anruf entfernt – ohne Diskussion, ohne Verzögerung.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-lg leading-relaxed">
                  <strong>Unser Versprechen:</strong> Wir bauen Ihr Bad so, wie wir es für uns selbst bauen würden. Sorgfältig geplant, sauber ausgeführt, mit Materialien die halten. Kein Marketing-Versprechen – sondern unser Standard.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">So läuft es ab</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Einfach und klar
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "1. Erstgespräch", desc: "Wir besprechen Ihre Wünsche und Ihr Budget." },
                { title: "2. Planung", desc: "Ihr Bauleiter plant mit Ihnen gemeinsam." },
                { title: "3. Umbau", desc: "Unser Team baut sauber und termingerecht." },
                { title: "4. Übergabe", desc: "Sie bekommen Ihr fertiges Bad mit Garantie." }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-background p-6 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-6 md:px-12">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle size={20} className="text-primary" />
                <h2 className="text-sm md:text-base text-primary font-medium">
                  Kundenstimmen
                </h2>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Zufriedene Kunden
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Echte Erfahrungen von unseren Kunden
              </p>
            </motion.div>
            
            <TestimonialsCarousel 
              testimonials={testimonials}
              autoplay={true}
              autoplayDelay={7000}
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Jetzt Termin vereinbaren</h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Wir beraten Sie gerne – kostenlos und unverbindlich.
              </p>
              <Link to="/#contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Jetzt Kontakt aufnehmen
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
