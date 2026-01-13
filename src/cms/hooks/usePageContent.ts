import { useMemo } from 'react';
import { usePublicContent } from '../context/ContentProvider';
import { defaultContent } from '../schema';

export interface WhyProfessionalItem {
  title: string;
  description: string;
}

export interface WhyProfessional {
  heading: string;
  items: WhyProfessionalItem[];
  promise: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessSteps {
  heading: string;
  subheading: string;
  steps: ProcessStep[];
}

export interface CtaSection {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
}

export interface PageContent {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  introText: string;
  features: string[];
  whyProfessional: WhyProfessional;
  processSteps: ProcessSteps;
  cta: CtaSection;
}

const defaultWhyProfessional: WhyProfessional = {
  heading: '',
  items: [],
  promise: ''
};

const defaultProcessSteps: ProcessSteps = {
  heading: 'So läuft es ab',
  subheading: 'Einfach und klar',
  steps: []
};

const defaultCta: CtaSection = {
  heading: 'Jetzt Termin vereinbaren',
  subheading: 'Wir beraten Sie gerne – kostenlos und unverbindlich.',
  buttonText: 'Jetzt Kontakt aufnehmen',
  buttonLink: '/#contact'
};

/**
 * Hook to get service page content (badumbau, kuechenumbau, innenausbau)
 * Uses SSOT from schema.ts as defaults, merges with CMS data
 */
export function usePageContent(pageKey: string): PageContent {
  const { content, isLoading } = usePublicContent();
  
  return useMemo(() => {
    // Get defaults from SSOT (schema.ts)
    const defaults = defaultContent.pages?.[pageKey] || {
      metaTitle: '',
      metaDescription: '',
      heroHeading: '',
      heroSubheading: '',
      heroImage: '',
      introText: '',
      features: [],
      whyProfessional: defaultWhyProfessional,
      processSteps: defaultProcessSteps,
      cta: defaultCta
    };
    
    // Get CMS content (already merged in ContentProvider)
    const cmsContent = content?.pages?.[pageKey] || {};
    
    // Merge: CMS content takes priority over defaults
    return {
      metaTitle: cmsContent.metaTitle || defaults.metaTitle,
      metaDescription: cmsContent.metaDescription || defaults.metaDescription,
      heroHeading: cmsContent.heroHeading || defaults.heroHeading,
      heroSubheading: cmsContent.heroSubheading || defaults.heroSubheading,
      heroImage: cmsContent.heroImage || defaults.heroImage,
      introText: cmsContent.introText || defaults.introText,
      features: Array.isArray(cmsContent.features) && cmsContent.features.length > 0 
        ? cmsContent.features 
        : defaults.features || [],
      whyProfessional: {
        heading: cmsContent.whyProfessional?.heading || defaults.whyProfessional?.heading || defaultWhyProfessional.heading,
        items: Array.isArray(cmsContent.whyProfessional?.items) && cmsContent.whyProfessional.items.length > 0
          ? cmsContent.whyProfessional.items
          : defaults.whyProfessional?.items || defaultWhyProfessional.items,
        promise: cmsContent.whyProfessional?.promise || defaults.whyProfessional?.promise || defaultWhyProfessional.promise
      },
      processSteps: {
        heading: cmsContent.processSteps?.heading || defaults.processSteps?.heading || defaultProcessSteps.heading,
        subheading: cmsContent.processSteps?.subheading || defaults.processSteps?.subheading || defaultProcessSteps.subheading,
        steps: Array.isArray(cmsContent.processSteps?.steps) && cmsContent.processSteps.steps.length > 0
          ? cmsContent.processSteps.steps
          : defaults.processSteps?.steps || defaultProcessSteps.steps
      },
      cta: {
        heading: cmsContent.cta?.heading || defaults.cta?.heading || defaultCta.heading,
        subheading: cmsContent.cta?.subheading || defaults.cta?.subheading || defaultCta.subheading,
        buttonText: cmsContent.cta?.buttonText || defaults.cta?.buttonText || defaultCta.buttonText,
        buttonLink: cmsContent.cta?.buttonLink || defaults.cta?.buttonLink || defaultCta.buttonLink
      }
    };
  }, [content, pageKey]);
}

export type { PageContent as ServicePageContent };
