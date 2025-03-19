
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

        <div className={`mt-16 md:mt-24 bg-white rounded-lg p-8 lg:p-12 shadow-sm ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Vorher/Nachher Vergleich</h3>
              <p className="text-muted-foreground mb-6">
                Dieses Bad in Zürich wurde komplett renoviert und mit modernen Elementen neu gestaltet. Der Vergleich zeigt die beeindruckende Transformation.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">3</span>
                  <span className="text-sm text-muted-foreground">Wochen Bauzeit</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">120%</span>
                  <span className="text-sm text-muted-foreground">Wertsteigerung</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">100%</span>
                  <span className="text-sm text-muted-foreground">Zufriedenheit</span>
                </div>
              </div>
            </div>
            
            <div className="comparison-slider">
              <div 
                className="before"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}
              ></div>
              <div 
                className="after"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622781339-76d5c5904f33?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')" }}
              ></div>
              <div className="slider-handle"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
