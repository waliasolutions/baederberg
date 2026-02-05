
## QA-Korrektur: Region Pages Synchronisation

### Problem-Zusammenfassung

Die Region-Seiten zeigen inkonsistente Ortsnamen an. Beispiel: Auf der Seite "Bäderberg in Meilen" steht "Unsere Leistungen in Richterswil" statt "Unsere Leistungen in Meilen".

---

### Gefundene Probleme

| Problem | Betroffene Seiten | Ursache |
|---------|-------------------|---------|
| **Falscher Ortsname in Überschriften** | Meilen, Erlenbach, Zollikon, Kilchberg, Küsnacht, Lachen, Wädenswil, alle neuen Regionen | `cityName` nutzt `contact.address.city` aus `regionDefaults`, welches fix auf "Richterswil" gesetzt ist |
| **5 Regionen auf Karte ohne Schema** | Menzingen, Freienbach, Rapperswil, Horgen, Rüti | RegionMap hat 15 Einträge, Schema nur 10 |
| **Fehlende Testimonial-Fallbacks** | Menzingen, Freienbach, Rapperswil, Horgen, Rüti | `regionTestimonialFallback` kennt diese Regionen nicht |
| **Footer zeigt "Bäderberg in X"** | Alle Footer-Links | Sollte nur "Zürich", "Meilen" etc. anzeigen |
| **HTML5 nicht synchron** | Alle HTML5-Regions-Dateien | 5 neue Regionen fehlen |

---

### Lösung

#### 1. RegionPage.tsx - cityName Logik korrigieren

Die Priorität muss umgekehrt werden: Erst den Ortsnamen aus dem Titel extrahieren, dann als Fallback die Kontaktadresse nutzen.

```text
Vorher (falsch):
cityName = contact.address.city || title.replace(...)
  → Richterswil für alle Seiten

Nachher (korrekt):
cityName = title.replace('Bäderberg in ', '') || contact.address.city
  → Meilen für /region/meilen
  → Erlenbach für /region/erlenbach
  → usw.
```

#### 2. Schema.ts - 5 neue Regionen hinzufügen

```text
regions.items (aktuell 10):
├── zurich, richterswil, waedenswil, lachen, pfaeffikon
├── zollikon, kilchberg, kuesnacht, meilen, erlenbach

regions.items (neu 15):
├── + menzingen
├── + freienbach
├── + rapperswil
├── + horgen
└── + rueti
```

#### 3. RegionPage.tsx - Testimonial-Fallbacks ergänzen

```text
regionTestimonialFallback (neu):
├── menzingen: [14, 3, 12]
├── freienbach: [6, 16, 0]
├── rapperswil: [13, 5, 18]
├── horgen: [7, 2, 11]
└── rueti: [4, 15, 9]
```

#### 4. Footer.tsx - Regions-Anzeige vereinfachen

```text
Vorher: "Bäderberg in Zürich"
Nachher: "Zürich"
```

Änderung: Ersetze `region.title` durch Extraktion des reinen Ortsnamens.

#### 5. HTML5-Version synchronisieren

Neue Regions-Links zu den Include-Dateien hinzufügen:
- `regions-list.html`
- `regions-list-column1.html`
- `regions-list-column2.html`

---

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/pages/RegionPage.tsx` | `cityName` Logik korrigieren, Testimonial-Fallbacks ergänzen |
| `src/cms/schema.ts` | 5 neue Regionen zu `regions.items` hinzufügen |
| `src/components/Footer.tsx` | Regions-Titel auf Ortsnamen reduzieren |
| `html5-version/includes/regions-list.html` | 5 neue Regionen |
| `html5-version/includes/regions-list-column1.html` | Neu aufteilen |
| `html5-version/includes/regions-list-column2.html` | Neu aufteilen |

---

### Erwartetes Ergebnis

Nach der Korrektur:

| Seite | Korrekte Anzeige |
|-------|-----------------|
| `/region/meilen` | "Unsere Leistungen in Meilen" |
| `/region/erlenbach` | "Unsere Leistungen in Erlenbach" |
| `/region/menzingen` | "Unsere Leistungen in Menzingen" |
| `/region/horgen` | "Unsere Leistungen in Horgen" |
| Footer | "Zürich", "Meilen", "Horgen" (ohne "Bäderberg in") |
