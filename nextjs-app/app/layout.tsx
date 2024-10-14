"use client"; // This makes the component client-side only

import DefaultLayout from "../components/DefaultLayout";
import "./globals.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>MovePlayground</title>
        <meta name="description" content="Move, Play, Control" />
      </head>
      <body>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
