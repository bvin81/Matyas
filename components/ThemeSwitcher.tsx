"use client";

import { useState } from "react";
import { Palette, X } from "lucide-react";
import { useTheme, THEMES, Theme } from "@/lib/ThemeContext";
import { useLang } from "@/lib/LanguageContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-56">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {lang === "ro" ? "Alegeți stilul" : "Válasszon stílust"}
            </span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id as Theme); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  theme === t.id
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border-2 border-white shadow shrink-0"
                  style={{ background: t.color }}
                />
                {lang === "ro" ? t.labelRo : t.labelHu}
                {theme === t.id && (
                  <span className="ml-auto text-xs opacity-60">✓</span>
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-400">Demo prezentare</span>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
        style={{ background: "var(--clr-accent)" }}
        title={lang === "ro" ? "Schimbați stilul" : "Stílus váltás"}
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
