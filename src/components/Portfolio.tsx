"use client";

import OrbitImages from "./OrbitImages";
import { motion, useMotionValue } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ex1 from "@/assets/imagens exemplos/example_01.png";
import ex2 from "@/assets/imagens exemplos/example_02.png";
import ex3 from "@/assets/imagens exemplos/example_03.png";
import ex4 from "@/assets/imagens exemplos/example_04.png";
import ex5 from "@/assets/imagens exemplos/example_05.png";
import ex6 from "@/assets/imagens exemplos/example_06.png";

const projectImages = [
    ex1.src,
    ex2.src,
    ex3.src,
    ex4.src,
    ex5.src,
    ex6.src
];

function MobileCarousel({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragX = useMotionValue(0);

    const goTo = (index: number) => {
        setCurrent(Math.max(0, Math.min(index, images.length - 1)));
    };

    const handleDragEnd = (_: any, info: any) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            goTo(current + 1);
        } else if (info.offset.x > threshold) {
            goTo(current - 1);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-6">
            <div className="w-full overflow-hidden rounded-2xl" ref={containerRef}>
                <motion.div
                    className="flex"
                    animate={{ x: `-${current * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    style={{ x: dragX }}
                >
                    {images.map((src, i) => (
                        <div key={i} className="w-full flex-shrink-0 px-2">
                            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                <img
                                    src={src}
                                    alt={`Project ${i + 1}`}
                                    draggable={false}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Navigation dots + arrows */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-purple-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`rounded-full transition-all duration-300 ${
                                i === current
                                    ? "w-6 h-2 bg-purple-500"
                                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                            }`}
                        />
                    ))}
                </div>
                <button
                    onClick={() => goTo(current + 1)}
                    disabled={current === images.length - 1}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-purple-500/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default function Portfolio() {
    const { t } = useI18n();

    return (
        <section className="px-4 py-16 md:py-24 w-full max-w-7xl mx-auto overflow-hidden relative flex flex-col items-center" id="portfolio">
            
            <div className="text-center mb-16 md:mb-32 z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-sm font-semibold tracking-widest uppercase text-purple-300 mb-4 block"
                >
                    {t.portfolio.label}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
                >
                    {t.portfolio.title}
                </motion.h2>
            </div>

            {/* Center glowing orb effect for the orbit to rotate around */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Desktop: Orbit */}
            <div className="w-full hidden md:flex justify-center items-center relative z-10">
                <OrbitImages
                    images={projectImages}
                    baseWidth={1300}
                    shape="ellipse"
                    radiusX={490}
                    radiusY={180}
                    rotation={-12}
                    duration={40}
                    itemWidth={300}
                    itemHeight={225}
                    responsive={true}
                    containerAspectRatio="2.2 / 1"
                    pathColor="rgba(192, 132, 252, 0.2)"
                    showPath={true}
                />
            </div>

            {/* Mobile: Swipeable Carousel */}
            <div className="w-full md:hidden relative z-10">
                <MobileCarousel images={projectImages} />
            </div>
        </section>
    );
}

