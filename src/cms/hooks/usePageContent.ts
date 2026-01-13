import { useMemo } from 'react';
import { usePublicContent } from '../context/ContentProvider';
import { defaultContent } from '../schema';

export interface PageContent {
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  introText: string;
  features: string[];
}

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
      features: []
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
        : defaults.features || []
    };
  }, [content, pageKey]);
}

export type { PageContent as ServicePageContent };
