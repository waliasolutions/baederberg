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
    { name: 'Zollikon', path: '/region/zollikon' },
    { name: 'Kilchberg', path: '/region/kilchberg' },
    { name: 'Küsnacht', path: '/region/kuesnacht' },
    { name: 'Meilen', path: '/region/meilen' },
    { name: 'Erlenbach', path: '/region/erlenbach' },
    { name: 'Richterswil', path: '/region/richterswil' },
    { name: 'Wädenswil', path: '/region/waedenswil' },
    { name: 'Lachen', path: '/region/lachen' },
    { name: 'Pfäffikon SZ', path: '/region/pfaeffikon' },
  ];

  const mainNavItems = [
    { title: "Badumbau", path: "/badumbau" },
    { title: "Küchen", path: "/kuechenumbau" },
    { title: "Innenausbau", path: "/innenausbau" },
    { title: "Projekte", path: "/#gallery" },
    { title: "Über Uns", path: "/#about" },
    { title: "Kontakt", path: "/#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-2' : 'bg-gradient-to-b from-black/40 to-transparent py-3 md:py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center z-50">
            <div className="bg-white p-1.5 md:p-2 rounded-md mr-2">
              <img 
                src="/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png" 
                alt="Bäderberg Logo" 
                className="h-14 w-14 md:h-16 md:w-16 object-contain" 
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
                  <Menu size={32} color="white" />
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
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <Link 
                    to="/#contact" 
                    className="ml-2 px-4 py-2 bg-white text-primary font-semibold rounded-md hover:bg-white/90 transition-colors shadow-md"
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
