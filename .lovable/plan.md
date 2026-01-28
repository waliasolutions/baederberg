
# Plan: Remove Küchenbau/Küchenumbau Service

Since the kitchen renovation service is no longer offered, we need to remove all references from the codebase including pages, navigation, footer, CMS schema, content, images, and meta information.

---

## Summary of Changes

| Category | Files Affected | Action |
|----------|----------------|--------|
| Page | `src/pages/KuechenumbauPage.tsx` | Delete entire file |
| Routes | `src/App.tsx` | Remove import and route |
| Navigation | `src/components/Header.tsx` | Remove "Küchen" menu item |
| Footer | `src/components/Footer.tsx` | Remove "Küchenumbau" link |
| Contact Form | `src/components/Contact.tsx` | Remove service option |
| Gallery | `src/components/Gallery.tsx` | Remove filter button |
| Services | `src/cms/schema.ts` | Remove from defaults |
| Hero Slider | `src/cms/schema.ts` | Remove kitchen slide |
| CMS Editor | `src/cms/pages/ContentEditor.tsx` | Remove page config |
| CMS Services Editor | `src/cms/components/editors/ServicesEditor.tsx` | Remove field |
| Region Pages | `src/pages/RegionPage.tsx` | Remove service section and interface |
| Testimonials | `src/data/testimonials.ts` | Remove kitchen export, update homepage selection |
| Sitemap | `public/sitemap.xml` | Remove kitchen URL |
| Meta/SEO | Multiple files | Update descriptions |
| Seed Data | `supabase/functions/seed-content/index.ts` | Remove kitchen slide |
| Media Hook | `src/cms/hooks/useMedia.ts` | Remove kitchen image references |

---

## Detailed Changes

### 1. Delete KuechenumbauPage

**File:** `src/pages/KuechenumbauPage.tsx`

**Action:** Delete the entire file

---

### 2. Update App Router

**File:** `src/App.tsx`

Remove import:
```tsx
// DELETE: import KuechenumbauPage from "./pages/KuechenumbauPage";
```

Remove route:
```tsx
// DELETE: <Route path="/kuechenumbau" element={<KuechenumbauPage />} />
```

---

### 3. Update Header Navigation

**File:** `src/components/Header.tsx`

Update `mainNavItems` array from:
```tsx
const mainNavItems = [
  { title: "Badumbau", path: "/badumbau" },
  { title: "Küchen", path: "/kuechenumbau" },  // DELETE this line
  { title: "Innenausbau", path: "/innenausbau" },
  { title: "Projekte", path: "/#gallery" },
  { title: "Über Uns", path: "/ueber-uns" },
];
```

To:
```tsx
const mainNavItems = [
  { title: "Badumbau", path: "/badumbau" },
  { title: "Innenausbau", path: "/innenausbau" },
  { title: "Projekte", path: "/#gallery" },
  { title: "Über Uns", path: "/ueber-uns" },
];
```

---

### 4. Update Footer

**File:** `src/components/Footer.tsx`

Remove the "Küchenumbau" link from the services list (lines 129-134).

---

### 5. Update Contact Form

**File:** `src/components/Contact.tsx`

Remove "Küchenumbau" option from the service dropdown:
```tsx
<option value="Küchenumbau">Küchenumbau</option>  // DELETE this line
```

---

### 6. Update Gallery Filters

**File:** `src/components/Gallery.tsx`

Update filters array from:
```tsx
const filters = [
  { label: "Alle", value: null },
  { label: "Badumbau", value: "Badumbau" },
  { label: "Küchenumbau", value: "Küchenumbau" },  // DELETE
  { label: "Innenausbau", value: "Innenausbau" }
];
```

To:
```tsx
const filters = [
  { label: "Alle", value: null },
  { label: "Badumbau", value: "Badumbau" },
  { label: "Innenausbau", value: "Innenausbau" }
];
```

---

### 7. Update CMS Schema - Hero Slides

**File:** `src/cms/schema.ts`

In `defaultContent.hero.slides`, remove the kitchen slide:
```tsx
{
  heading: 'Küchenbau Spezialist',
  ctaText: 'Mehr erfahren',
  ctaLink: '/kuechenumbau',
  backgroundImage: '/images/kitchen-modern.jpg'
}  // DELETE this entire slide object
```

---

### 8. Update CMS Schema - Services

**File:** `src/cms/schema.ts`

In `defaultContent.services`, update:
- `subheading`: Change from "Bad, Küche, Innenausbau..." to "Bad und Innenausbau..."
- Remove kitchen item from `items` array

---

### 9. Update CMS Schema - About Section

**File:** `src/cms/schema.ts`

Update `defaultContent.about.heading` from:
"Ihr Bad, Ihre Küche, Ihr Innenausbau" to "Ihr Bad, Ihr Innenausbau"

Update `defaultContent.about.paragraph1` to remove "Küchen" reference.

---

### 10. Update CMS Schema - Footer

**File:** `src/cms/schema.ts`

