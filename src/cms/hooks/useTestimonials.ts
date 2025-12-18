import { useMemo } from 'react';
import { useSectionContent } from '../context/ContentProvider';
import { realTestimonials, Testimonial } from '@/data/testimonials';

interface CMSTestimonial {
  author: string;
  quote: string;
  rating: number;
  project: string;
}

interface TestimonialsContent {
  heading?: string;
  items?: CMSTestimonial[];
}

/**
 * SSOT Hook for testimonials - prioritizes CMS data, falls back to hardcoded
 */
export function useTestimonials() {
  const content = useSectionContent<TestimonialsContent>('testimonials');
  
  const testimonials: Testimonial[] = useMemo(() => {
    // If CMS has testimonials, use them
    if (content?.items && content.items.length > 0) {
      return content.items.map(item => ({
        author: item.author,
        quote: item.quote,
        rating: item.rating || 5,
        project: item.project || 'Badumbau'
      }));
    }
    
    // Fallback to hardcoded testimonials
    return realTestimonials;
  }, [content]);

  const heading = content?.heading || 'Zufriedene Kunden';

  return { testimonials, heading };
}

/**
 * Get testimonials filtered by project type
 */
export function useTestimonialsByProject(projectType: string) {
  const { testimonials, heading } = useTestimonials();
  
  const filtered = useMemo(() => {
    return testimonials.filter(t => t.project === projectType);
  }, [testimonials, projectType]);

  return { testimonials: filtered, heading };
}

/**
 * Get testimonials for homepage (first 6)
 */
export function useHomepageTestimonials() {
  const { testimonials, heading } = useTestimonials();
  
  const homepage = useMemo(() => {
    // Return first 6 testimonials or a curated selection
    return testimonials.slice(0, 6);
  }, [testimonials]);

  return { testimonials: homepage, heading };
}
