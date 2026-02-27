

## Fix: Domain von baederberg.lovable.app auf baederberg.ch umstellen

### Problem

Alle SEO-relevanten URLs zeigen auf `baederberg.lovable.app` statt `baederberg.ch`. Google indexiert daher die falsche Domain.

### Betroffene Dateien

| Datei | Aenderung |
|-------|----------|
| `src/components/SEOHead.tsx` | Zeile 51: `publishedDomain` von `https://baederberg.lovable.app` auf `https://baederberg.ch` aendern |
| `public/robots.txt` | Sitemap-URL auf `https://baederberg.ch/sitemap.xml` aendern |
| `public/sitemap.xml` | Alle 16 `<loc>`-Eintraege von `baederberg.lovable.app` auf `baederberg.ch` ersetzen |

### Auswirkung

- Canonical URLs zeigen auf `baederberg.ch`
- Open Graph URLs zeigen auf `baederberg.ch`
- Hreflang zeigt auf `baederberg.ch`
- Sitemap zeigt auf `baederberg.ch`
- Google wird bei naechstem Crawl die korrekte Domain indexieren

### Zusaetzlich empfohlen (nach Deployment)

In Google Search Console: URL-Entfernung fuer `baederberg.lovable.app` beantragen, um die De-Indexierung zu beschleunigen.

