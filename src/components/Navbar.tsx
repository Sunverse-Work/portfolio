"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { Locale } from "@/i18n/translations";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.svg";
import texture from "@/assets/texture.svg";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

function HeaderContactButton({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <button
      className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-medium overflow-hidden transition-all duration-300 whitespace-nowrap"
      style={{
        background: "radial-gradient(120% 120% at 20% 100%, rgba(140,50,255,0.3) 0%, #0a0014 80%)",
        border: "1px solid rgba(160, 80, 255, 0.3)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 20px -10px rgba(160, 80, 255, 0.3)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -30px 40px -10px rgba(160, 80, 255, 0.8)";
        (e.currentTarget as HTMLButtonElement).style.background = "radial-gradient(120% 120% at 20% 100%, rgba(160,80,255,0.5) 0%, #0a0014 80%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -10px 20px -10px rgba(160, 80, 255, 0.3)";
        (e.currentTarget as HTMLButtonElement).style.background = "radial-gradient(120% 120% at 20% 100%, rgba(140,50,255,0.3) 0%, #0a0014 80%)";
      }}
    >
      <div className="relative overflow-hidden flex items-center h-[1.2em] w-full">
        {/* Normal State */}
        <div className="flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-[150%] leading-none whitespace-nowrap">
          <span>{text}</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
        
        {/* Hover State (Staggered) */}
        <div className="absolute top-0 left-0 flex items-center gap-[4px] text-white leading-none whitespace-nowrap">
          {words.map((word, i) => (
            <span 
              key={i} 
              className="inline-block translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {word}
            </span>
          ))}
          <svg 
            className="w-4 h-4 ml-1 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" 
            style={{ transitionDelay: `${words.length * 100}ms` }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </button>
  );
}

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full ${
        scrolled 
          ? "bg-[#050505]/60 backdrop-blur-md border-b border-purple-600/15 shadow-2xl py-4" 
          : "bg-transparent py-6"
      }`}
    >
      {/* Texture overlay applied softly at the corners, only visible when scrolled */}
      <div 
        className={`absolute inset-0 z-[-1] pointer-events-none mix-blend-screen transition-opacity duration-500 ${scrolled ? "opacity-20" : "opacity-0"}`} 
        style={{ 
          backgroundImage: `url(${texture.src}), url(${texture.src})`, 
          backgroundPosition: 'left center, right center',
          backgroundSize: '25% auto, 25% auto',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)',
          maskImage: 'linear-gradient(to right, black 0%, transparent 20%, transparent 80%, black 100%)'
        }} 
      />

      <div className="max-w-[1920px] mx-auto w-full px-8 md:px-20 lg:px-32 flex items-center justify-between">
        {/* Left (Logo) */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center transition-transform hover:scale-105 active:scale-95">
            <img src={logo.src} alt="Logo" className="w-auto h-12 md:h-16" />
          </Link>
        </div>

        {/* Center (Links) */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 text-sm font-medium text-purple-300">
          <Link href="#services" className="hover:text-purple-100 transition-colors">{t.nav.services}</Link>
          <Link href="#portfolio" className="hover:text-purple-100 transition-colors">{t.nav.work}</Link>
          <Link href="#process" className="hover:text-purple-100 transition-colors">{t.nav.process}</Link>
          <Link href="#contact" className="hover:text-purple-100 transition-colors">{t.nav.contact}</Link>
        </nav>

        {/* Right (Lang + Button) */}
        <div className="flex-1 flex justify-end items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-purple-300 border border-purple-600/30 rounded-full px-4 py-2 hover:text-purple-100 hover:border-white/40 transition-colors"
            >
              <span>{current.flag}</span>
              <span className="hidden sm:inline">{current.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-28 bg-[#1a0b2e] border border-purple-600/20 rounded-xl overflow-hidden shadow-xl"
                >
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLocale(l.code); setOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                        l.code === locale
                          ? "text-white bg-purple-900/60"
                          : "text-purple-300 hover:text-purple-100 hover:bg-purple-900/40"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <HeaderContactButton text={t.nav.letsTalk} />
        </div>
      </div>
    </header>
  );
}
