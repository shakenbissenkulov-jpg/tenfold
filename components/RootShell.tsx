import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import type { Lang } from "@/content/types";
import "../app/globals.css";

export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        <link rel="preload" href="/fonts/unbounded-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
