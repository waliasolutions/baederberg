import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, ChevronRight, Shield, MapPin, Twitter, Youtube } from 'lucide-react';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { defaultContent } from '@/cms/schema';

interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube';
  url: string;
}

interface FooterContent {
  companyName?: string;
  tagline?: string;
  copyright?: string;
  socialLinks?: SocialLink[];
}

interface ContactContent {
  phone?: string;
  email?: string;
  company?: string;
  street?: string;
  city?: string;
}

interface BusinessContent {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

interface RegionsContent {
  items?: { slug: string; title: string }[];
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube
};

const Footer = () => {
  const footerContent = useSectionContent<FooterContent>('footer');
  const contactContent = useSectionContent<ContactContent>('contact');
  const businessContent = useSectionContent<BusinessContent>('business');
  const regionsContent = useSectionContent<RegionsContent>('regions');
  const currentYear = new Date().getFullYear();
  
  const companyName = footerContent?.companyName || 'Bäderberg';
  const tagline = footerContent?.tagline || 'Ihr Spezialist für hochwertige Bad- und Küchenumbauten sowie Innenausbau in der Schweiz.';
  const copyright = footerContent?.copyright || `© ${currentYear} Bäderberg. Alle Rechte vorbehalten.`;
  
  // Build social links from business content or footer content
  const socialLinks: SocialLink[] = [];
  if (businessContent?.instagram) socialLinks.push({ platform: 'instagram', url: businessContent.instagram });
  if (businessContent?.facebook) socialLinks.push({ platform: 'facebook', url: businessContent.facebook });
  if (businessContent?.linkedin) socialLinks.push({ platform: 'linkedin', url: businessContent.linkedin });
  if (businessContent?.youtube) socialLinks.push({ platform: 'youtube', url: businessContent.youtube });
  // Fallback to footer socialLinks if business has none
  const finalSocialLinks = socialLinks.length > 0 ? socialLinks : (footerContent?.socialLinks || []);
  
  const phone = contactContent?.phone || '+41 76 753 44 78';
  const email = contactContent?.email || 'info@baederberg.ch';
  const company = contactContent?.company || 'Bäderberg GmbH';
  const street = contactContent?.street || 'Zugerstrasse 18';
  const city = contactContent?.city || '8805 Richterswil';
  
  // Use schema SSOT for regions fallback
  const regions = regionsContent?.items?.length 
    ? regionsContent.items 
    : defaultContent.regions.items;
  const regionsColumn1 = regions.slice(0, 5);
  const regionsColumn2 = regions.slice(5, 10);

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
            {finalSocialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {finalSocialLinks.map((link, index) => {
                  const Icon = socialIcons[link.platform];
                  return (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                      aria-label={link.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
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
                  {regionsColumn1.map((region) => (
                    <li key={region.slug}>
                      <Link to={`/region/${region.slug}`} className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                        <ChevronRight size={16} className="mr-2" />
                        {region.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {regionsColumn2.length > 0 && (
                <div>
                  <ul className="space-y-2">
                    {regionsColumn2.map((region) => (
                      <li key={region.slug}>
                        <Link to={`/region/${region.slug}`} className="text-primary-foreground/80 hover:text-primary-foreground flex items-center transition-colors">
                          <ChevronRight size={16} className="mr-2" />
                          {region.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
