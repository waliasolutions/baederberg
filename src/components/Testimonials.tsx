import TestimonialsCarousel from './TestimonialsCarousel';
import { MessageCircle } from 'lucide-react';
import { realTestimonials } from '@/data/testimonials';

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30" id="testimonials">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Kundenstimmen
          </h2>
        </div>
        
        <div>
          <TestimonialsCarousel 
            testimonials={realTestimonials}
            autoplay={true}
            autoplayDelay={6000}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
