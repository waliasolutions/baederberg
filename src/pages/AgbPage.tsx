import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const AgbPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Allgemeine Geschäftsbedingungen - Bäderberg"
        description="Allgemeine Geschäftsbedingungen der Bäderberg GmbH für Bad-, Küchen- und Innenausbau in der Schweiz."
      />
      <Header />
      
      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <div className="max-w-3xl mx-auto prose prose-slate">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">
                Allgemeine Geschäftsbedingungen
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Bäderberg GmbH, Zugerstrasse 18, 8805 Richterswil
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Geltungsbereich</h2>
              <p className="text-muted-foreground mb-4">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Bäderberg GmbH (nachfolgend "Bäderberg") und ihren Kunden über die Erbringung von Dienstleistungen im Bereich Bad-, Küchen- und Innenausbau.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Vertragsabschluss</h2>
              <p className="text-muted-foreground mb-4">
                Angebote von Bäderberg sind freibleibend. Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung von Bäderberg oder durch die Ausführung der Arbeiten zustande.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Preise und Zahlungsbedingungen</h2>
              <p className="text-muted-foreground mb-4">
                Die vereinbarten Preise verstehen sich inklusive Mehrwertsteuer. Zahlungen sind gemäss vereinbartem Zahlungsplan fällig, üblicherweise 30% bei Auftragserteilung, 60% bei Arbeitsbeginn und 10% nach Fertigstellung.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Ausführung der Arbeiten</h2>
              <p className="text-muted-foreground mb-4">
                Bäderberg verpflichtet sich, die Arbeiten fachgerecht und nach den anerkannten Regeln der Technik auszuführen. Der Kunde gewährt Bäderberg Zugang zu den Räumlichkeiten und stellt die notwendigen Anschlüsse zur Verfügung.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Gewährleistung</h2>
              <p className="text-muted-foreground mb-4">
                Bäderberg gewährt eine Garantie von 5 Jahren auf alle ausgeführten Arbeiten. Mängel sind innerhalb von 7 Tagen nach Entdeckung schriftlich zu melden.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Haftung</h2>
              <p className="text-muted-foreground mb-4">
                Die Haftung von Bäderberg beschränkt sich auf Vorsatz und grobe Fahrlässigkeit. Die Haftung für indirekte Schäden und entgangenen Gewinn ist ausgeschlossen.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Änderungen und Mehrarbeiten</h2>
              <p className="text-muted-foreground mb-4">
                Änderungswünsche des Kunden sind schriftlich mitzuteilen. Bäderberg erstellt für Mehrarbeiten einen Nachtrag zum ursprünglichen Angebot.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Kündigung</h2>
              <p className="text-muted-foreground mb-4">
                Eine Kündigung des Vertrages durch den Kunden ist nur aus wichtigem Grund möglich. Bereits erbrachte Leistungen und Material sind zu vergüten.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Datenschutz</h2>
              <p className="text-muted-foreground mb-4">
                Bäderberg behandelt alle Kundendaten vertraulich und gemäss den geltenden Datenschutzbestimmungen.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">10. Anwendbares Recht und Gerichtsstand</h2>
              <p className="text-muted-foreground mb-4">
                Es gilt Schweizer Recht. Gerichtsstand ist Richterswil.
              </p>

              <p className="text-muted-foreground mt-8 text-sm">
                Stand: Januar 2024
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgbPage;
