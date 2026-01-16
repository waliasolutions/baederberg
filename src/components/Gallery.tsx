import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';

interface GalleryItem {
  title: string;
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
    title: item.title,
    images: [item.image || '/images/bathroom-modern.jpg'],
    tags: [item.category]
  }));

  const filters = [
    { label: "Alle", value: null },
    { label: "Badumbau", value: "Badumbau" },
    { label: "Küchenumbau", value: "Küchenumbau" },
    { label: "Innenausbau", value: "Innenausbau" }
  ];

  const filteredProjects = activeFilter 
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;

  return (
    <section className="py-20 md:py-28 scroll-mt-24">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 font-inter">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            {subheading}
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-secondary/30 rounded-lg">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  activeFilter === filter.value 
                    ? 'bg-white text-primary shadow-sm' 
                    : 'text-primary/70 hover:text-primary'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              images={project.images}
              tags={project.tags}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
