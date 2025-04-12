
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';

interface ContentEditorProps {
  id: string;
  initialContent: string;
  title?: string;
  type?: 'text' | 'heading' | 'paragraph';
  onSave?: (id: string, content: string) => void;
  className?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  id,
  initialContent,
  title = 'Edit Content',
  type = 'paragraph',
  onSave,
  className,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave(id, content);
    }
    setIsOpen(false);
  };

  // Render different components based on content type
  const renderContent = () => {
    switch (type) {
      case 'heading':
        return <h2 className={className}>{initialContent}</h2>;
      case 'text':
        return <span className={className}>{initialContent}</span>;
      case 'paragraph':
      default:
        return <p className={className}>{initialContent}</p>;
    }
  };

  return (
    <div className="group relative">
      {renderContent()}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Pencil size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="content">Content</Label>
            {type === 'paragraph' ? (
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] mt-2"
              />
            ) : (
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2"
              />
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentEditor;
