import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import DemoBadge from "@/components/DemoBadge";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "FerestrăPro — Ferestre, Uși, Rulouri",
  description: "Furnizor și montator de ferestre, uși și sisteme de protecție solară din Cluj-Napoca.",
  // Demo site: keep it out of search engines
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <DemoBadge />
            <WhatsAppButton />
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
