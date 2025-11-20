import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slideImages = [
  {
    url: '/lovable-uploads/bad-hero.jpg',
    heading: 'Wir bauen Ihr Bad gemeinsam um',
    description: 'Persönlich geplant, professionell ausgeführt',
    ctaLink: '/badumbau'
  },
  {
    url: '/lovable-uploads/kueche-hero.jpg',
    heading: 'Küchenbau Spezialist',
    description: 'Ihre neue Küche nach Mass',
    ctaLink: '/kuechenumbau'
  },
  {
    url: '/lovable-uploads/innenausbau-hero.jpg',
    heading: 'Facharbeiten im Innenausbau',
    description: 'Alles aus einer Hand',
    ctaLink: '/innenausbau'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<string | null>(null);
  
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

  useEffect(() => {
    slideImages.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.url;
      img.onerror = () => setImageLoadError(`Failed to load image ${index + 1}: ${slide.url}`);
    });
  }, []);

  const currentSlide = slideImages[currentIndex];

  return (
    <div className="relative h-[calc(100vh-0px)] max-w-full overflow-hidden">
      {imageLoadError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 z-50 rounded">
          {imageLoadError}
        </div>
      )}
      
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
                {currentSlide.heading}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8">
                {currentSlide.description}
              </p>
              
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to={currentSlide.ctaLink}>
                  Mehr erfahren
                </Link>
              </Button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
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
    </div>
  );
};

export default Hero;
