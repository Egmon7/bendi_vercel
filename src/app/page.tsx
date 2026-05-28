import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularRoutesSection } from "@/components/home/PopularRoutesSection";
import { AgenciesSection } from "@/components/home/AgenciesSection";
import { BottomSections } from "@/components/home/BottomSections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PopularRoutesSection />
        <AgenciesSection />
        <BottomSections />
        <section id="reservations" className="sr-only">
          Mes réservations
        </section>
      </main>
      <Footer />
    </>
  );
}
