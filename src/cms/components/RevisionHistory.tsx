import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { RotateCcw, Clock, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ContentRevision } from '../types';

interface RevisionHistoryProps {
  revisions: ContentRevision[];
  isLoading: boolean;
  onRestore: (revisionId: string, content: any) => void;
  contentKey: string;
}

export const RevisionHistory: React.FC<RevisionHistoryProps> = ({
  revisions,
  isLoading,
  onRestore,
  contentKey,
}) => {
  const [selectedRevision, setSelectedRevision] = React.useState<ContentRevision | null>(null);
  const [isRestoring, setIsRestoring] = React.useState(false);

  const handleRestore = async () => {
    if (!selectedRevision) return;
    setIsRestoring(true);
    try {
      await onRestore(selectedRevision.id, selectedRevision.content);
      setSelectedRevision(null);
    } finally {
      setIsRestoring(false);
    }
  };

  const formatContent = (content: any): string => {
    if (typeof content === 'string') {
      return content.length > 100 ? content.slice(0, 100) + '...' : content;
    }
    if (Array.isArray(content)) {
      return `[${content.length} items]`;
    }
    if (typeof content === 'object' && content !== null) {
      const keys = Object.keys(content);
      return `{${keys.slice(0, 3).join(', ')}${keys.length > 3 ? '...' : ''}}`;
    }
    return String(content);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (revisions.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No revisions yet for "{contentKey}"</p>
        <p className="text-sm text-muted-foreground mt-1">
          Revisions are created automatically when you save content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="w-4 h-4" />
        <span>{revisions.length} revision{revisions.length !== 1 ? 's' : ''} for "{contentKey}"</span>
      </div>

      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revisions.map((revision, index) => (
              <TableRow key={revision.id}>
                <TableCell className="whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {format(new Date(revision.created_at), 'dd. MMM yyyy', { locale: de })}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(revision.created_at), 'HH:mm', { locale: de })} Uhr
                    </span>
                  </div>
                  {index === 0 && (
                    <Badge variant="secondary" className="mt-1">
                      Latest
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <code className="text-xs bg-muted px-2 py-1 rounded block truncate">
                    {formatContent(revision.content)}
                  </code>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRevision(revision)}
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Restore
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Restore this version?</DialogTitle>
                        <DialogDescription>
                          This will replace the current content with the version from{' '}
                          {format(new Date(revision.created_at), 'dd. MMM yyyy, HH:mm', { locale: de })} Uhr.
                          You'll need to save after restoring.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="my-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">Content preview:</p>
                        <ScrollArea className="h-[200px]">
                          <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify(revision.content, null, 2)}
                          </pre>
                        </ScrollArea>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedRevision(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleRestore} disabled={isRestoring}>
                          {isRestoring && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                          Restore Version
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default RevisionHistory;
