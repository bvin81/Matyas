"use client";

import { useLang } from "@/lib/LanguageContext";

// Visible notice that the site is a prototype with illustrative content.
// Remove this component before going live.
const TEXTS = {
  ro: "DEMO · conținut ilustrativ",
  hu: "DEMÓ · illusztratív tartalom",
};

export default function DemoBadge() {
  const { lang } = useLang();
  return (
    <div
      role="note"
      className="fixed bottom-5 left-5 z-40 rounded-full bg-gray-900/85 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-sm pointer-events-none select-none"
    >
      {TEXTS[lang]}
    </div>
  );
}
