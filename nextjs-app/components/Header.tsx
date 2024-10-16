"use client";

import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  supportedLanguages,
  languageNames,
  SupportedLanguage,
} from "@/app/i18n/languageUtils";

export default function Header({ lang }: { lang: SupportedLanguage }) {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(lang);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  const changeLanguage = (newLang: SupportedLanguage) => {
    localStorage.setItem("preferredLanguage", newLang);
    const newPath = window.location.pathname.replace(
      /^\/[^\/]+/,
      `/${newLang}`
    );
    router.push(newPath);
  };

  return (
    <nav className="navbar justify-between bg-base-300">
      <Link className="btn btn-ghost text-lg" href={`/${currentLang}`}>
        <img alt="Logo" src="/logo.svg" className="w-12" />
        <FormattedMessage id="nav.home" />
      </Link>
      <div className="flex items-center">
        <ul className="menu menu-horizontal gap-2 mr-4">
          <li>
            <Link href={`/${currentLang}/about`}>
              <FormattedMessage id="nav.about" />
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-sm btn-accent btn-primary"
              href={`/${currentLang}/login`}
            >
              <FormattedMessage id="nav.login" />
            </Link>
          </li>
        </ul>
        <select
          value={currentLang}
          onChange={(e) => changeLanguage(e.target.value as SupportedLanguage)}
          className="select select-bordered select-sm"
        >
          {supportedLanguages.map((langCode) => (
            <option key={langCode} value={langCode}>
              {languageNames[langCode]}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}
