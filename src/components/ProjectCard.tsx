import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface ProjectCardProps {
  image: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, index }) => {
  const [open, setOpen] = useState(false);
  const delay = index * 100;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div 
          className="group overflow-hidden bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer" 
          style={{
            animationDelay: `${delay}ms`,
            transitionDelay: `${delay}ms`
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <OptimizedImage 
              src={image} 
              alt="Projekt Referenz"
              aspectRatio="4/3"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none shadow-none [&>button]:hidden"
        onInteractOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Projekt Bild</DialogTitle>
        </VisuallyHidden.Root>
        <div 
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <img 
            src={image} 
            alt="Projekt Referenz" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCard;
