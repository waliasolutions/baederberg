import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import { Testimonial } from '@/data/testimonials';
import { Button } from './ui/button';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

const TestimonialsCarousel = ({ 
  testimonials, 
  autoplay = true,
  autoplayDelay = 5000 
}: TestimonialsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || !emblaApi) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(intervalId);
  }, [emblaApi, autoplay, autoplayDelay]);

  const showNavigation = testimonials.length > 3;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="flex-[0_0_100%] md:flex-[0_0_calc(50%-0.75rem)] lg:flex-[0_0_calc(33.333%-1rem)] min-w-0"
            >
              <TestimonialCard 
                quote={testimonial.quote}
                author={testimonial.author}
                project={testimonial.project}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`flex items-center justify-center gap-6 mt-10 ${!showNavigation ? 'md:hidden' : ''}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </Button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="rounded-full h-10 w-10 hover:bg-primary/10 hover:text-primary transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
