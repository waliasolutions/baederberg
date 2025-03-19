
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Moderne Bad-Oase",
    location: "Zürich",
    description: "Vollständige Renovation eines Badezimmers mit freistehender Badewanne und begehbarer Dusche.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau", "Modern", "Freistehende Badewanne"]
  },
  {
    title: "Offene Designküche",
    location: "Richterswil",
    description: "Hochwertige Küche mit Kochinsel und nahtloser Integration in den Wohnbereich.",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586208958839-06c17cacf2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Küchenumbau", "Kochinsel", "Offenes Konzept"]
  },
  {
    title: "Minimalistisches Gäste-WC",
    location: "Wädenswil",
    description: "Kleine Raumlösung mit maximaler Funktionalität in klarem, reduziertem Design.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599639668273-ce573e036294?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau", "Gäste-WC", "Minimalistisch"]
  },
  {
    title: "Luxuriöses Master-Bad",
    location: "Rapperswil SG",
    description: "Grosszügiges Masterbad mit Doppelwaschtisch und bodenebener Dusche in Marmor-Optik.",
    images: [
      "https://images.unsplash.com/photo-1642371744429-7b98b7b619c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Badumbau", "Luxus", "Marmor"]
  },
  {
    title: "Rustikale Landhaus-Küche",
    location: "Horgen",
    description: "Maßgefertigte Küche im Landhausstil mit modernen Geräten und traditionellen Elementen.",
    images: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Küchenumbau", "Landhaus", "Holz"]
  },
  {
    title: "Moderner Eingangsbereich",
    location: "Rüti ZH",
    description: "Neugestaltung eines Eingangsbereichs mit massgeschreinerten Einbauschränken und eleganter Beleuchtung.",
    images: [
      "https://images.unsplash.com/photo-1591129841117-3adfd313a592?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219878616-8d7690e9b7c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["Innenausbau", "Einbauschränke", "Beleuchtung"]
  }
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

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
          <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full">
            Unsere Projekte
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Entdecken Sie unsere Referenzen
          </h3>
          <p className="text-muted-foreground text-lg">
            Eine Auswahl unserer erfolgreich abgeschlossenen Projekte. Lassen Sie sich inspirieren.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm transition-medium ${
                  activeFilter === filter.value 
                    ? 'bg-primary text-white' 
                    : 'bg-secondary hover:bg-secondary/70'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={project.title} 
              className={`${inView ? 'animate-slide-up opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard
                title={project.title}
                location={project.location}
                description={project.description}
                images={project.images}
                tags={project.tags}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
