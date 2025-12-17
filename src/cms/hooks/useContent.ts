import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { ContentItem, ContentRevision } from '../types';
import { defaultContent } from '../schema';

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export function useContent(sectionKey?: string) {
  const [content, setContent] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingChangesRef = useRef<Record<string, any>>({});

  // Fetch content from database
  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase.from('content').select('*');
      
      if (sectionKey) {
        query = query.eq('section_key', sectionKey);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      // Transform array of content items into nested object
      const contentMap: Record<string, any> = {};
      (data || []).forEach((item: ContentItem) => {
        if (!contentMap[item.section_key]) {
          contentMap[item.section_key] = {};
        }
        contentMap[item.section_key][item.content_key] = item.content;
      });
      
      // Merge with defaults
      const mergedContent = { ...defaultContent };
      Object.keys(contentMap).forEach(key => {
        mergedContent[key] = { ...defaultContent[key], ...contentMap[key] };
      });
      
      setContent(mergedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
      // Use defaults on error
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  }, [sectionKey]);

  // Save content to database
  const saveContent = useCallback(async (
    section: string,
    key: string,
    value: any,
    isDraft = true
  ) => {
    try {
      const { data: existing } = await supabase
        .from('content')
        .select('id')
        .eq('section_key', section)
        .eq('content_key', key)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { error: updateError } = await supabase
          .from('content')
          .update({
            content: value,
            is_draft: isDraft,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
        
        if (updateError) throw updateError;

        // Create revision
        await supabase.from('content_revisions').insert({
          content_id: existing.id,
          content: value,
        });
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from('content')
          .insert({
            section_key: section,
            content_key: key,
            content: value,
            is_draft: isDraft,
          });
        
        if (insertError) throw insertError;
      }

      setLastSaved(new Date());
      setIsDirty(false);
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to save';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, []);

  // Update local content (triggers autosave)
  const updateContent = useCallback((
    section: string,
    key: string,
    value: any
  ) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value,
      },
    }));
    
    pendingChangesRef.current[`${section}.${key}`] = { section, key, value };
    setIsDirty(true);
  }, []);

  // Publish content (mark as not draft)
  const publishContent = useCallback(async (section: string, key: string) => {
    const value = content[section]?.[key];
    if (value === undefined) return { error: 'Content not found' };
    
    const { error: updateError } = await supabase
      .from('content')
      .update({
        is_draft: false,
        published_at: new Date().toISOString(),
      })
      .eq('section_key', section)
      .eq('content_key', key);
    
    if (updateError) {
      return { error: updateError.message };
    }
    
    return { error: null };
  }, [content]);

  // Publish all content in a section
  const publishSection = useCallback(async (section: string) => {
    const { error: updateError } = await supabase
      .from('content')
      .update({
        is_draft: false,
        published_at: new Date().toISOString(),
      })
      .eq('section_key', section);
    
    return { error: updateError?.message || null };
  }, []);

  // Get revision history
  const getRevisions = useCallback(async (contentId: string): Promise<ContentRevision[]> => {
    const { data, error: fetchError } = await supabase
      .from('content_revisions')
      .select('*')
      .eq('content_id', contentId)
      .order('created_at', { ascending: false })
      .limit(20);
    
    if (fetchError) {
      setError(fetchError.message);
      return [];
    }
    
    return data || [];
  }, []);

  // Rollback to revision
  const rollbackToRevision = useCallback(async (
    contentId: string,
    revisionContent: any
  ) => {
    const { error: updateError } = await supabase
      .from('content')
      .update({
        content: revisionContent,
        is_draft: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', contentId);
    
    if (updateError) {
      return { error: updateError.message };
    }
    
    await fetchContent();
    return { error: null };
  }, [fetchContent]);

  // Autosave logic
  useEffect(() => {
    if (isDirty) {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      
      autosaveTimerRef.current = setTimeout(async () => {
        const changes = { ...pendingChangesRef.current };
        pendingChangesRef.current = {};
        
        for (const { section, key, value } of Object.values(changes)) {
          await saveContent(section, key, value, true);
        }
      }, AUTOSAVE_INTERVAL);
    }
    
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, [isDirty, saveContent]);

  // Initial fetch
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    isLoading,
    error,
    isDirty,
    lastSaved,
    updateContent,
    saveContent,
    publishContent,
    publishSection,
    getRevisions,
    rollbackToRevision,
    refetch: fetchContent,
  };
}
