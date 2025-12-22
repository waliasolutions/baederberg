import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '../components/AdminLayout';
import FormField from '../components/FormField';
import ArrayEditor from '../components/ArrayEditor';
import RevisionHistory from '../components/RevisionHistory';
import ContentPreview from '../components/ContentPreview';
import { useContent } from '../hooks/useContent';
import { supabase } from '@/integrations/supabase/client';
import { contentSchema, sectionLabels, type SectionSchema, type FieldSchema } from '../schema';
import type { ContentRevision } from '../types';

// Validation helper
function validateContent(content: Record<string, any>, schema: SectionSchema): string[] {
  const errors: string[] = [];
  
  for (const [key, fieldSchema] of Object.entries(schema)) {
    const value = content[key];
    const field = fieldSchema as FieldSchema;
    
    if (field.required) {
      if (field.type === 'array') {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(`${field.label || key} ist erforderlich`);
        } else {
          // Validate array items
          const itemSchema = field.item as Record<string, FieldSchema>;
          if (itemSchema) {
            value.forEach((item, index) => {
              for (const [itemKey, itemField] of Object.entries(itemSchema)) {
                if (itemField.required && (!item[itemKey] || item[itemKey] === '')) {
                  errors.push(`${field.label || key} Item ${index + 1}: ${itemField.label || itemKey} ist erforderlich`);
                }
              }
            });
          }
        }
      } else if (value === undefined || value === null || value === '') {
        errors.push(`${field.label || key} ist erforderlich`);
      }
    }
    
    // Validate maxLength
    if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
      errors.push(`${field.label || key} darf maximal ${field.maxLength} Zeichen haben`);
    }
  }
  
  return errors;
}

export const ContentSectionEditor: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { content, isLoading, saveContent, publishSection, getRevisions, rollbackToRevision } = useContent();
  
  const [localContent, setLocalContent] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [revisionsLoading, setRevisionsLoading] = useState(false);
  const [selectedContentKey, setSelectedContentKey] = useState<string>('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const sectionKey = section as keyof typeof contentSchema;
  const schema = contentSchema[sectionKey] as SectionSchema | undefined;
  const sectionLabel = sectionLabels[sectionKey] || section;

  // Load content on mount and set default selected key
  useEffect(() => {
    if (content[sectionKey]) {
      setLocalContent(content[sectionKey]);
      // Set first key as default for revision history
      const keys = Object.keys(schema || {});
      if (keys.length > 0 && !selectedContentKey) {
        setSelectedContentKey(keys[0]);
      }
    }
  }, [content, sectionKey, schema, selectedContentKey]);

  // Autosave every 30 seconds
  useEffect(() => {
    if (!isDirty) return;

    const timer = setTimeout(async () => {
      await handleSave(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, [isDirty, localContent]);

  const handleFieldChange = useCallback((key: string, value: any) => {
    setLocalContent(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const handleSave = async (autosave = false) => {
    // Validate before saving (skip validation for autosave)
    if (!autosave && schema) {
      const validationErrors = validateContent(localContent, schema);
      if (validationErrors.length > 0) {
        toast({
          title: 'Validierungsfehler',
          description: (
            <ul className="list-disc pl-4 mt-2">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          ),
          variant: 'destructive',
        });
        return;
      }
    }
    
    setIsSaving(true);
    try {
      // Save each field in the section
      for (const [key, value] of Object.entries(localContent)) {
        await saveContent(sectionKey, key, value, true);
      }
      setIsDirty(false);
      setLastSaved(new Date());
      if (!autosave) {
        toast({
          title: 'Gespeichert',
          description: 'Ihre Änderungen wurden als Entwurf gespeichert.',
        });
      }
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Änderungen konnten nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      await handleSave();
      await publishSection(sectionKey);
      toast({
        title: 'Published',
        description: 'Your changes are now live.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to publish changes.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Fetch revisions when content key changes
  const fetchRevisions = useCallback(async (contentKey: string) => {
    if (!contentKey || !sectionKey) return;
    
    setRevisionsLoading(true);
    try {
      // First get the content ID for this section/key
      const { data: contentItem } = await supabase
        .from('content')
        .select('id')
        .eq('section_key', sectionKey)
        .eq('content_key', contentKey)
        .maybeSingle();
      
      if (contentItem) {
        const revisionData = await getRevisions(contentItem.id);
        setRevisions(revisionData);
      } else {
        setRevisions([]);
      }
    } catch (error) {
      console.error('Failed to fetch revisions:', error);
      setRevisions([]);
    } finally {
      setRevisionsLoading(false);
    }
  }, [sectionKey, getRevisions]);

  // Fetch revisions when selected content key changes
  useEffect(() => {
    if (selectedContentKey) {
      fetchRevisions(selectedContentKey);
    }
  }, [selectedContentKey, fetchRevisions]);

  const handleRestore = async (revisionId: string, revisionContent: any) => {
    try {
      // Restore only the selected field
      setLocalContent(prev => ({
        ...prev,
        [selectedContentKey]: revisionContent
      }));
      setIsDirty(true);
      toast({
        title: 'Restored',
        description: 'Previous version has been restored. Save to apply.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to restore version.',
        variant: 'destructive',
      });
    }
  };

  if (!schema) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Section not found</p>
          <Button variant="link" onClick={() => navigate('/admin/content')}>
            Back to content
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/content')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{sectionLabel}</h1>
              <div className="flex items-center gap-2 mt-1">
                {isDirty && (
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    Unsaved changes
                  </Badge>
                )}
                {lastSaved && (
                  <span className="text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 inline mr-1" />
                    Last saved: {lastSaved.toLocaleTimeString('de-CH')}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave()} disabled={isSaving || !isDirty}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Draft
            </Button>
            <Button onClick={handlePublish} disabled={isSaving}>
              <Eye className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="edit" className="space-y-4">
          <TabsList>
            <TabsTrigger value="edit">Bearbeiten</TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-1" />
              Vorschau
            </TabsTrigger>
            <TabsTrigger value="revisions">Versionen</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Content Fields</CardTitle>
                  <CardDescription>Edit the content for this section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(schema).map(([key, fieldSchema]) => {
                    if (fieldSchema.type === 'array') {
                      return (
                        <ArrayEditor
                          key={key}
                          name={key}
                          schema={fieldSchema as any}
                          value={localContent[key] || []}
                          onChange={(value) => handleFieldChange(key, value)}
                        />
                      );
                    }
                    return (
                      <FormField
                        key={key}
                        name={key}
                        schema={fieldSchema}
                        value={localContent[key]}
                        onChange={(value) => handleFieldChange(key, value)}
                      />
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <ContentPreview section={sectionKey} content={localContent} />
          </TabsContent>

          <TabsContent value="revisions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Versionshistorie</CardTitle>
                <CardDescription>Wählen Sie ein Feld, um dessen Versionshistorie anzuzeigen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Inhaltsfeld:</label>
                  <Select value={selectedContentKey} onValueChange={setSelectedContentKey}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Feld auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(schema).map(([key, fieldSchema]) => (
                        <SelectItem key={key} value={key}>
                          {(fieldSchema as any).label || key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <RevisionHistory
                  revisions={revisions}
                  isLoading={revisionsLoading}
                  onRestore={handleRestore}
                  contentKey={selectedContentKey}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
