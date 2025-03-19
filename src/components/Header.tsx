
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

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
        isScrolled ? 'glass shadow-lg py-2' : 'py-6'
      }`}
    >
      <motion.div 
        className="container mx-auto px-6 md:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold tracking-tight">Bäderberg</span>
            </Link>
          </motion.div>

          {isMobile ? (
            <motion.button 
              onClick={toggleMenu} 
              className="p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-fast"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          ) : (
            <nav className="flex items-center space-x-6">
              {[
                { title: "Leistungen", path: "/#services", index: 0 },
                { title: "Projekte", path: "/#gallery", index: 2 },
                { title: "Über Uns", path: "/#about", index: 3 },
                { title: "Kontakt", path: "/#contact", index: 4 },
              ].map((item) => (
                <motion.div
                  key={item.path}
                  custom={item.index}
                  variants={navLinkVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Link 
                    to={item.path} 
                    className="font-medium transition-fast hover:text-primary text-muted-foreground"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="relative"
                custom={1}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.button 
                  onClick={() => toggleDropdown('regions')}
                  className="flex items-center space-x-1 font-medium transition-fast hover:text-primary text-muted-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Regionen</span>
                  <motion.div
                    animate={{ rotate: activeDropdown === 'regions' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {activeDropdown === 'regions' && (
                    <motion.div 
                      className="absolute top-full mt-2 right-0 w-64 py-2 glass shadow-lg rounded-lg z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {regions.map((region, index) => (
                          <motion.div
                            key={region.path}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03, duration: 0.2 }}
                          >
                            <Link 
                              to={region.path}
                              className="px-4 py-2 text-sm hover:bg-secondary/50 rounded-md transition-fast block"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {region.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div
                custom={5}
                variants={navLinkVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Link 
                  to="/#contact" 
                  className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full"
                >
                  <motion.span
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                    }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="block"
                  >
                    Kostenlose Beratung
                  </motion.span>
                </Link>
              </motion.div>
            </nav>
          )}
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobile && isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-background z-40 pt-20 px-6"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <nav className="flex flex-col space-y-4">
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
                      className="py-4 border-b border-border text-lg font-medium block"
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                <motion.div variants={mobileNavItemVariants}>
                  <motion.button 
                    onClick={() => toggleDropdown('regions')}
                    className="flex items-center justify-between py-4 border-b border-border text-lg font-medium w-full"
                  >
                    <span>Regionen</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === 'regions' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </motion.button>
                </motion.div>

                <AnimatePresence>
                  {activeDropdown === 'regions' && (
                    <motion.div 
                      className="pl-4 pb-2 space-y-2"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {regions.map((region, index) => (
                        <motion.div
                          key={region.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Link 
                            to={region.path}
                            className="block py-2"
                            onClick={toggleMenu}
                          >
                            {region.name}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <motion.div 
                  variants={mobileNavItemVariants}
                  className="pt-4"
                >
                  <Link 
                    to="/#contact" 
                    className="py-4 bg-primary text-primary-foreground rounded-lg text-center font-medium block"
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
