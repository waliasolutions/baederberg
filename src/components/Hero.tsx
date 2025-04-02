
import { useRef, useState } from 'react';
import SvgBlueprint from './hero/SvgBlueprint';
import HeroSlideshow from './hero/HeroSlideshow';
import HeroContent from './hero/HeroContent';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Bad',
    description: 'Moderne Bäder, die Komfort und Stil vereinen'
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-44e3e9399a2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Küche',
    description: 'Funktionale Küchen mit eleganter Ästhetik'
  },
  {
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
    title: 'Innenausbau',
    description: 'Massgeschneiderte Lösungen für Ihren Wohnraum'
  }
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroSlideshow 
        images={slideImages} 
        currentIndex={currentIndex} 
        setCurrentIndex={setCurrentIndex} 
      />
      
      <SvgBlueprint />
      
      <HeroContent currentSlide={slideImages[currentIndex]} />
    </div>
  );
};

export default Hero;
