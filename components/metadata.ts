import type { Metadata } from "next";
import type { Content } from "@/content/types";
import { site } from "@/content/site";

export function buildMetadata(c: Content): Metadata {
  const path = c.lang === "ru" ? "/" : "/en";
  return {
    metadataBase: new URL(site.url),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: path,
      languages: { ru: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: c.meta.title,
      description: c.meta.description,
      locale: c.lang === "ru" ? "ru_KZ" : "en_US",
    },
    twitter: { card: "summary", title: c.meta.title, description: c.meta.description },
    robots: { index: true, follow: true },
  };
}
