
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleRegions = () => {
    setActiveRegion(!activeRegion);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const regions = [
    { name: 'Zürich', path: '/region/zurich' },
    { name: 'Richterswil', path: '/region/richterswil' },
    { name: 'Wädenswil', path: '/region/waedenswil' },
    { name: 'Lachen', path: '/region/lachen' },
    { name: 'Pfäffikon SZ', path: '/region/pfaeffikon' },
    { name: 'Menzingen', path: '/region/menzingen' },
    { name: 'Freienbach SZ', path: '/region/freienbach' },
    { name: 'Rapperswil SG', path: '/region/rapperswil' },
    { name: 'Horgen', path: '/region/horgen' },
    { name: 'Rüti ZH', path: '/region/rueti' },
  ];

  const mainNavItems = [
    { title: "Leistungen", path: "/#services" },
    { title: "Projekte", path: "/#gallery" },
    { title: "Über Uns", path: "/#about" },
    { title: "Kontakt", path: "/#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' : 'py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center z-50">
            <div className="bg-white p-1.5 md:p-2 rounded-md mr-2">
              <img 
                src="/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png" 
                alt="Bäderberg Logo" 
                className="h-12 w-12 md:h-16 md:w-16 object-contain" 
              />
            </div>
          </Link>

          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="p-2 rounded-md hover:bg-secondary/20 transition-colors focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 pt-14 w-full sm:max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="text-lg font-medium">Menü</h3>
                  </div>
                  
                  <nav className="flex flex-col px-2 py-4 overflow-y-auto flex-1">
                    {mainNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className="flex items-center py-3 px-2 rounded-md text-lg font-medium hover:bg-secondary/20 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                    
                    <div className="mt-2 border-t border-border pt-3">
                      <button 
                        onClick={toggleRegions}
                        className="flex items-center justify-between w-full py-3 px-2 rounded-md text-lg font-medium hover:bg-secondary/20 transition-all"
                      >
                        <span>Regionen</span>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${activeRegion ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {activeRegion && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 gap-1 py-2">
                              {regions.map((region) => (
                                <Link 
                                  key={region.path}
                                  to={region.path}
                                  className="py-2 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {region.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </nav>
                  
                  <div className="p-4 border-t border-border mt-auto">
                    <Link 
                      to="/#contact" 
                      className="w-full py-3 bg-primary text-primary-foreground rounded-md text-center font-medium block hover:bg-primary/90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Kostenlose Beratung
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex items-center gap-1">
                {[
                  { title: "Leistungen", path: "/#services" },
                  { title: "Projekte", path: "/#gallery" },
                  { title: "Über Uns", path: "/#about" },
                ].map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className="px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/20 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">Regionen</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 w-[400px] gap-1 p-4">
                      {regions.map((region) => (
                        <Link
                          key={region.path}
                          to={region.path}
                          className="px-3 py-2 text-sm rounded-md hover:bg-secondary/20 transition-colors"
                        >
                          {region.name}
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link 
                    to="/#contact" 
                    className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Kostenlose Beratung
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
