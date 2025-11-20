import { useEffect, useRef } from 'react';
import ServiceCard from './ServiceCard';

const servicesData = [
  {
    title: "Badumbau",
    description: "Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.",
    imageSrc: "/lovable-uploads/bad-service.jpg",
    features: [
      "Persönlicher Bauleiter",
      "Individuelle Badplanung",
      "Einbau hochwertiger Sanitäranlagen",
      "Montage stilvoller Badmöbel",
      "Innovative Beleuchtungskonzepte",
      "Elektroarbeiten und Garantie inklusive"
    ],
    to: "/badumbau"
  },
  {
    title: "Küchenumbau",
    description: "Ihre neue Küche nach Mass – funktional und schön.",
    imageSrc: "/lovable-uploads/kueche-service.jpg",
    features: [
      "Individuelle Küchenplanung",
      "Persönlicher Projektleiter",
      "Installation hochwertiger Küchengeräte",
      "Einbau von Arbeitsplatten und individuellen Rückwänden",
      "Fachgerechte Montage",
      "Elektroarbeiten und Garantie inklusive"
    ],
    to: "/kuechenumbau"
  },
  {
    title: "Innenausbau",
    description: "Räume nach Ihren Wünschen – alles aus einer Hand.",
    imageSrc: "/lovable-uploads/innenausbau-service.jpg",
    features: [
      "Fachgerechte Bauleitung",
      "Individuelle Raumplanung",
      "Massgeschneiderter Möbeleinbau",
      "Bodenbeläge und Wandverkleidungen",
      "Treppen und Geländer",
      "Elektroarbeiten und Garantie inklusive",
      "Alles aus einer Hand"
    ],
    to: "/innenausbau"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full">
            Unsere Leistungen
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Unsere Leistungen für Ihr Zuhause
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Bad, Küche, Innenausbau – wir begleiten Sie von der Planung bis zur Fertigstellung. Alles aus einer Hand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              features={service.features}
              to={service.to}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
