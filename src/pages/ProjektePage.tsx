import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import SEOHead from '@/components/SEOHead';

const ProjektePage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden w-full">
      <SEOHead 
        title="Projekte | Bäderberg - Referenzen Badumbau & Innenausbau"
        description="Entdecken Sie unsere abgeschlossenen Projekte: Hochwertige Badumbauten und Innenausbauten in Zürich und Umgebung."
      />
      <Header />
      <main className="pt-24 md:pt-32">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default ProjektePage;
