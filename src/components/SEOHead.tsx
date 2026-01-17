import { Helmet } from 'react-helmet-async';
import { useSectionContent } from '@/cms/context/ContentProvider';

interface SEOContent {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  gtmId?: string;
  gtmHead?: string;
  language?: string;
  hreflang?: string;
}

interface HeroSlide {
  backgroundImage?: string;
}

interface HeroContent {
  slides?: HeroSlide[];
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function SEOHead({ title, description, ogImage, noIndex }: SEOHeadProps) {
  const seoContent = useSectionContent<SEOContent>('seo');
  const heroContent = useSectionContent<HeroContent>('hero');
  
  // Defaults
  const defaultTitle = 'Bäderberg - Bad, Küche & Innenausbau';
  const defaultDescription = 'Ihr Spezialist für hochwertige Bad-, Küchen- und Innenrenovationen in der Region Zürich und Umgebung.';
  
  // Get first hero image as default OG image
  const firstHeroImage = heroContent?.slides?.[0]?.backgroundImage;
  const defaultOgImage = firstHeroImage || '/lovable-uploads/7a284723-d9c7-4c90-9fad-7fcb311fe8c6.png';
  
  // Resolve values (props override CMS, CMS overrides defaults)
  const finalTitle = title || seoContent?.metaTitle || defaultTitle;
  const finalDescription = description || seoContent?.metaDescription || defaultDescription;
  const finalOgImage = ogImage || seoContent?.ogImage || defaultOgImage;
  const language = seoContent?.language || 'de-CH';
  const hreflang = seoContent?.hreflang || 'de-CH';
  const gtmId = seoContent?.gtmId;
  const gtmHead = seoContent?.gtmHead;
  
  // Use published domain for SEO
  const publishedDomain = 'https://baederberg.lovable.app';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = `${publishedDomain}${currentPath}`;
  
  // Ensure OG image is absolute URL
  const absoluteOgImage = finalOgImage.startsWith('http') ? finalOgImage : `${publishedDomain}${finalOgImage}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={language.replace('-', '_')} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
      
      {/* Hreflang */}
      <link rel="alternate" hrefLang={hreflang} href={canonicalUrl} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* No index if specified */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Google Tag Manager - Head */}
      {gtmId && (
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`}
        </script>
      )}
      
      {/* Custom GTM Head Code */}
      {gtmHead && (
        <script>{gtmHead}</script>
      )}
    </Helmet>
  );
}

export default SEOHead;
