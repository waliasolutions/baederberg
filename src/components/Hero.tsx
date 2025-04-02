
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Bad',
    heading: 'Ihr Traumbad wird Realität',
    description: 'Wir gestalten Ihr Bad nach Ihren individuellen Wünschen - hochwertig, termintreu und budgetgerecht.'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-44e3e9399a2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Küche',
    heading: 'Die Küche als Mittelpunkt Ihres Zuhauses',
    description: 'Individuelle Küchenlösungen, die Funktionalität und Ästhetik perfekt vereinen.'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Innenausbau',
    heading: 'Räume neu gedacht',
    description: 'Von der Planung bis zur Realisierung: Wir gestalten Ihre Wohnräume nach Maß.'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  
  // Auto-advance slides
  useEffect(() => {
    if (isAutoScrollPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoScrollPaused]);
  
  // Pause auto-scroll when user interacts with indicators
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrollPaused(true);
    
    // Resume auto-scroll after 10 seconds
    setTimeout(() => setIsAutoScrollPaused(false), 10000);
  };

  const currentSlide = slideImages[currentIndex];

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${currentSlide.url}')`,
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/60 z-0" />
      
      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12 pt-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Topic label */}
              <span className="inline-block px-4 py-1 mb-6 text-white bg-white/10 backdrop-blur-sm rounded-full text-sm">
                {currentSlide.title}
              </span>
              
              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {currentSlide.heading}
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {currentSlide.description}
              </p>
              
              {/* Benefits */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "Schweizer Qualitätsarbeit",
                  "Termingerechte Umsetzung",
                  "Persönliche Beratung"
                ].map((benefit, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
                  >
                    <Check size={16} className="text-white" />
                    <span className="text-white text-sm">{benefit}</span>
                  </span>
                ))}
              </div>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link to="/#contact">Kostenlose Beratung</Link>
                </Button>
                <Button 
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/#services">Unsere Leistungen</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white w-8' : 'bg-white/40 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
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
    </div>
  );
};

export default Hero;
