export type Lang = "ru" | "en";

export type NeedId = "build" | "team" | "automate" | "unsure";

export interface Content {
  lang: Lang;
  meta: { title: string; description: string };
  nav: {
    label: string;
    services: string;
    process: string;
    models: string;
    faq: string;
    cta: string;
    langLabel: string;
    kzSoon: string;
  };
  hero: { eyebrow: string; title: string; sub: string; cta: string; cta2: string; note: string };
  card: {
    aria: string;
    title: string;
    tag: string;
    goal: string;
    goalText: string;
    done: string;
    rows: { label: string; value?: string }[];
    buildLabel: string;
    sprint: string;
    foot: string;
  };
  who: { label: string; items: { k: string; v: string }[] };
  paths: {
    eyebrow: string;
    title: string;
    items: { kind: "build" | "team"; letter: string; title: string; body: string; points: string[]; cta: string }[];
  };
  services: { eyebrow: string; title: string; side: string; items: { problem: string; answer: string; tag: string }[] };
  why: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  process: { eyebrow: string; title: string; items: { time: string; title: string; body: string }[] };
  models: {
    eyebrow: string;
    title: string;
    side: string;
    cta: string;
    items: { best: string; name: string; desc: string; points: string[]; price: string; featured?: boolean }[];
  };
  work: {
    eyebrow: string;
    title: string;
    label: string;
    industry: string;
    client: string;
    about: string;
    cols: { k: string; v: string }[];
  };
  faq: { eyebrow: string; title: string; more: string; moreLink: string; items: { q: string; a: string }[] };
  contact: { eyebrow: string; title: string; sub: string; next: string[]; emailLabel: string; phoneLabel: string };
  form: {
    label: string;
    need: string;
    needs: Record<NeedId, string>;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    messagePh: string;
    required: string;
    errName: string;
    errEmail: string;
    errGeneric: string;
    submit: string;
    sending: string;
    consentA: string;
    consentLink: string;
    consentB: string;
    okThanks: string;
    okBody: string;
    okAgain: string;
  };
  footer: { address: string; privacy: string; rights: string };
}
