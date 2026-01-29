import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Star } from 'lucide-react';

export interface TestimonialItem {
  quote: string;
  author: string;
  project: string;
  rating: number;
}

interface TestimonialsEditorProps {
  testimonials: TestimonialItem[];
  onChange: (testimonials: TestimonialItem[]) => void;
}

export function TestimonialsEditor({ testimonials, onChange }: TestimonialsEditorProps) {
  const updateTestimonial = (index: number, field: keyof TestimonialItem, value: string | number) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addTestimonial = () => {
    onChange([...testimonials, { quote: '', author: '', project: 'Badumbau', rating: 5 }]);
  };

  const removeTestimonial = (index: number) => {
    onChange(testimonials.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Star className="h-4 w-4" />
          Kundenbewertungen
        </CardTitle>
        <CardDescription>Bewertungen für diese Seite</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {testimonials.length === 0 ? (
          <p className="text-sm text-muted-foreground">Keine Bewertungen vorhanden</p>
        ) : (
          testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateTestimonial(index, 'rating', star)}
                        className={`text-lg ${star <= testimonial.rating ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTestimonial(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                  placeholder="Bewertungstext..."
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={testimonial.author}
                    onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                    placeholder="Name des Kunden"
                  />
                  <select
                    value={testimonial.project}
                    onChange={(e) => updateTestimonial(index, 'project', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="Badumbau">Badumbau</option>
                    <option value="Innenausbau">Innenausbau</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        <Button variant="outline" onClick={addTestimonial}>
          <Plus className="w-4 h-4 mr-2" />
          Bewertung hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
}
