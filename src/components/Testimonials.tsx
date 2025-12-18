import TestimonialsCarousel from './TestimonialsCarousel';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { realTestimonials } from '@/data/testimonials';

interface TestimonialItem {
  author: string;
  quote: string;
  rating: number;
  project: string;
}

interface TestimonialsContent {
  heading?: string;
  items?: TestimonialItem[];
}

const Testimonials = () => {
  const testimonialsContent = useSectionContent<TestimonialsContent>('testimonials');
  
  const heading = testimonialsContent?.heading || 'Kundenstimmen';
  // Use CMS testimonials if available, otherwise fall back to hardcoded data
  const testimonials = testimonialsContent?.items?.length 
    ? testimonialsContent.items 
    : realTestimonials;

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30" id="testimonials">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {heading}
          </h2>
        </div>
        
        <div>
          <TestimonialsCarousel 
            testimonials={testimonials}
            autoplay={true}
            autoplayDelay={6000}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
