"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Content, Lang } from "@/content/types";
import { homePath, site } from "@/content/site";
import { Logo } from "./Logo";

const LANGS: { code: string; lang: Lang; hreflang: string }[] = [
  { code: "RU", lang: "ru", hreflang: "ru" },
  { code: "EN", lang: "en", hreflang: "en" },
  { code: "KZ", lang: "kz", hreflang: "kk" },
];

const SECTIONS = ["process", "guarantees", "services", "reviews", "faq"] as const;
type SectionId = (typeof SECTIONS)[number];

/** Highlights the nav item whose section is currently in view. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: SectionId | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return active;
}

function NavLink({ id, label, active }: { id: SectionId; label: string; active: boolean }) {
  return (
    <a
      href={`#${id}`}
      aria-current={active ? "location" : undefined}
      className={`relative hidden py-1.5 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-ink after:transition-transform after:duration-300 xl:inline ${
        active ? "text-ink after:scale-x-100" : "text-body after:scale-x-0 hover:text-ink hover:after:scale-x-100 hover:after:bg-line"
      }`}
    >
      {label}
    </a>
  );
}

export function Header({ c }: { c: Content }) {
  const active = useActiveSection();
  const tel = site.phone.replace(/[^\d+]/g, "");

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
          className="mx-auto grid h-[68px] max-w-[1320px] grid-cols-[auto_1fr] items-center gap-4 px-4 text-[15px] sm:px-8 xl:grid-cols-[1fr_auto_1fr]"
        >
          <div className="hidden min-w-0 items-center gap-6 xl:flex">
            <NavLink id="process" label={c.navProcess} active={active === "process"} />
            <NavLink id="services" label={c.navServices} active={active === "services"} />
            <NavLink id="guarantees" label={c.navGuarantees} active={active === "guarantees"} />
          </div>
          <Link href={homePath[c.lang]} aria-label="Tenfold" className="flex items-center text-ink">
            <Logo height={22} />
          </Link>
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <NavLink id="reviews" label={c.navReviews} active={active === "reviews"} />
            <NavLink id="faq" label="FAQ" active={active === "faq"} />
            {site.phone && (
              <a
                href={`tel:${tel}`}
                aria-label={`${c.callShort}: ${site.phone}`}
                className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-[10px] border border-field px-2.5 text-sm text-ink hover:border-ink hover:text-ink"
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <span className="hidden whitespace-nowrap 2xl:inline">{site.phone}</span>
              </a>
            )}
            <div role="group" aria-label={c.langLabel} className="flex gap-0.5 rounded-[10px] bg-pill p-[3px]">
              {LANGS.map((l) =>
                l.lang === c.lang ? (
                  <span key={l.code} aria-current="true" className="inline-flex min-h-[30px] min-w-9 items-center justify-center rounded-[7px] bg-white px-2 text-xs font-medium text-ink">
                    {l.code}
                  </span>
                ) : (
                  <Link key={l.code} href={homePath[l.lang]} hrefLang={l.hreflang} className="inline-flex min-h-[30px] min-w-9 items-center justify-center rounded-[7px] px-2 text-xs font-medium text-muted hover:text-ink">
                    {l.code}
                  </Link>
                ),
              )}
            </div>
            <a
              href="#contact"
              className="hidden min-h-10 items-center whitespace-nowrap rounded-[10px] bg-ink px-[18px] text-sm text-white hover:bg-ink-2 hover:text-white sm:inline-flex"
            >
              {c.navCta}
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