Update `defaultContent.footer.tagline` from:
"Ihr Partner für Bad, Küche und Innenausbau" to "Ihr Partner für Bad und Innenausbau"

---

### 11. Update CMS Schema - Gallery Items

**File:** `src/cms/schema.ts`

Remove kitchen gallery items:
```tsx
{ title: 'Küche mit Kochinsel', image: '/images/kitchen-modern.jpg', category: 'Küchenumbau' },
{ title: 'Küche Induktion Modern', image: '/images/kitchen-modern.jpg', category: 'Küchenumbau' },
```

---

### 12. Update CMS Schema - Regions

**File:** `src/cms/schema.ts`

Update all region descriptions from "Bad, Küche und Innenausbau in [Region]" to "Bad und Innenausbau in [Region]".

---

### 13. Update CMS Schema - SEO

**File:** `src/cms/schema.ts`

Update:
- `seo.metaTitle`: "Bäderberg - Bad & Innenausbau"
- `seo.metaDescription`: Remove "Küchen-" reference

---

### 14. Delete CMS Schema - Kuechenumbau Page

**File:** `src/cms/schema.ts`

Delete the entire `pages.kuechenumbau` object (lines 652-692).

---

### 15. Update CMS Schema - Region Defaults

**File:** `src/cms/schema.ts`

Remove `regionDefaults.services.kuechenumbau` property and update FAQ answer text.

---

### 16. Update CMS Content Editor

**File:** `src/cms/pages/ContentEditor.tsx`

Remove from `pageConfig`:
```tsx
kuechenumbau: { name: 'Küchenumbau', path: '/kuechenumbau', icon: Layers },
```

---

### 17. Update CMS Services Editor

**File:** `src/cms/components/editors/ServicesEditor.tsx`

Remove the Küchenumbau field and update the interface.

---

### 18. Update Region Page

**File:** `src/pages/RegionPage.tsx`

- Remove `kuechenumbau` from the `services` interface (line 23)
- Remove the Küchenumbau service section (lines 215-222)

---

### 19. Update ServiceCard

**File:** `src/components/ServiceCard.tsx`

Remove kitchen case from `getServiceRoute`:
```tsx
case "Küchenumbau":
  return "/kuechenumbau";  // DELETE these 2 lines
```

---

### 20. Update Testimonials Data

**File:** `src/data/testimonials.ts`

- Change Kay Moeller-Heske's project from "Küchenumbau" to "Innenausbau" (he can stay since the testimonial is generic about quality)
- Remove `kuechenumbauTestimonials` export
- Update `homepageTestimonials` to not include kitchen testimonial

---

### 21. Update Sitemap

**File:** `public/sitemap.xml`

Remove:
```xml
<url>
  <loc>https://baederberg.lovable.app/kuechenumbau</loc>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

---

### 22. Update Index.html

**File:** `index.html`

- Update title: "Bäderberg - Bad & Innenausbau"
- Update description: Remove "Küchen-" reference

---

### 23. Update Seed Content Function

**File:** `supabase/functions/seed-content/index.ts`

- Remove kitchen slide from hero
- Update about heading
- Change Kay Moeller-Heske testimonial project type

---

### 24. Update Media Hook

**File:** `src/cms/hooks/useMedia.ts`

Remove kitchen image references:
```tsx
{ url: '/lovable-uploads/kueche-hero.jpg', filename: 'kueche-hero.jpg', folder: 'hero' },
{ url: '/lovable-uploads/kueche-service.jpg', filename: 'kueche-service.jpg', folder: 'services' },
```

---

### 25. Update Other Pages with Meta Descriptions

**Files to update:**
- `src/pages/AgbPage.tsx`: Update description to remove "Küchen-"
- `src/pages/UeberUnsPage.tsx`: Update title and description to remove "Küchen"
- `src/pages/KarrierePage.tsx`: Update descriptions to remove "Küchen-"

---

## HTML5 Version Updates (for sync)

The HTML5 version will also need updates:
- `html5-version/includes/header.html`: Remove Küchen nav link
- `html5-version/includes/footer.html`: Remove Küchenumbau link
- `html5-version/includes/services.html`: Remove kitchen service card
- `html5-version/index.html`: Update meta

---

## Technical Notes

1. **Grid Layout Change**: The Services section currently uses a 3-column grid. With 2 services instead of 3, this will need CSS adjustment or the grid will look unbalanced. Consider using `md:grid-cols-2` instead of `lg:grid-cols-3`.

2. **Hero Slider**: Reducing from 3 slides to 2 is fine - the slider handles any number of slides.

3. **Gallery**: After removing kitchen items, ensure there are enough Badumbau and Innenausbau items for a balanced gallery.

4. **Testimonials**: Kay Moeller-Heske's testimonial is generic ("Verlässlichkeit, Erreichbarkeit, Kreativität, Qualität") so it can be reassigned to Innenausbau without issue.

5. **CMS Database**: If there's any kitchen-related content stored in the database, it will remain but won't be displayed since the page and routes are removed.
