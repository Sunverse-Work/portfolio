import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ServicesSlider from "@/components/ServicesSlider";
import HowWeWork from "@/components/HowWeWork";
import Portfolio from "@/components/Portfolio";
import Reviews from "@/components/Reviews";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip">
      <Navbar />
      <div className="w-full">
        <Hero />
        <Marquee />
        <ServicesSlider />
        <HowWeWork />
        <Portfolio />
        <Reviews />
        <Team />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
