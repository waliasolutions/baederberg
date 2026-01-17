import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const mainNavItems = [
    { title: "Badumbau", path: "/badumbau" },
    { title: "Küchen", path: "/kuechenumbau" },
    { title: "Innenausbau", path: "/innenausbau" },
    { title: "Projekte", path: "/#gallery" },
    { title: "Über Uns", path: "/ueber-uns" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background border-b border-border/50 transition-all duration-300">
      <div className={cn(
        "container mx-auto px-4 transition-all duration-300",
        isScrolled ? "py-2" : "py-4"
      )}>
        <div className="flex items-center justify-between">
          {/* Logo - Larger by default, shrinks on scroll */}
          <Link to="/" className="flex items-center z-50 flex-shrink-0">
            <div className={cn(
              "bg-white rounded-md mr-2 transition-all duration-300",
              isScrolled ? "p-1" : "p-1.5 md:p-2"
            )}>
              <img 
                src="/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png" 
                alt="Bäderberg Logo" 
                className={cn(
                  "object-contain transition-all duration-300",
                  isScrolled 
                    ? "h-10 w-10 md:h-12 md:w-12" 
                    : "h-16 w-16 md:h-20 md:w-20"
                )}
              />
            </div>
          </Link>

          {isMobile ? (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
              <button 
                  className="p-3 rounded-md hover:bg-secondary/20 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Open menu"
                >
                  <Menu size={32} className="text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-full sm:max-w-sm">
                <div className="flex flex-col h-full">
                  <div className="px-4 py-4 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-medium">Menü</h3>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-md hover:bg-secondary/20 transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <nav className="flex flex-col px-2 py-4 overflow-y-auto flex-1">
                    {mainNavItems.map((item) => (
                      <Link 
                        key={item.path}
                        to={item.path} 
                        className="flex items-center py-4 px-4 rounded-md text-base font-medium hover:bg-secondary/20 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="p-4 border-t border-border mt-auto">
                    <Link 
                      to="/#contact" 
                      className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg text-center font-semibold block hover:bg-primary/90 transition-colors text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Kontakt
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            /* Desktop Navigation - Full width centered */
            <div className="hidden md:flex items-center justify-between flex-1 ml-8">
              <nav className="flex-1 flex justify-center">
                <ul className="flex items-center gap-8">
                  {mainNavItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className="px-3 py-2 text-lg font-medium text-foreground rounded-lg hover:bg-secondary/20 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <Link 
                to="/#contact" 
                className="flex-shrink-0 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm text-lg"
              >
                Kontakt
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
