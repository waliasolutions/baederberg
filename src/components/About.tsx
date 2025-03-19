
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-secondary rounded-lg -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Bäderberg Team"
                className="rounded-lg shadow-xl relative z-10 w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>
          
          <div className={`${inView ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full">
              Über Bäderberg
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ihr vertrauensvoller Partner für hochwertige Umbauprojekte
            </h3>
            <p className="text-muted-foreground mb-6">
              Seit über 20 Jahren sind wir Ihr kompetenter Partner für anspruchsvolle Umbau- und Renovationsprojekte. Mit Schweizer Präzision und handwerklichem Können verwandeln wir Ihre Räume in funktionale Kunstwerke.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Unsere Mission</h4>
                <p className="text-muted-foreground text-sm">
                  Wir schaffen perfekt auf Ihre Bedürfnisse zugeschnittene Räume mit höchster handwerklicher Qualität und innovativem Design.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Unsere Werte</h4>
                <p className="text-muted-foreground text-sm">
                  Präzision, Verlässlichkeit und Kundennähe stehen bei uns an erster Stelle, kombiniert mit nachhaltigen Lösungen.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Unser Team</h4>
                <p className="text-muted-foreground text-sm">
                  Unser erfahrenes Team aus Fachleuten verschiedener Gewerke arbeitet Hand in Hand für Ihr perfektes Ergebnis.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-lg">Unsere Expertise</h4>
                <p className="text-muted-foreground text-sm">
                  Vom ersten Konzept bis zur finalen Umsetzung bieten wir Ihnen Komplettlösungen aus einer Hand.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-secondary p-4 rounded-lg">
                <div className="text-4xl font-bold text-primary">20+</div>
                <div className="text-sm">Jahre Erfahrung in der Branche</div>
              </div>
              <div className="flex items-center gap-4 bg-secondary p-4 rounded-lg">
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm">Erfolgreich abgeschlossene Projekte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
