
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
          className="mb-8"
        >
          <div className="inline-block px-3 py-1 mb-6 text-sm md:text-base text-white border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
            Willkommen bei Bäderberg
          </div>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:leading-tight"
          >
            Ihr Spezialist für{' '}
            <motion.span
              key={currentSlide.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="inline-block text-white"
            >
              {currentSlide.title}
            </motion.span>
          </motion.h1>
          <motion.p 
            key={currentSlide.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white mb-10"
          >
            {currentSlide.description}
          </motion.p>
          
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
