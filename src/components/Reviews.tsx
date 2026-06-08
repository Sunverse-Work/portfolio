"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-4 md:h-4 text-purple-600">
        <path d="M12 2C12 2 12 10.5 20.5 12C12 13.5 12 22 12 22C12 22 12 13.5 3.5 12C12 10.5 12 2 12 2Z" fill="currentColor"/>
    </svg>
);

const QuoteIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white/10 w-5 h-5 md:w-8 md:h-8">
        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
    </svg>
);

const ReviewCard = ({ review }: { review: any }) => (
    <div className="w-[240px] md:w-[300px] h-auto min-h-[220px] md:min-h-[240px] flex-shrink-0 flex flex-col justify-between p-4 md:p-5 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-purple-500/30 transition-colors duration-300 mx-2 md:mx-3">
        <div className="flex justify-between items-start mb-3">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                ))}
            </div>
            <QuoteIcon />
        </div>
        <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-3 flex-grow">
            {review.text}
        </p>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-auto">
            <span className="text-white text-sm md:text-base font-medium">{review.name}</span>
            <span className="hidden md:block text-white/20">•</span>
            <span className="text-white/40 text-xs md:text-sm">{review.role}</span>
        </div>
    </div>
);

export default function Reviews() {
    const { t } = useI18n();
    const [isPaused, setIsPaused] = useState(false);
    
    const reviews = t.reviews?.items || [];

    // Se houver menos de 2 reviews, podemos apenas duplicar para preencher
    const safeReviews = reviews.length > 0 ? reviews : [{text: "...", name: "User", role: "Role"}];

    // Split reviews into two halves for two rows
    const midpoint = Math.ceil(safeReviews.length / 2);
    const row1Items = safeReviews.slice(0, midpoint);
    const row2Items = safeReviews.slice(midpoint).length > 0 ? safeReviews.slice(midpoint) : safeReviews;

    // To ensure a seamless infinite scroll when translating by -50%, 
    // the array must be duplicated an even number of times so that exactly half of it 
    // is a perfect multiple of the original items. (e.g. 4 copies -> 50% is 2 copies).
    const row1Full = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
    const row2Full = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

    return (
        <section className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden" id="reviews">
            <style>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-scroll-left {
                    animation: scroll-left 50s linear infinite;
                }
                .animate-scroll-right {
                    animation: scroll-right 45s linear infinite;
                }
                .is-paused {
                    animation-play-state: paused !important;
                }
            `}</style>
            
            <div className="text-center mb-16 md:mb-24 z-10 px-4 flex flex-col items-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-600 mb-6 drop-shadow-sm">
                    {t.reviews?.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full mb-6" />
                <p className="text-purple-200/60 text-sm md:text-lg max-w-2xl mx-auto">
                    {t.reviews?.subtitle}
                </p>
            </div>

            <div 
                className="relative w-full overflow-hidden flex flex-col gap-6 md:gap-8 z-10 md:cursor-default cursor-pointer"
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onTouchCancel={() => setIsPaused(false)}
            >
                {/* Mobile hint */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-purple-600/80 text-white text-xs px-3 py-1 rounded-full z-30 transition-opacity duration-300 md:hidden ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
                    Pausado para leitura
                </div>

                {/* Vignettes for edge fading - matching global body background #050505 or similar dark */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

                {/* Row 1: Left */}
                <div className={`flex items-stretch w-max animate-scroll-left ${isPaused ? 'is-paused' : ''}`}>
                    {row1Full.map((review: any, i: number) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>

                {/* Row 2: Right */}
                <div className={`flex items-stretch w-max animate-scroll-right ${isPaused ? 'is-paused' : ''}`}>
                    {row2Full.map((review: any, i: number) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
            
        </section>
    );
}
