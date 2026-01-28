

## Plan: Add New Badumbau Images, Remove Descriptions, Add Lightbox

---

### Summary

This plan adds 10 new bathroom reference images, removes all text descriptions from gallery cards (image-only view), and implements a lightbox for full-screen image viewing on click.

---

### Changes Required

| Task | Type | Description |
|------|------|-------------|
| 1 | Files | Copy 10 new images to public/images (badumbau-k through badumbau-t) |
| 2 | Database | Update gallery content to add 10 new Badumbau items |
| 3 | Component | Modify ProjectCard to remove title, add lightbox functionality |
| 4 | Component | Update Gallery to provide all images for lightbox navigation |

---

### Task 1: Copy New Images

Copy the 10 uploaded images to the public folder:
- `user-uploads://bad-k.jpeg` → `public/images/badumbau-k.jpg`
- `user-uploads://bad-l.jpeg` → `public/images/badumbau-l.jpg`
- `user-uploads://bad-m.jpeg` → `public/images/badumbau-m.jpg`
- `user-uploads://bad-n.jpeg` → `public/images/badumbau-n.jpg`
- `user-uploads://bad-o.jpeg` → `public/images/badumbau-o.jpg`
- `user-uploads://bad-p.jpeg` → `public/images/badumbau-p.jpg`
- `user-uploads://bad-q.jpeg` → `public/images/badumbau-q.jpg`
- `user-uploads://bad-r.jpeg` → `public/images/badumbau-r.jpg`
- `user-uploads://bad-s.jpeg` → `public/images/badumbau-s.jpg`
- `user-uploads://bad-t.jpeg` → `public/images/badumbau-t.jpg`

---

### Task 2: Update Gallery Database

Update the database to include all 22 gallery items (20 Badumbau + 2 Innenausbau):

```sql
UPDATE content SET content = '{
  "heading": "Was wir für andere gestaltet haben",
  "subheading": "Hier sehen Sie einige unserer abgeschlossenen Projekte.",
  "items": [
    {"image": "/images/badumbau-a.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-b.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-c.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-d.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-e.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-f.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-g.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-h.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-i.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-j.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-k.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-l.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-m.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-n.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-o.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-p.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-q.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-r.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-s.jpg", "category": "Badumbau"},
    {"image": "/images/badumbau-t.jpg", "category": "Badumbau"},
    {"image": "/images/innenausbau-a.jpg", "category": "Innenausbau"},
    {"image": "/images/innenausbau-b.jpg", "category": "Innenausbau"}
  ]
}'
WHERE section_key = 'gallery' AND content_key = 'default';
```

Note: Title field removed from all items since we no longer display descriptions.

---

### Task 3: Update ProjectCard Component

Modify `src/components/ProjectCard.tsx` to:

1. **Remove the title section** (the `<div className="p-5">` with the h3)
2. **Add Dialog/Lightbox functionality** using the existing Radix Dialog component
3. **Make the card clickable** to open the image in full screen

New structure:
```tsx
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface ProjectCardProps {
  image: string;
  index: number;
}

const ProjectCard = ({ image, index }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group overflow-hidden bg-white rounded-xl shadow-sm 
                        transition-all duration-300 hover:shadow-lg cursor-pointer">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={image} alt="Project" className="..." />
            <div className="absolute inset-0 bg-gradient-to-t ..." />
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
        <VisuallyHidden.Root>
          <DialogTitle>Project Image</DialogTitle>
        </VisuallyHidden.Root>
        <img src={image} alt="Project" className="max-w-full max-h-[90vh] object-contain" />
        <DialogClose className="absolute top-4 right-4 text-white hover:text-white/80">
          <X className="w-8 h-8" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
```

---

### Task 4: Update Gallery Component

Modify `src/components/Gallery.tsx` to:

1. **Simplify the data structure** - only pass `image` instead of `title`, `images`, `tags`
2. **Update the ProjectCard usage** accordingly

```tsx
const projects = items.map(item => ({
  image: item.image || '/images/bathroom-modern.jpg',
  category: item.category
}));

// In render:
<ProjectCard
  key={index}
  image={project.image}
  index={index}
/>
```

---

### Visual Result

| Before | After |
|--------|-------|
| Cards with image + title text | Clean image-only cards |
| No click interaction | Click opens full-screen lightbox |
| 12 total images | 22 total images (20 Badumbau + 2 Innenausbau) |

