"use client";

import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { IntlProvider } from "react-intl";
import { messages } from "./i18n/messages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang || "en";

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
        <IntlProvider
          messages={messages[lang as keyof typeof messages]}
          locale={lang}
        >
          <main className="flex flex-col min-h-screen">
            <Header lang={lang} />
            <div className="flex-grow bg-white">
              <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl">{children}</div>
              </div>
            </div>
            <Footer lang={lang} />
          </main>
        </IntlProvider>
      </body>
    </html>
  );
}

// Export generateStaticParams here
// export { generateStaticParams } from './i18n/generateStaticParams';
