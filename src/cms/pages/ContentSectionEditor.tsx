import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Clock, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '../components/AdminLayout';
import FormField from '../components/FormField';
import ArrayEditor from '../components/ArrayEditor';
import { useContent } from '../hooks/useContent';
import { contentSchema, sectionLabels, type SectionSchema } from '../schema';

export const ContentSectionEditor: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { content, isLoading, saveContent, publishSection, getRevisions, rollbackToRevision } = useContent();
  
  const [localContent, setLocalContent] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [revisions, setRevisions] = useState<any[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const sectionKey = section as keyof typeof contentSchema;
  const schema = contentSchema[sectionKey] as SectionSchema | undefined;
  const sectionLabel = sectionLabels[sectionKey] || section;

  // Load content on mount
  useEffect(() => {
    if (content[sectionKey]) {
      setLocalContent(content[sectionKey]);
    }
  }, [content, sectionKey]);

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
          title: 'Saved',
          description: 'Your changes have been saved as draft.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save changes.',
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

  const handleRestore = async (revisionId: string, revisionContent: any) => {
    try {
      // Get content ID from current content
      setLocalContent(revisionContent);
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
            <TabsTrigger value="edit">Edit Content</TabsTrigger>
            <TabsTrigger value="revisions">Revisions</TabsTrigger>
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

          <TabsContent value="revisions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Version History</CardTitle>
                <CardDescription>Revision history is tracked per content field</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Revisions are automatically saved when you save content.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
