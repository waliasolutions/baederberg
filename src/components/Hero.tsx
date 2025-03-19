
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Bad',
    description: 'Moderne Bäder, die Komfort und Stil vereinen'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-44e3e9399a2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Küche',
    description: 'Funktionale Küchen mit eleganter Ästhetik'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Innenausbau',
    description: 'Massgeschneiderte Lösungen für Ihren Wohnraum'
  }
];

// SVG paths for the room outlines
const svgPaths = {
  kitchen: "M10,50 L100,50 L100,150 L200,150 L200,250 L10,250 L10,50 Z M120,150 L180,150 L180,190 L120,190 Z M30,50 L80,50 L80,100 L30,100 Z M140,250 L180,250 L180,210 L140,210 Z",
  bathroom: "M10,50 L200,50 L200,250 L10,250 L10,50 Z M30,70 L60,70 L60,100 L30,100 Z M140,70 L180,70 L180,100 L140,100 Z M30,180 L90,180 L90,230 L30,230 Z M120,180 L180,180 L180,230 L120,230 Z",
  livingroom: "M10,50 L250,50 L250,200 L10,200 L10,50 Z M10,110 L50,110 L50,150 L10,150 Z M210,50 L250,50 L250,100 L210,100 Z M100,130 L160,130 L160,180 L100,180 Z M180,130 L230,130 L230,180 L180,180 Z"
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Auto-advance slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000);

    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY;
      const translateY = scrollPos / 2;
      
      if (heroRef.current.querySelector('.content-container')) {
        (heroRef.current.querySelector('.content-container') as HTMLElement).style.transform = 
          `translateY(${translateY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get the current path based on the slide index
  const getCurrentPath = () => {
    switch (currentIndex) {
      case 0: return svgPaths.bathroom;
      case 1: return svgPaths.kitchen;
      case 2: return svgPaths.livingroom;
      default: return svgPaths.bathroom;
    }
  };

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${slideImages[currentIndex].url}')`,
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-primary/60 z-0" />
      
      {/* SVG Blueprint Animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 260 300" 
          preserveAspectRatio="xMidYMid meet"
          className="opacity-20"
        >
          <motion.path
            d={getCurrentPath()}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              transition: { 
                pathLength: { type: "spring", duration: 3, bounce: 0 },
                opacity: { duration: 0.5 }
              }
            }}
            exit={{ pathLength: 0, opacity: 0 }}
            key={currentIndex}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
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
              key={slideImages[currentIndex].title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="inline-block text-white"
            >
              {slideImages[currentIndex].title}
            </motion.span>
          </motion.h1>
          <motion.p 
            key={slideImages[currentIndex].description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white mb-10"
          >
            {slideImages[currentIndex].description}
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
      
      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-white/40'
            } transition-all duration-300 ${
              currentIndex === index ? 'w-8' : 'w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
