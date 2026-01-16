import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import VideoSection from '@/components/VideoSection';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import GTMBody from '@/components/GTMBody';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to the anchor when loading the page with a hash
    if (location.hash) {
      // Small delay to ensure elements are rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      <SEOHead />
      <GTMBody />
      <Header />
      <Hero />
      <div className="w-full max-w-full overflow-x-hidden">
        <Services />
        
        {/* Gallery Section with clear separation */}
        <div id="gallery" className="scroll-mt-24">
          <Gallery />
        </div>
        
        {/* Visual separator */}
        <div className="h-8 md:h-12 bg-gradient-to-b from-background to-white"></div>
        
        {/* About Section with clear separation */}
        <About />
        
        <VideoSection />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
