import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#090a0f] text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
