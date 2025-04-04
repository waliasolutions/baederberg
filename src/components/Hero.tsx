
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Bad',
    heading: 'Ihr Traumbad wird Realität',
    description: 'Wir gestalten Ihr Bad nach Ihren individuellen Wünschen - hochwertig, pünktlich und budgetgerecht.'
  },
  {
    url: 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Küche',
    heading: 'Die Küche als Mittelpunkt Ihres Zuhauses',
    description: 'Individuelle Küchenlösungen, die Funktionalität und Ästhetik perfekt vereinen.'
  },
  {
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Innenausbau',
    heading: 'Räume neu gedacht',
    description: 'Von der Planung bis zur Umsetzung: Wir gestalten Ihre Wohnräume nach Mass.'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (isAutoScrollPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoScrollPaused]);
  
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrollPaused(true);
    
    setTimeout(() => setIsAutoScrollPaused(false), 10000);
  };

  const currentSlide = slideImages[currentIndex];

  return (
    <div className="relative h-[calc(100vh-0px)] max-w-full overflow-hidden">
      <AnimatePresence mode="sync">
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
      
      <div className="absolute inset-0 bg-primary/60 z-0" />
      
      <div className="container relative z-10 flex flex-col h-full justify-center items-center px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <span className="inline-block px-4 py-1 mb-4 md:mb-6 text-white bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm">
                {currentSlide.title}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                {currentSlide.heading}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8">
                {currentSlide.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[
                  "Schweizer Qualitätsarbeit",
                  "Pünktliche Umsetzung",
                  "Persönliche Beratung"
                ].map((benefit, index) => (
                  <span 
                    key={index}
                    className="flex items-center gap-1 sm:gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full"
                  >
                    <Check size={isMobile ? 12 : 16} className="text-white" />
                    <span className="text-white text-xs sm:text-sm">{benefit}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slideImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white w-6 sm:w-8' : 'bg-white/40 w-1.5 sm:w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <a 
          href="#services" 
          aria-label="Scroll down to learn more"
        >
          <ChevronDown size={isMobile ? 28 : 36} />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
