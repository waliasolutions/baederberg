
## Region Pages Content-Verbesserung

### Problem-Analyse

Die aktuellen Region-Seiten haben sehr dünne Inhalte:

| Bereich | Aktuell | Problem |
|---------|---------|---------|
| **Badumbau** | "Wir bauen Ihr Bad um – von der Planung bis zur fertigen Dusche oder Badewanne." | Zu kurz, keine Details |
| **Innenausbau** | "Vom Möbeleinbau bis zum neuen Boden – wir setzen Ihre Raumideen fachgerecht um." | Zu kurz, keine Substanz |
| **Warum wir** | 4 generische Punkte | Keine konkreten Vorteile |

Die Service-Detail-Seiten (BadumbauPage, InnenausbauPage) haben hingegen sehr guten Inhalt mit konkreten Features.

---

### Strategie

Die Region-Seiten sollen mehr von den konkreten Leistungen zeigen, ohne die Detail-Seiten zu kopieren. Der Ton bleibt positiv und konkret, ohne zu belehren.

---

### Neue Inhalte

#### 1. Erweiterte Service-Beschreibungen

**Badumbau (neu):**
```
Ihr persönlicher Bauleiter plant mit Ihnen und koordiniert den
gesamten Umbau. Sanitär, Elektrik, Fliesen, Badmöbel –
alles läuft über einen Ansprechpartner. Fester Preis,
fester Termin, 5 Jahre Garantie.
```

**Innenausbau (neu):**
```
Ein Ansprechpartner für alles: Bodenbeläge, Einbauschränke,
Wandverkleidungen, Treppen. Wir übernehmen die Koordination
aller Gewerke. Fester Preis, fester Termin, 5 Jahre Garantie.
```

#### 2. Service-Karten mit Feature-Liste

Jede Service-Karte bekommt 3-4 konkrete Leistungspunkte:

**Badumbau:**
- Persönlicher Bauleiter
- Sanitär & Elektrik inklusive
- 5 Jahre Garantie

**Innenausbau:**
- Fachgerechte Bauleitung
- Alle Gewerke koordiniert
- 5 Jahre Garantie

#### 3. Überarbeitete "Warum Bäderberg" Punkte

Die bisherigen Punkte sind okay, aber zu generisch. Hier konkretere Versionen:

| Alt | Neu |
|-----|-----|
| "Alles aus einer Hand – vom ersten Gespräch bis zur Übergabe" | "Ein Ansprechpartner von Anfang bis Ende" |
| "5 Jahre Garantie auf unsere Handwerksleistungen" | "5 Jahre Garantie auf alle Arbeiten" |
| "Sorgfältige Arbeit mit hochwertigen Materialien" | "Saubere Arbeit, hochwertige Materialien" |
| "Transparente Preise ohne versteckte Kosten" | "Fester Preis – keine Überraschungen" |

---

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/cms/schema.ts` | Neue `regionDefaults.services` und `regionDefaults.whyUs` Texte |
| `src/pages/RegionPage.tsx` | Service-Karten mit Feature-Liste erweitern |

---

### Technische Umsetzung

#### RegionPage.tsx - Service Cards mit Features

```text
Vorher:
┌─────────────────────────────┐
│ Badumbau                    │
│ [kurzer Text]               │
│ → Mehr erfahren             │
└─────────────────────────────┘

Nachher:
┌─────────────────────────────┐
│ Badumbau                    │
│ [erweiterter Text]          │
│                             │
│ ✓ Persönlicher Bauleiter    │
│ ✓ Sanitär & Elektrik inkl.  │
│ ✓ 5 Jahre Garantie          │
│                             │
│ → Mehr erfahren             │
└─────────────────────────────┘
```

#### Schema.ts - Neue regionDefaults

```typescript
regionDefaults: {
  services: {
    badumbau: 'Ihr persönlicher Bauleiter plant mit Ihnen und koordiniert den gesamten Umbau. Sanitär, Elektrik, Fliesen, Badmöbel – alles läuft über einen Ansprechpartner. Fester Preis, fester Termin, 5 Jahre Garantie.',
    innenausbau: 'Ein Ansprechpartner für alles: Bodenbeläge, Einbauschränke, Wandverkleidungen, Treppen. Wir übernehmen die Koordination aller Gewerke. Fester Preis, fester Termin, 5 Jahre Garantie.'
  },
  serviceFeatures: {
    badumbau: [
      'Persönlicher Bauleiter',
      'Sanitär & Elektrik inklusive',
      '5 Jahre Garantie'
    ],
    innenausbau: [
      'Fachgerechte Bauleitung',
      'Alle Gewerke koordiniert',
      '5 Jahre Garantie'
    ]
  },
  whyUs: [
    'Ein Ansprechpartner von Anfang bis Ende',
    '5 Jahre Garantie auf alle Arbeiten',
    'Saubere Arbeit, hochwertige Materialien',
    'Fester Preis – keine Überraschungen'
  ],
  // ... rest bleibt gleich
}
```

---

### Inhaltsprinzipien

Die neuen Texte folgen diesen Regeln:

| Prinzip | Umsetzung |
|---------|-----------|
| **Konkret** | "Persönlicher Bauleiter", "5 Jahre Garantie" statt vage Versprechen |
| **Positiv** | Was wir machen, nicht was andere falsch machen |
| **Kein Fluff** | Keine "Wohlfühloase", keine "exklusiv" oder "erstklassig" |
| **Nicht belehrend** | Keine "Sie sollten..." oder "Wichtig ist..." |

---

### Erwartetes Ergebnis

Nach der Umsetzung zeigen die Region-Seiten:
- Mehr Substanz in den Service-Beschreibungen
- Konkrete Features als Checkmarks
- Kürzere, prägnantere "Warum wir" Punkte
- Gleicher Ton wie die Hauptseiten (direkt, ehrlich, konkret)
