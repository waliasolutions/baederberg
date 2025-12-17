import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Theme } from '../types';

export function useTheme() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all themes
  const fetchThemes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      // Transform and type the data
      const typedThemes: Theme[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        is_active: item.is_active,
        colors: item.colors as Theme['colors'],
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      
      setThemes(typedThemes);
      
      // Find active theme
      const active = typedThemes.find(t => t.is_active);
      setActiveTheme(active || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch themes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new theme
  const createTheme = useCallback(async (
    name: string,
    colors: Theme['colors']
  ) => {
    try {
      const { data, error: createError } = await supabase
        .from('themes')
        .insert({ name, colors, is_active: false })
        .select()
        .single();
      
      if (createError) throw createError;
      
      const newTheme: Theme = {
        id: data.id,
        name: data.name,
        is_active: data.is_active,
        colors: data.colors as Theme['colors'],
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      
      setThemes(prev => [newTheme, ...prev]);
      return { data: newTheme, error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create theme';
      setError(errorMsg);
      return { data: null, error: errorMsg };
    }
  }, []);

  // Update theme
  const updateTheme = useCallback(async (
    themeId: string,
    updates: Partial<Pick<Theme, 'name' | 'colors'>>
  ) => {
    try {
      const { error: updateError } = await supabase
        .from('themes')
        .update(updates)
        .eq('id', themeId);
      
      if (updateError) throw updateError;
      
      setThemes(prev => prev.map(t => 
        t.id === themeId ? { ...t, ...updates } : t
      ));
      
      if (activeTheme?.id === themeId) {
        setActiveTheme(prev => prev ? { ...prev, ...updates } : null);
      }
      
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update theme';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, [activeTheme]);

  // Activate theme
  const activateTheme = useCallback(async (themeId: string) => {
    try {
      // Deactivate all themes first
      await supabase
        .from('themes')
        .update({ is_active: false })
        .neq('id', themeId);
      
      // Activate selected theme
      const { error: updateError } = await supabase
        .from('themes')
        .update({ is_active: true })
        .eq('id', themeId);
      
      if (updateError) throw updateError;
      
      setThemes(prev => prev.map(t => ({
        ...t,
        is_active: t.id === themeId,
      })));
      
      const newActive = themes.find(t => t.id === themeId);
      setActiveTheme(newActive || null);
      
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to activate theme';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, [themes]);

  // Delete theme
  const deleteTheme = useCallback(async (themeId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('themes')
        .delete()
        .eq('id', themeId);
      
      if (deleteError) throw deleteError;
      
      setThemes(prev => prev.filter(t => t.id !== themeId));
      
      if (activeTheme?.id === themeId) {
        setActiveTheme(null);
      }
      
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete theme';
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, [activeTheme]);

  // Apply theme to CSS variables
  const applyTheme = useCallback((theme: Theme | null) => {
    if (!theme?.colors) return;
    
    const root = document.documentElement;
    
    // Convert hex to HSL for CSS variables
    const hexToHsl = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return null;
      
      let r = parseInt(result[1], 16) / 255;
      let g = parseInt(result[2], 16) / 255;
      let b = parseInt(result[3], 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
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
    };
    
    if (theme.colors.primaryColor) {
      const hsl = hexToHsl(theme.colors.primaryColor);
      if (hsl) root.style.setProperty('--primary', hsl);
    }
    
    if (theme.colors.secondaryColor) {
      const hsl = hexToHsl(theme.colors.secondaryColor);
      if (hsl) root.style.setProperty('--secondary', hsl);
    }
    
    if (theme.colors.accentColor) {
      const hsl = hexToHsl(theme.colors.accentColor);
      if (hsl) root.style.setProperty('--accent', hsl);
    }
    
    if (theme.colors.backgroundColor) {
      const hsl = hexToHsl(theme.colors.backgroundColor);
      if (hsl) root.style.setProperty('--background', hsl);
    }
    
    if (theme.colors.textColor) {
      const hsl = hexToHsl(theme.colors.textColor);
      if (hsl) root.style.setProperty('--foreground', hsl);
    }
  }, []);

  // Apply active theme on load
  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  useEffect(() => {
    if (activeTheme) {
      applyTheme(activeTheme);
    }
  }, [activeTheme, applyTheme]);

  return {
    themes,
    activeTheme,
    isLoading,
    error,
    fetchThemes,
    createTheme,
    updateTheme,
    activateTheme,
    deleteTheme,
    applyTheme,
  };
}
