
import { motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SlideImage } from './HeroSlideshow';

interface HeroContentProps {
  currentSlide: SlideImage;
}

const HeroContent = ({ currentSlide }: HeroContentProps) => {
  return (
    <>
      <div className="content-container container relative z-10 px-6 md:px-12 pt-20 pb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8 max-w-4xl mx-auto"
        >
          {/* Problem */}
          <div className="inline-block px-3 py-1 mb-6 text-sm md:text-base text-white bg-white/10 backdrop-blur-sm rounded-md">
            Stehen Sie vor veralteten {currentSlide.title}-Räumen?
          </div>
          
          {/* Agitation */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 md:leading-tight"
          >
            Verwandeln Sie Ihr {currentSlide.title} in einen <span className="text-secondary">modernen Lebensraum</span>
          </motion.h1>
          
          <motion.p 
            key={currentSlide.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 mb-10"
          >
            {currentSlide.description}. Kein Stress, keine Verzögerungen – nur professionelle Ergebnisse.
          </motion.p>
          
          {/* Solution Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              "Massgeschneiderte Lösungen",
              "Termin- und budgettreue Umsetzung",
              "Schweizer Qualitätsarbeit"
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-md"
              >
                <Check size={18} className="text-white" />
                <span className="text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Solution Call-to-Action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-6"
          >
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-primary rounded-md hover:shadow-lg hover:-translate-y-1 transition-medium text-lg font-medium"
            >
              Kostenlose Beratung
            </Link>
            <Link 
              to="/#services" 
              className="px-8 py-4 bg-transparent border border-white text-white rounded-md hover:bg-white/10 hover:shadow-lg transition-medium text-lg font-medium"
            >
              Unsere Leistungen
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <a 
          href="#services" 
          aria-label="Scroll down to learn more"
        >
          <ChevronDown size={36} />
        </a>
      </motion.div>
    </>
  );
};

export default HeroContent;
