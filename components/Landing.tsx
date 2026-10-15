import Link from "next/link";
import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { Faq } from "./Faq";
import { Header } from "./Header";
import { LeadForm } from "./LeadForm";
import { ArrowRight, Check, Logo } from "./ui";

/* ── Bento primitives ───────────────────────────────────────────
   Every section is a 12-column grid whose 1px gap shows the ink
   background through it, giving hairline rules with no gutters. */

function Grid({ children, dark = false, className = "", ...rest }: { children: ReactNode; dark?: boolean; className?: string } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section {...rest} className={`grid grid-cols-1 gap-px md:grid-cols-12 ${dark ? "dark bg-dark-line-2" : "bg-ink"} ${className}`}>
      {children}
    </section>
  );
}

function Cell({ children, className = "", tone = "paper" }: { children?: ReactNode; className?: string; tone?: "paper" | "white" | "ink" | "accent" }) {
  const tones = {
    paper: "bg-paper text-ink",
    white: "bg-white text-ink",
    ink: "dark bg-ink text-white",
    accent: "bg-accent text-ink",
  };
  return <div className={`min-w-0 p-6 md:p-8 lg:p-10 ${tones[tone]} ${className}`}>{children}</div>;
}

function Label({ n, children, onDark = false }: { n: string; children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`m-0 flex items-baseline gap-3 font-mono text-[12px] uppercase tracking-[0.08em] ${onDark ? "text-on-dark-2" : "text-muted"}`}>
      <span className={onDark ? "text-accent" : "text-ink"}>§{n}</span>
      <span>{children}</span>
    </p>
  );
}

function SectionHead({ n, eyebrow, title, side, id, dark = false }: { n: string; eyebrow: string; title: string; side?: string; id: string; dark?: boolean }) {
  return (
    <>
      <Cell tone={dark ? "ink" : "paper"} className="md:col-span-4 lg:col-span-3">
        <Label n={n} onDark={dark}>{eyebrow}</Label>
        {side && <p className={`mt-6 text-[15px] ${dark ? "text-on-dark" : "text-body"}`}>{side}</p>}
      </Cell>
      <Cell tone={dark ? "ink" : "paper"} className="md:col-span-8 lg:col-span-9">
        <h2 id={id} className="m-0 max-w-[900px] font-display text-[clamp(28px,3.6vw,52px)] font-medium leading-[1.08] tracking-[-0.03em]">
          {title}
        </h2>
      </Cell>
    </>
  );
}

const pad2 = (i: number) => String(i + 1).padStart(2, "0");

