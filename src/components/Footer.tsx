"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nContext";

export default function Footer() {
    const { t } = useI18n();

    return (
        <footer className="relative w-full px-4 md:px-10 pb-10 pt-32 overflow-hidden" id="contact">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="relative w-full rounded-3xl p-12 md:p-24 text-center overflow-hidden flex flex-col items-center justify-center min-h-[400px]"
                    style={{ background: "#0a0014", border: "1px solid rgba(168, 85, 247, 0.2)" }}
                >


                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 z-10 glow-text">
                        {t.footer.cta}
                    </h2>

                    <button className="z-10 group relative px-8 py-4 bg-[#0a0014] border border-purple-800/50 hover:border-orange-500/60 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                        <span className="relative z-10">{t.footer.startProject}</span>
                        <div className="absolute inset-0 bg-[#2a005c] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </button>
                </motion.div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mt-12 text-purple-300 text-sm">
                    <p>© {new Date().getFullYear()} Williams Junior. {t.footer.rights}</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-purple-100 transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-purple-100 transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-purple-100 transition-colors">Dribbble</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
