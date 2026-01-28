import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';
import { cn } from '@/lib/utils';

interface GalleryItem {
  image?: string;
  category: string;
}

interface GalleryContent {
  heading?: string;
  subheading?: string;
  items?: GalleryItem[];
}

// Get defaults from schema (SSOT)
const defaultGalleryData = defaultContent.gallery;

const GalleryImage = ({ image, index }: { image: string; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      <ProjectCard image={image} index={index} />
    </div>
  );
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const galleryContent = useSectionContent<GalleryContent>('gallery');

  // Use CMS data if available, otherwise use schema defaults
  const heading = galleryContent?.heading || defaultGalleryData.heading;
  const subheading = galleryContent?.subheading || defaultGalleryData.subheading;
  
  const projects = (galleryContent?.items?.length 
    ? galleryContent.items 
    : defaultGalleryData.items
  ).map((item: GalleryItem) => ({
    image: item.image || '/images/bathroom-modern.jpg',
    category: item.category
  }));

  const filters = [
    { label: "Alle", value: null },
    { label: "Badumbau", value: "Badumbau" },
    { label: "Innenausbau", value: "Innenausbau" }
  ];

  const filteredProjects = activeFilter 
    ? projects.filter(project => project.category === activeFilter)
    : projects;

  return (
    <section className="py-20 md:py-28 scroll-mt-24">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-inter">
            {heading}
          </h1>
          <p className="text-muted-foreground text-lg">
            {subheading}
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center p-1.5 bg-secondary/40 rounded-full gap-1 shadow-sm">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium min-h-[44px] transition-all duration-300",
                  activeFilter === filter.value 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <GalleryImage
              key={`${project.image}-${index}`}
              image={project.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
