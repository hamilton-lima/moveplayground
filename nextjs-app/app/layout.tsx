"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { IntlProvider } from "react-intl";
import { messages } from "./i18n/messages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  detectLanguage,
  determineLanguage,
  SupportedLanguage,
} from "./i18n/languageUtils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<SupportedLanguage>("en");

  useEffect(() => {
    const detectedLang = detectLanguage();
    const currentLang = pathname.split("/")[1];
    const { newLang, shouldRedirect } = determineLanguage(
      currentLang,
      detectedLang
    );

    if (shouldRedirect) {
      const newPath = `/${newLang}${pathname.replace(/^\/[^\/]+/, "")}`;
      router.push(newPath);
    }

    setLang(newLang);
  }, [pathname, router]);

  return (
    <html lang={lang}>
      <Head>
        <title>MovePlayground</title>
        <meta name="description" content="Move, Play, Control" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body className={inter.className}>
        <IntlProvider messages={messages[lang]} locale={lang}>
          <main className="flex flex-col min-h-screen">
            <Header lang={lang} />
            <div className="flex-grow bg-white">
              <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl">{children}</div>
              </div>
            </div>
            <Footer />
          </main>
        </IntlProvider>
      </body>
    </html>
  );
}
