import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Grid } from 'lucide-react';

const projects = [
  {
    title: "Badezimmer Umbau",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau"]
  },
  {
    title: "Offene Küche",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Küchenumbau"]
  },
  {
    title: "Gäste-WC Modern",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau"]
  },
  {
    title: "Luxus Bad",
    images: [
      "https://images.unsplash.com/photo-1642371744429-7b98b7b619c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau"]
  },
  {
    title: "Landhaus Küche",
    images: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Küchenumbau"]
  },
  {
    title: "Eingangsbereich Umbau",
    images: [
      "https://images.unsplash.com/photo-1591129841117-3adfd313a592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Innenausbau"]
  }
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

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
    <section id="gallery" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Grid size={20} className="text-primary" />
            <h2 className="text-sm md:text-base text-primary font-medium">
              Unsere Arbeiten
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Was wir für andere gestaltet haben
          </h3>
          <p className="text-muted-foreground text-lg">
            Hier sehen Sie einige unserer abgeschlossenen Projekte. Vielleicht entdecken Sie etwas, das Ihnen gefällt und Sie inspiriert.
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
