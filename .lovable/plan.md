

## Zusammenfassung

Die Bilder laden langsam, weil aktuell keine modernen Optimierungstechniken verwendet werden. Ich werde folgende Verbesserungen implementieren:

1. **Lazy Loading** für alle Bilder ausserhalb des sichtbaren Bereichs
2. **Optimierte Bildkomponente** mit WebP-Unterstützung und Platzhaltern
3. **Skeleton-Platzhalter** während dem Laden (blur-up Effekt)
4. **Priorisiertes Laden** für kritische Bilder (Hero, Above-the-fold)

---

## Aktuelle Probleme

| Problem | Betroffene Komponenten |
|---------|------------------------|
| Kein `loading="lazy"` | ProjectCard, ServiceCard, About, Hero-Unterseiten |
| Kein Skeleton/Platzhalter | Alle Bildkomponenten |
| Alle Bilder laden sofort | Gallery lädt 27 Bilder gleichzeitig |
| Keine WebP-Priorisierung | Frontend nutzt Optimierungs-URLs nicht |

---

## Lösung: OptimizedImage Komponente

Eine neue wiederverwendbare Komponente wird erstellt:

```text
src/components/ui/
├── optimized-image.tsx   ← NEU
└── skeleton.tsx          (bereits vorhanden)
```

**Features:**
- Automatisches `loading="lazy"` für Bilder unterhalb des Viewports
- `loading="eager"` für kritische Above-the-fold Bilder
- Blur-up Skeleton-Animation während dem Laden
- WebP-URL Unterstützung wenn verfügbar
- Fade-in Animation wenn Bild geladen

---

## Betroffene Komponenten

| Komponente | Änderung |
|------------|----------|
| `ProjectCard.tsx` | OptimizedImage mit lazy loading |
| `ServiceCard.tsx` | OptimizedImage mit lazy loading |
| `About.tsx` | OptimizedImage mit lazy loading |
| `BadumbauPage.tsx` | OptimizedImage mit eager loading (Hero) |
| `InnenausbauPage.tsx` | OptimizedImage mit eager loading (Hero) |
| `Hero.tsx` | Preload für aktives Slide, lazy für andere |

---

## Technische Umsetzung

### 1. OptimizedImage Komponente erstellen

```text
Props:
├── src: string              - Bild-URL
├── alt: string              - Alt-Text
├── className?: string       - CSS-Klassen
├── priority?: boolean       - true = eager, false = lazy
├── aspectRatio?: string     - z.B. "4/3" für Platzhalter-Grösse
└── onLoad?: () => void      - Callback wenn geladen
```

**Verhalten:**
1. Zeigt Skeleton-Animation während dem Laden
2. Bild wird im Hintergrund geladen
3. Sanfter Fade-in wenn fertig

### 2. ProjectCard aktualisieren

```text
Vorher:                              Nachher:
<img src={image} />                  <OptimizedImage
                                       src={image}
                                       priority={false}
                                       aspectRatio="4/3"
                                     />
```

### 3. ServiceCard aktualisieren

Gleiche Änderung wie ProjectCard mit lazy loading.

### 4. Hero-Unterseiten aktualisieren

```text
Vorher:                              Nachher:
<motion.img src={...} />             <OptimizedImage
                                       src={pageContent.heroImage}
                                       priority={true}  ← Kritisch!
                                       className="..."
                                     />
```

### 5. About aktualisieren

Lazy loading da unterhalb des Viewports.

---

## Erwartete Verbesserungen

| Metrik | Vorher | Nachher |
|--------|--------|---------|
| Initiales Laden | Alle 27 Gallery-Bilder | Nur 6-9 sichtbare |
| Perceived Performance | Leere Bereiche | Skeleton-Animation |
| LCP (Largest Contentful Paint) | Langsam | Schneller (priority) |
| Netzwerk-Auslastung | Hoch | Reduziert |

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/ui/optimized-image.tsx` | NEU erstellen |
| `src/components/ProjectCard.tsx` | OptimizedImage verwenden |
| `src/components/ServiceCard.tsx` | OptimizedImage verwenden |
| `src/components/About.tsx` | OptimizedImage verwenden |
| `src/pages/BadumbauPage.tsx` | OptimizedImage mit priority |
| `src/pages/InnenausbauPage.tsx` | OptimizedImage mit priority |

