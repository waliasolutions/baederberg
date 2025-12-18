import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import FormField from './FormField';
import type { FieldSchema } from '../schema';

interface ArrayEditorProps {
  name: string;
  schema: {
    type: 'array';
    maxItems?: number;
    item: Record<string, FieldSchema>;
  };
  value: any[];
  onChange: (value: any[]) => void;
  label?: string;
}

const ArrayEditor: React.FC<ArrayEditorProps> = ({ name, schema, value = [], onChange, label }) => {
  const displayLabel = label || name.charAt(0).toUpperCase() + name.slice(1);
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set([0]));

  const addItem = () => {
    if (schema.maxItems && value.length >= schema.maxItems) return;
    
    const newItem: Record<string, any> = {};
    Object.entries(schema.item).forEach(([key, fieldSchema]) => {
      if ('default' in fieldSchema) {
        newItem[key] = fieldSchema.default;
      } else {
        newItem[key] = '';
      }
    });
    
    onChange([...value, newItem]);
    setExpandedItems(prev => new Set([...prev, value.length]));
  };

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const updateItem = (index: number, key: string, newValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: newValue };
    onChange(updated);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= value.length) return;
    
    const newValue = [...value];
    [newValue[index], newValue[newIndex]] = [newValue[newIndex], newValue[index]];
    onChange(newValue);
  };

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{displayLabel}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          disabled={schema.maxItems ? value.length >= schema.maxItems : false}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Item
        </Button>
      </div>

      {schema.maxItems && (
        <p className="text-sm text-muted-foreground">
          {value.length}/{schema.maxItems} items
        </p>
      )}

      <div className="space-y-3">
        {value.map((item, index) => (
          <Card key={index} className="border">
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <CardTitle className="text-sm font-medium">
                    Item {index + 1}
                    {item.title && `: ${item.title}`}
                    {item.heading && `: ${item.heading}`}
                    {item.author && `: ${item.author}`}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === value.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedItems.has(index) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedItems.has(index) && (
              <CardContent className="pt-0 px-4 pb-4">
                <div className="grid gap-4">
                  {Object.entries(schema.item).map(([key, fieldSchema]) => {
                    if (fieldSchema.type === 'array') {
                      return (
                        <ArrayEditor
                          key={key}
                          name={key}
                          schema={fieldSchema as any}
                          value={item[key] || []}
                          onChange={(newValue) => updateItem(index, key, newValue)}
                        />
                      );
                    }
                    return (
                      <FormField
                        key={key}
                        name={key}
                        schema={fieldSchema}
                        value={item[key]}
                        onChange={(newValue) => updateItem(index, key, newValue)}
                      />
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {value.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">No items yet</p>
          <Button
            type="button"
            variant="link"
            onClick={addItem}
            className="mt-2"
          >
            Add your first item
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArrayEditor;
