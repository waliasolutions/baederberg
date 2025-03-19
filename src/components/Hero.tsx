
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Bad'
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Küche'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Innenausbau'
  }
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${slideImages[currentIndex].url}')`,
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-primary/50 z-0" />
      
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="inline-block"
            >
              {slideImages[currentIndex].title}
            </motion.span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="max-w-3xl mx-auto text-lg md:text-xl text-white mb-10"
          >
            Wir gestalten Ihre Träume von modernen Bädern, Küchen und Innenausbauten in höchster Schweizer Qualität.
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
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
