
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
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

  const navLinkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    exit: { opacity: 0, y: -10 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-medium ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md py-2' : 'py-4 md:py-6'
      }`}
    >
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-bold tracking-tight">Bäderberg</span>
            </Link>
          </motion.div>

          {isMobile ? (
            <motion.button 
              onClick={toggleMenu} 
              className="p-2 rounded-md bg-secondary/70 hover:bg-secondary transition-fast"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          ) : (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="flex items-center gap-1 md:gap-2">
                {[
                  { title: "Leistungen", path: "/#services" },
                  { title: "Projekte", path: "/#gallery" },
                  { title: "Über Uns", path: "/#about" },
                  { title: "Kontakt", path: "/#contact" },
                ].map((item, index) => (
                  <NavigationMenuItem key={item.path}>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        "hover:bg-secondary/80 hover:text-primary"
                      )}
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
                          className="px-3 py-2 text-sm rounded-md hover:bg-secondary transition-fast"
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
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors ml-2"
                  >
                    <motion.span
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="block"
                    >
                      Kostenlose Beratung
                    </motion.span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-background/98 z-40 pt-16 px-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-2 mt-4">
                {[
                  { title: "Leistungen", path: "/#services" },
                  { title: "Projekte", path: "/#gallery" },
                  { title: "Über Uns", path: "/#about" },
                  { title: "Kontakt", path: "/#contact" },
                ].map((item) => (
                  <motion.div 
                    key={item.path}
                    variants={mobileNavItemVariants}
                  >
                    <Link 
                      to={item.path} 
                      className="py-3 border-b border-border text-lg font-medium block"
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={mobileNavItemVariants}>
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
                  
                  <div id="mobile-regions" className="hidden pl-2 py-2 space-y-1">
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
                </motion.div>
                
                <motion.div 
                  variants={mobileNavItemVariants}
                  className="pt-4"
                >
                  <Link 
                    to="/#contact" 
                    className="py-3 bg-primary text-primary-foreground rounded-md text-center font-medium block"
                    onClick={toggleMenu}
                  >
                    Kostenlose Beratung
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
