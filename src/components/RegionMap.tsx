import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { MapPin, Navigation, Compass, Home, Building, PinIcon } from 'lucide-react';

interface Region {
  name: string;
  path: string;
  coordinates: { x: number; y: number };
  active: boolean;
  icon?: JSX.Element;
  premium?: boolean;
}

const RegionMap = () => {
  const [regions, setRegions] = useState<Region[]>([
    { name: 'Zürich', path: '/region/zurich', coordinates: { x: 45, y: 40 }, active: false, icon: <Building size={12} className="mr-1" /> },
    { name: 'Richterswil', path: '/region/richterswil', coordinates: { x: 50, y: 55 }, active: false, icon: <Home size={12} className="mr-1" /> },
    { name: 'Wädenswil', path: '/region/waedenswil', coordinates: { x: 48, y: 50 }, active: false, icon: <Home size={12} className="mr-1" /> },
    { name: 'Lachen', path: '/region/lachen', coordinates: { x: 65, y: 55 }, active: false, icon: <MapPin size={12} className="mr-1" /> },
    { name: 'Pfäffikon SZ', path: '/region/pfaeffikon', coordinates: { x: 70, y: 50 }, active: false, icon: <MapPin size={12} className="mr-1" /> },
    { name: 'Menzingen', path: '/region/menzingen', coordinates: { x: 70, y: 40 }, active: false, icon: <MapPin size={12} className="mr-1" /> },
    { name: 'Freienbach SZ', path: '/region/freienbach', coordinates: { x: 60, y: 48 }, active: false, icon: <Building size={12} className="mr-1" /> },
    { name: 'Rapperswil SG', path: '/region/rapperswil', coordinates: { x: 63, y: 43 }, active: false, icon: <Building size={12} className="mr-1" /> },
    { name: 'Horgen', path: '/region/horgen', coordinates: { x: 40, y: 48 }, active: false, icon: <Home size={12} className="mr-1" /> },
    { name: 'Rüti ZH', path: '/region/rueti', coordinates: { x: 55, y: 30 }, active: false, icon: <MapPin size={12} className="mr-1" /> },
    
    { name: 'Zollikon', path: '/region/zollikon', coordinates: { x: 47, y: 42 }, active: false, icon: <Building size={12} className="mr-1" />, premium: true },
    { name: 'Kilchberg', path: '/region/kilchberg', coordinates: { x: 42, y: 44 }, active: false, icon: <Building size={12} className="mr-1" />, premium: true },
    { name: 'Küsnacht', path: '/region/kuesnacht', coordinates: { x: 49, y: 38 }, active: false, icon: <Building size={12} className="mr-1" />, premium: true },
    { name: 'Meilen', path: '/region/meilen', coordinates: { x: 53, y: 34 }, active: false, icon: <Building size={12} className="mr-1" />, premium: true },
    { name: 'Erlenbach', path: '/region/erlenbach', coordinates: { x: 51, y: 36 }, active: false, icon: <Building size={12} className="mr-1" />, premium: true },
  ]);

  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const activateRegion = (name: string) => {
    setActiveRegion(name);
    setRegions(prev => 
      prev.map(region => ({
        ...region,
        active: region.name === name
      }))
    );
  };

  useEffect(() => {
    if (inView) {
      let index = 0;
      intervalRef.current = window.setInterval(() => {
        activateRegion(regions[index].name);
        index = (index + 1) % regions.length;
      }, 2000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [inView, regions]);

  const handleRegionHover = (name: string) => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    activateRegion(name);
  };

  return (
    <div ref={ref} className={`relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-secondary">
        <div ref={mapRef} className="relative w-full h-full overflow-hidden">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Switzerland_location_map.svg/1200px-Switzerland_location_map.svg.png" 
            alt="Karte der Serviceregionen in der Schweiz"
            className="absolute inset-0 w-full h-full object-contain opacity-80"
          />
          
          <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
            <Compass size={28} className="text-[#0E5A94]" />
          </div>
          
          {regions.map((region) => (
            <div
              key={region.name}
              style={{
                left: `${region.coordinates.x}%`,
                top: `${region.coordinates.y}%`,
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-medium ${
                region.active ? 'scale-125 z-20' : 'z-10'
              }`}
              onMouseEnter={() => handleRegionHover(region.name)}
            >
              <div 
                className={`w-5 h-5 rounded-full ${
                  region.active 
                    ? region.premium
                      ? 'bg-[#D4AF37]'
                      : 'bg-[#0E5A94]' 
                    : region.premium
                      ? 'bg-[#D4AF37]/60'
                      : 'bg-[#0E5A94]/60'
                } relative transition-medium shadow-md flex items-center justify-center`}
              >
                <div 
                  className={`absolute inset-0 rounded-full animate-ping ${
                    region.active ? region.premium ? 'bg-[#D4AF37]/40' : 'bg-[#0E5A94]/40' : 'bg-primary/0'
                  }`}
                />
                <MapPin size={12} className="text-white" />
              </div>
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-sm font-medium glass px-3 py-1 rounded-full shadow-md ${
                  region.active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                } transition-medium ${region.premium ? 'bg-amber-50 border border-amber-200' : ''}`}
              >
                {region.premium && <span className="text-amber-600 mr-1">★</span>}
                {region.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/90 to-transparent p-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Navigation size={20} className="text-[#0E5A94]" />
          <h4 className="text-sm font-medium text-[#0E5A94]">Unsere Standorte</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {regions.map((region) => (
            <Link 
              key={region.name}
              to={region.path}
              className={`px-3 py-2 text-sm text-center rounded-lg border transition-medium hover:bg-[#0E5A94] hover:text-white hover:border-[#0E5A94] flex items-center justify-center ${
                region.active 
                  ? region.premium
                    ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-md' 
                    : 'bg-[#0E5A94] text-white border-[#0E5A94] shadow-md'
                  : region.premium
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-white text-foreground border-border'
              }`}
              onMouseEnter={() => handleRegionHover(region.name)}
            >
              {region.icon}
              {region.name}
              {region.premium && <span className="ml-1 text-xs">★</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionMap;
