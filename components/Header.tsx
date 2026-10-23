import Link from "next/link";
import type { Content, Lang } from "@/content/types";
import { homePath } from "@/content/site";

const LANGS: { code: string; lang: Lang; hreflang: string }[] = [
  { code: "RU", lang: "ru", hreflang: "ru" },
  { code: "EN", lang: "en", hreflang: "en" },
  { code: "KZ", lang: "kz", hreflang: "kk" },
];

export function Header({ c }: { c: Content }) {
  const side = "hidden hover:text-muted xl:inline";
  return (
    <>
      <a
        href="#contact"
        className="dark flex min-h-10 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 bg-accent px-5 py-2 text-center text-sm text-white hover:text-white"
      >
        {c.announce} <span className="opacity-80">{c.announceCta}</span>
      </a>
      <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur-md">
        <nav
          aria-label={c.navLabel}
          className="mx-auto grid h-[68px] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 text-[15px] sm:px-8"
        >
          <div className="flex min-w-0 gap-6">
            <a href="#process" className={side}>{c.navProcess}</a>
            <a href="#services" className={side}>{c.navServices}</a>
            <a href="#guarantees" className={side}>{c.navGuarantees}</a>
          </div>
          <Link href={homePath[c.lang]} aria-label="Tenfold" className="flex items-baseline gap-2 text-ink">
            <span className="text-xl font-medium tracking-[-0.02em]">Tenfold</span>
            <span className="text-xs font-medium text-accent">10×</span>
          </Link>
          <div className="flex items-center justify-end gap-5">
            <a href="#reviews" className={side}>{c.navReviews}</a>
            <a href="#faq" className={side}>FAQ</a>
            <div role="group" aria-label={c.langLabel} className="flex gap-0.5 rounded-full bg-pill p-[3px]">
              {LANGS.map((l) =>
                l.lang === c.lang ? (
                  <span key={l.code} aria-current="true" className="inline-flex min-h-[30px] min-w-9 items-center justify-center rounded-full bg-white px-2 text-xs font-medium text-ink">
                    {l.code}
                  </span>
                ) : (
                  <Link key={l.code} href={homePath[l.lang]} hrefLang={l.hreflang} className="inline-flex min-h-[30px] min-w-9 items-center justify-center rounded-full px-2 text-xs font-medium text-muted hover:text-ink">
                    {l.code}
                  </Link>
                ),
              )}
            </div>
            <a
              href="#contact"
              className="hidden min-h-10 items-center whitespace-nowrap rounded-full bg-ink px-[18px] text-sm text-white hover:bg-ink-2 hover:text-white sm:inline-flex"
            >
              {c.navCta}
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
