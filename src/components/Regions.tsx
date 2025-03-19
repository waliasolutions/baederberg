
import { useInView } from 'react-intersection-observer';
import RegionMap from './RegionMap';

const Regions = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="regions" className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6 md:px-12" ref={ref}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-white rounded-full">
            Unsere Regionen
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            In Ihrer Nähe für Sie da
          </h3>
          <p className="text-muted-foreground text-lg">
            Wir sind in 10 Regionen der Schweiz aktiv und betreuen Ihr Projekt mit lokaler Expertise und persönlichem Service.
          </p>
        </div>
        
        <div className={`${inView ? 'animate-scale' : 'opacity-0'}`}>
          <RegionMap />
        </div>
      </div>
    </section>
  );
};

export default Regions;
