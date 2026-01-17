import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { DynamicIcon } from '@/lib/DynamicIcon';
import { defaultContent } from '@/cms/schema';
import { Link } from 'react-router-dom';
import modernBathroom from '/lovable-uploads/modern-bathroom-interior.jpg';

interface AboutFeature {
  icon?: string;
  title?: string;
  description?: string;
}

interface AboutContent {
  heading?: string;
  paragraph1?: string;
  paragraph2?: string;
  image?: string;
  features?: AboutFeature[];
}

const UeberUnsPage = () => {
  const aboutContent = useSectionContent<AboutContent>('about');
  
  // Use schema defaults (SSOT)
  const schemaDefaults = defaultContent.about || {};
  
  const heading = aboutContent?.heading || schemaDefaults.heading || 'Ihr Bad, Ihre Küche, Ihr Innenausbau';
  const paragraph1 = aboutContent?.paragraph1 || schemaDefaults.paragraph1 || '';
  const paragraph2 = aboutContent?.paragraph2 || schemaDefaults.paragraph2 || '';
  const imageUrl = aboutContent?.image || modernBathroom;
  const features = aboutContent?.features?.length 
    ? aboutContent.features 
    : schemaDefaults.features || [];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Über Uns | Bäderberg - Ihr Partner für Bäder, Küchen & Innenausbau"
        description="Lernen Sie Bäderberg kennen - Ihr zuverlässiger Partner für hochwertige Bäder, Küchen und Innenausbau. Qualität und Kundenzufriedenheit stehen bei uns an erster Stelle."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <motion.img
          src={imageUrl}
          alt="Bäderberg - Über Uns"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="container px-6 md:px-12 h-full relative z-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 break-words">
              Über Bäderberg
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl">
              Ihr Partner für hochwertige Bäder, Küchen und Innenausbau
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={imageUrl}
                alt="Modernes Badezimmer" 
                className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight">
                {heading}
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">
                {paragraph1}
              </p>
              
              <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
                {paragraph2}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <DynamicIcon 
                      name={feature.icon || 'Star'} 
                      className="text-primary mt-1" 
                      size={24}
                      fallback={<Heart className="text-primary mt-1" size={24} />}
                    />
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Bereit für Ihr Traumprojekt?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Kontaktieren Sie uns für eine unverbindliche Beratung. Wir freuen uns darauf, Ihre Wünsche zu verwirklichen.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md text-lg"
            >
              Kostenlose Beratung anfragen
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUnsPage;
