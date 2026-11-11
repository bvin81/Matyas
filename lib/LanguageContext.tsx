"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { t, Lang } from "./translations";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: typeof t.ro;
}

const LangContext = createContext<LangContextType>({
  lang: "ro",
  setLang: () => {},
  tr: t.ro,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ro");
  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
