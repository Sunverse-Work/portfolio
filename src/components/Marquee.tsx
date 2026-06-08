"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 text-purple-600 flex-shrink-0">
        <path d="M12 2C12 2 12 10.5 20.5 12C12 13.5 12 22 12 22C12 22 12 13.5 3.5 12C12 10.5 12 2 12 2Z" fill="currentColor"/>
    </svg>
);

export default function Marquee() {
    const { t } = useI18n();
    
    // Fallback if marquee is not in translation file for some reason
    const keywords = (t.hero as any).marquee || [
        "Usabilidade", 
        "Carregamento Rápido", 
        "Conversão em foco", 
        "Design Premium",
        "Alta Performance",
        "Fácil Navegação"
    ];

    // Duplicate array multiple times to create a seamless loop
    const half = [...keywords, ...keywords, ...keywords];
    const full = [...half, ...half]; // Double it so it's safely wide enough

    return (
        <div className="w-full py-6 md:py-8 bg-black/40 border-y border-purple-900/20 overflow-hidden flex relative z-10 backdrop-blur-sm">
            {/* Soft gradient masks on edges */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#05000f] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#05000f] to-transparent z-20 pointer-events-none" />

            <motion.div
                className="flex items-center gap-8 md:gap-16 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 70, ease: "linear", repeat: Infinity }}
            >
                {full.map((word: string, i: number) => (
                    <div key={i} className="flex items-center gap-8 md:gap-16 whitespace-nowrap">
                        <span className="text-lg md:text-2xl font-light text-white/80 tracking-wider uppercase whitespace-nowrap">
                            {word}
                        </span>
                        <StarIcon />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
