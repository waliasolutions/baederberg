
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

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

// SVG paths for the room outlines - more detailed and realistic
const svgPaths = {
  // Modern bathroom with bathtub, shower, sink and toilet
  bathroom: `
    M20,20 L280,20 L280,280 L20,280 Z
    
    // Bathtub
    M40,40 L140,40 L140,100 L40,100 Z
    
    // Shower
    M200,40 L260,40 L260,100 L200,100 Z
    M200,40 C230,70 230,70 260,100
    
    // Toilet
    M40,140 L80,140 L80,180 L40,180 Z
    M50,180 a15,10 0 1,0 20,0
    
    // Sink with cabinet
    M180,140 L260,140 L260,180 L180,180 Z
    M200,140 L200,180
    M220,140 L220,180
    M240,140 L240,180
    
    // Door
    M150,280 L150,250 L200,280
  `,
  
  // Detailed kitchen with island, counters, appliances
  kitchen: `
    M20,20 L280,20 L280,280 L20,280 Z
    
    // Kitchen island
    M90,120 L210,120 L210,180 L90,180 Z
    
    // Lower cabinets and countertop
    M20,220 L280,220 L280,250 L20,250 Z
    
    // Upper cabinets
    M20,60 L120,60 L120,100 L20,100 Z
    M160,60 L280,60 L280,100 L160,100 Z
    
    // Refrigerator
    M20,110 L60,110 L60,210 L20,210 Z
    
    // Oven and stove
    M130,220 L180,220
    M130,235 C138,228 142,228 150,235
    M160,235 C168,228 172,228 180,235
    
    // Sink
    M220,220 L260,220
    M240,235 a15,5 0 1,0 1,0
    
    // Door
    M150,280 L150,250 L200,280
  `,
  
  // Living room with sofa, coffee table, TV, bookshelf
  livingroom: `
    M20,20 L380,20 L380,280 L20,280 Z
    
    // Sofa
    M40,180 L160,180 L160,250 L40,250 Z
    M40,180 C60,160 140,160 160,180
    
    // Coffee table
    M180,200 L240,200 L240,230 L180,230 Z
    
    // TV stand and TV
    M270,40 L350,40 L350,100 L270,100 Z
    M290,40 L330,40 L330,70 L290,70 Z
    
    // Bookshelf
    M40,40 L100,40 L100,140 L40,140 Z
    M50,40 L50,140
    M60,40 L60,140
    M70,40 L70,140
    M80,40 L80,140
    M90,40 L90,140
    M40,60 L100,60
    M40,80 L100,80
    M40,100 L100,100
    M40,120 L100,120
    
    // Carpet
    M120,120 a70,50 0 1,0 140,0 a70,50 0 1,0 -140,0
    
    // Window
    M180,20 L280,20
    M180,21 L180,30
    M230,21 L230,30
    M280,21 L280,30
    
    // Door
    M20,180 L20,230 L40,200
  `
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const controls = useAnimationControls();

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

    // Setup continuous animation
    const setupContinuousAnimation = async () => {
      await controls.start({
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 3.5, bounce: 0 },
          opacity: { duration: 0.8 }
        }
      });
      
      // After drawing is complete, restart animation with a small delay
      setTimeout(() => {
        controls.set({ pathLength: 0, opacity: 0.3 });
        setupContinuousAnimation();
      }, 1000);
    };

    setupContinuousAnimation();

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

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
      
      {/* SVG Blueprint Animation - Now more detailed and realistic with continuous animation */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center">
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 400 300" 
          preserveAspectRatio="xMidYMid meet"
          className="opacity-30"
        >
          <motion.path
            d={getCurrentPath()}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={controls}
            key={currentIndex}
            stroke="white"
            strokeWidth="1.5"
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
