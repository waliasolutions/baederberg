

## Plan: Fix Lightbox Close-on-Click + Replace Homepage Testimonials

---

### Summary

This plan addresses two issues:
1. Fix the lightbox gallery so it closes when clicking outside the image
2. Replace all homepage testimonials with the 22 new Google reviews provided (excluding owner responses)

---

### Changes Required

| Task | Type | Description |
|------|------|-------------|
| 1 | Component | Fix ProjectCard lightbox to properly close on outside click |
| 2 | Data | Update testimonials.ts with 22 new customer reviews |
| 3 | Data | Update homepage testimonials selection |

---

### Task 1: Fix Lightbox Close Behavior

**Problem**: The current `DialogContent` has `bg-transparent` which allows click events to pass through the overlay, preventing the dialog from closing when clicking outside.

**Solution**: Modify `src/components/ProjectCard.tsx` to:
- Add an explicit click handler on the overlay/background area to close the dialog
- Wrap the image in a container that stops click propagation
- Use controlled dialog state with `open` and `onOpenChange`

```tsx
import { useState } from 'react';

const ProjectCard = ({ image, index }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* ... existing trigger ... */}
      </DialogTrigger>
      
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none shadow-none [&>button]:hidden"
        onInteractOutside={() => setOpen(false)}
      >
        <div 
          className="relative flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img ... />
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

---

### Task 2: Update Testimonials Data

Replace the content in `src/data/testimonials.ts` with 22 new reviews:

| # | Author | Project Type |
|---|--------|--------------|
| 1 | Christine B | Badumbau |
| 2 | Motorcycle Driver | Badumbau |
| 3 | Christian Hess | Badumbau |
| 4 | Acilas Physiotherapie & Athletiktraining | Innenausbau |
| 5 | Kodeli | Badumbau |
| 6 | Derk Mous | Badumbau |
| 7 | Boris Radoicic | Innenausbau |
| 8 | Márton Szőnyi | Badumbau |
| 9 | Lionel Sigrist | Badumbau |
| 10 | Patricia Schmid | Badumbau |
| 11 | Kay Moeller-Heske | Innenausbau |
| 12 | Claudio Hofer | Badumbau |
| 13 | Benjamin Tacquet | Badumbau |
| 14 | Katharina Gut | Innenausbau |
| 15 | Rolf Haller | Innenausbau |
| 16 | Albert Peter | Badumbau |
| 17 | victor poalelungi | Innenausbau |
| 18 | Coiffure Vogue Wädenswil | Innenausbau |
| 19 | Läubli Daniel | Innenausbau |
| 20 | Lodo GOPE | Badumbau |
| 21 | Marzia Mura | Badumbau |
| 22 | Diana Treasțin | Badumbau |
| 23 | Tis Baumer | Badumbau |

**Note**: Owner responses from "Bäderberg GmbH (Inhaber)" are excluded as requested.

---

### Task 3: Update Homepage Testimonials Selection

The `homepageTestimonials` array in `src/data/testimonials.ts` will be updated to show a diverse selection of the first 6 most impactful reviews for the homepage carousel:

1. Christine B (newest, detailed review)
2. Christian Hess (comprehensive feedback)
3. Patricia Schmid (strong recommendation)
4. Derk Mous (multiple bathrooms)
5. Benjamin Tacquet (full house renovation)
6. Rolf Haller (professional, on budget)

---

### Technical Details

**Lightbox Fix Approach**:
The Radix Dialog component should close on overlay click by default. The issue is that with `bg-transparent` on the content, the clickable area becomes ambiguous. Adding `onInteractOutside` handler ensures the dialog closes when clicking anywhere outside the image content area.

**Testimonials Structure**:
Each testimonial object contains:
- `author`: Customer name (string)
- `quote`: Review text without "...Mehr" truncation indicators (string)
- `rating`: Always 5 stars (number)
- `project`: "Badumbau" or "Innenausbau" (string)

