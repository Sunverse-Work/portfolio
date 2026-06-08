"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nContext";
import { CtaButton } from "@/components/CtaButton";

export default function Footer() {
    const { t } = useI18n();

    return (
        <footer className="relative w-full px-4 md:px-10 pb-10 pt-32 flex flex-col items-center" id="contact">
            {/* Background Video que vaza para as sessões de cima */}
            <div
                className="absolute left-0 bottom-0 w-full h-[1240px] z-[-1] pointer-events-none"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 95%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 95%, transparent 100%)"
                }}
            >
                {/* 
                  COMO AJUSTAR O VÍDEO AGORA:
                  O vídeo agora é um bloco gigante de 1500px (h-[1500px]) ancorado no fundo da página (bottom-0).
                  Ele sobe livremente por trás das sessões de cima.

                  - Para mover a imagem inteira do vídeo para cima/baixo sem cortar: 
                    Altere o valor '50%' em objectPosition abaixo (Ex: 30%, 70%).
                    Mantenha entre 0% e 100% para o fundo físico do vídeo não entrar na tela e gerar um corte reto!

                  - Para fazer o vídeo invadir MAIS as sessões de cima: aumente o h-[1500px] acima para h-[2000px] etc.
                */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/assets/purple_black_hole.webm"
                    className="w-full h-full object-cover opacity-80"
                    style={{ objectPosition: "center 50%" }}
                />
            </div>

            <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                    className="relative w-full rounded-[3rem] px-8 py-12 md:px-24 md:py-16 text-center overflow-hidden flex flex-col items-center justify-center min-h-[350px] z-10 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                    style={{
                        background: "linear-gradient(180deg, rgba(20, 10, 40, 0.3) 0%, rgba(5, 0, 15, 0.6) 100%)",
                        backdropFilter: "blur(32px)",
                        WebkitBackdropFilter: "blur(32px)",
                        borderTop: "1px solid rgba(168, 85, 247, 0.4)",
                        borderLeft: "1px solid rgba(168, 85, 247, 0.1)",
                        borderRight: "1px solid rgba(168, 85, 247, 0.1)",
                        borderBottom: "1px solid rgba(168, 85, 247, 0.05)"
                    }}
                >


                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 z-10 leading-[1.1] max-w-5xl text-white">
                        {t.footer.cta.split(" ").slice(0, -2).join(" ")}{" "}
                        <span
                            className="italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-purple-600 to-purple-200 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                            style={{ fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif" }}
                        >
                            {t.footer.cta.split(" ").slice(-2).join(" ")}
                        </span>
                    </h2>

                    {/* @ts-ignore - Ignore TS error for subtitle if not fully populated in types yet */}
                    <p className="text-purple-200/60 font-light text-lg md:text-2xl max-w-3xl mb-10 leading-relaxed z-10">
                        {(t.footer as any).subtitle}
                    </p>

                    <div className="z-10 mt-4">
                        <CtaButton label={t.footer.startProject} />
                    </div>
                </motion.div>

                <div className="w-full flex justify-center items-center mt-12 text-purple-300 text-sm">
                    <p>© 2026 Sunverse. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
