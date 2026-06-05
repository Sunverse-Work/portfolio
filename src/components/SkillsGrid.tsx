"use client";

import { motion } from "framer-motion";
import { Figma, Github, Code2, Atom } from "lucide-react";
import { SiBlender } from "react-icons/si";
import { useI18n } from "@/i18n/I18nContext";

const AdobeIcon = ({ letters, className, strokeWidth = 1.5 }: { letters: string, className?: string, strokeWidth?: number }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="4" ry="4" />
        <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="sans-serif" fill="currentColor" stroke="none" style={{ letterSpacing: "-0.5px" }}>{letters}</text>
    </svg>
);

const ICONS = [
    { icon: <Figma className="w-6 h-6" strokeWidth={1.5} />, delay: 0 },
    { icon: <AdobeIcon letters="Ae" className="w-6 h-6" strokeWidth={1.5} />, delay: 0.2 },
    { icon: <AdobeIcon letters="Ps" className="w-6 h-6" strokeWidth={1.5} />, delay: 0.4 },
    { icon: <AdobeIcon letters="Ai" className="w-6 h-6" strokeWidth={1.5} />, delay: 0.1 },
    { icon: <SiBlender className="w-5 h-5" />, delay: 0.3 }, // Represents Blender directly
    { icon: <Code2 className="w-6 h-6" strokeWidth={1.5} />, delay: 0.5 }, // Represents Code / VS Code
    { icon: <Github className="w-6 h-6" strokeWidth={1.5} />, delay: 0.2 },
    { icon: <Atom className="w-6 h-6" strokeWidth={1.5} />, delay: 0.4 }, // Represents React
];

export default function SkillsGrid() {
    const { t } = useI18n();

    return (
        <section className="relative px-4 py-24 md:py-32 max-w-7xl mx-auto overflow-hidden" id="process">


            <div className="mb-20 text-center relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-4 block"
                >
                    {t.skills.label}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                >
                    {t.skills.title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                    className="text-purple-300/80 max-w-lg mx-auto"
                >
                    {t.skills.subtitle}
                </motion.p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[2/1] flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-96 md:h-96 rotate-45 flex items-center justify-center">
                    {ICONS.map((item, i) => {
                        const row = Math.floor(i / 3);
                        const col = i % 3;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: item.delay, ease: [0.25, 1, 0.5, 1] }}
                                className="absolute"
                                style={{
                                    top: `${(row * 33) + 10}%`,
                                    left: `${(col * 33) + 10}%`,
                                }}
                            >
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: item.delay,
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="group w-16 h-16 md:w-20 md:h-20 bg-[#1a0b2e] border border-purple-600/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)_inset] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)_inset,0_0_40px_rgba(255,255,255,0.2)] hover:border-purple-600/60 hover:bg-purple-900/40 transition-all duration-300 -rotate-45 relative z-20 cursor-pointer pointer-events-auto"
                                >
                                    <div className="text-purple-200 group-hover:text-purple-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-300">
                                        {item.icon}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(2)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
            }} />
        </section>
    );
}
