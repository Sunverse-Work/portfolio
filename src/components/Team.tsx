"use client";

import { motion } from "framer-motion";
import { PenTool, Code2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import textureBg from "@/assets/texture.svg";

export default function Team() {
    const { t } = useI18n();

    // The team object might not be defined in old sessions if reloading, but we just added it to translations
    const members = (t as any).team?.members || [];

    return (
        <section className="relative px-4 py-24 md:py-32 max-w-6xl mx-auto overflow-hidden" id="team">
            
            {/* The same floor grid background from SkillsGrid for continuity */}
            <div className="absolute bottom-0 left-0 right-0 h-[80%] pointer-events-none z-0" style={{
                backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: 'perspective(500px) rotateX(60deg) translateY(50px) scale(2.5)',
                transformOrigin: 'bottom center',
                maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
            }} />

            <div className="mb-10 md:mb-16 text-center relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-sm font-semibold tracking-widest uppercase text-purple-400 mb-4 block"
                >
                    {(t as any).team?.label}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl mx-auto text-white"
                >
                    {(t as any).team?.title}
                </motion.h2>
            </div>

            <div className="relative w-full flex flex-col gap-24 md:gap-40 z-10 pt-10 md:pt-16 max-w-6xl mx-auto">
                {members.map((member: any, i: number) => {
                    const isEven = i % 2 === 0;
                    // Generic high-quality Unsplash portraits 
                    const imageUrl = isEven 
                        ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" 
                        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop";

                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                            className="relative w-full flex flex-col md:flex-row items-center justify-center"
                        >
                            {/* Card Background Container */}
                            <div className={`w-full px-6 py-10 md:px-10 md:py-20 rounded-[2rem] border border-white/5 flex flex-col justify-center relative z-0 overflow-hidden ${isEven ? 'md:pr-[340px] md:text-left' : 'md:pl-[340px] md:items-end md:text-right'}`}
                                style={{
                                    background: "linear-gradient(145deg, rgba(20, 20, 20, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                                }}
                            >
                                {/* Decorative subtle glow inside card (removed to keep it pure black glass) */}

                                {/* Glows on corners */}
                                <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />
                                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-[40px] pointer-events-none" />

                                {/* Texture Overlay */}
                                <div 
                                    className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
                                    style={{
                                        backgroundImage: `url(${textureBg.src || textureBg})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />

                                <div className="relative z-10 max-w-xl">
                                    <h3 className="text-3xl md:text-5xl font-bold mb-2 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-500">
                                        {member.name}
                                    </h3>
                                    <p className="text-white font-medium text-lg md:text-xl mb-6">
                                        {member.role}
                                    </p>
                                    <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4">
                                        {member.text1}
                                    </p>
                                    <p className="text-white/80 text-sm md:text-base leading-relaxed">
                                        {member.text2}
                                    </p>
                                </div>
                            </div>

                            {/* Overlapping Image Container */}
                            <div className={`group w-full md:w-[320px] h-[350px] md:h-[550px] lg:h-[600px] md:absolute md:top-1/2 md:-translate-y-1/2 z-10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] mt-6 md:mt-0 transition-all duration-500 ${isEven ? 'md:right-8' : 'md:left-8'}`}>
                                <img 
                                    src={imageUrl} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05000f] via-transparent to-transparent opacity-60 pointer-events-none" />
                                
                                {/* Floating Icon with Wiggle */}
                                <motion.div
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className={`absolute bottom-6 ${isEven ? 'right-6' : 'left-6'} w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_10px_30px_rgba(168,85,247,0.3)] z-20`}
                                >
                                    {isEven ? <PenTool className="w-7 h-7 text-white" /> : <Code2 className="w-7 h-7 text-white" />}
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
            
        </section>
    );
}
