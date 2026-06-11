"use client";

import { useI18n } from "@/i18n/I18nContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HowWeWork() {
    const { t } = useI18n();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const steps = t.howWeWork?.steps || [];

    return (
        <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-black" id="process">
            <div className="max-w-[1200px] w-full px-4 md:px-12 z-10 flex flex-col items-center">
                {/* Headers */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        {t.howWeWork?.title}
                    </h2>
                    <p className="text-purple-200/60 text-sm md:text-lg max-w-2xl mx-auto">
                        {t.howWeWork?.subtitle}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative w-full flex flex-col md:flex-row justify-between items-start md:items-stretch gap-12 md:gap-0 mt-8">
                    
                    {/* Horizontal Line for Desktop */}
                    <div className="hidden md:block absolute top-[15px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0" />

                    {/* Vertical Line for Mobile */}
                    <div className="block md:hidden absolute top-[15px] bottom-[15px] left-[19px] w-[1px] bg-white/10 z-0" />
                    
                    {/* Active Line Fill (Desktop) */}
                    <div 
                        className="hidden md:block absolute top-[15px] left-[10%] h-[1px] bg-purple-500 z-0 transition-all duration-500 ease-out shadow-[0_0_10px_#a855f7]"
                        style={{ width: hoveredIndex !== null ? `${(hoveredIndex / (steps.length - 1)) * 80}%` : '0%' }}
                    />

                    {/* Active Line Fill (Mobile) */}
                    <div 
                        className="block md:hidden absolute top-[15px] left-[19px] w-[1px] bg-purple-500 z-0 transition-all duration-500 ease-out shadow-[0_0_10px_#a855f7]"
                        style={{ height: hoveredIndex !== null ? `${(hoveredIndex / (steps.length - 1)) * 100}%` : '0%' }}
                    />

                    {steps.map((step: any, i: number) => {
                        const isHovered = hoveredIndex === i;
                        const isPastOrCurrent = hoveredIndex !== null && i <= hoveredIndex;
                        
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 + (i * 0.15) }}
                                className="relative flex flex-row md:flex-col items-start md:items-center flex-1 w-full md:w-auto z-10 group cursor-pointer md:px-4 lg:px-6"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Circle Node */}
                                <div className="flex-shrink-0 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center relative mb-0 md:mb-8 mr-6 md:mr-0 mt-0 md:mt-0">
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 z-10 border ${
                                        isHovered 
                                        ? 'bg-purple-400 border-purple-400 shadow-[0_0_15px_#a855f7] scale-150' 
                                        : isPastOrCurrent
                                        ? 'bg-purple-500 border-purple-500 shadow-[0_0_10px_#a855f7]'
                                        : 'bg-transparent border-white/30'
                                    }`} />
                                    
                                    {/* Ripple effect on hover */}
                                    {isHovered && (
                                        <motion.div 
                                            className="absolute inset-0 rounded-full bg-purple-500/30 -z-10"
                                            initial={{ scale: 0.5, opacity: 1 }}
                                            animate={{ scale: 3, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col md:items-center text-left md:text-center max-w-[280px]">
                                    
                                    {/* Large Number */}
                                    <div className={`text-6xl md:text-8xl font-black mb-2 transition-all duration-500 leading-none tracking-tighter ${
                                        isHovered ? 'text-purple-500/30 translate-y-0' : 'text-white/5 translate-y-2'
                                    }`}>
                                        0{i + 1}
                                    </div>
                                    
                                    {/* Step Title */}
                                    <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 ${
                                        isHovered ? 'text-white' : 'text-white/80'
                                    }`}>
                                        {step.title}
                                    </h3>
                                    
                                    {/* Step Description */}
                                    <p className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                                        isHovered ? 'text-purple-200/80' : 'text-white/40'
                                    }`}>
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
