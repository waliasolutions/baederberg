import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const DatenschutzPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Datenschutzerklärung - Bäderberg"
        description="Datenschutzerklärung der Bäderberg GmbH. Informationen zum Umgang mit Ihren personenbezogenen Daten."
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
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">1. Verantwortliche Stelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
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

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">a) Beim Besuch der Website</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– IP-Adresse des anfragenden Rechners</li>
                  <li>– Datum und Uhrzeit des Zugriffs</li>
                  <li>– Name und URL der abgerufenen Datei</li>
                  <li>– Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                  <li>– Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Bei Nutzung unseres Kontaktformulars</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig getätigt werden.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">3. Zweck der Datenverarbeitung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die Verarbeitung der personenbezogenen Daten erfolgt zu folgenden Zwecken:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– Gewährleistung eines reibungslosen Verbindungsaufbaus der Website</li>
                  <li>– Gewährleistung einer komfortablen Nutzung unserer Website</li>
                  <li>– Auswertung der Systemsicherheit und -stabilität</li>
                  <li>– Beantwortung von Kontaktanfragen</li>
                  <li>– Erstellung von Angeboten und Abwicklung von Aufträgen</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">4. Rechtsgrundlage</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die Verarbeitung personenbezogener Daten erfolgt auf Grundlage des schweizerischen Datenschutzgesetzes (DSG) sowie – soweit anwendbar – der Datenschutz-Grundverordnung (DSGVO) der Europäischen Union.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Die Rechtsgrundlage für die Verarbeitung ergibt sich aus berechtigten Interessen (Art. 6 Abs. 1 lit. f DSGVO) zur Gewährleistung eines sicheren und effizienten Website-Betriebs sowie aus der Erfüllung eines Vertrags oder vorvertraglicher Massnahmen (Art. 6 Abs. 1 lit. b DSGVO).
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">5. Weitergabe von Daten</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– Sie Ihre ausdrückliche Einwilligung erteilt haben</li>
                  <li>– die Weitergabe zur Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist</li>
                  <li>– die Weitergabe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist</li>
                  <li>– eine gesetzliche Verpflichtung zur Weitergabe besteht</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">6. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir setzen auf unserer Website Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite besuchen. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identität erhalten.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder stets ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">7. Ihre Rechte</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sie haben das Recht:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen</li>
                  <li>– Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                  <li>– die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                  <li>– die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen</li>
                  <li>– Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen</li>
                  <li>– Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten</li>
                </ul>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">8. Datensicherheit</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Ob eine einzelne Seite unseres Internetauftrittes verschlüsselt übertragen wird, erkennen Sie an der geschlossenen Darstellung des Schlüssel- beziehungsweise Schloss-Symbols in der Statusleiste Ihres Browsers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmassnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">9. Kontakt für Datenschutzanfragen</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten wenden Sie sich bitte an:
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Bäderberg GmbH<br />
                  Zugerstrasse 18<br />
                  8805 Richterswil<br />
                  E-Mail: info@baederberg.ch
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">10. Änderungen dieser Datenschutzerklärung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Stand: Januar 2025
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
