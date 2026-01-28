
## Plan: Deep QA Fixes - Remove Kitchen Content, Fix Duplicate Button, Add Legal Pages

### Issues Identified

1. **Kitchen slide still showing in Hero**: The database still contains the "Küchenbau Spezialist" slide. The code was updated but the database content was not cleaned up.

2. **Duplicate close button in mobile menu**: The `SheetContent` component has a built-in close button (X) at line 66 of `sheet.tsx`, AND the Header component adds its own close button at line 83-89. This results in two X buttons appearing.

3. **Karriere link in footer**: Link at line 201 needs to be removed as requested.

4. **Missing Impressum and Datenschutz pages**: Links exist in footer but pages don't exist.

5. **HTML5 footer still mentions Küchen**: Line 9 still references "Bad- und Küchenumbauten"

---

### Task 1: Clean Kitchen Content from Database

**Action**: Update the database hero content to remove the kitchen slide.

**SQL Update Required**:
```sql
-- Update the hero slides content to remove kitchen slide
UPDATE content 
SET content = '{"slides": [{"heading": "Wir bauen Ihr Bad gemeinsam um", "ctaText": "Mehr erfahren", "ctaLink": "/badumbau", "backgroundImage": "/images/bathroom-modern.jpg"}, {"heading": "Facharbeiten im Innenausbau", "ctaText": "Mehr erfahren", "ctaLink": "/innenausbau", "backgroundImage": "/images/interior-living.jpg"}]}'
WHERE section_key = 'hero' AND content_key = 'default';

-- Also update the older record if it exists
UPDATE content 
SET content = '[{"heading": "Wir bauen Ihr Bad gemeinsam um", "ctaText": "Mehr erfahren", "ctaLink": "/badumbau", "backgroundImage": "/images/bathroom-modern.jpg"}, {"heading": "Facharbeiten im Innenausbau", "ctaText": "Mehr erfahren", "ctaLink": "/innenausbau", "backgroundImage": "/images/interior-living.jpg"}]'
WHERE section_key = 'hero' AND content_key = 'slides';
```

---

### Task 2: Fix Duplicate Close Button in Mobile Menu

**File**: `src/components/Header.tsx`

**Issue**: Lines 83-89 add a custom close button, but the `SheetContent` component already has a built-in close button.

**Solution**: Remove the duplicate close button from the Header while keeping the custom header with "Menü" title.

**Change**:
```tsx
// Before (lines 81-90):
<div className="px-4 py-4 border-b border-border flex items-center justify-between">
  <h3 className="text-lg font-medium">Menü</h3>
  <button
    onClick={() => setIsMenuOpen(false)}
    className="p-2 rounded-md hover:bg-secondary/20 transition-colors"
    aria-label="Close menu"
  >
    <X size={24} />
  </button>
</div>

// After:
<div className="px-4 py-4 border-b border-border">
  <h3 className="text-lg font-medium">Menü</h3>
</div>
```

This removes the custom close button since SheetContent already provides one in the top-right corner.

---

### Task 3: Remove Karriere Link from Footer

**File**: `src/components/Footer.tsx`

**Change**: Remove lines 201-203:
```tsx
// Remove:
<Link to="/karriere" className="hover:text-footer-foreground transition-colors">
  Karriere
</Link>
```

**Note**: Keep the KarrierePage.tsx and route in case they want it accessible directly via URL, just not prominently linked.

---

### Task 4: Create Impressum Page

**New File**: `src/pages/ImpressumPage.tsx`

Following the exact styling of AgbPage.tsx:
- Same `main` wrapper with `pt-24 md:pt-28`
- Same `max-w-4xl` container
- Same `prose prose-slate` typography
- Same heading styles

Content structure (standard Swiss Impressum):
- Company name and legal form
- Address
- Contact information (phone, email)
- UID number
- Responsible person
- Liability disclaimer
- Copyright notice

---

### Task 5: Create Datenschutz Page

**New File**: `src/pages/DatenschutzPage.tsx`

Following the exact styling of AgbPage.tsx with standard Swiss GDPR-compliant content:
- Data controller information
- Types of data collected
- Purpose of data processing
- Legal basis
- Data sharing and third parties
- Cookies and tracking
- User rights
- Contact for data protection inquiries

---

### Task 6: Add Routes for New Pages

**File**: `src/App.tsx`

Add imports and routes:
```tsx
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";

// Add routes:
<Route path="/impressum" element={<ImpressumPage />} />
<Route path="/datenschutz" element={<DatenschutzPage />} />
```

---

### Task 7: Update HTML5 Footer

**File**: `html5-version/includes/footer.html`

**Change line 9** from:
```html
<p>Ihr Spezialist für hochwertige Bad- und Küchenumbauten sowie Innenausbau in der Schweiz.</p>
```
to:
```html
<p>Ihr Spezialist für hochwertige Badumbauten und Innenausbau in der Schweiz.</p>
```

Also remove Karriere link and ensure legal links are correct.

---

### Task 8: Fix Sheet Accessibility Warning

**File**: `src/components/ui/sheet.tsx`

Add `DialogTitle` and `DialogDescription` using `VisuallyHidden` to fix the console error about missing title for screen readers.

---

### Summary of Changes

| File | Action |
|------|--------|
| Database (hero content) | SQL migration to remove kitchen slide |
| `src/components/Header.tsx` | Remove duplicate close button (lines 83-89) |
| `src/components/Footer.tsx` | Remove Karriere link (lines 201-203) |
| `src/pages/ImpressumPage.tsx` | Create new page (styled like AGB) |
| `src/pages/DatenschutzPage.tsx` | Create new page (styled like AGB) |
| `src/App.tsx` | Add routes for Impressum and Datenschutz |
| `html5-version/includes/footer.html` | Remove "Küchen" reference |
| `src/components/ui/sheet.tsx` | Add VisuallyHidden title for accessibility |

---

### Technical Notes

1. **Database Update**: The content table stores hero slides in JSON format. Both `content_key = 'slides'` and `content_key = 'default'` records need to be updated to remove the kitchen slide.

2. **SheetContent Close Button**: The Radix Dialog primitive automatically adds a close button. Having a second one causes visual duplication on mobile.

3. **Legal Pages**: Swiss law requires Impressum with company registration details. GDPR-style Datenschutz is also standard practice.

4. **Content Consistency**: The HTML5 version footer still mentions "Küchen" and needs synchronization with React version changes.
