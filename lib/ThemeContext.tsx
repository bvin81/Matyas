"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "blue" | "green" | "anthracite";

export const THEMES: { id: Theme; labelRo: string; labelHu: string; color: string }[] = [
  { id: "blue",       labelRo: "Modern Albastru", labelHu: "Modern Kék",      color: "#2563EB" },
  { id: "green",      labelRo: "Verde Natural",   labelHu: "Természet Zöld",  color: "#16a34a" },
  { id: "anthracite", labelRo: "Premium Antracit",labelHu: "Prémium Antracit",color: "#d97706" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "blue", setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  // Single source of truth: the effect mirrors state to <html data-theme>.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
