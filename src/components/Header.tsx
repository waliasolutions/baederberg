
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
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
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Close mobile menu when resizing to desktop
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

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-background/90 backdrop-blur-md shadow-sm py-2' : 'py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center z-50">
            <div className="bg-white p-1 md:p-1.5 rounded-md mr-2">
              <img 
                src="/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png" 
                alt="Bäderberg Logo" 
                className="h-8 w-8 md:h-10 md:w-10 object-contain" 
              />
            </div>
          </Link>

          {isMobile ? (
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md hover:bg-secondary/20 transition-colors z-50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
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

        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-background z-40 pt-16 px-4 overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {[
                  { title: "Leistungen", path: "/#services" },
                  { title: "Projekte", path: "/#gallery" },
                  { title: "Über Uns", path: "/#about" },
                  { title: "Kontakt", path: "/#contact" },
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className="py-3 border-b border-border text-lg font-medium block"
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                ))}

                <div>
                  <button 
                    onClick={() => {
                      const regionsEl = document.getElementById('mobile-regions');
                      if (regionsEl) {
                        regionsEl.classList.toggle('hidden');
                      }
                    }}
                    className="flex items-center justify-between py-3 border-b border-border text-lg font-medium w-full"
                  >
                    <span>Regionen</span>
                    <ChevronDown size={18} />
                  </button>
                  
                  <div id="mobile-regions" className="hidden pl-2 py-2 space-y-1 max-h-60 overflow-y-auto">
                    {regions.map((region) => (
                      <Link 
                        key={region.path}
                        to={region.path}
                        className="block py-2 text-muted-foreground hover:text-foreground"
                        onClick={toggleMenu}
                      >
                        {region.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 pb-20">
                  <Link 
                    to="/#contact" 
                    className="py-3 bg-primary text-primary-foreground rounded-md text-center font-medium block"
                    onClick={toggleMenu}
                  >
                    Kostenlose Beratung
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
