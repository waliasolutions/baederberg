import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImagePicker from './ImagePicker';
import IconPicker from './IconPicker';
import type { FieldSchema } from '../schema';

interface FormFieldProps {
  name: string;
  schema: FieldSchema;
  value: any;
  onChange: (value: any) => void;
  label?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, schema, value, onChange, label }) => {
  const displayLabel = label || name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1');
  const maxLength = schema.maxLength;
  const currentLength = typeof value === 'string' ? value.length : 0;

  const renderField = () => {
    switch (schema.type) {
      case 'text':
        return (
          <div className="space-y-1">
            <Input
              id={name}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              maxLength={maxLength}
              placeholder={`Enter ${displayLabel.toLowerCase()}`}
            />
            {maxLength && (
              <p className="text-xs text-muted-foreground text-right">
                {currentLength}/{maxLength}
              </p>
            )}
          </div>
        );

      case 'richtext':
        return (
          <div className="space-y-1">
            <Textarea
              id={name}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              maxLength={maxLength}
              placeholder={`Enter ${displayLabel.toLowerCase()}`}
              rows={4}
            />
            {maxLength && (
              <p className="text-xs text-muted-foreground text-right">
                {currentLength}/{maxLength}
              </p>
            )}
          </div>
        );

      case 'number':
        return (
          <Input
            id={name}
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            min={schema.min}
            max={schema.max}
          />
        );

      case 'color':
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              id={name}
              value={value || schema.default || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-10 rounded border cursor-pointer"
            />
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
              className="flex-1"
            />
          </div>
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${displayLabel.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {schema.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'link':
        return (
          <Input
            id={name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/page-url or https://..."
          />
        );

      case 'image':
        return (
          <ImagePicker
            value={value || ''}
            onChange={onChange}
            aspect={schema.aspect}
          />
        );

      case 'icon':
        return (
          <IconPicker
            value={value || ''}
            onChange={onChange}
          />
        );

      default:
        return (
          <Input
            id={name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="font-medium">
        {displayLabel}
        {schema.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

export default FormField;
