import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientShell from "@/components/ClientShell";
import { I18nProvider } from "@/i18n/I18nContext";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Dark Industry Portfolio",
  description: "Designer Sênior de Web, Gráfico e Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`dark ${manrope.variable}`}>
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
