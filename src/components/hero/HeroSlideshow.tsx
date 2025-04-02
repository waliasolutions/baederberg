
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideImage {
  url: string;
  title: string;
  description: string;
}

interface HeroSlideshowProps {
  images: SlideImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const HeroSlideshow = ({ images, currentIndex, setCurrentIndex }: HeroSlideshowProps) => {
  useEffect(() => {
    // Auto-advance slides every 5 seconds
    const slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
    };
  }, [images.length, setCurrentIndex, currentIndex]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${images[currentIndex].url}')`,
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-primary/70 z-0" />

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-8' : 'bg-white/40 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default HeroSlideshow;
