
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  location: string;
  description: string;
  images: string[];
  tags: string[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  location, 
  description, 
  images, 
  tags,
  index
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const delay = index * 100;
  
  return (
    <div 
      className="card-hover rounded-2xl overflow-hidden bg-white shadow-sm"
      style={{ 
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${title} - Bild ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-medium ${
              i === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-medium"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-medium"
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 rounded-full">
            {location}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="inline-block px-2 py-1 text-xs rounded-full bg-secondary text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
