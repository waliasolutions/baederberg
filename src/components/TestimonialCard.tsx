
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
    <div className="card-hover bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="relative mb-6">
        <svg 
          className="absolute top-0 left-0 w-10 h-10 text-primary/10 -mt-4 -ml-4"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
      </div>
      
      <p className="text-lg italic mb-6">{quote}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {image ? (
            <img 
              src={image} 
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xl font-medium">{author.charAt(0)}</span>
            </div>
          )}
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {project}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
