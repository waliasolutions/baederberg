import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { useTestimonialsByProject } from '@/cms/hooks/useTestimonials';
import SEOHead from '@/components/SEOHead';
import { usePageContent } from '@/cms/hooks/usePageContent';
import { OptimizedImage } from '@/components/ui/optimized-image';

const BadumbauPage = () => {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const { testimonials } = useTestimonialsByProject('Badumbau');
  const pageContent = usePageContent('badumbau');


  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={pageContent.metaTitle}
        description={pageContent.metaDescription}
      />
      <Header />
      
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <OptimizedImage 
              src={pageContent.heroImage} 
              alt="Badezimmer" 
              priority={true}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="container px-6 md:px-12 absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div 
              className="flex flex-col gap-6 max-w-3xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-inter">
                {pageContent.heroHeading}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {pageContent.heroSubheading}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Centered Features Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pageContent.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-sm"
                  >
                    <CheckCircle className="text-primary flex-shrink-0" size={24} />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-6 md:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{pageContent.processSteps.heading}</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {pageContent.processSteps.subheading}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {pageContent.processSteps.steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-secondary/20 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-6 md:px-12">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Zufriedene Kunden
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
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
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">{pageContent.cta.heading}</h2>
              <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                {pageContent.cta.subheading}
              </p>
              <Link to={pageContent.cta.buttonLink}>
                <Button size="lg" variant="secondary" className="text-base md:text-lg px-8 py-6">
                  {pageContent.cta.buttonText}
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
