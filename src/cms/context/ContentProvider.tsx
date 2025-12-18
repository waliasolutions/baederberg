import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { defaultContent } from '../schema';

interface ContentContextType {
  content: Record<string, any>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getContent: <T>(section: string, key: string, fallback?: T) => T;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [content, setContent] = useState<Record<string, any>>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPublishedContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch only published content (is_draft = false and not scheduled for future)
      const { data, error: fetchError } = await supabase
        .from('content')
        .select('*')
        .eq('is_draft', false)
        .or('scheduled_for.is.null,scheduled_for.lte.now()');

      if (fetchError) throw fetchError;

      // Transform array of content items into nested object
      const contentMap: Record<string, any> = {};
      (data || []).forEach((item: any) => {
        if (!contentMap[item.section_key]) {
          contentMap[item.section_key] = {};
        }
        contentMap[item.section_key][item.content_key] = item.content;
      });

      // Merge with defaults (defaults as fallback)
      const mergedContent: Record<string, any> = {};
      Object.keys(defaultContent).forEach(sectionKey => {
        mergedContent[sectionKey] = {
          ...defaultContent[sectionKey],
          ...(contentMap[sectionKey] || {}),
        };
      });

      setContent(mergedContent);
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      // Use defaults on error
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Helper to get nested content with fallback
  const getContent = useCallback(<T,>(section: string, key: string, fallback?: T): T => {
    const sectionContent = content[section];
    if (!sectionContent) {
      return fallback ?? (defaultContent[section]?.[key] as T);
    }
    return sectionContent[key] ?? fallback ?? (defaultContent[section]?.[key] as T);
  }, [content]);

  // Initial fetch
  useEffect(() => {
    fetchPublishedContent();
  }, [fetchPublishedContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        error,
        refetch: fetchPublishedContent,
        getContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function usePublicContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('usePublicContent must be used within a ContentProvider');
  }
  return context;
}

// Hook for getting specific section content
export function useSectionContent<T = any>(section: string): T {
  const { content } = usePublicContent();
  return (content[section] || defaultContent[section]) as T;
}
