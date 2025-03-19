
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
  image?: string;
  project: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  location, 
  image,
  project
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative mb-4">
        <Quote 
          className="text-primary/10"
          size={36}
        />
      </div>
      
      <p className="text-base italic mb-6 line-clamp-4">{quote}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {image ? (
            <img 
              src={image} 
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
              <span className="text-base font-medium text-primary">{author.charAt(0)}</span>
            </div>
          )}
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-primary/80">
          {project}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
