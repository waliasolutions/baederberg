

## Plan: Remove Kitchen References from All Region Pages

The database contains 10 region records, each with multiple "Küche" references that need to be cleaned up. The region names themselves are correct and properly formatted.

---

### Summary of Issues Found

| Region | Kitchen References Found |
|--------|-------------------------|
| erlenbach | description, metaDescription, services.kuechenumbau, faq[0].answer |
| kilchberg | description, metaDescription, services.kuechenumbau, faq[0].answer |
| kuesnacht | description, metaDescription, services.kuechenumbau, faq[0].answer |
| lachen | description, metaDescription, services.kuechenumbau, faq[0].answer |
| meilen | description, metaDescription, services.kuechenumbau, faq[0].answer |
| pfaeffikon | description, metaDescription, services.kuechenumbau, faq[0].answer |
| richterswil | description, metaDescription, services.kuechenumbau, faq[0].answer |
| waedenswil | description, metaDescription, services.kuechenumbau, faq[0].answer |
| zollikon | description, metaDescription, services.kuechenumbau, faq[0].answer |
| zurich | description, metaDescription, services.kuechenumbau, faq[0].answer |

---

### Changes Required

For each of the 10 regions, update the database content to:

1. **description**: Change from "Bad, Küche und Innenausbau in [Region]" to "Bad und Innenausbau in [Region]"

2. **metaDescription**: Change from "Bad, Küche und Innenausbau in [Region]" to "Bad und Innenausbau in [Region]"

3. **services**: Remove the `kuechenumbau` key entirely (keep only `badumbau` and `innenausbau`)

4. **faq[0].answer**: Change from "Ein Badumbau dauert 3-6 Wochen, ein Küchenumbau 2-4 Wochen. Der genaue Zeitplan hängt vom Umfang ab." to "Ein Badumbau dauert 3-6 Wochen, ein Innenausbau-Projekt je nach Umfang 2-6 Wochen. Der genaue Zeitplan hängt vom Umfang ab."

---

### Database Updates

10 SQL UPDATE statements will be executed - one for each region. Each update will set the corrected content JSON with:

- Proper region name in title (already correct)
- Description without "Küche"
- Meta description without "Küche"
- Services object with only badumbau and innenausbau (no kuechenumbau)
- Updated FAQ answer without "Küchenumbau" reference

**Example update for Richterswil:**
```sql
UPDATE content SET content = '{
  "title": "Bäderberg in Richterswil",
  "description": "Bad und Innenausbau in Richterswil",
  "metaTitle": "Bäderberg in Richterswil - Bäderberg",
  "metaDescription": "Bad und Innenausbau in Richterswil",
  "heroImage": "/src/assets/regions/richterswil-interior.jpg",
  "services": {
    "badumbau": "Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne. Persönlich betreut, sauber ausgeführt.",
    "innenausbau": "Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um."
  },
  "whyUs": [...],
  "faq": [
    {"question": "Wie lange dauert ein Umbau?", "answer": "Ein Badumbau dauert 3-6 Wochen, ein Innenausbau-Projekt je nach Umfang 2-6 Wochen. Der genaue Zeitplan hängt vom Umfang ab."},
    ...
  ],
  "testimonials": []
}'
WHERE section_key = 'region' AND content_key = 'richterswil';
```

---

### Region Names Verification

All region names are already correct:
- zurich -> "Bäderberg in Zürich" (correct umlaut)
- richterswil -> "Bäderberg in Richterswil"
- waedenswil -> "Bäderberg in Wädenswil" (correct umlaut)
- lachen -> "Bäderberg in Lachen"
- pfaeffikon -> "Bäderberg in Pfäffikon SZ"
- zollikon -> "Bäderberg in Zollikon"
- kilchberg -> "Bäderberg in Kilchberg"
- kuesnacht -> "Bäderberg in Küsnacht" (correct umlaut)
- meilen -> "Bäderberg in Meilen"
- erlenbach -> "Bäderberg in Erlenbach"

---

### Implementation Summary

| Task | Action |
|------|--------|
| Database | 10 UPDATE statements to fix all region content |
| Schema defaults | Already updated (regionDefaults is correct in schema.ts) |
| RegionPage.tsx | Already updated (only shows badumbau and innenausbau) |

No code changes needed - only database content updates. The RegionPage.tsx component already only displays the two services (badumbau and innenausbau), and the schema.ts defaults are already correct.

