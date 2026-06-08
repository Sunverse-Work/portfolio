"use client";

import OrbitImages from "./OrbitImages";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

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

export default function Portfolio() {
    const { t } = useI18n();

    return (
        <section className="px-4 py-16 md:py-24 w-full max-w-7xl mx-auto overflow-hidden relative flex flex-col items-center" id="portfolio">
            
            <div className="text-center mb-32 z-10">
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

            <div className="w-full flex justify-center items-center relative z-10">
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
        </section>
    );
}
