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

// Helper to convert hex to HSL values for CSS variables
function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '220 85% 20%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyTheme(colors: Record<string, string>) {
  const root = document.documentElement;
  
  if (colors.primaryColor) {
    root.style.setProperty('--primary', hexToHsl(colors.primaryColor));
  }
  if (colors.secondaryColor) {
    root.style.setProperty('--secondary', hexToHsl(colors.secondaryColor));
  }
  if (colors.accentColor) {
    root.style.setProperty('--accent', hexToHsl(colors.accentColor));
  }
  if (colors.backgroundColor) {
    root.style.setProperty('--background', hexToHsl(colors.backgroundColor));
  }
  if (colors.textColor) {
    root.style.setProperty('--foreground', hexToHsl(colors.textColor));
  }
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [content, setContent] = useState<Record<string, any>>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveTheme = useCallback(async () => {
    try {
      const { data: themes } = await supabase
        .from('themes')
        .select('*')
        .eq('is_active', true)
        .limit(1);

      if (themes && themes.length > 0) {
        const activeTheme = themes[0];
        applyTheme(activeTheme.colors as Record<string, string>);
      }
    } catch (err) {
      console.error('Failed to fetch active theme:', err);
    }
  }, []);

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
    fetchActiveTheme();
  }, [fetchPublishedContent, fetchActiveTheme]);

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
