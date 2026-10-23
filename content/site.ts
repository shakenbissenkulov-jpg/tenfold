import type { Lang } from "./types";

/**
 * Company-wide settings. Fill these in before launch.
 * Empty values are hidden on the page rather than shown as fake data.
 */
export const site = {
  name: "Tenfold",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tenfold-psi.vercel.app",
  // TODO: public contact email and phone, e.g. "hello@your-domain.kz", "+7 700 000 00 00"
  email: "",
  phone: "",
};

export const homePath: Record<Lang, string> = { ru: "/", en: "/en", kz: "/kz" };
export const privacyPath: Record<Lang, string> = { ru: "/privacy", en: "/en/privacy", kz: "/kz/privacy" };
