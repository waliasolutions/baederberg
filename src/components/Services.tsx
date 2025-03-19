
import { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';
import { useInView } from 'react-intersection-observer';

const servicesData = [
  {
    title: "Badumbau",
    description: "Wir verwandeln Ihr Badezimmer in eine moderne Wohlfühloase mit eleganten Designs und hochwertigen Materialien.",
    imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Komplettumbau nach Mass",
      "Barrierefreie Badlösungen",
      "Hochwertige Sanitäranlagen",
      "Stilvolle Badmöbel",
      "Innovative Beleuchtungskonzepte"
    ],
    to: "/#gallery"
  },
  {
    title: "Küchenumbau",
    description: "Perfekte Küchen, die Funktionalität und Design harmonisch verbinden, für ein optimales Koch- und Wohnerlebnis.",
    imageSrc: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Massgeschneiderte Küchenplanungen",
      "Modernste Küchengeräte",
      "Hochwertige Arbeitsflächen",
      "Funktionale Stauraumlösungen",
      "Energieeffiziente Lösungen"
    ],
    to: "/#gallery"
  },
  {
    title: "Innenausbau",
    description: "Durchdachte Raumkonzepte und präzise Ausführung für ein harmonisches Wohnerlebnis in allen Bereichen.",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Individuelle Schreinerarbeiten",
      "Raumkonzepte und Trennwände",
      "Bodenbeläge und Wandverkleidungen",
      "Treppen und Geländer",
      "Massgeschneiderte Möbel"
    ],
    to: "/#gallery"
  }
];

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full">
            Unsere Leistungen
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Perfekte Räume mit höchster Qualität
          </h3>
          <p className="text-muted-foreground text-lg">
            Vom ersten Entwurf bis zur finalen Umsetzung begleiten wir Ihr Projekt mit Schweizer Präzision und individuellem Design.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {servicesData.map((service, index) => (
            <div 
              key={service.title} 
              className={`${inView ? 'animate-slide-up opacity-100' : 'opacity-0'}`} 
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                features={service.features}
                to={service.to}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
