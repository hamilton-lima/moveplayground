import { supportedLanguages, SupportedLanguage } from "./languageUtils";

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}
