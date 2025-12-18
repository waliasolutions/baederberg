import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Check, Palette, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '../components/AdminLayout';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../types';

const defaultThemeColors: Theme['colors'] = {
  primaryColor: '#0ea5e9',
  secondaryColor: '#f1f5f9',
  accentColor: '#0284c7',
  backgroundColor: '#ffffff',
  textColor: '#0f172a',
};

const colorLabels: Record<string, string> = {
  primaryColor: 'Primary Color',
  secondaryColor: 'Secondary Color',
  accentColor: 'Accent Color',
  backgroundColor: 'Background',
  textColor: 'Text Color',
};

export const ThemeEditor: React.FC = () => {
  const { toast } = useToast();
  const { themes, isLoading, fetchThemes, createTheme, updateTheme, activateTheme, deleteTheme, applyTheme } = useTheme();
  
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [editingColors, setEditingColors] = useState<Theme['colors']>(defaultThemeColors);
  const [newThemeName, setNewThemeName] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  useEffect(() => {
    if (themes.length > 0 && !selectedTheme) {
      const activeTheme = themes.find(t => t.is_active) || themes[0];
      setSelectedTheme(activeTheme);
      setEditingColors(activeTheme.colors);
    }
  }, [themes, selectedTheme]);

  // Live preview - apply colors as CSS variables
  useEffect(() => {
    Object.entries(editingColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--preview-${key}`, value);
    });
  }, [editingColors]);

  const handleColorChange = (key: keyof Theme['colors'], value: string) => {
    setEditingColors(prev => ({ ...prev, [key]: value }));
  };

  const handleCreateTheme = async () => {
    if (!newThemeName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a theme name.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    const { data, error } = await createTheme(newThemeName, defaultThemeColors);
    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else if (data) {
      toast({
        title: 'Created',
        description: 'New theme created successfully.',
      });
      setSelectedTheme(data);
      setEditingColors(data.colors);
      setNewThemeName('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleSaveTheme = async () => {
    if (!selectedTheme) return;

    setIsSaving(true);
    const { error } = await updateTheme(selectedTheme.id, { colors: editingColors });
    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Saved',
        description: 'Theme colors updated successfully.',
      });
    }
  };

  const handleActivateTheme = async () => {
    if (!selectedTheme) return;

    setIsSaving(true);
    const { error } = await activateTheme(selectedTheme.id);
    setIsSaving(false);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      applyTheme(selectedTheme);
      toast({
        title: 'Activated',
        description: 'Theme is now active on your website.',
      });
    }
  };

  const handleDeleteTheme = async () => {
    if (!selectedTheme) return;
    if (selectedTheme.is_active) {
      toast({
        title: 'Error',
        description: 'Cannot delete the active theme.',
        variant: 'destructive',
      });
      return;
    }
    if (!confirm('Are you sure you want to delete this theme?')) return;

    const { error } = await deleteTheme(selectedTheme.id);

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Deleted',
        description: 'Theme deleted successfully.',
      });
      setSelectedTheme(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Editor</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Theme
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Theme</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="themeName">Theme Name</Label>
                <Input
                  id="themeName"
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                  placeholder="e.g., Dark Mode, Summer Colors"
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTheme} disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Theme
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Theme List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Themes</CardTitle>
              <CardDescription>Select a theme to edit</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : themes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No themes yet. Create one to get started.
                </p>
              ) : (
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setEditingColors(theme.colors);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        selectedTheme?.id === theme.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: theme.colors.primaryColor }}
                        />
                        <span className="font-medium">{theme.name}</span>
                      </div>
                      {theme.is_active && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Active
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Color Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {selectedTheme ? selectedTheme.name : 'Select a Theme'}
                  </CardTitle>
                  <CardDescription>
                    Edit colors and see live preview
                  </CardDescription>
                </div>
                {selectedTheme && (
                  <div className="flex items-center gap-2">
                    {!selectedTheme.is_active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDeleteTheme}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedTheme ? (
                <div className="space-y-6">
                  {/* Color Inputs */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(Object.entries(editingColors) as [keyof Theme['colors'], string][]).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label>{colorLabels[key] || key}</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={value || '#000000'}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            className="w-12 h-10 rounded border cursor-pointer"
                          />
                          <Input
                            value={value || ''}
                            onChange={(e) => handleColorChange(key, e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live Preview */}
                  <div className="space-y-3">
                    <Label>Live Preview</Label>
                    <div
                      className="p-6 rounded-lg border"
                      style={{ backgroundColor: editingColors.backgroundColor }}
                    >
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: editingColors.textColor }}
                      >
                        Sample Heading
                      </h3>
                      <p
                        className="mb-4"
                        style={{ color: editingColors.textColor, opacity: 0.7 }}
                      >
                        This is how your content will look with the selected colors.
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 rounded font-medium"
                          style={{
                            backgroundColor: editingColors.primaryColor,
                            color: '#ffffff',
                          }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-4 py-2 rounded font-medium"
                          style={{
                            backgroundColor: editingColors.secondaryColor,
                            color: editingColors.textColor,
                          }}
                        >
                          Secondary Button
                        </button>
                      </div>
                      <div
                        className="mt-4 p-4 rounded"
                        style={{ backgroundColor: editingColors.secondaryColor }}
                      >
                        <p style={{ color: editingColors.textColor, opacity: 0.7 }}>
                          This is a muted section with secondary styling.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleSaveTheme} disabled={isSaving}>
                      {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Save Changes
                    </Button>
                    <Button onClick={handleActivateTheme} disabled={isSaving || selectedTheme.is_active}>
                      <Check className="w-4 h-4 mr-2" />
                      {selectedTheme.is_active ? 'Currently Active' : 'Activate Theme'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Palette className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a theme from the list or create a new one
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
