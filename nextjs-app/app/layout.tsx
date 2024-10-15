import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { messages } from "./i18n/messages";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovePlayground",
  description: "Move, Play, Control",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  const lang = params.lang || "en";

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ClientLayout
          lang={lang}
          messages={messages[lang as keyof typeof messages]}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

export { generateStaticParams } from "./i18n/generateStaticParams";