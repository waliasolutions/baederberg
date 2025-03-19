
import { useInView } from 'react-intersection-observer';
import TestimonialCard from './TestimonialCard';
import { MessageCircle } from 'lucide-react';

const testimonials = [
  {
    quote: "Bäderberg hat unsere Vorstellungen nicht nur erfüllt, sondern übertroffen. Das neue Bad ist ein Traum und wurde pünktlich und im Budget fertiggestellt.",
    author: "Familie Müller",
    location: "Zürich",
    project: "Badumbau"
  },
  {
    quote: "Die Beratung war kompetent und individuell. Unsere neue Küche ist nicht nur optisch ein Highlight, sondern auch funktional durchdacht.",
    author: "Thomas Weber",
    location: "Richterswil",
    project: "Küchenumbau"
  },
  {
    quote: "Von der ersten Skizze bis zur letzten Schraube alles perfekt. Der gesamte Umbau lief reibungslos und das Ergebnis ist beeindruckend.",
    author: "Christina Huber",
    location: "Wädenswil",
    project: "Innenausbau"
  },
];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-24 md:py-32 bg-secondary/20">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle size={20} className="text-primary" />
            <h2 className="text-sm md:text-base text-primary font-medium">
              Kundenstimmen
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Was unsere Kunden sagen
          </h3>
          <p className="text-muted-foreground text-lg">
            Erfahren Sie, wie wir die Erwartungen unserer Kunden erfüllen und übertreffen.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`${inView ? 'animate-slide-up opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <TestimonialCard 
                quote={testimonial.quote}
                author={testimonial.author}
                location={testimonial.location}
                project={testimonial.project}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
