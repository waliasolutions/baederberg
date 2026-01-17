import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, Heart, TrendingUp } from 'lucide-react';

const KarrierePage = () => {
  const benefits = [
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Spannende Projekte",
      description: "Arbeiten Sie an vielfältigen Projekten im Bereich Bad-, Küchen- und Innenausbau."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Starkes Team",
      description: "Werden Sie Teil eines erfahrenen und motivierten Teams."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Wertschätzung",
      description: "Faire Vergütung und ein angenehmes Arbeitsumfeld."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Entwicklung",
      description: "Weiterbildungsmöglichkeiten und Karrierechancen."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Karriere bei Bäderberg - Jobs in Zürich"
        description="Karriere bei Bäderberg - Werden Sie Teil unseres Teams und gestalten Sie mit uns hochwertige Bad-, Küchen- und Innenausbauprojekte."
      />
      <Header />
      
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container px-6 md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Karriere bei Bäderberg
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Werden Sie Teil unseres Teams und gestalten Sie mit uns hochwertige Umbau- und Innenausbauprojekte.
              </p>
              <Link 
                to="/#contact" 
                className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Jetzt bewerben <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Warum Bäderberg?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container px-6 md:px-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Interesse geweckt?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Senden Sie uns Ihre Bewerbungsunterlagen per E-Mail oder nutzen Sie unser Kontaktformular. Wir freuen uns darauf, Sie kennenzulernen!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:info@baederberg.ch?subject=Bewerbung" 
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Per E-Mail bewerben
                </a>
                <Link 
                  to="/#contact" 
                  className="inline-flex items-center justify-center bg-white text-foreground border border-border px-6 py-3 rounded-lg font-semibold hover:bg-secondary/50 transition-colors"
                >
                  Zum Kontaktformular
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default KarrierePage;
