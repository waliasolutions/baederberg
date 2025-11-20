import TestimonialsCarousel from './TestimonialsCarousel';
import { MessageCircle } from 'lucide-react';
import { realTestimonials } from '@/data/testimonials';

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30" id="testimonials">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle size={20} className="text-primary" />
            <h2 className="text-sm md:text-base text-primary font-medium">
              Kundenstimmen
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Zufriedene Kunden
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Echte Erfahrungen von unseren Kunden aus der Region
          </p>
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
