import Link from "next/link";
import type { Content } from "@/content/types";
import { Container, Logo } from "./ui";

export function Header({ c }: { c: Content }) {
  const home = c.lang === "ru" ? "/" : "/en";
  const langs = [
    { code: "RU", href: "/", active: c.lang === "ru" },
    { code: "EN", href: "/en", active: c.lang === "en" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
      <Container>
        <nav aria-label={c.nav.label} className="flex h-[72px] items-center justify-between gap-6">
          <Link href={home} aria-label="Tenfold" className="text-ink no-underline">
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
            <a href="#services" className="hover:text-muted">{c.nav.services}</a>
            <a href="#process" className="hover:text-muted">{c.nav.process}</a>
            <a href="#models" className="hover:text-muted">{c.nav.models}</a>
            <a href="#faq" className="hover:text-muted">{c.nav.faq}</a>
          </div>

          <div className="flex items-center gap-3">
            <div
              role="group"
              aria-label={c.nav.langLabel}
              className="hidden gap-0.5 rounded-full border border-line-strong p-[3px] font-mono text-xs sm:flex"
            >
              {langs.map((l) =>
                l.active ? (
                  <span key={l.code} aria-current="true" className="rounded-full bg-ink px-2.5 py-1.5 text-white">
                    {l.code}
                  </span>
                ) : (
                  <Link key={l.code} href={l.href} hrefLang={l.code.toLowerCase()} className="rounded-full px-2.5 py-1.5 text-body hover:bg-line">
                    {l.code}
                  </Link>
                ),
              )}
              <span aria-disabled="true" title={c.nav.kzSoon} className="cursor-not-allowed rounded-full px-2.5 py-1.5 text-[#8a909b]">
                KZ
              </span>
            </div>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[15px] font-semibold text-white hover:bg-ink-2"
            >
              {c.nav.cta}
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
