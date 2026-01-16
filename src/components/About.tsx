import React from 'react';
import { Heart } from 'lucide-react';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { DynamicIcon } from '@/lib/DynamicIcon';
import { defaultContent } from '@/cms/schema';
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

const About = () => {
  const aboutContent = useSectionContent<AboutContent>('about');
  
  // Use schema defaults (SSOT)
  const schemaDefaults = defaultContent.about || {};
  
  const heading = aboutContent?.heading || schemaDefaults.heading || 'Ihr Bad, Ihre Küche, Ihr Innenausbau';
  const paragraph1 = aboutContent?.paragraph1 || schemaDefaults.paragraph1 || '';
  const paragraph2 = aboutContent?.paragraph2 || schemaDefaults.paragraph2 || '';
  const imageUrl = aboutContent?.image || modernBathroom;
  const features = aboutContent?.features?.length 
    ? aboutContent.features 
    : schemaDefaults.features || [];

  return (
    <section id="about" className="py-20 md:py-28 bg-white scroll-mt-24">
      <div className="container px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={imageUrl}
              alt="Modernes Badezimmer" 
              className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3] max-h-[300px] md:max-h-[400px]"
            />
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight font-inter">
              {heading}
            </h2>
            
            <p className="text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">
              {paragraph1}
            </p>
            
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
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
