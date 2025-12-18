import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

interface SortableItemProps {
  id: string;
  index: number;
  item: any;
  schema: Record<string, FieldSchema>;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove: () => void;
  onUpdate: (key: string, value: any) => void;
  totalItems: number;
}

function SortableItem({
  id,
  index,
  item,
  schema,
  isExpanded,
  onToggleExpand,
  onRemove,
  onUpdate,
  totalItems,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const itemLabel = item.title || item.heading || item.author || item.name || `Item ${index + 1}`;

  return (
    <Card ref={setNodeRef} style={style} className={`border ${isDragging ? 'shadow-lg' : ''}`}>
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </button>
            <CardTitle className="text-sm font-medium truncate max-w-[200px]">
              {itemLabel}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 px-4 pb-4">
          <div className="grid gap-4">
            {Object.entries(schema).map(([key, fieldSchema]) => {
              if (fieldSchema.type === 'array') {
                return (
                  <ArrayEditor
                    key={key}
                    name={key}
                    schema={fieldSchema as any}
                    value={item[key] || []}
                    onChange={(newValue) => onUpdate(key, newValue)}
                  />
                );
              }
              return (
                <FormField
                  key={key}
                  name={key}
                  schema={fieldSchema}
                  value={item[key]}
                  onChange={(newValue) => onUpdate(key, newValue)}
                />
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

const ArrayEditor: React.FC<ArrayEditorProps> = ({ name, schema, value = [], onChange, label }) => {
  const displayLabel = label || name.charAt(0).toUpperCase() + name.slice(1);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  // Generate stable IDs for items
  const itemIds = React.useMemo(() => 
    value.map((_, index) => `item-${index}`),
    [value.length]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    
    const newId = `item-${value.length}`;
    onChange([...value, newItem]);
    setExpandedItems(prev => new Set([...prev, newId]));
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

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = itemIds.indexOf(active.id as string);
      const newIndex = itemIds.indexOf(over.id as string);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {value.map((item, index) => {
              const id = itemIds[index];
              return (
                <SortableItem
                  key={id}
                  id={id}
                  index={index}
                  item={item}
                  schema={schema.item}
                  isExpanded={expandedItems.has(id)}
                  onToggleExpand={() => toggleExpand(id)}
                  onRemove={() => removeItem(index)}
                  onUpdate={(key, newValue) => updateItem(index, key, newValue)}
                  totalItems={value.length}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

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
