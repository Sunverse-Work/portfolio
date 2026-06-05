"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function FAQ() {
    const { t } = useI18n();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-4 py-24 md:py-32 max-w-3xl mx-auto w-full" id="faq">
            <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight glow-text block">
                    {t.faq.title}
                </h2>
            </div>

            <div className="space-y-2 rounded-2xl overflow-hidden p-1"
            style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",

            }}
        >
                {t.faq.items.map((faq, i) => (
                    <div key={i} className="border-b border-purple-600/20 overflow-hidden px-4">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between py-6 text-left hover:text-purple-100 group transition-colors"
                        >
                            <span className={`text-lg font-medium transition-colors ${openIndex === i ? "text-white" : "text-purple-300 group-hover:text-purple-200"}`}>
                                {faq.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === i ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-purple-400 group-hover:text-purple-100 shrink-0"
                            >
                                <Plus className="w-5 h-5" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                                    exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                >
                                    <p className="pb-6 text-purple-300 leading-relaxed pr-8">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
