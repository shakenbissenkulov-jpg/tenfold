import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "../app/globals.css";

export function RootShell({ htmlLang, children }: { htmlLang: string; children: ReactNode }) {
  return (
    <html lang={htmlLang}>
      <head>
        <link rel="preload" href="/fonts/onest-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/onest-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
