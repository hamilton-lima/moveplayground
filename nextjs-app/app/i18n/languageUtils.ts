export const supportedLanguages = ["en", "pt-BR"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
};

export function detectLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return "en"; // Default for server-side rendering
  }

  // Check localStorage first
  const storedLang = localStorage.getItem(
    "preferredLanguage"
  ) as SupportedLanguage;
  if (storedLang && supportedLanguages.includes(storedLang)) {
    return storedLang;
  }

  // Check browser language
  const browserLang = navigator.language.split("-")[0] as SupportedLanguage;
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }

  // Fallback to 'en'
  return "en";
}
