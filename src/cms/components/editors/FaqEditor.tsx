import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqEditorProps {
  faqs: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export function FaqEditor({ faqs, onChange }: FaqEditorProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addFaq = () => {
    onChange([...faqs, { question: '', answer: '' }]);
    setExpandedIndex(faqs.length);
  };

  const removeFaq = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          Häufige Fragen (FAQ)
        </CardTitle>
        <CardDescription>FAQ für diese Seite</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-sm text-muted-foreground">Keine FAQ vorhanden</p>
        ) : (
          faqs.map((faq, index) => (
            <Card key={index} className="bg-muted/30">
              <CardContent className="pt-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <p className="font-medium">{faq.question || `Frage ${index + 1}`}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFaq(index);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {expandedIndex === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
                {expandedIndex === index && (
                  <div className="mt-4 space-y-3">
                    <div className="space-y-2">
                      <Label>Frage</Label>
                      <Input
                        value={faq.question}
                        onChange={(e) => updateFaq(index, 'question', e.target.value)}
                        placeholder="Frage eingeben..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Antwort</Label>
                      <Textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                        placeholder="Antwort eingeben..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        <Button variant="outline" onClick={addFaq}>
          <Plus className="w-4 h-4 mr-2" />
          Frage hinzufügen
        </Button>
      </CardContent>
    </Card>
  );
}
