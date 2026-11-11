"use client";

import { useState, useSyncExternalStore } from "react";
import { useLang } from "@/lib/LanguageContext";

const KEY = "cookie_consent";

// No "continuing to browse = consent" wording: under GDPR/ePrivacy consent must be an explicit action.
const TEXTS = {
  ro: {
    message: "Folosim cookie-uri strict necesare. Harta Google de pe pagina Contact setează cookie-uri terțe, de aceea se încarcă doar cu acordul dvs.",
    accept: "Accept toate",
    decline: "Doar necesare",
  },
  hu: {
    message: "Csak a működéshez szükséges sütiket használjuk. A Kapcsolat oldal Google-térképe harmadik féltől származó sütiket állít be, ezért csak az Ön hozzájárulásával töltődik be.",
    accept: "Mindet elfogadom",
    decline: "Csak szükségesek",
  },
};

// Read localStorage without setState-in-effect; the server snapshot hides the banner during SSR.
const subscribe = () => () => {};
const getSnapshot = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const getServerSnapshot = () => "ssr";

export default function CookieBanner() {
  const { lang } = useLang();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const tx = TEXTS[lang];

  const choose = (value: "all" | "necessary") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage blocked: just hide for this visit */
    }
    setDismissed(true);
  };

  if (dismissed || stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[70] bg-white border-t border-gray-200 shadow-lg px-4 sm:px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-sm text-gray-600 flex-1 leading-relaxed">{tx.message}</p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => choose("necessary")}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {tx.decline}
          </button>
          <button
            onClick={() => choose("all")}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors bg-[var(--clr-accent)] hover:bg-[var(--clr-accent-dk)]"
          >
            {tx.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
