"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useI18n } from "@/i18n/I18nContext";

const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

export default function Hero() {
    const { t } = useI18n();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden" id="home">
            <div className="absolute inset-0 z-0">
                <Beams
                    beamWidth={2.5}
                    beamHeight={23}
                    beamNumber={16}
                    lightColor="#7e22ce"
                    speed={4}
                    noiseIntensity={0.75}
                    scale={0.15}
                    rotation={145}
                />
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
                >
                    {t.hero.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-purple-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#0a0014] border border-purple-800/50 hover:border-orange-500/60 text-white rounded-full font-medium overflow-hidden isolated transition-all duration-300"
                >
                    <span className="relative z-10">{t.hero.cta}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                    <motion.div
                        className="absolute inset-0 bg-[#2a005c] opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"
                    />
                </motion.button>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
            >
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-300">
                    {t.hero.scroll}
                </span>
                <div className="relative w-[2px] h-16 bg-purple-900/40 overflow-hidden rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>
        </section>
    );
}
