

## Zusammenfassung

Es gibt zwei Aufgaben:
1. **Fehlende Innenausbau-Bild hinzufügen** - Das hochgeladene Bild (Zimmer mit Einbauschrank und beleuchteter Nische) zur Projekte-Galerie hinzufügen
2. **Google Analytics einrichten** - Die Measurement ID `G-40Z9HJ9DH4` in index.html integrieren und in der Datenschutzerklärung dokumentieren

---

## Schritt 1: Innenausbau-Bild hinzufügen

Das hochgeladene Bild wird als `innenausbau-e.jpg` gespeichert und der Galerie hinzugefügt:

| Aktion | Detail |
|--------|--------|
| Bild kopieren | `user-uploads://innenausbau-c.jpeg` → `public/images/innenausbau-e.jpg` |
| Schema aktualisieren | Neuen Eintrag in `src/cms/schema.ts` hinzufügen |
| Titel | "Einbauschrank mit Beleuchtung" |
| Kategorie | Innenausbau |

---

## Schritt 2: Google Analytics Integration

Google Analytics (GA4) wird zusätzlich zum bestehenden GTM hinzugefügt:

```text
Bestehendes Tracking:
├── Google Tag Manager (GTM-TLXXF8V) ✓ bereits vorhanden

Neu hinzuzufügen:
└── Google Analytics 4 (G-40Z9HJ9DH4) ← wird ergänzt
```

Das GA4-Script wird im `<head>` der `index.html` eingefügt:

```html
<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-40Z9HJ9DH4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-40Z9HJ9DH4');
</script>
```

---

## Schritt 3: Datenschutzerklärung aktualisieren

Ein neuer Abschnitt wird nach "6. Cookies" eingefügt, der Google Analytics rechtlich dokumentiert:

**Neuer Abschnitt "7. Webanalyse mit Google Analytics":**

Inhalt:
- Erklärung, dass GA4 zur Analyse des Nutzerverhaltens verwendet wird
- Nennung der Measurement ID: G-40Z9HJ9DH4
- Hinweis auf anonymisierte IP-Adressen
- Hinweis auf Widerspruchsmöglichkeit (Opt-Out Link)
- Information zur Datenübertragung in die USA

Die nachfolgenden Abschnitte werden entsprechend neu nummeriert (7→8, 8→9, usw.).

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `public/images/innenausbau-e.jpg` | Neues Bild (kopiert) |
| `src/cms/schema.ts` | Neuer Galerie-Eintrag |
| `index.html` | GA4-Script hinzufügen |
| `src/pages/DatenschutzPage.tsx` | Neuer Abschnitt für Google Analytics |

