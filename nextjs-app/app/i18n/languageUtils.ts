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

export function determineLanguage(
  currentLang: string,
  detectedLang: SupportedLanguage
): { newLang: SupportedLanguage; shouldRedirect: boolean } {
  if (
    currentLang !== detectedLang &&
    supportedLanguages.includes(currentLang as SupportedLanguage)
  ) {
    return { newLang: currentLang as SupportedLanguage, shouldRedirect: false };
  } else if (currentLang !== detectedLang) {
    return { newLang: detectedLang, shouldRedirect: true };
  } else {
    return { newLang: detectedLang, shouldRedirect: false };
  }
}
