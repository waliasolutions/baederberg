import { useSectionContent } from '@/cms/context/ContentProvider';

interface SEOContent {
  gtmId?: string;
  gtmBody?: string;
}

export function GTMBody() {
  const seoContent = useSectionContent<SEOContent>('seo');
  
  const gtmId = seoContent?.gtmId;
  const gtmBody = seoContent?.gtmBody;
  
  if (!gtmId && !gtmBody) return null;
  
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      {gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="GTM"
          />
        </noscript>
      )}
      
      {/* Custom GTM Body Code - rendered as text since noscript doesn't support dangerouslySetInnerHTML well */}
      {gtmBody && (
        <noscript>
          <div dangerouslySetInnerHTML={{ __html: gtmBody }} />
        </noscript>
      )}
    </>
  );
}

export default GTMBody;
