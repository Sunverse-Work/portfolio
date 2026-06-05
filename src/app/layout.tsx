import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ClientShell from "@/components/ClientShell";
import { I18nProvider } from "@/i18n/I18nContext";

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
    <html lang="pt" className="dark">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-black text-white selection:bg-purple-700 selection:text-white">
        <I18nProvider>
          <ClientShell>{children}</ClientShell>
        </I18nProvider>
      </body>
    </html>
  );
}
