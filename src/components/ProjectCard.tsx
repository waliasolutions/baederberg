
import { useState } from 'react';
import { MapPin } from 'lucide-react';

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
  const delay = index * 100;
  return (
    <div 
      className="group overflow-hidden bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md" 
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={images[0]} 
          alt={`${title} - Bild`} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
            <MapPin size={12} className="text-primary" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary/50 text-primary/80"
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
