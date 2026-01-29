

## Zusammenfassung

Die Website zeigt in manchen Browsern einen **Umleitungsfehler (Redirect Loop)**, weil:

1. Die `AdminLogin.tsx` Komponente prüft auf der Login-Seite, ob bereits ein Admin existiert (`user_roles` Tabelle)
2. Diese Abfrage wird durch **Row Level Security (RLS)** blockiert für unauthentifizierte Benutzer
3. In manchen Browsern führt dies zu einem inkonsistenten Auth-State und endlosen Weiterleitungen

---

## Ursache des Problems

| Komponente | Problem |
|------------|---------|
| `AdminLogin.tsx` Zeile 43-56 | Ruft `checkIfFirstAdmin()` auf, die `user_roles` abfragt |
| RLS Policy auf `user_roles` | Nur angemeldete Benutzer können ihre eigenen Rollen sehen |
| `AdminLayout.tsx` Zeile 52-55 | Leitet zu `/admin/login` wenn kein User vorhanden |
| `useAuth.ts` Zeile 46-55 | Verwendet `setTimeout` für Rollen-Abruf, was Race Conditions verursacht |

**Race Condition Ablauf:**
1. Browser lädt Seite
2. `isLoading` ist kurzzeitig `false` bevor Rollen geladen sind
3. `AdminLayout` sieht keinen User → leitet zu `/admin/login`
4. `AdminLogin` sieht User ohne Rolle → leitet zurück zu `/admin`
5. Endlose Schleife

---

## Lösung

### 1. SECURITY DEFINER Funktion erstellen

Eine neue SQL-Funktion, die RLS umgeht und für anonyme Benutzer funktioniert:

```sql
CREATE OR REPLACE FUNCTION public.check_admin_exists()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE role = 'admin' 
    LIMIT 1
  );
$$;
```

Diese Funktion:
- Läuft mit den Rechten des Erstellers (Postgres)
- Kann von anonymen Benutzern aufgerufen werden
- Umgeht RLS sicher für diese spezifische Prüfung

### 2. AdminLogin.tsx aktualisieren

Die `checkIfFirstAdmin` Funktion wird angepasst um die neue RPC-Funktion zu nutzen:

```text
Vorher:                              Nachher:
├── supabase.from('user_roles')      ├── supabase.rpc('check_admin_exists')
│   .select('id')                    │   .then(hasAdmin => ...)
│   .eq('role', 'admin')             │
│   .limit(1)                        │
└── Wird von RLS blockiert           └── Funktioniert für alle Benutzer
```

### 3. useAuth.ts verbessern

Das `setTimeout` wird durch synchronen Code ersetzt um Race Conditions zu vermeiden:

```text
Vorher:                              Nachher:
├── setTimeout(() => {...}, 0)       ├── Direkter async/await Aufruf
└── Race Condition möglich           └── Konsistenter State
```

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| Migration (SQL) | `check_admin_exists()` Funktion erstellen |
| `src/cms/pages/AdminLogin.tsx` | RPC-Aufruf statt direkter Tabellenabfrage |
| `src/cms/hooks/useAuth.ts` | `setTimeout` entfernen, async/await verwenden |

---

## Erwartetes Ergebnis

Nach der Implementierung:
- Keine Redirect-Loops mehr in Firefox, Safari oder anderen Browsern
- Schnellerer Auth-State ohne Race Conditions
- Sichere Admin-Prüfung die RLS nicht verletzt

