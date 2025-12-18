import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, ChevronRight, Shield, MapPin } from 'lucide-react';
import { useSectionContent } from '@/cms/context/ContentProvider';

interface FooterContent {
  companyName?: string;
  tagline?: string;
  copyright?: string;
}

interface ContactContent {
  phone?: string;
  email?: string;
  company?: string;
  street?: string;
  city?: string;
}

const Footer = () => {
  const footerContent = useSectionContent<FooterContent>('footer');
  const contactContent = useSectionContent<ContactContent>('contact');
  const currentYear = new Date().getFullYear();
  
  const companyName = footerContent?.companyName || 'Bäderberg';
  const tagline = footerContent?.tagline || 'Ihr Spezialist für hochwertige Bad- und Küchenumbauten sowie Innenausbau in der Schweiz.';
  const copyright = footerContent?.copyright || `© ${currentYear} Bäderberg. Alle Rechte vorbehalten.`;
  
  const phone = contactContent?.phone || '+41 76 753 44 78';
  const email = contactContent?.email || 'info@baederberg.ch';
  const company = contactContent?.company || 'Bäderberg GmbH';
  const street = contactContent?.street || 'Zugerstrasse 18';
  const city = contactContent?.city || '8805 Richterswil';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tight mb-6 inline-block">
              {companyName}
            </Link>
            <p className="text-primary-foreground/80 mb-6">
              {tagline}
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">5 Jahre Garantie auf alle Arbeiten</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">Kostenlose Vermessung vor der Installation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Leistungen</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/badumbau" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Badumbau
                </Link>
              </li>
              <li>
                <Link to="/kuechenumbau" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Küchenumbau
                </Link>
              </li>
              <li>
                <Link to="/innenausbau" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Innenausbau
                </Link>
              </li>
              <li>
                <Link to="/#gallery" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                  <ChevronRight size={16} className="mr-2" />
                  Projektreferenzen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Regionen</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/region/zurich" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Zürich
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/richterswil" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Richterswil
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/waedenswil" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Wädenswil
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/lachen" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Lachen
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/pfaeffikon" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Pfäffikon SZ
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/region/zollikon" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Zollikon
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/kilchberg" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Kilchberg
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/kuesnacht" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Küsnacht
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/meilen" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Meilen
                    </Link>
                  </li>
                  <li>
                    <Link to="/region/erlenbach" className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                      <ChevronRight size={16} className="mr-2" />
                      Erlenbach
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-3">
              <li className="text-primary-foreground/80">
                {company}<br />
                {street}<br />
                {city}<br />
                Schweiz
              </li>
              <li className="text-primary-foreground/80">
                {phone}
              </li>
              <li className="text-primary-foreground/80">
                {email}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-primary-foreground/60">
            {copyright}
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/60">
            <Link to="/impressum" className="hover:text-primary-foreground transition-colors">
              Impressum
            </Link>
            <Link to="/datenschutz" className="hover:text-primary-foreground transition-colors">
              Datenschutz
            </Link>
            <Link to="/agb" className="hover:text-primary-foreground transition-colors">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
