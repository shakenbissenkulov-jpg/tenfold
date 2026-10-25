import Link from "next/link";
import type { Content } from "@/content/types";
import { privacyPath, site } from "@/content/site";
import { Faq } from "./Faq";
import { CountUp } from "./CountUp";
import { Header } from "./Header";
import { Logo } from "./Logo";
import { LeadForm } from "./LeadForm";
import { Process } from "./Process";

const wrap = "mx-auto max-w-[1320px] px-5 sm:px-8";
const sectionPad = "pt-[clamp(96px,11vw,152px)]";

const HYP_STYLE = [
  { id: "H-07", dot: "bg-ok", status: "text-ok", text: "text-white" },
  { id: "H-08", dot: "bg-white", status: "text-white", text: "text-white" },
  { id: "H-09", dot: "bg-on-dark-3", status: "text-on-dark-3", text: "text-on-dark-3" },
  { id: "H-10", dot: "bg-on-dark-3", status: "text-on-dark-3", text: "text-on-dark" },
];

const SLA_STYLE = [
  { code: "P1", badge: "bg-[#EF4444] text-ink" },
  { code: "P2", badge: "bg-[#E4E4E0] text-ink" },
  { code: "P3", badge: "bg-sand-2 text-muted" },
];

function ServiceIcon({ i }: { i: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, "aria-hidden": true } as const;
  switch (i) {
    case 0:
      return (
        <svg width="88" height="88" viewBox="0 0 48 48" strokeLinejoin="round" {...common}>
          <path d="M24 6c1.5 9 4.5 12 13.5 13.5C28.5 21 25.5 24 24 33c-1.5-9-4.5-12-13.5-13.5C19.5 18 22.5 15 24 6z" />
          <path d="M37 30c.6 3.5 1.8 4.7 5.3 5.3-3.5.6-4.7 1.8-5.3 5.3-.6-3.5-1.8-4.7-5.3-5.3 3.5-.6 4.7-1.8 5.3-5.3z" />
        </svg>
      );
    case 1:
      return (
        <svg width="96" height="88" viewBox="0 0 52 48" {...common}>
          <path d="M4 40h44" />
          <path d="M8 36l10-10 8 6 16-18" />
          <circle cx="18" cy="26" r="2" />
          <circle cx="26" cy="32" r="2" />
          <circle cx="42" cy="14" r="2" />
        </svg>
      );
    case 2:
      return (
        <svg width="96" height="80" viewBox="0 0 56 46" {...common}>
          <rect x="3" y="3" width="50" height="40" rx="3" />
          <path d="M3 11h50" />
          <rect x="9" y="17" width="16" height="20" rx="1.5" />
          <path d="M30 19h17M30 25h17M30 31h11" />
        </svg>
      );
    case 3:
      return (
        <svg width="96" height="80" viewBox="0 0 56 46" strokeLinecap="round" strokeLinejoin="round" {...common}>
          <rect x="3" y="3" width="50" height="40" rx="3" />
          <path d="M3 11h50" />
          <path d="M21 21l-5 5 5 5M35 21l5 5-5 5M30 18l-4 16" />
        </svg>
      );
    default:
      return (
        <svg width="60" height="96" viewBox="0 0 30 48" {...common}>
          <rect x="3" y="2" width="24" height="44" rx="4" />
          <path d="M12 6h6" />
          <rect x="7" y="11" width="16" height="10" rx="1.5" />
          <path d="M7 26h16M7 31h11" />
        </svg>
      );
  }
}

