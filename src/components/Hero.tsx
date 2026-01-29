import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface HeroSlide {
  heading: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroContent {
  slides?: HeroSlide[];
}

const Hero = () => {
  const heroContent = useSectionContent<HeroContent>('hero');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Use CMS slides if available, otherwise use schema defaults (SSOT)
  const schemaDefaults = defaultContent.hero?.slides || [];
  const slideImages = heroContent?.slides?.length 
    ? heroContent.slides.map((slide, index) => ({
        url: slide.backgroundImage || schemaDefaults[index]?.backgroundImage || '/images/bathroom-modern.jpg',
        heading: slide.heading || schemaDefaults[index]?.heading || '',
        description: slide.description || '',
        ctaLink: slide.ctaLink || schemaDefaults[index]?.ctaLink || '/',
        ctaText: slide.ctaText || 'Mehr erfahren'
      }))
    : schemaDefaults.map(slide => ({
        url: slide.backgroundImage || '/images/bathroom-modern.jpg',
        heading: slide.heading || '',
        description: '',
        ctaLink: slide.ctaLink || '/',
        ctaText: slide.ctaText || 'Mehr erfahren'
      }));
  
  // Subtle parallax effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Preload all images on mount
  useEffect(() => {
    const imagePromises = slideImages.map((slide) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = slide.url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error('Failed to preload images:', error));
  }, [slideImages]);
  
  useEffect(() => {
    if (isAutoScrollPaused || !imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoScrollPaused, imagesLoaded, slideImages.length]);
  
  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoScrollPaused(true);
    
    setTimeout(() => setIsAutoScrollPaused(false), 10000);
  };

  const currentSlide = slideImages[currentIndex];

  return (
    <div className="relative h-[calc(100vh-0px)] max-w-full overflow-hidden bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ y }}
          className="absolute inset-0"
        >
          <OptimizedImage 
            src={currentSlide.url}
            alt={currentSlide.heading}
            priority={true}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </motion.div>
      </AnimatePresence>
      
      <div className="container relative z-10 flex flex-col h-full justify-center items-center px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 md:mb-10 break-words">
            {currentSlide.heading}
          </h1>
          
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-base md:text-lg px-8 py-3">
            <Link to={currentSlide.ctaLink}>
              {currentSlide.ctaText || 'Mehr erfahren'}
            </Link>
          </Button>
        </div>
        
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
