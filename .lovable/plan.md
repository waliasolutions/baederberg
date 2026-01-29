
## Problem-Analyse

Das neue Innenausbau-Bild wird nicht angezeigt, weil:

| Ebene | Status |
|-------|--------|
| Bild-Datei (`public/images/innenausbau-e.jpg`) | Vorhanden |
| Schema (`src/cms/schema.ts`) | Eintrag vorhanden |
| Datenbank (`content` Tabelle) | **Fehlt** |

Die Galerie-Komponente holt ihre Daten aus der Datenbank. Die Datenbank enthält aktuell nur **2 Innenausbau-Bilder** (`innenausbau-a.jpg`, `innenausbau-b.jpg`), während die neuen Bilder (`innenausbau-c.jpg`, `innenausbau-d.jpg`, `innenausbau-e.jpg`) nur im Schema definiert wurden.

---

## Lösung

Die Datenbank-Tabelle `content` muss aktualisiert werden, um alle 5 Innenausbau-Bilder zu enthalten:

```text
Aktuelle Innenausbau-Bilder in DB:   Fehlende Bilder:
├── innenausbau-a.jpg               ├── innenausbau-c.jpg
└── innenausbau-b.jpg               ├── innenausbau-d.jpg
                                    └── innenausbau-e.jpg
```

---

## Technische Umsetzung

Die `gallery` Sektion in der `content` Tabelle wird mit folgendem SQL aktualisiert:

```sql
UPDATE content 
SET content = jsonb_set(
  content,
  '{items}',
  content->'items' || '[
    {"image": "/images/innenausbau-c.jpg", "category": "Innenausbau"},
    {"image": "/images/innenausbau-d.jpg", "category": "Innenausbau"},
    {"image": "/images/innenausbau-e.jpg", "category": "Innenausbau"}
  ]'::jsonb
)
WHERE section_key = 'gallery' AND content_key = 'default';
```

---

## Betroffene Dateien

| Datei/Ressource | Änderung |
|-----------------|----------|
| Supabase `content` Tabelle | 3 neue Innenausbau-Einträge hinzufügen |

---

## Ergebnis nach Umsetzung

| Filter | Vorher | Nachher |
|--------|--------|---------|
| Innenausbau | 2 Bilder | 5 Bilder |
| Badumbau | 22 Bilder | 22 Bilder |
| Alle | 24 Bilder | 27 Bilder |