export function Landing({ c }: { c: Content }) {
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

  const tel = site.phone.replace(/[^\d+]/g, "");
  const pad = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[10px] focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {c.skip}
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header c={c} />

      <main id="main">
        {/* HERO */}
        <section id="top" className="dark bg-ink text-white">
          <div className={`${wrap} flex flex-col items-center pb-[clamp(56px,6vw,80px)] pt-[clamp(96px,12vw,168px)] text-center`}>
            <p className="m-0 text-sm text-on-dark-2">{c.heroEyebrow}</p>
            <h1 className="mt-5 max-w-[980px] text-[clamp(40px,5.6vw,80px)] font-normal leading-[1.04] tracking-[-0.03em] [text-wrap:balance]">{c.heroTitle}</h1>
            <p className="mt-7 max-w-[720px] text-[clamp(17px,1.4vw,19px)] text-on-dark">{c.heroSub}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#contact" className="inline-flex min-h-[52px] items-center gap-2.5 rounded-[10px] bg-white px-[26px] font-medium text-ink hover:bg-[#E9E9E6] hover:text-ink">
                {c.heroCta} <span aria-hidden="true">→</span>
              </a>
              <a href="#process" className="inline-flex min-h-[52px] items-center rounded-[10px] border border-white/30 px-[26px] text-white hover:bg-white/10 hover:text-white">
                {c.heroCta2}
              </a>
            </div>

            <figure aria-label={c.trackerAria} className="m-0 mt-[clamp(64px,8vw,104px)] w-full max-w-[760px] rounded-2xl border border-white/12 bg-white/6 px-7 py-6 text-left">
              <div className="flex items-center justify-between gap-3 text-[13px] text-on-dark-2">
                <span>{c.trackerTitle}</span>
                <span className="rounded-md border border-white/20 px-2.5 py-0.5">{c.example}</span>
              </div>
              <div className="mt-3.5">
                {c.hyps.map((h, i) => {
                  const st = HYP_STYLE[i];
                  return (
                    <div key={st.id} className="flex items-baseline gap-4 border-t border-white/10 py-3">
                      <span className="hidden w-10 flex-none text-[13px] text-on-dark-3 sm:inline">{st.id}</span>
                      <span className={`flex-auto text-[15px] ${st.text}`}>{h.text}</span>
                      <span className={`inline-flex flex-none items-center gap-1.5 text-[13px] ${st.status}`}>
                        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                        {h.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </figure>
          </div>
        </section>

        {/* STATS */}
        <section aria-label={c.statsLabel} className={`${wrap} pt-[clamp(80px,9vw,120px)]`}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3">
            {c.stats.map((s, i) => (
              <div key={s.k} className="bg-white px-8 py-10 text-center">
                <CountUp value={s.v} delay={(i % 3) * 120} className="text-[clamp(44px,4.6vw,64px)] font-light leading-none tracking-[-0.04em]" />
                <div className="mx-auto mt-4 max-w-[260px] text-[15px] text-muted">{s.k}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW WE WORK */}
        <section id="process" aria-labelledby="process-title" className={`${wrap} ${sectionPad}`}>
          <div className="text-center">
            <h2 id="process-title" className="h2 m-0">{c.processTitle}</h2>
            <p className="mx-auto mt-[18px] max-w-[560px] text-muted">{c.processSub}</p>
          </div>
          <Process c={c} />

          <div id="pricing" className="mt-[clamp(72px,8vw,104px)] flex flex-wrap items-end justify-between gap-5">
            <h3 className="h3 m-0 flex-[1_1_420px]">{c.payTitle}</h3>
            <p className="m-0 max-w-[440px] flex-[1_1_320px] text-muted">{c.paySub}</p>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {c.payments.map((pm) => (
              <div key={pm.name} className="card flex flex-col rounded-2xl border border-line bg-white p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-2xl font-normal tracking-[-0.02em]">{pm.name}</div>
                  {pm.alt && <span className="rounded-md bg-sand-2 px-2.5 py-1 text-[13px] text-body">{pm.alt}</span>}
                </div>
                <p className="mb-6 mt-3 text-[15px] text-body">{pm.desc}</p>
                <div className="mt-auto border-t border-line-2 pt-4 text-[14px]">
                  <div className="text-[12px] text-faint">{c.payWhenLabel}</div>
                  <div className="mt-1 text-muted">{pm.when}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DATA-DRIVEN */}
        <section id="data" aria-labelledby="data-title" className="dark mt-[clamp(96px,11vw,152px)] bg-ink text-white">
          <div className={`${wrap} py-[clamp(80px,9vw,128px)]`}>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-[720px]">
                <p className="m-0 text-sm text-on-dark-2">{c.dataEyebrow}</p>
                <h2 id="data-title" className="h2 mt-4">{c.dataTitle}</h2>
                <p className="mt-5 text-[17px] text-on-dark">{c.dataSub}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 px-3.5 py-2 text-sm text-on-dark">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ok" />
                {c.dataTools}
              </span>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {c.dataItems.map((d, i) => (
                <div key={d.title} className="bg-ink p-7">
                  <div className="text-sm text-on-dark-3">{pad(i)}</div>
                  <h3 className="mt-6 text-lg font-medium">{d.title}</h3>
                  <p className="mt-2 text-[15px] text-on-dark">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GUARANTEES */}
        <section id="guarantees" aria-labelledby="guar-title" className={`${wrap} ${sectionPad}`}>
          <div className="text-center">
            <h2 id="guar-title" className="h2 m-0">{c.guarTitle}</h2>
            <p className="mx-auto mt-[18px] max-w-[560px] text-muted">{c.guarSub}</p>
          </div>
          <div className="card mt-12 rounded-[20px] border border-line bg-white p-6 md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="m-0 text-xl font-medium">{c.slaTitle}</h3>
              <span className="text-sm text-muted">{c.slaNote}</span>
            </div>
            <div role="table" aria-label={c.slaTitle} className="mt-5">
              <div role="row" className="hidden gap-6 border-b border-line-2 py-3 text-[13px] text-muted md:flex">
                <span role="columnheader" className="w-[200px] flex-none">{c.slaColLevel}</span>
                <span role="columnheader" className="flex-1">{c.slaColDesc}</span>
                <span role="columnheader" className="w-[220px] flex-none">{c.slaColTime}</span>
              </div>
              {c.sla.map((r, i) => (
                <div role="row" key={r.name} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line-2 py-[22px]">
                  <span role="cell" className="flex w-[200px] flex-none items-center gap-2.5">
                    <span className={`rounded-md px-2.5 py-0.5 text-[13px] font-medium ${SLA_STYLE[i].badge}`}>{SLA_STYLE[i].code}</span>
                    <span className="text-[17px] font-medium">{r.name}</span>
                  </span>
                  <span role="cell" className="min-w-[260px] flex-1 text-[15px] text-muted">{r.desc}</span>
                  <span role="cell" className="w-[220px] flex-none text-[22px] font-normal tracking-[-0.02em]">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {c.guarantees.map((g) => (
              <div key={g.title} className="card rounded-2xl border border-line bg-white p-7">
                <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-2 text-accent">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </div>
                <h3 className="mt-5 text-lg font-medium">{g.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STREAMS */}
        <section id="services" aria-labelledby="svc-title" className={`${wrap} ${sectionPad}`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="svc-title" className="h2 m-0">{c.svcTitle}</h2>
              <p className="mt-[18px] max-w-[560px] text-muted">{c.svcSub}</p>
            </div>
            <a href="#contact" className="inline-flex min-h-12 items-center gap-2.5 rounded-[10px] border border-ink px-5 text-ink hover:bg-ink hover:text-white">
              {c.heroCta} <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="m-0 mt-12 list-none border-t border-ink p-0">
            {c.services.map((sv, i) => (
              <li key={sv.name}>
                <a
                  href="#contact"
                  className="group grid grid-cols-1 items-center gap-x-8 gap-y-4 border-b border-line py-8 text-ink hover:text-ink md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.25fr)_48px] md:py-10"
                >
                  <span className="text-sm text-faint transition-colors duration-300 group-hover:text-accent">{pad(i)}</span>
                  <span className="flex items-center gap-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                    <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-sand text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white [&_svg]:h-6 [&_svg]:w-auto">
                      <ServiceIcon i={i} />
                    </span>
                    <h3 className="m-0 text-[clamp(24px,2.6vw,36px)] font-normal leading-tight tracking-[-0.025em]">{sv.name}</h3>
                  </span>
                  <span className="flex flex-col gap-3">
                    <span className="text-[15px] text-muted">{sv.desc}</span>
                    <span className="flex flex-wrap gap-1.5">
                      {sv.tags.map((t) => (
                        <span key={t} className="rounded-md bg-sand-2 px-2.5 py-1 text-[13px] text-body transition-colors duration-300 group-hover:bg-sand">{t}</span>
                      ))}
                    </span>
                  </span>
                  <span aria-hidden="true" className="hidden h-12 w-12 items-center justify-center justify-self-end rounded-[10px] border border-line text-lg transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white md:flex">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* REVIEWS */}
        <section id="reviews" aria-labelledby="rev-title" className={`${wrap} ${sectionPad}`}>
          <h2 id="rev-title" className="h2 m-0">{c.revTitle}</h2>
          {c.reviews.slice(0, 1).map((rv) => (
            <figure key={rv.site} className="card m-0 mt-12 grid grid-cols-1 overflow-hidden rounded-[20px] border border-line bg-white lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <div className="p-8 md:p-12">
                <svg aria-hidden="true" width="36" height="28" viewBox="0 0 32 24" className="text-accent" fill="currentColor"><path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z" /></svg>
                <blockquote className="m-0 mt-6 text-[clamp(22px,2.2vw,30px)] font-normal leading-[1.35] tracking-[-0.015em]">{rv.quote}</blockquote>
              </div>
              <figcaption className="flex flex-col justify-between gap-8 border-t border-line bg-sand-2 p-8 md:p-12 lg:border-l lg:border-t-0">
                <div className="flex items-center gap-4">
                  <div role="img" aria-label={rv.photoAlt} className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-sand text-faint">
                    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium">{rv.name}</div>
                    <div className="text-sm text-muted">{rv.role}</div>
                  </div>
                </div>
                <a href={rv.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-between gap-3 rounded-[10px] border border-ink bg-white px-5 text-ink hover:bg-ink hover:text-white">
                  <span>{rv.site}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-title" className={`${wrap} ${sectionPad}`}>
          <div className="flex flex-wrap items-center gap-[clamp(32px,5vw,72px)]">
            <div className="min-w-0 flex-[999_1_520px]">
              <p className="m-0 text-sm text-muted">{c.aboutLabel}</p>
              <h2 id="about-title" className="h2 mt-4">{c.aboutTitle}</h2>
              <p className="mt-6 max-w-[640px] text-[clamp(17px,1.4vw,19px)] text-body">{c.aboutText}</p>
            </div>
            <div role="img" aria-label={c.aboutPhoto} className="flex aspect-[4/5] max-h-[520px] min-w-0 flex-[1_1_320px] items-center justify-center rounded-xl bg-sand text-sm text-faint">
              {c.aboutPhoto}
            </div>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((vl) => (
              <div key={vl.title}>
                <h3 className="m-0 text-lg font-medium">{vl.title}</h3>
                <p className="mt-2 text-[15px] text-muted">{vl.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className={`${wrap} ${sectionPad} flex flex-wrap gap-12 pb-[clamp(96px,11vw,152px)]`}>
          <div className="flex-[1_1_320px]">
            <h2 id="faq-title" className="h2 m-0">{c.faqTitle}</h2>
            <p className="mt-[18px] text-muted">
              {c.faqMore}{" "}
              <a href="#contact" className="font-medium underline underline-offset-4">{c.faqMoreLink}</a>.
            </p>
          </div>
          <Faq items={c.faqs} />
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="ct-title" className="dark bg-ink text-white">
          <div className={`${wrap} flex flex-wrap items-start gap-14 py-[clamp(96px,11vw,152px)]`}>
            <div className="min-w-0 flex-[1_1_380px]">
              <h2 id="ct-title" className="m-0 text-[clamp(36px,4.4vw,64px)] font-normal leading-[1.04] tracking-[-0.03em]">{c.ctTitle}</h2>
              <p className="mt-6 max-w-[460px] text-[17px] text-on-dark">{c.ctSub}</p>
              <ol className="m-0 mt-10 max-w-[460px] list-none p-0">
                {c.next.map((n, i) => (
                  <li key={n} className="flex gap-4 border-t border-white/12 py-4">
                    <span className="text-on-dark-3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[#E4E6EA]">{n}</span>
                  </li>
                ))}
              </ol>
              {site.phone && (
                <div className="mt-10 max-w-[460px] rounded-2xl border border-white/12 p-6">
                  <div className="text-sm text-on-dark-2">{c.callLead}</div>
                  <a href={`tel:${tel}`} className="mt-2 inline-flex min-h-11 items-center gap-3 text-[clamp(24px,2.4vw,32px)] font-normal tracking-[-0.02em] text-white underline-offset-4 hover:text-white hover:underline">
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
                    {site.phone}
                  </a>
                </div>
              )}
              {site.email && (
                <a href={`mailto:${site.email}`} className="mt-4 inline-block text-white underline">{site.email}</a>
              )}
            </div>
            <div className="min-w-0 flex-[1_1_480px] rounded-[20px] bg-white p-6 text-ink md:p-10">
              <LeadForm c={c} />
            </div>
          </div>
        </section>
      </main>

      <footer className="dark border-t border-white/10 bg-ink text-sm text-on-dark-2">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-6 py-10`}>
          <div className="flex flex-wrap items-center gap-2">
            <Logo height={20} onDark />
            <span className="ml-3">{c.footCity}</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#process" className="text-[#D5D8DE] hover:text-white">{c.navProcess}</a>
            <a href="#services" className="text-[#D5D8DE] hover:text-white">{c.navServices}</a>
            {site.phone && <a href={`tel:${tel}`} className="text-[#D5D8DE] hover:text-white">{site.phone}</a>}
            <Link href={privacyPath[c.lang]} className="text-[#D5D8DE] hover:text-white">{c.footPrivacy}</Link>
            <span>© 2026 Tenfold</span>
          </div>
        </div>
      </footer>
    </>
  );
}
