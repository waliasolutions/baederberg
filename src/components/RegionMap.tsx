
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
      // Start cycling through regions
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
          {/* Map background */}
          <img 
            src="https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Map of service regions in Switzerland"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          
          {/* Compass icon */}
          <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
            <Compass size={28} className="text-primary" />
          </div>
          
          {/* Region points */}
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
                  region.active ? 'bg-[#0E5A94]' : 'bg-[#0E5A94]/60'
                } relative transition-medium shadow-md flex items-center justify-center`}
              >
                <div 
                  className={`absolute inset-0 rounded-full animate-ping ${
                    region.active ? 'bg-[#0E5A94]/40' : 'bg-primary/0'
                  }`}
                />
                <MapPin size={12} className="text-white" />
              </div>
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap text-sm font-medium glass px-3 py-1 rounded-full shadow-md ${
                  region.active ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                } transition-medium`}
              >
                {region.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Regions list at the bottom */}
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
                  ? 'bg-[#0E5A94] text-white border-[#0E5A94] shadow-md' 
                  : 'bg-white text-foreground border-border'
              }`}
              onMouseEnter={() => handleRegionHover(region.name)}
            >
              {region.icon}
              {region.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionMap;
