"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Palette } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { useTheme, THEMES, Theme } from "@/lib/ThemeContext";

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Close palette on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const links = [
    { href: "/", label: tr.nav.home },
    { href: "/produse", label: tr.nav.products },
    { href: "/referinte", label: tr.nav.gallery },
    { href: "/despre-noi", label: tr.nav.about },
    { href: "/blog", label: tr.nav.blog },
  ];

  const currentTheme = THEMES.find((t) => t.id === theme)!;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--clr-accent)" }}>
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <span className="font-bold text-lg text-gray-900">FerestrăPro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-[var(--clr-accent)]">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">

            {/* Theme palette */}
            <div ref={paletteRef} className="relative">
              <button
                onClick={() => setPaletteOpen(!paletteOpen)}
                aria-label={lang === "ro" ? "Schimbați stilul" : "Stílus váltás"}
                aria-expanded={paletteOpen}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-gray-200 text-gray-500 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] transition-colors"
                title={lang === "ro" ? "Schimbați stilul" : "Stílus váltás"}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: currentTheme.color }} />
                <Palette size={13} />
              </button>

              {paletteOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 w-48 z-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 pb-1">
                    {lang === "ro" ? "Stil" : "Stílus"}
                  </p>
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id as Theme); setPaletteOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full border-2 border-white shadow shrink-0" style={{ background: t.color }} />
                      <span className={theme === t.id ? "font-semibold text-gray-900" : "text-gray-600"}>
                        {lang === "ro" ? t.labelRo : t.labelHu}
                      </span>
                      {theme === t.id && <span className="ml-auto text-xs" style={{ color: "var(--clr-accent)" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === "ro" ? "hu" : "ro")}
              aria-label={lang === "ro" ? "Magyar nyelv" : "Limba română"}
              className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 text-gray-500 hover:border-[var(--clr-accent)] hover:text-[var(--clr-accent)] transition-colors"
            >
              {lang === "ro" ? "HU" : "RO"}
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="text-sm font-semibold px-4 py-2 text-white rounded-lg transition-colors"
              style={{ background: "var(--clr-accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--clr-accent-dk)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent)")}
            >
              {tr.nav.quote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={lang === "ro" ? "Meniu" : "Menü"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-gray-100 flex-wrap">
            {/* Mobile theme buttons */}
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as Theme)}
                className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                style={{ background: t.color, borderColor: theme === t.id ? "#000" : "transparent" }}
                title={lang === "ro" ? t.labelRo : t.labelHu}
                aria-label={lang === "ro" ? t.labelRo : t.labelHu}
                aria-pressed={theme === t.id}
              />
            ))}
            <div className="flex-1" />
            <button
              onClick={() => setLang(lang === "ro" ? "hu" : "ro")}
              className="text-xs font-semibold px-2 py-1 rounded border border-gray-200 text-gray-500"
            >
              {lang === "ro" ? "HU" : "RO"}
            </button>
            <Link href="/contact" className="text-sm font-semibold px-4 py-2 text-white rounded-lg" style={{ background: "var(--clr-accent)" }} onClick={() => setMenuOpen(false)}>
              {tr.nav.quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
