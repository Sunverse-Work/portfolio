import Hero from "@/components/Hero";
import ServicesBento from "@/components/ServicesBento";
import Portfolio from "@/components/Portfolio";
import SkillsGrid from "@/components/SkillsGrid";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden">
      <Navbar />
      <div className="w-full">
        <Hero />
        <ServicesBento />
        <Portfolio />
        <SkillsGrid />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
