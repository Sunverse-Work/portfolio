"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useI18n } from "@/i18n/I18nContext";
import { CtaButton } from "@/components/CtaButton";

const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

export default function Hero() {
    const { t } = useI18n();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Instead of a colored overlay, we use a mask on the background itself!
    // black = fully visible (under mouse)
    // rgba(0,0,0,0.1) = globally visible (away from mouse, dark again)
    const spotlightMask = useMotionTemplate`radial-gradient(1400px circle at ${springX}px ${springY}px, black 0%, rgba(0,0,0,0.08) 60%)`;

    const renderTitle = (text: string) => {
        const parts = text.split('*');
        return parts.map((part, i) => {
            if (i % 2 === 1) {
                return (
                    <span 
                        key={i} 
                        className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-purple-600 to-purple-200 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                        style={{ fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif" }}
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <section 
            className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden" 
            id="home"
            onMouseMove={handleMouseMove}
        >
            <motion.div 
                className="absolute inset-0 z-0"
                style={{ 
                    WebkitMaskImage: spotlightMask,
                    maskImage: spotlightMask
                }}
            >
                <Beams
                    beamWidth={2.5}
                    beamHeight={23}
                    beamNumber={16}
                    lightColor="#b026ff" // Highly saturated neon purple
                    speed={4}
                    noiseIntensity={0.75}
                    scale={0.15}
                    rotation={145}
                />
            </motion.div>

            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.05]"
                >
                    {renderTitle(t.hero.title)}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-purple-300 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1, ease: [0.25, 1, 0.5, 1] }}
                >
                    <CtaButton label={t.hero.cta} />
                </motion.div>
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
