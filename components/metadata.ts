import type { Metadata } from "next";
import type { Content } from "@/content/types";
import { homePath, site } from "@/content/site";

const locales = { ru: "ru_KZ", en: "en_US", kz: "kk_KZ" } as const;

export function buildMetadata(c: Content): Metadata {
  const path = homePath[c.lang];
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: path,
      languages: { ru: "/", en: "/en", kk: "/kz", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: locales[c.lang],
    },
    twitter: { card: "summary", title: c.meta.title, description: c.meta.description },
    robots: { index: true, follow: true },
  };
}
