/**
 * Company-wide settings. Fill these in before launch.
 * Empty values are hidden on the page rather than shown as fake data.
 */
export interface SiteConfig {
  name: string;
  url: string;
  email: string;
  phone: string;
  caseUrl: string;
  caseUrlLabel: string;
}

export const site: SiteConfig = {
  name: "Tenfold",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tenfold.kz",

  // TODO: public contact email, e.g. "hello@your-domain.kz"
  email: "",
  // TODO: phone / WhatsApp in international format, e.g. "+7 700 000 00 00"
  phone: "",

  // Case study link
  caseUrl: "https://kazakhyuvelir.kz/",
  caseUrlLabel: "kazakhyuvelir.kz",
};
