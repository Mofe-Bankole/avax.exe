import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import GameMarquee from "@/components/game-marquee";
import FeatureSections from "@/components/feature-sections";
import TournamentSection from "@/components/tournament-section";
import BuilderCTA from "@/components/builder-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <GameMarquee />
        <FeatureSections />
        <TournamentSection />
        <BuilderCTA />
      </main>
      <Footer />
    </div>
  );
}
