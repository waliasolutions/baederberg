import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  images: string[];
  tags: string[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  images,
  tags,
  index
}) => {
  const delay = index * 100;
  return (
    <div 
      className="group overflow-hidden bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg" 
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={images[0]} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={i} 
              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
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
