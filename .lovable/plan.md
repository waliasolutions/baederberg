

## Zusammenfassung

Das Kontaktformular soll E-Mails an **info@baederberg.ch** senden, mit **info@walia-solutions.ch** in CC.

---

## Voraussetzungen

Für den E-Mail-Versand wird **Resend** benötigt:

| Schritt | Aktion |
|---------|--------|
| 1 | Resend-Konto erstellen unter https://resend.com |
| 2 | E-Mail-Domain verifizieren unter https://resend.com/domains |
| 3 | API-Key erstellen unter https://resend.com/api-keys |
| 4 | API-Key in Lovable als Secret hinzufügen |

**Wichtig:** Die Domain `baederberg.ch` muss bei Resend verifiziert werden, damit E-Mails von dieser Domain gesendet werden können.

---

## Technische Umsetzung

### 1. Neue Edge Function erstellen

Eine neue Backend-Funktion `send-contact-email` wird erstellt:

```text
supabase/functions/
├── bootstrap-admin/
├── create-user/
├── optimize-image/
├── seed-content/
└── send-contact-email/   ← NEU
    └── index.ts
```

Die Funktion:
- Empfängt Formulardaten (Name, E-Mail, Telefon, Leistung, Nachricht)
- Validiert die Eingaben
- Sendet E-Mail via Resend an info@baederberg.ch
- Fügt info@walia-solutions.ch als CC hinzu
- Verwendet eine professionelle HTML-Vorlage

### 2. Contact-Komponente aktualisieren

Die `handleSubmit` Funktion wird angepasst:

```text
Aktuell:                          Neu:
├── setTimeout (fake)             ├── fetch('/functions/v1/send-contact-email')
└── Lokale Erfolgsmeldung         ├── Echte E-Mail wird gesendet
                                  └── Fehlerbehandlung
```

### 3. E-Mail-Vorlage

Die E-Mail enthält:
- Betreff: "Neue Kontaktanfrage von [Name]"
- Absender-Antwortadresse: Kunden-E-Mail
- Alle Formularfelder formatiert
- Professionelles HTML-Layout

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `supabase/functions/send-contact-email/index.ts` | Neue Edge Function |
| `supabase/config.toml` | JWT-Verifizierung deaktivieren |
| `src/components/Contact.tsx` | API-Aufruf statt Simulation |

---

## E-Mail-Konfiguration

| Feld | Wert |
|------|------|
| **An (To)** | info@baederberg.ch |
| **CC** | info@walia-solutions.ch |
| **Von** | noreply@baederberg.ch (oder verifizierte Domain) |
| **Reply-To** | Kunden-E-Mail-Adresse |

---

## Nächster Schritt

Bevor ich mit der Implementierung beginne, benötige ich den **Resend API-Key**. 

Bitte:
1. Gehe zu https://resend.com und erstelle ein Konto (falls nicht vorhanden)
2. Verifiziere die Domain `baederberg.ch` unter https://resend.com/domains
3. Erstelle einen API-Key unter https://resend.com/api-keys
4. Teile mir den API-Key mit, damit ich ihn als Secret hinzufügen kann