export function Landing({ c }: { c: Content }) {
  const privacyHref = c.lang === "ru" ? "/privacy" : "/en/privacy";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: c.meta.description,
    address: { "@type": "PostalAddress", addressLocality: "Almaty", addressCountry: "KZ" },
    ...(site.email ? { email: site.email } : {}),
    ...(site.phone ? { telephone: site.phone } : {}),
  };

  return (
    <div className="mx-auto max-w-[1440px] border-x border-ink bg-paper">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {c.lang === "ru" ? "Перейти к содержанию" : "Skip to content"}
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header c={c} />

      <main id="main" className="flex flex-col gap-px bg-ink">
        {/* ── MASTHEAD ── */}
        <Grid aria-label="Tenfold">
          <Cell className="md:col-span-12 !py-8 lg:!py-10">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <p aria-hidden="true" className="m-0 font-display text-[clamp(72px,17.5vw,252px)] font-semibold leading-[0.78] tracking-[-0.055em]">
                Tenfold<span className="align-super text-[0.22em] tracking-normal text-accent">10×</span>
              </p>
              <div className="flex flex-col items-start gap-1 pb-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted md:items-end md:text-right">
                <span>{c.footer.address}</span>
                <span>RU · EN</span>
              </div>
            </div>
          </Cell>
        </Grid>

        {/* ── HERO ── */}
        <Grid aria-labelledby="hero-title">
          <Cell className="flex flex-col justify-between gap-10 md:col-span-8">
            <Label n="01">{c.hero.eyebrow}</Label>
            <div>
              <h1 id="hero-title" className="m-0 max-w-[820px] font-display text-[clamp(32px,4vw,58px)] font-medium leading-[1.06] tracking-[-0.035em] [text-wrap:balance]">
                {c.hero.title}
              </h1>
              <p className="mt-6 max-w-[620px] text-[clamp(17px,1.35vw,19px)] text-body">{c.hero.sub}</p>
            </div>
          </Cell>

          <Cell tone="ink" className="md:col-span-4">
            <figure aria-label={c.card.aria} className="m-0 font-mono text-[13px] leading-normal">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.06em] text-on-dark-2">
                <span>{c.card.title}</span>
                <span className="border border-dark-line-2 px-2 py-[3px]">{c.card.tag}</span>
              </div>
              <div className="mt-6 text-on-dark-2">{c.card.goal}</div>
              <div className="mt-1.5 font-sans text-[19px] font-semibold leading-[1.35]">{c.card.goalText}</div>
              <div className="mt-6 flex flex-col border-t border-dark-line">
                {c.card.rows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-3 border-b border-dark-line py-3">
                    <span className="text-on-dark-2">{r.label}</span>
                    {r.value ? <span className="text-right">{r.value}</span> : <span className="text-accent">{c.card.done}</span>}
                  </div>
                ))}
                <div className="pt-3">
                  <div className="flex justify-between gap-3">
                    <span className="text-on-dark-2">{c.card.buildLabel}</span>
                    <span>{c.card.sprint}</span>
                  </div>
                  <div aria-hidden="true" className="mt-3 h-1.5 bg-dark-line">
                    <div className="h-full w-1/2 bg-accent" />
                  </div>
                </div>
              </div>
              <div className="mt-6 border-l-2 border-accent pl-3 font-sans text-sm text-[#d5d8de]">{c.card.foot}</div>
            </figure>
          </Cell>

          <a href="#contact" className="group flex min-h-[160px] flex-col justify-between gap-6 bg-accent p-6 text-ink transition-colors hover:bg-ink hover:text-white md:col-span-4 md:p-8 lg:p-10">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em]">→ {c.nav.cta}</span>
            <span className="flex items-end justify-between gap-4 font-display text-[clamp(22px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.02em]">
              {c.hero.cta}
              <ArrowRight className="h-7 w-7 flex-none" />
            </span>
          </a>
          <a href="#models" className="group flex min-h-[160px] flex-col justify-between gap-6 bg-paper p-6 text-ink transition-colors hover:bg-white md:col-span-4 md:p-8 lg:p-10">
            <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">→ {c.models.eyebrow}</span>
            <span className="flex items-end justify-between gap-4 font-display text-[clamp(22px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.02em]">
              {c.hero.cta2}
              <ArrowRight className="h-7 w-7 flex-none" />
            </span>
          </a>
          <div className="grid grid-cols-3 gap-px bg-ink md:col-span-4">
            {c.hero.facts.map((f) => (
              <div key={f.k} className="flex min-h-[160px] flex-col justify-between gap-4 bg-paper p-5 lg:p-6">
                <span className="whitespace-nowrap font-display text-[clamp(18px,1.6vw,24px)] font-medium leading-none tracking-[-0.03em]">{f.v}</span>
                <span className="font-mono text-[11px] uppercase leading-snug tracking-[0.06em] text-muted">{f.k}</span>
              </div>
            ))}
          </div>

          {c.who.items.map((w, i) => (
            <Cell key={w.k} tone="white" className="md:col-span-4">
              <div className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                <span>{w.k}</span>
                <span>{pad2(i)}/03</span>
              </div>
              <p className="mt-4 text-[17px] font-semibold leading-snug">{w.v}</p>
            </Cell>
          ))}
        </Grid>

        {/* ── PATHS ── */}
        <Grid aria-labelledby="paths-title">
          <SectionHead n="02" eyebrow={c.paths.eyebrow} title={c.paths.title} id="paths-title" />
          {c.paths.items.map((p) => (
            <Cell key={p.letter} tone="white" className="flex flex-col md:col-span-6">
              <span aria-hidden="true" className="font-display text-[88px] font-medium leading-[0.8] tracking-[-0.05em] text-line-strong">{p.letter}</span>
              <h3 className="mt-8 font-display text-[clamp(26px,2.4vw,34px)] font-medium tracking-[-0.025em]">{p.title}</h3>
              <p className="mt-3 max-w-[520px] text-body">{p.body}</p>
              <ul className="mt-8 list-none border-t border-ink p-0 text-base">
                {p.points.map((pt, i) => (
                  <li key={pt} className="flex gap-4 border-b border-line-strong py-3">
                    <span className="font-mono text-[12px] leading-[1.9] text-muted">{pad2(i)}</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-8 font-bold underline decoration-accent decoration-2 underline-offset-4">
                {p.cta}
                <ArrowRight />
              </a>
            </Cell>
          ))}
        </Grid>

        {/* ── SERVICES ── */}
        <Grid id="services" aria-labelledby="services-title">
          <SectionHead n="03" eyebrow={c.services.eyebrow} title={c.services.title} side={c.services.side} id="services-title" />
          {c.services.items.map((s, i) => (
            <Cell key={s.problem} tone={i === 0 ? "white" : "paper"} className="flex flex-col md:col-span-6 lg:col-span-4">
              <div className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                <span>{pad2(i)}</span>
                <span className="text-right">{s.tag}</span>
              </div>
              <h3 className={`mt-8 font-bold leading-[1.25] tracking-[-0.01em] ${i === 0 ? "font-display text-[clamp(26px,2.6vw,38px)] font-medium" : "text-[21px]"}`}>{s.problem}</h3>
              <p className="mt-3 text-base text-body">{s.answer}</p>
            </Cell>
          ))}
        </Grid>

        {/* ── WHY ── */}
        <Grid dark aria-labelledby="why-title">
          <SectionHead n="04" eyebrow={c.why.eyebrow} title={c.why.title} id="why-title" dark />
          {c.why.items.map((y, i) => (
            <Cell key={y.title} tone="ink" className="md:col-span-6 lg:col-span-3">
              <span className={`font-mono text-[12px] ${i === 0 ? "text-accent" : "text-on-dark-2"}`}>{pad2(i)}</span>
              <h3 className="mt-6 text-xl font-bold">{y.title}</h3>
              <p className="mt-2.5 text-base text-on-dark">{y.body}</p>
            </Cell>
          ))}
        </Grid>

        {/* ── PROCESS ── */}
        <Grid id="process" aria-labelledby="process-title">
          <SectionHead n="05" eyebrow={c.process.eyebrow} title={c.process.title} id="process-title" />
          {c.process.items.map((st, i) => (
            <Cell key={st.title} tone="white" className="flex flex-col md:col-span-6 lg:col-span-3">
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-[56px] font-medium leading-[0.85] tracking-[-0.04em]">{pad2(i)}</span>
                <span className="border border-ink px-2 py-1 font-mono text-[11px] uppercase">{st.time}</span>
              </div>
              <h3 className="mt-10 text-xl font-bold">{st.title}</h3>
              <p className="mt-2 text-base text-body">{st.body}</p>
            </Cell>
          ))}
        </Grid>

        {/* ── MODELS ── */}
        <Grid id="models" aria-labelledby="models-title">
          <SectionHead n="06" eyebrow={c.models.eyebrow} title={c.models.title} side={c.models.side} id="models-title" />
          {c.models.items.map((m) => {
            const dark = !!m.featured;
            return (
              <Cell key={m.name} tone={dark ? "ink" : "paper"} className="flex flex-col lg:col-span-4 md:col-span-12">
                <div className={`font-mono text-[12px] uppercase tracking-[0.08em] ${dark ? "text-accent" : "text-muted"}`}>{m.best}</div>
                <h3 className="mt-5 font-display text-[clamp(24px,2.2vw,30px)] font-medium tracking-[-0.02em]">{m.name}</h3>
                <p className={`mt-3 text-base ${dark ? "text-on-dark" : "text-body"}`}>{m.desc}</p>
                <ul className={`mt-7 list-none border-t p-0 text-[15px] ${dark ? "border-dark-line-2" : "border-ink"}`}>
                  {m.points.map((pt) => (
                    <li key={pt} className={`flex items-start gap-2.5 border-b py-3 ${dark ? "border-dark-line" : "border-line-strong"}`}>
                      <Check className={`mt-[3px] flex-none ${dark ? "text-accent" : "text-ink"}`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
                  <span className={`font-mono text-[13px] ${dark ? "text-on-dark" : "text-body"}`}>{m.price}</span>
                  <a href="#contact" className={`inline-flex min-h-11 items-center px-5 text-[15px] font-bold transition-colors ${dark ? "bg-accent text-ink hover:bg-white" : "bg-ink text-white hover:bg-accent hover:text-ink"}`}>
                    {c.models.cta}
                  </a>
                </div>
              </Cell>
            );
          })}
        </Grid>

        {/* ── WORK ── */}
        <Grid id="work" aria-labelledby="work-title">
          <SectionHead n="07" eyebrow={c.work.eyebrow} title={c.work.title} id="work-title" />
          <Cell tone="ink" className="flex min-h-[320px] flex-col justify-between gap-12 md:col-span-12 lg:col-span-5">
            <div className="flex items-center justify-between gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-on-dark-2">
              <span>{c.work.label}</span>
              <span className="text-accent">{c.work.industry}</span>
            </div>
            <div>
              <h3 className="m-0 break-words font-display text-[clamp(28px,3vw,44px)] font-medium leading-[1.08] tracking-[-0.03em]">{c.work.client}</h3>
              <p className="mt-4 max-w-[460px] text-base text-on-dark">{c.work.about}</p>
              <a href={site.caseUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-white underline decoration-accent decoration-2 underline-offset-4">
                {site.caseUrlLabel} ↗
              </a>
            </div>
          </Cell>
          <div className="grid grid-cols-1 gap-px bg-ink md:col-span-12 md:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
            {c.work.cols.map((col, i) => (
              <div key={col.k} className={`flex gap-6 p-6 md:p-8 ${i === 2 ? "bg-accent" : "bg-white"} md:flex-col lg:flex-row lg:items-baseline`}>
                <div className="w-36 flex-none whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.08em] text-ink">{pad2(i)} · {col.k}</div>
                <p className="m-0 text-[18px] font-semibold leading-snug">{col.v}</p>
              </div>
            ))}
          </div>
        </Grid>

        {/* ── FAQ ── */}
        <Grid id="faq" aria-labelledby="faq-title">
          <Cell className="md:col-span-5 lg:col-span-4">
            <Label n="08">{c.faq.eyebrow}</Label>
            <h2 id="faq-title" className="mt-6 hyphens-auto break-words font-display text-[clamp(24px,2.3vw,34px)] font-medium leading-[1.1] tracking-[-0.03em]">{c.faq.title}</h2>
            <p className="mt-6 text-[15px] text-body">
              {c.faq.more}{" "}
              <a href="#contact" className="font-bold underline decoration-accent decoration-2 underline-offset-4">{c.faq.moreLink}</a>.
            </p>
          </Cell>
          <Cell tone="white" className="md:col-span-7 lg:col-span-8 !py-2 md:!py-2 lg:!py-2">
            <Faq items={c.faq.items} />
          </Cell>
        </Grid>

        {/* ── CONTACT ── */}
        <Grid id="contact" aria-labelledby="contact-title">
          <Cell tone="ink" className="flex flex-col md:col-span-12 lg:col-span-5">
            <Label n="09" onDark>{c.contact.eyebrow}</Label>
            <h2 id="contact-title" className="mt-8 font-display text-[clamp(30px,3.6vw,52px)] font-medium leading-[1.06] tracking-[-0.035em]">{c.contact.title}</h2>
            <p className="mt-6 max-w-[460px] text-on-dark">{c.contact.sub}</p>
            <ol className="mt-10 list-none border-t border-dark-line-2 p-0">
              {c.contact.next.map((n, i) => (
                <li key={n} className="flex gap-4 border-b border-dark-line-2 py-4">
                  <span className="font-mono text-accent">{pad2(i)}</span>
                  <span className="text-[#e4e6ea]">{n}</span>
                </li>
              ))}
            </ol>
            {(site.email || site.phone) && (
              <div className="mt-auto flex flex-wrap gap-8 pt-10 text-[15px]">
                {site.email && (
                  <div>
                    <div className="font-mono text-xs uppercase text-on-dark-2">{c.contact.emailLabel}</div>
                    <a href={`mailto:${site.email}`} className="font-semibold text-white underline">{site.email}</a>
                  </div>
                )}
                {site.phone && (
                  <div>
                    <div className="font-mono text-xs uppercase text-on-dark-2">{c.contact.phoneLabel}</div>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-white">{site.phone}</a>
                  </div>
                )}
              </div>
            )}
          </Cell>
          <Cell tone="white" className="md:col-span-12 lg:col-span-7">
            <LeadForm c={c} />
          </Cell>
        </Grid>

        {/* ── FOOTER ── */}
        <footer className="grid grid-cols-1 gap-px bg-dark-line-2 text-sm md:grid-cols-12">
          <div className="dark flex items-center bg-ink p-6 md:col-span-4 md:px-8">
            <Logo onDark />
          </div>
          <div className="flex items-center bg-ink p-6 text-on-dark-2 md:col-span-3 md:px-8">{c.footer.address}</div>
          <div className="dark flex flex-wrap items-center gap-x-6 gap-y-2 bg-ink p-6 md:col-span-5 md:justify-end md:px-8">
            <a href="#services" className="text-on-dark hover:text-white">{c.nav.services}</a>
            <a href="#models" className="text-on-dark hover:text-white">{c.nav.models}</a>
            <Link href={privacyHref} className="text-on-dark hover:text-white">{c.footer.privacy}</Link>
            <Link href={c.lang === "ru" ? "/en" : "/"} hrefLang={c.lang === "ru" ? "en" : "ru"} className="text-on-dark hover:text-white">
              {c.lang === "ru" ? "English" : "Русский"}
            </Link>
            <span className="text-on-dark-2">{c.footer.rights}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
