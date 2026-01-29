

## Zusammenfassung

Das Kontaktformular wird mit **SMTP2GO** für den E-Mail-Versand integriert:

| Konfiguration | Wert |
|---------------|------|
| **An (To)** | info@baederberg.ch |
| **CC** | info@walia-solutions.ch |
| **Von** | kontakt@keine-sorge.ch |
| **Reply-To** | Kunden-E-Mail-Adresse |

---

## Technische Umsetzung

### 1. Secret hinzufügen

Der SMTP2GO API-Key wird als Secret gespeichert:

```text
Name: SMTP2GO_API_KEY
Wert: api-0BB3E7B7E68B458086342985D0165320
```

### 2. Neue Edge Function erstellen

```text
supabase/functions/
├── bootstrap-admin/
├── create-user/
├── optimize-image/
├── seed-content/
└── send-contact-email/   ← NEU
    └── index.ts
```

Die Edge Function:
- Empfängt Formulardaten (Name, E-Mail, Telefon, Leistung, Nachricht)
- Validiert die Eingaben
- Sendet E-Mail via SMTP2GO API an info@baederberg.ch
- Fügt info@walia-solutions.ch als CC hinzu
- Setzt Reply-To auf die Kunden-E-Mail

**SMTP2GO API Endpoint:**
```text
POST https://api.smtp2go.com/v3/email/send
```

**Request Body Struktur:**
```json
{
  "api_key": "SMTP2GO_API_KEY",
  "to": ["info@baederberg.ch"],
  "cc": ["info@walia-solutions.ch"],
  "sender": "kontakt@keine-sorge.ch",
  "subject": "Neue Kontaktanfrage von [Name]",
  "html_body": "...",
  "custom_headers": [
    { "header": "Reply-To", "value": "kunde@email.com" }
  ]
}
```

### 3. Edge Function Konfiguration

In `supabase/config.toml` wird JWT-Verifizierung deaktiviert:

```toml
[functions.send-contact-email]
verify_jwt = false
```

### 4. Contact-Komponente aktualisieren

Die `handleSubmit` Funktion wird angepasst:

```text
Aktuell:                              Nachher:
├── setTimeout (fake delay)           ├── fetch Edge Function
└── Lokale Erfolgsmeldung             ├── Echte E-Mail wird gesendet
                                      ├── Fehlerbehandlung
                                      └── Error-State für Benutzer
```

**Neue States:**
- `isError`: boolean für Fehleranzeige
- `errorMessage`: Fehlermeldung für Benutzer

---

## E-Mail-Vorlage (HTML)

Die E-Mail enthält ein professionelles HTML-Layout:

```text
┌─────────────────────────────────────────┐
│  Neue Kontaktanfrage                    │
│  von [Name]                             │
├─────────────────────────────────────────┤
│  Kontaktdaten                           │
│  ├── Name: Max Mustermann               │
│  ├── E-Mail: kunde@email.com            │
│  ├── Telefon: +41 79 123 45 67          │
│  └── Leistung: Badumbau                 │
├─────────────────────────────────────────┤
│  Nachricht                              │
│  Lorem ipsum dolor sit amet...          │
├─────────────────────────────────────────┤
│  Gesendet am: 29.01.2026, 15:30 Uhr     │
│  Via: baederberg.ch Kontaktformular     │
└─────────────────────────────────────────┘
```

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| `supabase/functions/send-contact-email/index.ts` | NEU erstellen |
| `supabase/config.toml` | Funktion hinzufügen |
| `src/components/Contact.tsx` | API-Aufruf implementieren |

---

## Sicherheit & Validierung

Die Edge Function validiert:
- Name: Pflichtfeld, max. 100 Zeichen
- E-Mail: Pflichtfeld, gültiges E-Mail-Format
- Telefon: Optional, max. 30 Zeichen
- Leistung: Optional, Whitelist (Badumbau, Innenausbau)
- Nachricht: Optional, max. 2000 Zeichen

---

## Fehlerbehandlung

| Szenario | Benutzer-Feedback |
|----------|-------------------|
| E-Mail erfolgreich | Grüne Erfolgsmeldung |
| Validierungsfehler | Spezifische Fehlermeldung |
| Server-/Netzwerkfehler | "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." |

