

## Plan: Remove Kitchen Content from Database + Fix Services Grid

The code was updated to remove kitchen references, but the **database still contains kitchen-related content** that the CMS fetches. Since the components prioritize CMS data over defaults, the old kitchen items are still displayed.

---

### Root Cause

The `Services` and `Gallery` components use this logic:
```tsx
const servicesData = (servicesContent?.items?.length 
  ? servicesContent.items  // Uses CMS data if exists
  : defaultServicesData.items  // Falls back to defaults only if CMS empty
)
```

The CMS database has:
- **Gallery**: 6 items including 2 kitchen items ("Küche mit Kochinsel", "Küche Induktion Modern")
- **Services**: 3 items including "Küchenumbau" with kitchen description and link

---

### Changes Required

| Task | Type | Description |
|------|------|-------------|
| 1 | Database Update | Remove kitchen items from `gallery` content |
| 2 | Database Update | Remove kitchen service from `services` content |
| 3 | Code Change | Fix Services grid to use 2-column layout |

---

### Task 1: Update Gallery Database Content

**SQL Update:**
Remove the 2 kitchen items from gallery, keeping only Badumbau and Innenausbau items:

```sql
UPDATE content 
SET content = '{
  "heading": "Was wir für andere gestaltet haben",
  "subheading": "Hier sehen Sie einige unserer abgeschlossenen Projekte. Vielleicht entdecken Sie etwas, das Ihnen gefällt und Sie inspiriert.",
  "items": [
    {"title": "Badezimmer Walk-In Dusche", "image": "/images/bathroom-modern.jpg", "category": "Badumbau"},
    {"title": "Gäste-WC Kompakt", "image": "/images/bathroom-modern.jpg", "category": "Badumbau"},
    {"title": "Badezimmer Spa Design", "image": "/images/bathroom-modern.jpg", "category": "Badumbau"},
    {"title": "Einbauschrank Modern", "image": "/images/interior-living.jpg", "category": "Innenausbau"}
  ]
}'
WHERE section_key = 'gallery' AND content_key = 'default';
```

---

### Task 2: Update Services Database Content

**SQL Update:**
Remove "Küchenumbau" service and update the subheading:

```sql
UPDATE content 
SET content = '{
  "heading": "Unsere Leistungen für Ihr Zuhause",
  "subheading": "Bad und Innenausbau – wir begleiten Sie von der Planung bis zur Fertigstellung. Alles aus einer Hand.",
  "items": [
    {
      "title": "Badumbau",
      "description": "Wir bauen Ihr Bad um – persönlich geplant, professionell ausgeführt.",
      "image": "/images/bathroom-modern.jpg",
      "link": "/badumbau"
    },
    {
      "title": "Innenausbau",
      "description": "Räume nach Ihren Wünschen – alles aus einer Hand.",
      "image": "/images/interior-living.jpg",
      "link": "/innenausbau"
    }
  ]
}'
WHERE section_key = 'services' AND content_key = 'default';
```

---

### Task 3: Fix Services Grid Layout

**File:** `src/components/Services.tsx`

**Change line 52** from:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
```

To:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
```

This changes the grid to 2 columns on medium screens and above (removing the 3-column layout), and centers the grid with a max width for better visual balance with only 2 cards.

---

### Summary

| Issue | Solution |
|-------|----------|
| Kitchen images in Referenzen (Gallery) | SQL update to remove kitchen items from database |
| Kitchen service cards on homepage | SQL update to remove kitchen service from database |
| Services grid unbalanced with 2 items | Change grid from 3-column to 2-column centered layout |

