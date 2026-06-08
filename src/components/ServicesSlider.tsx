"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, AnimatePresence } from "framer-motion";
import { Zap, Landmark, TrendingUp, Box } from "lucide-react";
import { useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { CtaButton } from "@/components/CtaButton";

const ICONS = [
    <Zap className="w-6 h-6 md:w-8 md:h-8" key="zap" />,
    <Landmark className="w-6 h-6 md:w-8 md:h-8" key="landmark" />,
    <TrendingUp className="w-6 h-6 md:w-8 md:h-8" key="trend" />,
    <Box className="w-6 h-6 md:w-8 md:h-8" key="box" />,
];

interface Service {
    title: string;
    description: string;
    badge?: string;
    icon: React.ReactNode;
}

function ServiceCard({ service, index, p, total }: { service: Service, index: number, p: MotionValue<number>, total: number }) {
    // d is the distance from the current active index (p)
    // If d > 0, the card is behind the active card.
    // We map progress up to 4 to allow an extra scroll step for the CTA button
    const d = useTransform(p, (val) => index - Math.min(val, 3));

    // Using arrays for transforms ensures perfect SSR and highly optimized Framer Motion performance
    // Cards fall down far out of view (3000px) when discarded. Waiting cards stay stacked neatly behind.
    const y = useTransform(d, [-3, -1, 0, 1, 2, 3], [3000, 1500, 0, -40, -80, -120]);
    const scale = useTransform(d, [-3, -1, 0, 1, 2, 3], [1, 1, 1, 0.95, 0.9, 0.85]);
    
    // Opacity: ALWAYS solid as requested
    const opacity = useTransform(d, [-3, 3], [1, 1]);

    // Blur and Brightness: 
    // - Falling cards get blurred.
    // - Waiting cards get darkened (brightness drops) instead of opacity, preventing text bleed-through!
    const filter = useTransform(
        d, 
        [-3, -1, 0, 1, 2, 3], 
        [
            "blur(12px) brightness(0.5)", 
            "blur(6px) brightness(0.8)", 
            "blur(0px) brightness(1)", 
            "blur(0px) brightness(0.4)", 
            "blur(0px) brightness(0.25)", 
            "blur(0px) brightness(0.1)"
        ]
    );

    // Rotation: active card tilts as it falls down
    const rotateZ = useTransform(d, [-3, -1, 0, 1, 2, 3], [-15, -5, 0, 0, 0, 0]);

    const zIndex = total - index; // Ensure earlier cards are stacked ON TOP of later cards

    return (
        <motion.div
            className={`group absolute inset-0 p-[1px] rounded-2xl overflow-hidden w-full h-full shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl`}
            style={{
                background: "linear-gradient(135deg, hsla(253, 87%, 15%, 0.50) 0%, hsla(253, 87%, 15%, 0.50) 100%)",
                y, scale, opacity, filter, rotateZ, zIndex
            }}
        >
            <div className="relative w-full h-full rounded-[15px] overflow-hidden flex flex-col justify-between z-10"
                style={{
                    background: "linear-gradient(135deg, hsla(253, 87%, 15%, 0.50) 0%, rgba(0, 0, 0, 0.95) 100%)",
                    borderTop: "1px solid hsla(253, 87%, 15%, 0.50)",
                }}>

                {/* Animated dot */}
                <motion.div
                    className="absolute w-[5px] h-[5px] bg-gradient-to-r from-purple-700 to-purple-300 rounded-full z-20 shadow-[0_0_10px_#a855f7]"
                    animate={{
                        top: ["10%", "10%", "90%", "90%", "10%"],
                        left: ["90%", "10%", "10%", "90%", "90%"]
                    }}
                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                    style={{ x: "-50%", y: "-50%" }}
                />

                {/* Grid Lines */}
                <div className="absolute w-full h-[1px] top-[10%] left-0 bg-gradient-to-r from-purple-900 to-purple-400/20" />
                <div className="absolute w-full h-[1px] bottom-[10%] left-0 bg-purple-500/20" />
                <div className="absolute w-[1px] h-full top-0 left-[10%] bg-gradient-to-b from-purple-900 to-purple-900/20" />
                <div className="absolute w-[1px] h-full top-0 right-[10%] bg-purple-500/20" />

                {/* Content */}
                <div className="absolute inset-[10%] pt-6 pl-4 md:pt-10 md:pl-8 flex flex-col items-start z-30 pointer-events-none">
                    <div className="flex justify-between items-start w-full pr-4 md:pr-6 mb-4 md:mb-6">
                        <motion.div
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-purple-500/50 bg-purple-950/50 flex items-center justify-center text-purple-200 group-hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{
                                boxShadow: "inset 0 2px 6px rgba(168, 85, 247, 0.2), 0 0 12px rgba(168, 85, 247, 0.2)"
                            }}
                        >
                            {service.icon}
                        </motion.div>
                        
                        {service.badge && (
                            <span className="px-3 py-1.5 rounded-full border border-purple-400/30 bg-purple-400/10 text-purple-300 text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                                {service.badge}
                            </span>
                        )}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-purple-300 leading-tight">
                        {service.title}
                    </h3>
                    <p className="text-purple-300/80 text-sm md:text-lg leading-relaxed font-medium pr-4 md:pr-12">
                        {service.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesSlider() {
    const { t } = useI18n();
    const containerRef = useRef<HTMLElement>(null);
    
    // We create a container of 400vh to allow 4 "pages" of scrolling (1 initial + 3 transitions)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Continuous progress from 0 to 3
    const p = useTransform(scrollYProgress, [0, 1], [0, 3]);

    const [activeIndex, setActiveIndex] = useState(0);

    // Update active index state for the dots
    useMotionValueEvent(p, "change", (latest) => {
        const index = Math.max(0, Math.min(3, Math.round(latest)));
        if (index !== activeIndex) setActiveIndex(index);
    });

    // CTA Animations: Appear alongside the last card (index 2 to 3) with a slight delay (starts at 2.2)
    const ctaScale = useTransform(p, [2.2, 3], [0, 1]);
    const ctaOpacity = useTransform(p, [2.2, 3], [0, 1]);

    const scrollToCard = (index: number) => {
        if (containerRef.current) {
            const offsetTop = containerRef.current.offsetTop;
            // scroll distance = 400vh
            // step distance = 100vh per card/step
            const targetY = offsetTop + (index * window.innerHeight);
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    };

    const services = t.services.items.map((item: any, i: number) => ({
        ...item,
        icon: ICONS[i],
    }));

    return (
        <section ref={containerRef} className="relative h-[400vh]" id="services">
            {/* The sticky container stays in view while we scroll through the 300vh scrollable distance */}
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* Titles */}
                <div className="text-center mb-8 md:mb-12 z-10 px-4">
                    <span className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-3 block">
                        {t.services.label}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                        {t.services.title}
                    </h2>
                </div>

                {/* Slider Area (Dots + Cards) */}
                <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] px-4 md:px-12 gap-8 md:gap-16">
                    
                    {/* Pagination Dots (Left Side on Desktop, Hidden/Top on Mobile if we wanted, but let's keep it visible) */}
                    <div className="flex md:flex-col gap-4 z-20 items-center justify-center">
                        {services.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToCard(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    Math.min(activeIndex, 3) === i 
                                        ? "w-8 h-2 md:w-2 md:h-8 bg-gradient-to-b from-purple-700 to-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.6)]" 
                                        : "w-2 h-2 md:w-2 md:h-2 bg-purple-500/30 hover:bg-purple-500/60"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Cards Container */}
                    <div className="relative w-full max-w-[700px] lg:max-w-[800px] h-[400px] md:h-[500px]">
                        {services.map((service, i) => (
                            <ServiceCard 
                                key={i} 
                                service={service} 
                                index={i} 
                                p={p} 
                                total={services.length} 
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="absolute bottom-6 md:bottom-12 z-10 w-full flex justify-center px-4">
                    <motion.div
                        style={{ scale: ctaScale, opacity: ctaOpacity }}
                        className="w-full max-w-[420px]"
                    >
                        <CtaButton 
                            label="Vamos conversar →" 
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
