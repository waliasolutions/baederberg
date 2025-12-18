import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { icons } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

// Common icons that are most likely to be used
const commonIcons = [
  'Heart', 'Award', 'Smile', 'Star', 'Shield', 'Check', 'CheckCircle', 'Home',
  'Phone', 'Mail', 'MapPin', 'Clock', 'Calendar', 'Users', 'User', 'Settings',
  'Wrench', 'Hammer', 'PaintBucket', 'Ruler', 'Building', 'Building2', 'Key',
  'Lightbulb', 'Zap', 'Droplet', 'Flame', 'ThumbsUp', 'MessageCircle', 'Quote',
  'BadgeCheck', 'Trophy', 'Target', 'Sparkles', 'Crown', 'Gift', 'Handshake',
  'CircleCheck', 'CircleDot', 'ArrowRight', 'ChevronRight', 'Plus', 'Minus'
];

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredIcons = useMemo(() => {
    const allIconNames = Object.keys(icons).filter(
      name => typeof icons[name as keyof typeof icons] === 'function' || 
              (icons[name as keyof typeof icons] as any)?.$$typeof
    );
    
    if (!search) {
      // Show common icons first, then alphabetically
      const common = commonIcons.filter(name => allIconNames.includes(name));
      const others = allIconNames.filter(name => !commonIcons.includes(name)).slice(0, 100);
      return [...common, ...others];
    }
    
    return allIconNames.filter(name => 
      name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 100);
  }, [search]);

  const SelectedIcon = value ? icons[value as keyof typeof icons] as LucideIcon : null;

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="space-y-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-3 h-12">
            {SelectedIcon ? (
              <>
                <SelectedIcon className="h-5 w-5" />
                <span>{value}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Icon auswählen...</span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Icon auswählen</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              placeholder="Icon suchen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-6 gap-2 p-1">
                {filteredIcons.map((iconName) => {
                  const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;
                  if (!IconComponent) return null;
                  
                  return (
                    <Button
                      key={iconName}
                      variant={value === iconName ? "default" : "ghost"}
                      className="h-16 flex-col gap-1 text-xs"
                      onClick={() => handleSelect(iconName)}
                    >
                      <IconComponent className="h-6 w-6" />
                      <span className="truncate w-full text-center">{iconName}</span>
                    </Button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
      
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onChange('')}
        >
          Icon entfernen
        </Button>
      )}
    </div>
  );
};

export default IconPicker;
