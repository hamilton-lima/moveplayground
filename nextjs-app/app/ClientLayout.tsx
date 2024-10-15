"use client";

import { IntlProvider } from "react-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
  lang,
  messages,
}: {
  children: React.ReactNode;
  lang: string;
  messages: Record<string, string>;
}) {
  return (
    <IntlProvider messages={messages} locale={lang}>
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
  );
}
