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
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8">
                Allgemeine Geschäftsbedingungen (AGB) der Bäderberg GmbH
              </h1>
              
              <div className="prose prose-slate max-w-none space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Diese Allgemeinen Geschäftsbedingungen (AGB) finden auf alle von der Bäderberg GmbH (nachfolgend Unternehmerin genannt) angebotenen Dienstleistungen Anwendung. Sie regeln die allgemeinen Aspekte der Erbringung von Leistungen an den Kunden/Besteller (nachfolgend Kunde genannt) im Rahmen eines oder mehrerer Verträge oder Rahmenverträge.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mit der Auftragserteilung gegenüber der Unternehmerin gelten die nachfolgenden Bedingungen unverändert und vollumfänglich als akzeptiert.
                </p>

                {/* Section 1 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">1) Grundlagen, Geltungsbereich</h2>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">a) Grundlagen Werkvertrag</h3>
                <p className="text-muted-foreground mb-2">Für das Vertragsverhältnis gelten:</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-4">
                  <li>diese AGB,</li>
                  <li>das Schweizerische Obligationenrecht (OR),</li>
                  <li>soweit im Angebot, in der Auftragsbestätigung oder im Werkvertrag ausdrücklich vereinbart: die SIA-Norm 118 (Allgemeine Bedingungen für Bauarbeiten).</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Rangordnung / Vorrang</h3>
                <p className="text-muted-foreground mb-2">Massgebend für Umfang, Menge und Ausführung sind (in dieser Reihenfolge):</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– unterschriebene Offerte / Angebot,</li>
                  <li>– Auftragsbestätigung (inkl. Verweisunterlagen),</li>
                  <li>– Werkvertrag (sofern separat),</li>
                  <li>– Termin- und Bauablaufplanung (soweit Vertragsbestandteil),</li>
                  <li>– Nachtragsofferten / Nachträge,</li>
                  <li>– Nachbestellungen / Werkvertragsergänzungen,</li>
                  <li>– Regierapporte / Protokolle.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Individuelle schriftliche Vereinbarungen gehen diesen AGB vor.
                </p>
                <p className="text-muted-foreground">
                  Entgegenstehende allgemeine Geschäftsbedingungen des Kunden finden keine Anwendung; diese AGB gehen vor.
                </p>
                <p className="text-muted-foreground">
                  Diese AGB gelten bis zur Bekanntgabe einer neuen Fassung auch für Folgeleistungen zwischen Unternehmerin und Kunde.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Leistungsabgrenzung</h3>
                <p className="text-muted-foreground">
                  Lieferungen und Leistungen, die nicht ausdrücklich in der Auftragsbestätigung und/oder in weiteren Vertragsbestandteilen enthalten sind, sind nicht im vereinbarten Preis enthalten und werden zusätzlich in Rechnung gestellt.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">d) Projektierung / Planung / Honorare / Koordination</h3>
                <p className="text-muted-foreground">
                  Entwurfs-, Planungs- und Projektierungsleistungen werden ausschliesslich bei entsprechender Beauftragung gemäss separater Planungs-/Projektierungsvereinbarung honoriert.
                </p>
                <p className="text-muted-foreground">
                  Gestalterische und technische Gesamtplanungen (z. B. Haustechnik, Elektro/Sanitär, Küchenplanung, Innenarchitektur/Raumgestaltung, Möbel- und Einrichtungsgestaltung etc.) werden – soweit beauftragt – gemäss separater Vereinbarung honoriert.
                </p>
                <p className="text-muted-foreground">
                  Koordinationsleistungen (insbesondere Koordination zwischen Kunde und Lieferanten sowie zwischen Projekt und Dritten) stellen eine gesondert zu vergütende Zusatzleistung dar und werden – sofern beauftragt – nach Vereinbarung abgerechnet.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">e) Urheberrechte / Eigentum an Offertunterlagen</h3>
                <p className="text-muted-foreground">
                  Offerten, Zeichnungen sowie Muster bleiben Eigentum der Unternehmerin. Eine Weitergabe an Dritte (insbesondere Mitbewerber) ist untersagt; zulässig ist ausschliesslich die vertragsgemässe Verwendung.
                </p>
                <p className="text-muted-foreground">
                  Bei Verletzung der Urheberrechte ist die Unternehmerin berechtigt, einen pauschalen Schadenersatz in der Höhe des vereinbarten bzw. offerierten Leistungshonorars geltend zu machen.
                </p>

                {/* Section 2 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">2) Angebot und Auftragserteilung</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Verbindlichkeit und Gültigkeit von Offerten</h3>
                <p className="text-muted-foreground">
                  Offerten der Unternehmerin sind ausschliesslich schriftlich und während der in der Offerte genannten Frist verbindlich. Fehlt eine entsprechende Fristangabe, beträgt die Gültigkeit des Angebots 30 Tage ab dem Datum der Angebotsabgabe. Mündliche Angebote sind unverbindlich und freibleibend.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Preise und Mehrwertsteuer</h3>
                <p className="text-muted-foreground">
                  Sofern nicht ausdrücklich anders vermerkt, ist die gesetzliche Mehrwertsteuer im Angebotspreis nicht enthalten und zusätzlich zu vergüten. Sämtliche Preise verstehen sich in Schweizer Franken (CHF).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Vertragsabschluss und Annahme der Offerte</h3>
                <p className="text-muted-foreground mb-2">Der Vertragsabschluss kommt zustande durch</p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– die schriftliche Annahme der Offerte, insbesondere durch unterzeichnete Rücksendung, oder</li>
                  <li>– durch Annahme per E-Mail, WhatsApp oder über andere elektronische Kommunikationskanäle, oder</li>
                  <li>– konkludent durch die Inanspruchnahme der angebotenen Dienstleistungen, insbesondere durch Arbeitsbeginn.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Die Unternehmerin ist berechtigt, ihre Leistungen zu verweigern oder einzustellen, solange keine klare und eindeutige Annahme der Offerte bzw. keine Auftragsbestätigung vorliegt.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">d) Ausschreibungsunterlagen / Fehlangaben</h3>
                <p className="text-muted-foreground">
                  Die Unternehmerin haftet nicht für Fehlangaben im Angebot, soweit diese auf unvollständigen, falschen oder unterlassenen Informationen des Kunden beruhen. Eine Prüfung der Richtigkeit und Fehlerlosigkeit allfälliger vom Kunden übergebener Ausschreibungs- oder Projektunterlagen ist nicht geschuldet.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">e) Erweiterung/Änderung Auftragsvolumen</h3>
                <p className="text-muted-foreground">
                  Bei nachträglicher Erweiterung oder Änderung des Auftragsvolumens gelten die Regelungen und Konditionen der ursprünglichen Auftragsbestätigung (inkl. AGB) unverändert fort, sofern keine abweichende schriftliche Vereinbarung getroffen wird.
                </p>

                {/* Section 3 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">3) Ausführung / Lieferung</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Mitwirkungspflichten / Angaben</h3>
                <p className="text-muted-foreground">
                  Der Kunde hat der Unternehmerin sämtliche für die Bauausführung erforderlichen Angaben auf erste Aufforderung rechtzeitig und vollständig zur Verfügung zu stellen (z. B. Angaben zu Aufbauten, Leitungsführungen in Boden/Decke/Wänden, Untergründen, Plänen, Zugängen).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Mehrvergütungstatbestände</h3>
                <p className="text-muted-foreground mb-2">
                  Unabhängig von der vereinbarten Vergütungsart (Einheits-, Global- oder Pauschalpreis) besteht ein Anspruch der Unternehmerin auf Mehrvergütung insbesondere bei:
                </p>
                <ol className="list-[lower-roman] list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Bestellungsänderungen mit Leistungsänderung;</li>
                  <li>Um- und Neuinstallationen von Baustelleneinrichtungen;</li>
                  <li>bauseitig bedingten Bauunterbrüchen;</li>
                  <li>Verwirklichung eines Baugrundrisikos;</li>
                  <li>ausserordentlichen Umständen gemäss Art. 59 SIA-Norm 118 (u. a. Wassereinbrüche, Erdbeben, Sturm, Gasaustritte, Schadstoffbelastungen, Epidemie/Pandemie, Krieg/kriegsähnliche Ereignisse, einschneidende behördliche Massnahmen, Störung des Arbeitsfriedens, Störung der Lieferkette etc.).</li>
                </ol>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Bewilligungen</h3>
                <p className="text-muted-foreground">
                  Die Einholung sämtlicher notwendiger Bewilligungen und Berechtigungen obliegt dem Kunden. Deren Vorliegen wird bei Arbeitsbeginn vorausgesetzt.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">d) Parkplatz- und Zufahrtsregelung</h3>
                <p className="text-muted-foreground">
                  Der Kunde hat der Unternehmerin für die Dauer der Arbeiten geeignete und rechtlich zulässige Park- und Zufahrtsmöglichkeiten für Servicefahrzeuge, Lieferwagen sowie Abfallcontainer bereitzustellen oder zu organisieren.
                </p>
                <p className="text-muted-foreground">
                  Unzutreffende oder unvollständige Angaben zu Park- oder Zufahrtsmöglichkeiten gehen zulasten des Kunden. Sämtliche daraus entstehenden Kosten (insbesondere Bussen, Gebühren, Abschlepp- und Mehraufwände) sind der Unternehmerin vom Kunden zu erstatten.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">e) Arbeitsrapporte / Regie</h3>
                <p className="text-muted-foreground">
                  Arbeits- und Regierapporte sind vom Kunden unverzüglich nach Kenntnisnahme zu prüfen und schriftlich sowie substantiiert zu bestätigen oder zu beanstanden, soweit deren Inhalt für den weiteren Arbeitsablauf relevant ist. Verzögert der Kunde die Rückmeldung ohne sachlichen Grund und kommt es dadurch zu Unterbrüchen, Verzögerungen oder Mehrkosten, gehen diese zulasten des Kunden.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">f) Vertretungs- und Abschlussbefugnis</h3>
                <p className="text-muted-foreground">
                  Mitarbeitende der Unternehmerin sind nicht vertretungs- oder abschlussbefugt. Vertragsänderungen, Zusagen oder Nachträge sind nur verbindlich, wenn sie von der Unternehmerin ausdrücklich genehmigt wurden.
                </p>

                {/* Section 4 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">4) Lieferung / Material / Logistik / Koordination</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Leistungsumfang / Keine Lieferpflicht</h3>
                <p className="text-muted-foreground">
                  Die Unternehmerin schuldet primär Bau-, Umbau- und Montageleistungen. Eine Lieferpflicht für Materialien/Produkte besteht nur bei ausdrücklicher vertraglicher Vereinbarung (Offerte/Auftragsbestätigung/Werkvertrag).
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Kundenseitige Materialbeschaffung</h3>
                <p className="text-muted-foreground mb-2">
                  Beschafft der Kunde Materialien/Produkte selbst (insbesondere Sanitärprodukte, Wannen, Armaturen, Platten, Parkett, Bodenbeläge oder sonstige Materialien), trägt der Kunde die Verantwortung und das Risiko für:
                </p>
                <ul className="text-muted-foreground space-y-1 ml-4">
                  <li>– Qualität, Eignung und Konformität,</li>
                  <li>– vollständige Mengen inkl. Reserve und Verschnitt (insbesondere Wand- und Bodenbeläge),</li>
                  <li>– Liefertermine, Vollständigkeit, Kompatibilität.</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Die Unternehmerin übernimmt in diesen Fällen keine Garantie oder Gewährleistung für das kundenseitig beschaffte Material. Mehrkosten, Verzögerungen, Schäden oder Unterbrüche aufgrund fehlender, verspäteter, ungeeigneter oder mangelhafter Materialien gehen zulasten des Kunden und werden nach Aufwand verrechnet.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Bereitstellung des Materials</h3>
                <p className="text-muted-foreground">
                  Vom Kunden selbst beschafftes Material ist termingerecht durch den Kunden am Bauort an derjenigen Stelle zu platzieren, an der es bestimmungsgemäss eingebaut oder verwendet werden soll, insbesondere im jeweiligen Raum und auf der entsprechenden Stockebene.
                </p>
                <p className="text-muted-foreground">
                  Ist das Material bei Arbeitsbeginn nicht am erforderlichen Ort verfügbar, ist die Unternehmerin berechtigt, Transport-, Trage-, Deponie- und Verteilarbeiten zu erbringen und dem Kunden separat nach Aufwand zu verrechnen. Wartezeiten gelten als Regie.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">d) Koordination/Logistik als Zusatzauftrag</h3>
                <p className="text-muted-foreground">
                  Koordination zwischen Kunde und Lieferanten sowie Logistik- und Verteilkoordination für kundenseitig beschafftes Material ist nicht Bestandteil der Werkleistung.
                </p>
                <p className="text-muted-foreground">
                  Eine Übernahme solcher Leistungen durch die Unternehmerin erfolgt ausschliesslich bei gesonderter Beauftragung und wird separat nach Vereinbarung (Pauschale oder Regie) honoriert.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">e) Material über Partnerunternehmen / Unterstützung</h3>
                <p className="text-muted-foreground">
                  Werden Materialien über Partnerunternehmen bezogen, kann die Unternehmerin bei Mängeln oder Abklärungen unterstützend tätig werden (z. B. Koordination, Beizug Gutachter), sofern beauftragt.
                </p>
                <p className="text-muted-foreground">
                  Produktbezogene Garantie- und Gewährleistungsansprüche richten sich grundsätzlich nach dem Rechtsverhältnis zwischen Kunde und Lieferant/Hersteller, sofern nicht ausdrücklich anders vereinbart.
                </p>

                {/* Section 5 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">5) Gewährleistung / Haftung</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Gewährleistung</h3>
                <p className="text-muted-foreground">
                  Mängelrechte sowie Verjährung richten sich nach den anwendbaren SIA-Normen, insbesondere der SIA-Norm 118, sofern vertraglich vereinbart.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Baugrund und Statik</h3>
                <p className="text-muted-foreground">
                  Die Verantwortung für statische Berechnungen und konstruktive Ausbildungen trägt der Kunde, sofern nichts anderes ausdrücklich und schriftlich vereinbart ist. Gleiches gilt für Risiken aus der bestehenden Bausubstanz sowie aus Boden, Wand und Decke.
                </p>

                {/* Section 6 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">6) Zahlungsbedingungen</h2>
                <p className="text-muted-foreground">
                  Sofern keine abweichende schriftliche Vereinbarung besteht, sind sämtliche Rechnungen der Unternehmerin innert 30 Tagen ab Rechnungsstellung ohne Abzug zur Zahlung fällig. Es gelten folgende Teilzahlungen: 40 % der Auftragssumme sind vor Beginn der Arbeiten als Anzahlung zu leisten; die restlichen 60 % sind nach Abschluss der Arbeiten gemäss Schlussrechnung geschuldet.
                </p>
                <p className="text-muted-foreground">
                  Gerät der Kunde in Zahlungsverzug, schuldet er ab Fälligkeit einen Verzugszins von 5 %. Die Unternehmerin ist berechtigt, für jede Mahnung eine angemessene pauschale Bearbeitungsgebühr von CHF 25.– zu erheben.
                </p>

                {/* Section 7 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">7) Schlussbestimmungen</h2>

                <h3 className="text-lg font-semibold mt-6 mb-3">a) Eigentumsvorbehalt</h3>
                <p className="text-muted-foreground">
                  Soweit rechtlich zulässig, bleibt bewegliche Ware bis zur vollständigen Bezahlung Eigentum der Unternehmerin. Die Unternehmerin ist berechtigt, den Eigentumsvorbehalt in das Eigentumsvorbehaltsregister eintragen zu lassen.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">b) Verrechnung</h3>
                <p className="text-muted-foreground">
                  Die Verrechnung von Gegenforderungen des Kunden mit Forderungen der Unternehmerin ist, soweit gesetzlich zulässig, ausgeschlossen.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">c) Erfüllungsort</h3>
                <p className="text-muted-foreground">
                  Erfüllungsort für die Bezahlung des Werklohns ist der Sitz der Unternehmerin.
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">d) Recht und Gerichtsstand</h3>
                <p className="text-muted-foreground">
                  Auf das Vertragsverhältnis ist ausschliesslich schweizerisches Recht unter Ausschluss des Kollisionsrechts anwendbar. Ausschliesslicher Gerichtsstand ist der Sitz der Bäderberg GmbH in der Schweiz, soweit keine zwingenden gesetzlichen Bestimmungen entgegenstehen.
                </p>

                {/* Section 8 */}
                <h2 className="text-xl md:text-2xl font-semibold mt-10 mb-4">8) Inkrafttreten</h2>
                <p className="text-muted-foreground">
                  Diese AGB gelten ab Veröffentlichung bzw. Abgabe an den Kunden und bleiben bis zur Herausgabe einer neuen Fassung in Kraft.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AgbPage;
