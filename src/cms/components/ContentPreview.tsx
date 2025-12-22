import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { contentSchema, type SectionSchema } from '../schema';

interface ContentPreviewProps {
  section: string;
  content: Record<string, any>;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ section, content }) => {
  const schema = contentSchema[section] as SectionSchema | undefined;
  
  if (!schema) {
    return <div className="text-muted-foreground">No preview available</div>;
  }

  const renderValue = (key: string, value: any, fieldSchema: any): React.ReactNode => {
    if (value === undefined || value === null) {
      return <span className="text-muted-foreground italic">Not set</span>;
    }

    switch (fieldSchema.type) {
      case 'image':
        return value ? (
          <img 
            src={value} 
            alt={key} 
            className="max-w-[200px] max-h-[150px] object-cover rounded-md border"
          />
        ) : (
          <span className="text-muted-foreground italic">No image</span>
        );
      
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded border" 
              style={{ backgroundColor: value }}
            />
            <code className="text-sm">{value}</code>
          </div>
        );
      
      case 'richtext':
        return (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        );
      
      case 'array':
        if (!Array.isArray(value) || value.length === 0) {
          return <span className="text-muted-foreground italic">No items</span>;
        }
        return (
          <div className="space-y-4">
            {value.map((item, index) => (
              <Card key={index} className="bg-muted/30">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      Item {index + 1}
                    </Badge>
                  </div>
                  <div className="grid gap-2 text-sm">
                    {Object.entries(item).map(([itemKey, itemValue]) => {
                      const itemSchema = fieldSchema.item?.[itemKey];
                      return (
                        <div key={itemKey} className="flex gap-2">
                          <span className="font-medium text-muted-foreground min-w-[100px]">
                            {itemSchema?.label || itemKey}:
                          </span>
                          <span className="flex-1">
                            {itemSchema ? renderValue(itemKey, itemValue, itemSchema) : String(itemValue)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'number':
        return <span className="font-mono">{value}</span>;
      
      case 'link':
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline hover:no-underline"
          >
            {value}
          </a>
        );
      
      default:
        return <span>{String(value)}</span>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Live Preview
          <Badge variant="secondary">Draft</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(schema).map(([key, fieldSchema]) => {
            const value = content[key];
            return (
              <div key={key} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="min-w-[150px]">
                    <p className="font-medium">{(fieldSchema as any).label || key}</p>
                    <p className="text-xs text-muted-foreground capitalize">{fieldSchema.type}</p>
                  </div>
                  <div className="flex-1">
                    {renderValue(key, value, fieldSchema)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPreview;
