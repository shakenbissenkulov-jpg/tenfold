import Link from "next/link";
import type { Content } from "@/content/types";
import { site } from "@/content/site";
import { Faq } from "./Faq";
import { Header } from "./Header";
import { LeadForm } from "./LeadForm";
import { ArrowRight, Check, Container, Eyebrow, H2, Logo } from "./ui";

const section = "pt-[clamp(72px,9vw,120px)]";
const cardHover = "transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-[3px] hover:border-ink";

function BuildIcon() {
  return (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="5" width="30" height="30" rx="4" />
      <path d="M5 14h30" />
      <path d="M14 22l-4 3 4 3" />
      <path d="M26 22l4 3-4 3" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="13" cy="14" r="5" />
      <circle cx="27" cy="14" r="5" />
      <path d="M4 33c1.5-6 5-9 9-9s7.5 3 9 9" />
      <path d="M22 27c1.3-2 3-3 5-3 4 0 7.5 3 9 9" />
    </svg>
  );
}

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
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        {c.lang === "ru" ? "Перейти к содержанию" : "Skip to content"}
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header c={c} />

      <main id="main">
        {/* HERO */}
        <Container className="flex flex-wrap items-center gap-14 pb-[clamp(64px,8vw,104px)] pt-[clamp(56px,8vw,112px)]">
          <div className="min-w-0 flex-[999_1_560px]">
            <p className="m-0 mb-7 inline-flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.04em] text-muted">
              <span aria-hidden="true" className="h-2 w-2 rounded-[2px] bg-accent" />
              {c.hero.eyebrow}
            </p>
            <h1 className="m-0 font-display text-[clamp(30px,4.1vw,58px)] font-medium leading-[1.08] tracking-[-0.035em] [text-wrap:balance]">
              {c.hero.title}
            </h1>
            <p className="mt-7 max-w-[580px] text-[clamp(17px,1.4vw,20px)] text-body">{c.hero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-accent px-[26px] font-bold text-ink">
                {c.hero.cta}
                <ArrowRight />
              </a>
              <a href="#models" className="inline-flex min-h-[52px] items-center rounded-full border border-ink px-[26px] font-semibold text-ink hover:bg-white">
                {c.hero.cta2}
              </a>
            </div>
            <p className="mt-5 text-sm text-muted">{c.hero.note}</p>
          </div>

          <figure aria-label={c.card.aria} className="m-0 min-w-0 flex-[1_1_380px] rounded-[20px] bg-ink p-7 font-mono text-[13px] leading-normal text-white">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.06em] text-on-dark-2">
              <span>{c.card.title}</span>
              <span className="rounded-full border border-dark-line-2 px-2 py-[3px]">{c.card.tag}</span>
            </div>
            <div className="mt-[22px] text-on-dark-2">{c.card.goal}</div>
            <div className="mt-1.5 font-sans text-[19px] font-semibold leading-[1.35]">{c.card.goalText}</div>
            <div className="mt-[26px] flex flex-col border-t border-dark-line">
              {c.card.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-3 border-b border-dark-line py-[13px]">
                  <span className="text-on-dark-2">{r.label}</span>
                  {r.value ? <span className="text-right">{r.value}</span> : <span className="text-accent">{c.card.done}</span>}
                </div>
              ))}
              <div className="pb-1 pt-[13px]">
                <div className="flex justify-between gap-3">
                  <span className="text-on-dark-2">{c.card.buildLabel}</span>
                  <span>{c.card.sprint}</span>
                </div>
                <div aria-hidden="true" className="mt-3 h-1.5 overflow-hidden rounded-full bg-dark-line">
                  <div className="h-full w-1/2 bg-accent" />
                </div>
              </div>
            </div>
            <div className="mt-[22px] rounded-xl bg-ink-2 px-4 py-3.5 font-sans text-sm text-[#d5d8de]">{c.card.foot}</div>
          </figure>
        </Container>

        {/* WHO */}
        <section aria-label={c.who.label} className="border-y border-line bg-white">
          <Container className="grid grid-cols-1 gap-x-7 md:grid-cols-3">
            {c.who.items.map((w) => (
              <div key={w.k} className="py-8">
                <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{w.k}</div>
                <div className="mt-2 font-semibold">{w.v}</div>
              </div>
            ))}
          </Container>
        </section>

        {/* PATHS */}
        <section aria-labelledby="paths-title" className={section}>
          <Container>
            <Eyebrow>{c.paths.eyebrow}</Eyebrow>
            <H2 id="paths-title" className="max-w-[820px]">{c.paths.title}</H2>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
              {c.paths.items.map((p) => (
                <article key={p.letter} className={`flex flex-col rounded-[20px] border border-line bg-white p-[clamp(28px,3vw,44px)] ${cardHover}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[13px] text-muted">{p.letter}</span>
                    {p.kind === "build" ? <BuildIcon /> : <TeamIcon />}
                  </div>
                  <h3 className="mt-7 font-display text-[28px] font-medium tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-3 text-body">{p.body}</p>
                  <ul className="mt-6 flex list-none flex-col gap-2.5 p-0 text-base">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden="true" className="font-bold">—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-8 font-bold">
                    {p.cta}
                    <ArrowRight />
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* SERVICES */}
        <section id="services" aria-labelledby="services-title" className={section}>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex-[1_1_520px]">
                <Eyebrow>{c.services.eyebrow}</Eyebrow>
                <H2 id="services-title">{c.services.title}</H2>
              </div>
              <p className="m-0 max-w-[380px] flex-[1_1_320px] text-body">{c.services.side}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-3">
              {c.services.items.map((s, i) => (
                <div key={s.problem} className="border-b border-r border-line-strong px-7 pb-9 pt-8">
                  <div className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-5 text-[21px] font-bold leading-[1.3] tracking-[-0.01em]">{s.problem}</h3>
                  <p className="mt-2.5 text-base text-body">{s.answer}</p>
                  <div className="mt-[18px] font-mono text-xs uppercase tracking-[0.04em] text-muted">{s.tag}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* WHY */}
        <section aria-labelledby="why-title" className="dark mt-[clamp(72px,9vw,120px)] bg-ink text-white">
          <Container className="py-[clamp(72px,9vw,120px)]">
            <Eyebrow onDark>{c.why.eyebrow}</Eyebrow>
            <H2 id="why-title" className="max-w-[860px]">{c.why.title}</H2>
            <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {c.why.items.map((y, i) => (
                <div key={y.title} className={`border-t-2 pt-6 ${i === 0 ? "border-accent" : "border-dark-line-2"}`}>
                  <h3 className="m-0 text-xl font-bold">{y.title}</h3>
                  <p className="mt-2.5 text-base text-on-dark">{y.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* PROCESS */}
        <section id="process" aria-labelledby="process-title" className={section}>
          <Container>
            <Eyebrow>{c.process.eyebrow}</Eyebrow>
            <H2 id="process-title" className="max-w-[820px]">{c.process.title}</H2>
            <ol className="mt-14 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {c.process.items.map((st, i) => (
                <li key={st.title} className="rounded-[20px] border border-line bg-white p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-[40px] font-medium leading-none tracking-[-0.03em]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-xs text-muted">{st.time}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-bold">{st.title}</h3>
                  <p className="mt-2 text-base text-body">{st.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* MODELS */}
        <section id="models" aria-labelledby="models-title" className={section}>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="flex-[1_1_520px]">
                <Eyebrow>{c.models.eyebrow}</Eyebrow>
                <H2 id="models-title">{c.models.title}</H2>
              </div>
              <p className="m-0 max-w-[380px] flex-[1_1_320px] text-body">{c.models.side}</p>
            </div>
            <div className="mt-12 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
              {c.models.items.map((m) => {
                const dark = !!m.featured;
                return (
                  <article key={m.name} className={`flex flex-col rounded-[20px] border p-8 ${dark ? "dark border-ink bg-ink text-white" : "border-line bg-white text-ink"}`}>
                    <div className={`font-mono text-xs uppercase tracking-[0.06em] ${dark ? "text-on-dark" : "text-body"}`}>{m.best}</div>
                    <h3 className="mt-4 font-display text-[26px] font-medium tracking-[-0.02em]">{m.name}</h3>
                    <p className={`mt-3 text-base ${dark ? "text-on-dark" : "text-body"}`}>{m.desc}</p>
                    <ul className={`mt-6 flex list-none flex-col gap-3 border-t p-0 pt-6 text-[15px] ${dark ? "border-dark-line" : "border-line"}`}>
                      {m.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <Check className={`mt-[3px] flex-none ${dark ? "text-accent" : "text-ink"}`} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                      <span className={`font-mono text-[13px] ${dark ? "text-on-dark" : "text-body"}`}>{m.price}</span>
                      <a href="#contact" className={`inline-flex min-h-11 items-center rounded-full px-5 text-[15px] font-bold ${dark ? "bg-accent text-ink" : "bg-ink text-white hover:bg-ink-2"}`}>
                        {c.models.cta}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* WORK */}
        <section id="work" aria-labelledby="work-title" className={section}>
          <Container>
            <Eyebrow>{c.work.eyebrow}</Eyebrow>
            <H2 id="work-title">{c.work.title}</H2>
            <article className="mt-12 flex flex-wrap overflow-hidden rounded-3xl border border-line bg-white">
              <div className="dark flex min-h-[300px] min-w-0 flex-[1_1_420px] flex-col justify-between gap-12 bg-ink p-[clamp(28px,3.5vw,48px)] text-white">
                <div className="flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.06em] text-on-dark-2">
                  <span>{c.work.label}</span>
                  <span className="text-accent">{c.work.industry}</span>
                </div>
                <div>
                  <h3 className="m-0 break-words font-display text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-0.02em]">{c.work.client}</h3>
                  <p className="mt-4 max-w-[440px] text-base text-on-dark">{c.work.about}</p>
                  <a href={site.caseUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex min-h-11 items-center gap-2 font-bold text-white">
                    {site.caseUrlLabel}
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <path d="M7 17L17 7" />
                      <path d="M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="grid min-w-0 flex-[999_1_480px] grid-cols-1 content-center gap-8 p-[clamp(28px,3.5vw,48px)] sm:grid-cols-3">
                {c.work.cols.map((col, i) => (
                  <div key={col.k} className={`border-t-2 pt-5 ${i === 2 ? "border-accent" : "border-ink"}`}>
                    <div className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{col.k}</div>
                    <p className="mt-2.5 text-[17px] font-semibold">{col.v}</p>
                  </div>
                ))}
              </div>
            </article>
          </Container>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className={section}>
          <Container className="flex flex-wrap gap-12">
            <div className="flex-[1_1_320px]">
              <Eyebrow>{c.faq.eyebrow}</Eyebrow>
              <H2 id="faq-title">{c.faq.title}</H2>
              <p className="mt-5 text-body">
                {c.faq.more}{" "}
                <a href="#contact" className="font-bold underline">
                  {c.faq.moreLink}
                </a>
                .
              </p>
            </div>
            <Faq items={c.faq.items} />
          </Container>
        </section>

        {/* CONTACT */}
        <section id="contact" aria-labelledby="contact-title" className="dark mt-[clamp(72px,9vw,120px)] bg-ink text-white">
          <Container className="flex flex-wrap items-start gap-14 py-[clamp(72px,9vw,120px)]">
            <div className="min-w-0 flex-[1_1_380px]">
              <Eyebrow onDark>{c.contact.eyebrow}</Eyebrow>
              <h2 id="contact-title" className="mt-4 font-display text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.08] tracking-[-0.035em]">
                {c.contact.title}
              </h2>
              <p className="mt-6 max-w-[460px] text-on-dark">{c.contact.sub}</p>
              <ol className="mt-10 flex max-w-[460px] list-none flex-col gap-5 p-0">
                {c.contact.next.map((n, i) => (
                  <li key={n} className="flex gap-4">
                    <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[#e4e6ea]">{n}</span>
                  </li>
                ))}
              </ol>
              {(site.email || site.phone) && (
                <div className="mt-12 flex flex-wrap gap-8 border-t border-dark-line pt-7 text-[15px]">
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
            </div>
            <div className="min-w-0 flex-[1_1_460px] rounded-3xl bg-white p-[clamp(24px,3vw,40px)] text-ink">
              <LeadForm c={c} />
            </div>
          </Container>
        </section>
      </main>

      <footer className="dark border-t border-dark-line bg-ink text-sm text-on-dark-2">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-10">
          <div className="flex flex-wrap items-center gap-3">
            <Logo onDark />
            <span className="ml-3">{c.footer.address}</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#services" className="text-on-dark hover:text-white">{c.nav.services}</a>
            <a href="#models" className="text-on-dark hover:text-white">{c.nav.models}</a>
            <Link href={privacyHref} className="text-on-dark hover:text-white">{c.footer.privacy}</Link>
            <Link href={c.lang === "ru" ? "/en" : "/"} hrefLang={c.lang === "ru" ? "en" : "ru"} className="text-on-dark hover:text-white">
              {c.lang === "ru" ? "English" : "Русский"}
            </Link>
            <span>{c.footer.rights}</span>
          </div>
        </Container>
      </footer>
    </>
  );
}
