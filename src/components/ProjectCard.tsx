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
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  );
};

export default ProjectCard;
