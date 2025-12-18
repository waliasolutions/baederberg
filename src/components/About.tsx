import React from 'react';
import { Heart, Award, Smile } from 'lucide-react';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { DynamicIcon } from '@/lib/DynamicIcon';
import modernBathroom from '/lovable-uploads/modern-bathroom-interior.jpg';

interface AboutFeature {
  icon?: string;
  title?: string;
  description?: string;
}

interface AboutContent {
  heading?: string;
  paragraph1?: string;
  paragraph2?: string;
  image?: string;
  features?: AboutFeature[];
}

// Default features if not in CMS
const defaultFeatures: AboutFeature[] = [
  {
    icon: 'Heart',
    title: 'Persönliche Betreuung',
    description: 'Ihr persönlicher Bauleiter begleitet Ihr Projekt von Anfang bis Ende.'
  },
  {
    icon: 'Award',
    title: 'Sorgfältige Arbeit',
    description: 'Wir achten auf Details und arbeiten sauber.'
  },
  {
    icon: 'Smile',
    title: 'Garantie inklusive',
    description: 'Elektroarbeiten und Garantie sind bei uns immer dabei.'
  }
];

const About = () => {
  const aboutContent = useSectionContent<AboutContent>('about');
  
  const heading = aboutContent?.heading || 'Ihr Bad, Ihre Küche, Ihr Innenausbau';
  const paragraph1 = aboutContent?.paragraph1 || 'Wir sind Handwerker aus der Region Zürich. Wir planen und bauen Bäder, Küchen und Innenräume – sorgfältig und nach Ihren Wünschen.';
  const paragraph2 = aboutContent?.paragraph2 || 'Alles aus einer Hand. Mit persönlicher Betreuung von Anfang bis Ende.';
  const imageUrl = aboutContent?.image || modernBathroom;
  const features = aboutContent?.features?.length ? aboutContent.features : defaultFeatures;

  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="container px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={imageUrl}
              alt="Modernes Badezimmer" 
              className="w-full rounded-2xl shadow-lg object-cover h-[500px]"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight font-inter">
              {heading}
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              {paragraph1}
            </p>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {paragraph2}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <DynamicIcon 
                    name={feature.icon || 'Star'} 
                    className="text-primary" 
                    size={24}
                    fallback={<Heart className="text-primary" size={24} />}
                  />
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
