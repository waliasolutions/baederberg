
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY;
      const opacity = 1 - (scrollPos / 700);
      const scale = 1 + (scrollPos / 2000);
      const translateY = scrollPos / 2;
      
      if (heroRef.current.querySelector('.bg-image')) {
        (heroRef.current.querySelector('.bg-image') as HTMLElement).style.opacity = `${Math.max(opacity, 0.4)}`;
        (heroRef.current.querySelector('.bg-image') as HTMLElement).style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="bg-image absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
          zIndex: -1,
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out"
        }}
      />
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      <div className="container relative z-10 px-6 md:px-12 pt-20 pb-20 text-center">
        <div className="animate-fade-in">
          <h2 className="inline-block px-3 py-1 mb-6 text-sm md:text-base text-white/80 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
            Willkommen bei Bäderberg
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 md:leading-tight">
            Ihr Spezialist für <span className="animate-reveal inline-block">Premium Renovationen</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 mb-10">
            Wir gestalten Ihre Träume von modernen Bädern, Küchen und Innenausbauten in höchster Schweizer Qualität.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 animate-slide-up">
            <Link 
              to="/#contact" 
              className="px-8 py-4 bg-white text-black rounded-full hover:shadow-lg hover:-translate-y-1 transition-medium text-lg font-medium"
            >
              Kostenlose Beratung
            </Link>
            <Link 
              to="/#services" 
              className="px-8 py-4 bg-transparent border border-white text-white rounded-full hover:bg-white/10 hover:shadow-lg transition-medium text-lg font-medium"
            >
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </div>
      
      <a 
        href="#services" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down to learn more"
      >
        <ChevronDown size={36} />
      </a>
    </div>
  );
};

export default Hero;
