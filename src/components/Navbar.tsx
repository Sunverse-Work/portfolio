"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { Locale } from "@/i18n/translations";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

export default function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => l.code === locale)!;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12 mix-blend-difference"
    >
      <Link href="/" className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-orange-600">
        W.
      </Link>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-purple-300">
        <Link href="#services" className="hover:text-purple-100 transition-colors">{t.nav.services}</Link>
        <Link href="#portfolio" className="hover:text-purple-100 transition-colors">{t.nav.work}</Link>
        <Link href="#process" className="hover:text-purple-100 transition-colors">{t.nav.process}</Link>
        <Link href="#contact" className="hover:text-purple-100 transition-colors">{t.nav.contact}</Link>
      </nav>

      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-purple-300 border border-purple-600/30 rounded-full px-3 py-2 hover:text-purple-100 hover:border-white/40 transition-colors"
          >
            <span>{current.flag}</span>
            <span>{current.label}</span>
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

        <button className="text-sm font-medium bg-[#0a0014] border border-purple-800/50 rounded-full px-6 py-2 hover:bg-[#2a005c] hover:border-orange-500/60 hover:text-white transition-all duration-300">
          {t.nav.letsTalk}
        </button>
      </div>
    </motion.header>
  );
}
