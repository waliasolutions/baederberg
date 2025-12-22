import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sectionLabels, contentSchema } from '../schema';
import { useContent } from '../hooks/useContent';
import { 
  FileText,
  ChevronRight,
  Check,
  Clock,
  MapPin
} from 'lucide-react';

export function ContentList() {
  const { content, publishSection } = useContent();

  const handlePublishSection = async (section: string) => {
    const { error } = await publishSection(section);
    if (error) {
      console.error('Failed to publish:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Inhalte</h1>
          <p className="text-slate-500 mt-1">
            Wählen Sie einen Bereich zum Bearbeiten
          </p>
        </div>

        {/* Special Regions Editor Link */}
        <Card className="hover:shadow-md transition-shadow border-primary/20 bg-primary/5">
          <CardContent className="p-0">
            <Link
              to="/admin/regions"
              className="flex items-center justify-between p-6 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">
                    Regionen Editor
                  </h3>
                  <p className="text-sm text-slate-500">
                    Regionsseiten mit FAQs, Bewertungen und Leistungen bearbeiten
                  </p>
                </div>
              </div>
              <ChevronRight className="text-primary/60 group-hover:text-primary transition-colors" size={20} />
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {Object.entries(sectionLabels).map(([key, label]) => {
            // Skip regions in regular list since we have a special editor
            if (key === 'regions') return null;
            
            const schema = contentSchema[key];
            const fieldCount = schema ? Object.keys(schema).length : 0;
            
            return (
              <Card key={key} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link
                    to={`/admin/content/${key}`}
                    className="flex items-center justify-between p-6 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                        <FileText className="text-slate-600 group-hover:text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900 group-hover:text-primary transition-colors">
                          {label}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {fieldCount} {fieldCount === 1 ? 'Feld' : 'Felder'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-primary transition-colors" size={20} />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
