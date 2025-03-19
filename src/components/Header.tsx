
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
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
      className={`fixed top-0 left-0 w-full z-50 transition-medium ${
        isScrolled ? 'glass shadow-lg py-2' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">Bäderberg</span>
          </Link>

          {isMobile ? (
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-fast"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <nav className="flex items-center space-x-6">
              <Link to="/#services" className="font-medium transition-fast hover:text-primary text-muted-foreground">
                Leistungen
              </Link>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('regions')}
                  className="flex items-center space-x-1 font-medium transition-fast hover:text-primary text-muted-foreground"
                >
                  <span>Regionen</span>
                  <ChevronDown size={16} className={`transition-medium ${activeDropdown === 'regions' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'regions' && (
                  <div className="absolute top-full mt-2 right-0 w-64 py-2 glass shadow-lg rounded-lg z-50 animate-scale">
                    <div className="grid grid-cols-2 gap-2 p-2">
                      {regions.map((region) => (
                        <Link 
                          key={region.path}
                          to={region.path}
                          className="px-4 py-2 text-sm hover:bg-secondary/50 rounded-md transition-fast"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {region.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Link to="/#gallery" className="font-medium transition-fast hover:text-primary text-muted-foreground">
                Projekte
              </Link>
              <Link to="/#about" className="font-medium transition-fast hover:text-primary text-muted-foreground">
                Über Uns
              </Link>
              <Link to="/#contact" className="font-medium transition-fast hover:text-primary text-muted-foreground">
                Kontakt
              </Link>
              <Link 
                to="/#contact" 
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:shadow-lg transition-fast hover:-translate-y-1"
              >
                Kostenlose Beratung
              </Link>
            </nav>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 pt-20 px-6 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/#services" 
                className="py-4 border-b border-border text-lg font-medium"
                onClick={toggleMenu}
              >
                Leistungen
              </Link>
              <button 
                onClick={() => toggleDropdown('regions')}
                className="flex items-center justify-between py-4 border-b border-border text-lg font-medium"
              >
                <span>Regionen</span>
                <ChevronDown size={20} className={`transition-medium ${activeDropdown === 'regions' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'regions' && (
                <div className="pl-4 pb-2 space-y-2 animate-fade-in">
                  {regions.map((region) => (
                    <Link 
                      key={region.path}
                      to={region.path}
                      className="block py-2"
                      onClick={toggleMenu}
                    >
                      {region.name}
                    </Link>
                  ))}
                </div>
              )}
              <Link 
                to="/#gallery" 
                className="py-4 border-b border-border text-lg font-medium"
                onClick={toggleMenu}
              >
                Projekte
              </Link>
              <Link 
                to="/#about" 
                className="py-4 border-b border-border text-lg font-medium"
                onClick={toggleMenu}
              >
                Über Uns
              </Link>
              <Link 
                to="/#contact" 
                className="py-4 border-b border-border text-lg font-medium"
                onClick={toggleMenu}
              >
                Kontakt
              </Link>
              <Link 
                to="/#contact" 
                className="mt-4 py-4 bg-primary text-primary-foreground rounded-lg text-center font-medium"
                onClick={toggleMenu}
              >
                Kostenlose Beratung
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
