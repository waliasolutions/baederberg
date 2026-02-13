

## Media Library & CMS Deep QA -- Ueberarbeiteter Plan

### 1. Fehlende Bilder: Daten von Logik trennen

**Problem:** 27 Bilder in DB, aber 58+ im Projekt. Die `syncProjectImages`-Liste ist direkt im `useMedia.ts` Hook.

**Loesung:** Neue Datei `src/cms/constants/initialMedia.ts` mit allen Bild-Eintraegen. Der Hook importiert nur das Array.

| Datei | Aenderung |
|-------|----------|
| `src/cms/constants/initialMedia.ts` | **Neu** -- Alle 58 Bild-Definitionen als exportiertes Array |
| `src/cms/hooks/useMedia.ts` | Import von `initialMedia.ts`, `syncProjectImages` wird schlank |

Neue Bilder (31 Stueck):

```text
/images/badumbau-a.jpg bis /images/badumbau-v.jpg  (22, folder: gallery)
/images/innenausbau-a.jpg bis /images/innenausbau-e.jpg  (5, folder: gallery)
/images/bathroom-modern-optimized.jpg  (1, folder: gallery)
/images/interior-living-optimized.jpg  (1, folder: gallery)
/lovable-uploads/kueche-hero.jpg  (1, folder: hero)
/lovable-uploads/kueche-service.jpg  (1, folder: services)
```

Alle neuen Pfade zeigen auf `/public/` oder `/lovable-uploads/` -- also Build-sicher.

---

### 2. Kaputte `/src/assets/` Pfade in der DB korrigieren (Kritisch)

**Problem:** 14 Eintraege in der `media`-Tabelle haben `/src/assets/...` URLs. Diese brechen im Production-Build, weil Vite die Dateien hasht und umbenennt.

**Loesung:** Diese 14 Eintraege per SQL-Update auf korrekte `/public/`-Pfade umschreiben. Dafuer muessen die 14 Dateien aus `src/assets/` nach `public/assets/` kopiert werden (einmalig).

| Schritt | Aktion |
|---------|--------|
| 1 | Bilder von `src/assets/projects/` und `src/assets/regions/` nach `public/assets/projects/` und `public/assets/regions/` kopieren |
| 2 | SQL UPDATE: `/src/assets/projects/X.jpg` → `/assets/projects/X.jpg` fuer alle 14 Eintraege |
| 3 | `initialMedia.ts` nutzt nur `/assets/...` Pfade (ohne `/src`) |

Die Dateien in `src/assets/` bleiben bestehen fuer bestehende Vite-Imports in Komponenten. Die neuen `/public/assets/` Kopien sind fuer das CMS/die Media Library.

---

### 3. Autosave: Seiteneffekte absichern

**Problem:** `useContent` hat einen Autosave-Timer der immer laeuft wenn `isDirty === true`. Der `ContentEditor` nutzt seine eigene Save-Logik mit `is_draft: false`. Wenn jemand spaeter `updateContent()` aus `useContent` im Editor aufruft, wuerde der Autosave zuschlagen und als Draft speichern -- das ueberschreibt moeglicherweise den publizierten Stand.

**Loesung:** `useContent` bekommt eine Option `disableAutosave: boolean` (default `false`).

```typescript
// useContent.ts
export function useContent(sectionKey?: string, options?: { disableAutosave?: boolean }) {
  // ...
  useEffect(() => {
    if (isDirty && !options?.disableAutosave) {
      // autosave logic
    }
  }, [isDirty, saveContent, options?.disableAutosave]);
}
```

---

### Zusammenfassung der Aenderungen

| Prioritaet | Datei | Aenderung |
|------------|-------|----------|
| Blocker | `src/cms/constants/initialMedia.ts` | **Neu:** 58 Bild-Definitionen, sauber getrennt von Hook-Logik |
| Blocker | `src/cms/hooks/useMedia.ts` | Import initialMedia, syncProjectImages verschlanken |
| Kritisch | Dateien kopieren | `src/assets/projects/*` und `src/assets/regions/*` nach `public/assets/` |
| Kritisch | DB media Tabelle | SQL UPDATE: 14 Pfade von `/src/assets/...` auf `/assets/...` |
| Absicherung | `src/cms/hooks/useContent.ts` | `disableAutosave` Option hinzufuegen |

### Bereits validiert (keine Aenderung noetig)

- Save/Publish-Flow: `is_draft: false` im Editor, Public-View liest nur published
- RLS Policies: RESTRICTIVE korrekt fuer public-read/admin-write
- Revision History, Theme-System, Image Upload + Optimization: funktional
- Region Sync, Testimonials Sync: korrekt

