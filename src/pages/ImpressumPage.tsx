import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Impressum - Bäderberg"
        description="Impressum der Bäderberg GmbH. Kontaktinformationen und rechtliche Angaben."
      />
      <Header />
      
      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">
                Impressum
              </h1>
              
              <div className="prose prose-slate max-w-none space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Angaben gemäss Schweizer Recht</h2>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Firmenname und Rechtsform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bäderberg GmbH
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Adresse</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Zugerstrasse 18<br />
                  8805 Richterswil<br />
                  Schweiz
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Kontakt</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Telefon: +41 76 753 44 78<br />
                  E-Mail: info@baederberg.ch
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Vertretungsberechtigte Person</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Geschäftsführer: Serghei Capatina
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Handelsregister</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Eingetragen im Handelsregister des Kantons Zürich
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Haftungsausschluss</h2>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Haftung für Inhalte</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">Haftung für Links</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Urheberrecht</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Streitbeilegung</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>

                 <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">Webdesign & Programmierung</h2>
                 <p className="text-muted-foreground leading-relaxed">
                   <a href="https://walia-solutions.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                     Walia Solutions
                   </a>
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

export default ImpressumPage;
