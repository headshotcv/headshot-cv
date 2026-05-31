import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TRANSLATIONS, type TranslationKey } from "./translations";

export type Lang = "fr" | "en" | "nl";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "headshotcv:lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "fr";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && LANGUAGES.some(l => l.code === stored)) return stored;
  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("nl")) return "nl";
  if (nav.startsWith("en")) return "en";
  return "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => {
    const dict = TRANSLATIONS[lang] as Record<string, string>;
    const fallback = TRANSLATIONS.fr as Record<string, string>;
    return dict[key] ?? fallback[key] ?? key;
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
