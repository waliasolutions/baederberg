

## Fehlende Region Hero-Bilder zuweisen

### Ausgangslage

- 15 Regionen insgesamt
- Nur 3 haben Hero-Bilder (Zuerich, Richterswil, Pfaeffikon) -- die restlichen 12 zeigen ein generisches Unsplash-Bild
- Die 3 vorhandenen DB-Eintraege haben kaputte `/src/assets/`-Pfade
- In `public/assets/regions/` liegen 6 Dateien (hero + interior fuer die 3 Regionen)

### Loesung

#### 1. Hero-Bilder den 12 fehlenden Regionen zuweisen

Da keine regionsspezifischen Fotos vorliegen, werden vorhandene Projekt-Bilder gleichmaessig verteilt. Die Bilder passen thematisch (Bad, Kueche, Innenausbau) und sind build-sicher in `/public/`.

| Region | Bild | Thema |
|--------|------|-------|
| Waedenswil | `/lovable-uploads/bad-hero.jpg` | Bad |
| Lachen | `/lovable-uploads/innenausbau-hero.jpg` | Innenausbau |
| Zollikon | `/lovable-uploads/kueche-hero.jpg` | Kueche |
| Kilchberg | `/images/badumbau-a.jpg` | Bad |
| Kuesnacht | `/images/innenausbau-a.jpg` | Innenausbau |
| Meilen | `/images/badumbau-b.jpg` | Bad |
| Erlenbach | `/images/badumbau-c.jpg` | Bad |
| Menzingen | `/images/badumbau-d.jpg` | Bad |
| Freienbach | `/images/innenausbau-b.jpg` | Innenausbau |
| Rapperswil | `/images/badumbau-e.jpg` | Bad |
| Horgen | `/images/badumbau-f.jpg` | Bad |
| Rueti | `/images/innenausbau-c.jpg` | Innenausbau |

#### 2. Bestehende 3 kaputte Pfade korrigieren

| Region | Alt (kaputt) | Neu (korrekt) |
|--------|-------------|---------------|
| Zuerich | `/src/assets/regions/zurich-interior.jpg` | `/assets/regions/zurich-interior.jpg` |
| Richterswil | `/src/assets/regions/richterswil-interior.jpg` | `/assets/regions/richterswil-interior.jpg` |
| Pfaeffikon | `/src/assets/regions/pfaffikon-interior.jpg` | `/assets/regions/pfaffikon-interior.jpg` |

#### 3. Code-Aenderung: `RegionPage.tsx`

Die statische `regionHeroImages`-Map (Zeile 51-55) wird um alle 15 Regionen erweitert, sodass keine Region mehr auf das Unsplash-Fallback zurueckfaellt. Dabei werden build-sichere `/public/`-Pfade statt Vite-Imports verwendet.

### Technische Schritte

| Schritt | Aktion |
|---------|--------|
| 1 | DB: `heroImage` fuer alle 15 Regionen per SQL UPDATE setzen (3 korrigieren, 12 neu) |
| 2 | `RegionPage.tsx`: Vite-Imports (Zeile 12-14) entfernen, `regionHeroImages` mit allen 15 Public-Pfaden befuellen |
| 3 | Unsplash-Fallback bleibt als allerletzter Fallback bestehen |

