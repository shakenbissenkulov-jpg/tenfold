import Link from "next/link";
import type { Content } from "@/content/types";
import { Logo } from "./ui";

const navLink = "hidden h-full items-center border-l border-ink px-5 text-[15px] font-medium hover:bg-ink hover:text-white lg:flex";

export function Header({ c }: { c: Content }) {
  const home = c.lang === "ru" ? "/" : "/en";
  const langs = [
    { code: "RU", href: "/", active: c.lang === "ru" },
    { code: "EN", href: "/en", active: c.lang === "en" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-ink bg-paper">
      <nav aria-label={c.nav.label} className="flex h-16 items-stretch">
        <Link href={home} aria-label="Tenfold" className="flex items-center px-5 text-ink sm:px-6">
          <Logo />
        </Link>

        <div className="ml-auto flex items-stretch">
          <a href="#services" className={navLink}>{c.nav.services}</a>
          <a href="#process" className={navLink}>{c.nav.process}</a>
          <a href="#models" className={navLink}>{c.nav.models}</a>
          <a href="#faq" className={navLink}>{c.nav.faq}</a>

          <div role="group" aria-label={c.nav.langLabel} className="hidden items-stretch border-l border-ink font-mono text-xs sm:flex">
            {langs.map((l) =>
              l.active ? (
                <span key={l.code} aria-current="true" className="flex items-center bg-ink px-3 text-white">
                  {l.code}
                </span>
              ) : (
                <Link key={l.code} href={l.href} hrefLang={l.code.toLowerCase()} className="flex items-center px-3 text-body hover:bg-line">
                  {l.code}
                </Link>
              ),
            )}
            <span aria-disabled="true" title={c.nav.kzSoon} className="flex cursor-not-allowed items-center px-3 text-[#8a909b]">
              KZ
            </span>
          </div>

          <a
            href="#contact"
            className="flex items-center whitespace-nowrap border-l border-ink bg-accent px-5 text-[15px] font-bold text-ink hover:bg-ink hover:text-white sm:px-6"
          >
            {c.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
