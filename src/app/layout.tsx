import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientShell from "@/components/ClientShell";
import { I18nProvider } from "@/i18n/I18nContext";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Sunverse - Agência",
  description: "Aumente a percepção de valor da sua marca com experiências web de alto padrão. Especialistas em criação de Landing Pages, Sites Institucionais e plataformas web focadas em conversão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`dark ${manrope.variable} scroll-smooth`}>
      <head>
      </head>
      <body className="antialiased min-h-screen bg-black text-white selection:bg-purple-700 selection:text-white">
        <I18nProvider>
          <ClientShell>{children}</ClientShell>
        </I18nProvider>
      </body>
    </html>
  );
}
