
## Fix für flackernde Service-Karten

### Problem-Analyse

Die Service-Karten auf der Startseite verwenden die `OptimizedImage` Komponente, die folgende Probleme verursacht:

| Problem | Ursache |
|---------|---------|
| Doppelter Ladezustand | Skeleton + Bild mit Opacity-Übergang |
| Race Condition | `Image()` Preload vs. tatsächliches `onLoad` Event |
| Verzögerter Übergang | 300ms Opacity-Transition bei jedem Laden |

### Lösung

Die gleiche Strategie wie beim Hero-Slider anwenden: Native `<img>` Tags mit optimierten Ladeattributen verwenden.

```text
Vorher (ServiceCard.tsx):
├── OptimizedImage Komponente
│   ├── Skeleton (animate-pulse)
│   ├── opacity-0 → opacity-100 Übergang
│   └── Doppelte Ladezustandsverwaltung
└── Verursacht Flackern

Nachher (ServiceCard.tsx):
├── Native <img> Tag
│   ├── loading="eager" (sofortiges Laden)
│   ├── decoding="async" (nicht blockierend)
│   └── Kein Ladezustand notwendig
└── Kein Flackern
```

### Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `src/components/ServiceCard.tsx` | `OptimizedImage` durch native `<img>` ersetzen |

### Code-Änderungen

**ServiceCard.tsx:**

```tsx
// Entfernen
import { OptimizedImage } from '@/components/ui/optimized-image';

// Ändern von:
<OptimizedImage
  src={imageSrc}
  alt={title}
  aspectRatio="4/3"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>

// Ändern zu:
<img
  src={imageSrc}
  alt={title}
  loading="eager"
  decoding="async"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
```

### Warum diese Lösung funktioniert

1. **Kein Ladezustand**: Kein Skeleton oder Opacity-Übergang = kein Flackern
2. **Sofortiges Laden**: `loading="eager"` lädt die Bilder sofort, da sie above-the-fold sind
3. **Nicht-blockierend**: `decoding="async"` verhindert UI-Blockierung während des Decodierens
4. **Konsistenz**: Gleiche Strategie wie Hero-Slider und Service-Seiten
