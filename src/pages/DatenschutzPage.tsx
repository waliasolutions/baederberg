import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const DatenschutzPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Datenschutzerklärung - Bäderberg"
        description="Datenschutzerklärung der Bäderberg GmbH gemäss dem Schweizer Datenschutzgesetz (nDSG) und der DSGVO."
      />
      <Header />

      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">
                Datenschutzerklärung
              </h1>

              <div className="prose prose-slate max-w-none space-y-6">

                {/* 1. Verantwortliche Stelle */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">1. Verantwortliche Stelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Verantwortlich im Sinne des Schweizer Datenschutzgesetzes (nDSG) sowie – soweit anwendbar – der Datenschutz-Grundverordnung (DSGVO) ist:
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bäderberg GmbH<br />
                  Zugerstrasse 18<br />
                  8805 Richterswil<br />
                  Schweiz
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Telefon: +41 76 753 44 78<br />
                  E-Mail: info@baederberg.ch
                </p>

                {/* 2. Geltungsbereich und Rechtsgrundlagen */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">2. Geltungsbereich und Rechtsgrundlagen</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Datenschutzerklärung gilt für die Website baederberg.ch und informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten gemäss Art. 19 des Schweizer Bundesgesetzes über den Datenschutz (nDSG), das seit dem 1. September 2023 in Kraft ist.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Personenbezogene Daten sind alle Angaben, die sich auf eine bestimmte oder bestimmbare natürliche Person beziehen (Art. 5 lit. a nDSG).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Für Besucherinnen und Besucher aus dem Europäischen Wirtschaftsraum (EWR) gilt ergänzend die Datenschutz-Grundverordnung (DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– <strong>Einwilligung</strong> (Art. 6 Abs. 6 nDSG / Art. 6 Abs. 1 lit. a DSGVO)</li>
                  <li>– <strong>Vertragserfüllung oder vorvertragliche Massnahmen</strong> (Art. 6 Abs. 1 lit. b DSGVO)</li>
                  <li>– <strong>Berechtigte Interessen</strong> (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO)</li>
                  <li>– <strong>Gesetzliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c DSGVO)</li>
                </ul>

                {/* 3. Hosting und Infrastruktur */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">3. Hosting und Infrastruktur</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Website wird bei <strong>Amazon Web Services (AWS)</strong> in <strong>Frankfurt am Main, Deutschland</strong> (Region eu-central-1) gehostet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Anbieter: Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, L-1855 Luxembourg.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Deutschland wird vom Schweizer Bundesrat als Land mit angemessenem Datenschutzniveau anerkannt. Die Datenverarbeitung erfolgt somit in einem sicheren Rechtsraum, der sowohl den Anforderungen des nDSG als auch der DSGVO entspricht.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Das AWS-Rechenzentrum in Frankfurt erfüllt höchste Sicherheitsstandards:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– ISO 27001, ISO 27017 und ISO 27018 zertifiziert</li>
                  <li>– SOC 1, SOC 2 und SOC 3 geprüft</li>
                  <li>– Physische Zugangskontrollen und 24/7-Überwachung</li>
                  <li>– Redundante Stromversorgung und Kühlung</li>
                  <li>– DDoS-Schutz (AWS Shield)</li>
                  <li>– Regelmässige Backups und Disaster Recovery</li>
                  <li>– Verschlüsselung der Daten im Ruhezustand und bei der Übertragung</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Mit AWS besteht ein DSGVO-konformer Auftragsverarbeitungsvertrag (AVV / Data Processing Addendum).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Server-Logfiles</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Beim Aufrufen unserer Website werden durch den Hosting-Anbieter automatisch folgende Informationen in Server-Logfiles erfasst:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– IP-Adresse des anfragenden Rechners</li>
                  <li>– Datum und Uhrzeit des Zugriffs</li>
                  <li>– Name und URL der abgerufenen Datei</li>
                  <li>– Übertragene Datenmenge</li>
                  <li>– HTTP-Statuscode</li>
                  <li>– Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                  <li>– Verwendeter Browser und Betriebssystem</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Daten sind technisch notwendig für die Auslieferung der Website und werden zur Gewährleistung der Systemsicherheit und -stabilität verarbeitet. Die Rechtsgrundlage ist unser berechtigtes Interesse (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO). Die Server-Logfiles werden nach 30 Tagen automatisch gelöscht.
                </p>

                {/* 4. TLS-Verschlüsselung */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">4. TLS-Verschlüsselung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung (Transport Layer Security, Nachfolger von SSL) mit mindestens TLS 1.2. Eine verschlüsselte Verbindung erkennen Sie an dem Schloss-Symbol in der Adresszeile Ihres Browsers und daran, dass die Adresszeile mit «https://» beginnt.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wenn die TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
                </p>

                {/* 5. Cookies */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">5. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die Ihr Browser speichert. Sie richten keinen Schaden an und enthalten keine Schadsoftware.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Technisch notwendige Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wir setzen technisch notwendige Cookies ein, die für den Betrieb der Website erforderlich sind (z. B. Session-Cookies). Diese Cookies werden nach Beendigung der Browser-Sitzung automatisch gelöscht. Die Rechtsgrundlage ist unser berechtigtes Interesse an einem funktionsfähigen Internetauftritt (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Analyse-Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Darüber hinaus werden durch Google Analytics 4 folgende Cookies gesetzt:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– <strong>_ga</strong>: Unterscheidung eindeutiger Nutzer, Speicherdauer: 2 Jahre</li>
                  <li>– <strong>_ga_*</strong>: Speicherung des Sitzungsstatus, Speicherdauer: 2 Jahre</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Die Rechtsgrundlage für Analyse-Cookies ist Ihre Einwilligung (Art. 6 Abs. 6 nDSG / Art. 6 Abs. 1 lit. a DSGVO).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Cookie-Verwaltung</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sie können Ihren Browser so konfigurieren, dass keine Cookies auf Ihrem Endgerät gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird. Die vollständige Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht alle Funktionen unserer Website nutzen können.
                </p>

                {/* 6. Google Tag Manager */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">6. Google Tag Manager</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website verwendet den Google Tag Manager (Container-ID: <strong>GTM-TLXXF8V</strong>), einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Der Google Tag Manager ist ein Verwaltungstool, mit dem wir Website-Tags über eine Benutzeroberfläche verwalten können. Der Tag Manager selbst erhebt keine personenbezogenen Daten und setzt keine Cookies. Er löst lediglich andere Tags aus, die ihrerseits Daten erfassen können (siehe Abschnitt 7: Google Analytics 4).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Die Rechtsgrundlage für die Nutzung ist unser berechtigtes Interesse an einer effizienten Verwaltung unserer Website-Tools (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>
                </p>

                {/* 7. Google Analytics 4 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">7. Google Analytics 4</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website nutzt Google Analytics 4 (GA4), einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wir verwenden die Measurement-ID: <strong>G-40Z9HJ9DH4</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Google Analytics 4 verwendet ein ereignisbasiertes Datenmodell und setzt Cookies, die eine Analyse der Benutzung der Website ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google übertragen und dort gespeichert.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>IP-Adressen:</strong> Google Analytics 4 speichert standardmässig keine vollständigen IP-Adressen. Die IP-Anonymisierung erfolgt automatisch, sodass Ihre IP-Adresse vor der Speicherung gekürzt wird.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Rechtsgrundlage:</strong> Die Nutzung von Google Analytics erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 6 nDSG / Art. 6 Abs. 1 lit. a DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Aufbewahrungsdauer:</strong> Die von uns gesendeten und mit Cookies verknüpften Daten werden nach 14 Monaten automatisch gelöscht.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Widerspruch gegen Datenerfassung:</strong> Sie können die Erfassung Ihrer Daten durch Google Analytics verhindern, indem Sie das unter folgendem Link verfügbare Browser-Add-on herunterladen und installieren: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Datenübermittlung in die USA:</strong> Google kann Daten in die USA übermitteln. Google hat sich zur Einhaltung des EU-US Data Privacy Framework sowie des Swiss-US Data Privacy Framework verpflichtet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Weitere Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a>
                </p>

                {/* 8. Google Fonts */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">8. Google Fonts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts, bereitgestellt von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beim Aufrufen einer Seite lädt Ihr Browser die benötigte Schriftart («Inter») von den Google-Servern (fonts.googleapis.com und fonts.gstatic.com). Dabei wird Ihre IP-Adresse an Google übermittelt. Dies ist technisch notwendig, damit die Schriftart korrekt dargestellt werden kann.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Die Rechtsgrundlage ist unser berechtigtes Interesse an einer einheitlichen und ansprechenden Darstellung unserer Website (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Datenschutzerklärung</a> | <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Fonts FAQ</a>
                </p>

                {/* 9. Kontaktformular und E-Mail-Versand */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">9. Kontaktformular und E-Mail-Versand</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wenn Sie uns über das Kontaktformular auf unserer Website kontaktieren, werden folgende Daten erhoben:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– Name (erforderlich)</li>
                  <li>– E-Mail-Adresse (erforderlich)</li>
                  <li>– Telefonnummer (freiwillig)</li>
                  <li>– Gewünschte Dienstleistung (freiwillig)</li>
                  <li>– Nachricht (freiwillig)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Technische Verarbeitung:</strong> Ihre Angaben werden über eine Supabase Edge Function verarbeitet und mittels des E-Mail-Dienstes SMTP2GO an info@baederberg.ch weitergeleitet (siehe Abschnitte 10 und 11).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Zweck:</strong> Beantwortung Ihrer Anfrage, Erstellung von Angeboten und Abwicklung vorvertraglicher Massnahmen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Rechtsgrundlage:</strong> Durchführung vorvertraglicher Massnahmen (Art. 6 Abs. 1 lit. b DSGVO) sowie Ihre Einwilligung durch das Absenden des Formulars (Art. 6 Abs. 6 nDSG / Art. 6 Abs. 1 lit. a DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Aufbewahrungsdauer:</strong> Kontaktanfragen werden für die Dauer der Bearbeitung und anschliessend für 3 Jahre aufbewahrt (gesetzliche Verjährungsfrist).
                </p>

                {/* 10. Supabase (Backend-Dienste) */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">10. Supabase (Backend-Dienste)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Für die technische Verarbeitung von Kontaktformularen sowie für die Verwaltung unserer Website-Inhalte nutzen wir Supabase, einen Backend-Dienst der Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Supabase stellt Datenbank-, Authentifizierungs- und Serverless-Funktionen bereit. Im Rahmen der Kontaktformularverarbeitung werden Ihre Angaben vorübergehend über eine Supabase Edge Function verarbeitet und per E-Mail weitergeleitet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Rechtsgrundlage:</strong> Vertragserfüllung und berechtigtes Interesse an einem zuverlässigen technischen Betrieb (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mit Supabase besteht ein Auftragsverarbeitungsvertrag (Data Processing Agreement).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Weitere Informationen: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://supabase.com/privacy</a>
                </p>

                {/* 11. SMTP2GO (E-Mail-Versand) */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">11. SMTP2GO (E-Mail-Versand)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Für den Versand von E-Mails aus dem Kontaktformular nutzen wir den Dienst SMTP2GO, ein Produkt der Garey PTY Ltd mit Sitz in Neuseeland.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Dabei werden die im Kontaktformular eingegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Dienstleistung, Nachricht) an die SMTP2GO-Server übermittelt und als E-Mail an uns weitergeleitet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Neuseeland wird sowohl von der Europäischen Kommission als auch vom Schweizer Bundesrat als Land mit angemessenem Datenschutzniveau anerkannt.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Rechtsgrundlage:</strong> Berechtigtes Interesse an einer zuverlässigen E-Mail-Zustellung (Art. 31 Abs. 1 nDSG / Art. 6 Abs. 1 lit. f DSGVO).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Weitere Informationen: <a href="https://www.smtp2go.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.smtp2go.com/privacy</a>
                </p>

                {/* 12. Auftragsverarbeiter */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">12. Auftragsverarbeiter</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir setzen zur Erbringung unserer Dienste die folgenden Auftragsverarbeiter ein, mit denen jeweils ein Auftragsverarbeitungsvertrag (AVV) gemäss Art. 9 nDSG bzw. Art. 28 DSGVO abgeschlossen wurde:
                </p>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>– <strong>Amazon Web Services EMEA SARL</strong> (Hosting, Frankfurt am Main, Deutschland)</li>
                  <li>– <strong>Google Ireland Limited</strong> (Google Tag Manager, Google Analytics 4, Google Fonts – Dublin, Irland)</li>
                  <li>– <strong>Supabase Inc.</strong> (Backend-Dienste – Singapur)</li>
                  <li>– <strong>Garey PTY Ltd / SMTP2GO</strong> (E-Mail-Versand – Neuseeland)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Alle Auftragsverarbeiter sind vertraglich verpflichtet, personenbezogene Daten nur auf unsere Weisung hin zu verarbeiten und angemessene technische und organisatorische Sicherheitsmassnahmen einzuhalten.
                </p>

                {/* 13. Datenübermittlung ins Ausland */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">13. Datenübermittlung ins Ausland</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Im Rahmen unserer Datenverarbeitung können personenbezogene Daten in folgende Länder übermittelt werden (Art. 16–17 nDSG / Art. 44–49 DSGVO):
                </p>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>– <strong>Deutschland</strong> (Hosting bei AWS Frankfurt): Angemessenes Datenschutzniveau anerkannt durch den Schweizer Bundesrat und die EU.</li>
                  <li>– <strong>Irland / EU</strong> (Google-Dienste): Angemessenes Datenschutzniveau innerhalb des EWR.</li>
                  <li>– <strong>USA</strong> (Google, Supabase): Übermittlung gestützt auf das EU-US Data Privacy Framework und das Swiss-US Data Privacy Framework. Die betreffenden Unternehmen sind unter dem DPF zertifiziert.</li>
                  <li>– <strong>Neuseeland</strong> (SMTP2GO): Angemessenes Datenschutzniveau anerkannt durch die EU-Kommission und den Schweizer Bundesrat.</li>
                  <li>– <strong>Singapur</strong> (Supabase): Übermittlung gestützt auf Standardvertragsklauseln (Standard Contractual Clauses, SCCs) gemäss Art. 46 Abs. 2 lit. c DSGVO.</li>
                </ul>

                {/* 14. Aufbewahrungsdauer */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">14. Aufbewahrungsdauer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder eine gesetzliche Aufbewahrungspflicht besteht:
                </p>
                <ul className="text-muted-foreground space-y-2 ml-4">
                  <li>– <strong>Server-Logfiles:</strong> 30 Tage</li>
                  <li>– <strong>Google Analytics Daten:</strong> 14 Monate</li>
                  <li>– <strong>Analyse-Cookies (_ga, _ga_*):</strong> 2 Jahre</li>
                  <li>– <strong>Kontaktanfragen:</strong> Dauer der Bearbeitung, danach 3 Jahre (gesetzliche Verjährungsfrist)</li>
                  <li>– <strong>Vertragsbezogene Daten:</strong> 10 Jahre (Aufbewahrungspflicht gemäss Art. 958f OR)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Nach Ablauf der Aufbewahrungsfrist werden die Daten gelöscht, sofern keine gesetzliche Aufbewahrungspflicht entgegensteht.
                </p>

                {/* 15. Ihre Rechte */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">15. Ihre Rechte</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Rechte nach Schweizer Datenschutzgesetz (nDSG)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sie haben gemäss dem nDSG folgende Rechte:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– <strong>Auskunftsrecht</strong> (Art. 25 nDSG): Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten.</li>
                  <li>– <strong>Recht auf Datenherausgabe und -übertragung</strong> (Art. 28 nDSG): Sie können verlangen, dass wir Ihnen Ihre Daten in einem gängigen elektronischen Format herausgeben oder an einen anderen Verantwortlichen übertragen.</li>
                  <li>– <strong>Recht auf Berichtigung</strong>: Sie können die Berichtigung unrichtiger personenbezogener Daten verlangen.</li>
                  <li>– <strong>Recht auf Löschung</strong>: Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
                  <li>– <strong>Recht auf Widerspruch</strong>: Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Zusätzliche Rechte nach DSGVO (für EU/EWR-Besucher)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Für Besucherinnen und Besucher aus dem EWR gelten zusätzlich:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO)</li>
                  <li>– <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO)</li>
                  <li>– <strong>Recht auf Löschung</strong> (Art. 17 DSGVO)</li>
                  <li>– <strong>Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
                  <li>– <strong>Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
                  <li>– <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)</li>
                  <li>– <strong>Recht auf Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO): Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Ausübung Ihrer Rechte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Zur Ausübung Ihrer Rechte wenden Sie sich bitte schriftlich an:
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bäderberg GmbH<br />
                  Zugerstrasse 18<br />
                  8805 Richterswil<br />
                  E-Mail: info@baederberg.ch
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Zur Überprüfung Ihrer Identität können wir zusätzliche Informationen anfordern. Wir werden Ihr Anliegen in der Regel innerhalb von 30 Tagen beantworten.
                </p>

                {/* 16. Automatisierte Einzelentscheidungen und Profiling */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">16. Automatisierte Einzelentscheidungen und Profiling</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Es findet keine automatisierte Entscheidungsfindung oder Profiling im Sinne von Art. 21 nDSG bzw. Art. 22 DSGVO statt. Google Analytics erstellt pseudonymisierte Nutzungsprofile ausschliesslich zu statistischen Zwecken; es werden daraus keine individuellen Entscheidungen abgeleitet.
                </p>

                {/* 17. Aufsichtsbehörde */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">17. Aufsichtsbehörde</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen das Datenschutzrecht verstösst, haben Sie das Recht, eine Beschwerde einzureichen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Schweizer Aufsichtsbehörde:</strong>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB)<br />
                  Feldeggweg 1<br />
                  3003 Bern<br />
                  Schweiz<br />
                  Website: <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.edoeb.admin.ch</a>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Besucherinnen und Besucher aus dem EWR können sich zusätzlich an die zuständige Datenschutzaufsichtsbehörde ihres Wohnsitzlandes wenden.
                </p>

                {/* 18. Änderungen dieser Datenschutzerklärung */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">18. Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Wir empfehlen Ihnen, diese Seite regelmässig aufzurufen, um sich über den aktuellen Stand zu informieren. Wesentliche Änderungen werden durch Aktualisierung des nachfolgenden Datums kenntlich gemacht.
                </p>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Stand: März 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DatenschutzPage;
