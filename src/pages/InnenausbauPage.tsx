import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, User, Clock, Shield, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import TestimonialCard from '@/components/TestimonialCard';
import { innenausbauTestimonials } from '@/data/testimonials';
import { useInView } from 'react-intersection-observer';

const InnenausbauPage = () => {
  const features = [
    "Fachgerechte Bauleitung",
    "Individuelle Raumplanung",
    "Massgeschneiderter Möbeleinbau",
    "Bodenbeläge und Wandverkleidungen",
    "Treppen und Geländer",
    "Elektroarbeiten und Garantie inklusive",
    "Alles aus einer Hand"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img src="/lovable-uploads/innenausbau-hero.jpg" alt="Innenausbau" className="w-full h-full object-cover" />
          <div className="container px-6 md:px-12 absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div className="flex flex-col gap-6 max-w-3xl text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors w-fit">
                <ArrowLeft size={16} />Zurück zur Startseite
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">Innenausbau</h1>
              <p className="text-xl text-white/90 leading-relaxed">Räume nach Ihren Wünschen – alles aus einer Hand.</p>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <h2 className="text-3xl font-semibold mb-6 leading-tight">Ihr Innenausbau nach Ihren Wünschen</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Vom Bodenbelag bis zur Treppe – wir machen alles. Sauber, termintreu, mit Garantie.</p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Alles aus einer Hand.</p>
              </motion.div>
              <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {innenausbauTestimonials.map((testimonial, index) => (
                <div key={index}>
                  <TestimonialCard 
                    quote={testimonial.quote}
                    author={testimonial.author}
                    project={testimonial.project}
                    rating={testimonial.rating}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-6 md:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Jetzt Termin vereinbaren</h2>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">Wir beraten Sie gerne – kostenlos und unverbindlich.</p>
              <Link to="/#contact"><Button size="lg" variant="secondary" className="text-lg px-8 py-6">Jetzt Kontakt aufnehmen</Button></Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InnenausbauPage;
