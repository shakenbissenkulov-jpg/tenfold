"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Content, NeedId } from "@/content/types";
import { ArrowRight, Check } from "./ui";

type Status = "idle" | "sending" | "success" | "error";
const NEEDS: NeedId[] = ["build", "team", "automate", "unsure"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "min-h-12 w-full rounded-xl border-[1.5px] bg-white px-3.5 text-base text-ink placeholder:text-[#8a909b] focus:border-ink focus:outline-none";

export function LeadForm({ c }: { c: Content }) {
  const f = c.form;
  const [need, setNeed] = useState<NeedId>("build");
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", message: "", website: "" });
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const nameOk = values.name.trim().length > 0;
  const emailOk = EMAIL_RE.test(values.email.trim());
  const errName = tried && !nameOk;
  const errEmail = tried && !emailOk;

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!nameOk) return nameRef.current?.focus();
    if (!emailOk) return emailRef.current?.focus();

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, need, lang: c.lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentName(values.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues({ name: "", company: "", email: "", phone: "", message: "", website: "" });
    setTried(false);
    setStatus("idle");
  }

  const privacyHref = c.lang === "ru" ? "/privacy" : "/en/privacy";

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-start justify-center">
        <div aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-ink">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-7 font-display text-[28px] font-medium tracking-[-0.02em]">
          {sentName ? `${f.okThanks}, ${sentName}.` : `${f.okThanks}!`}
        </h3>
        <p className="mt-3 text-body">{f.okBody}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 min-h-11 cursor-pointer rounded-full border border-ink bg-transparent px-5 font-semibold text-ink hover:bg-paper"
        >
          {f.okAgain}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label={f.label} className="flex flex-col gap-[22px]">
      <fieldset className="m-0 border-0 p-0">
        <legend className="p-0 text-[15px] font-bold">{f.need}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((id) => {
            const on = need === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setNeed(id)}
                className={`min-h-11 cursor-pointer rounded-full border px-4 text-[15px] font-semibold transition-colors ${on ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink hover:border-ink"}`}
              >
                {f.needs[id]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-name" className="text-sm font-semibold">
            {f.name} <span aria-hidden="true">*</span>
          </label>
          <input
            ref={nameRef}
            id="f-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={values.name}
            onChange={set("name")}
            aria-invalid={errName}
            aria-describedby={errName ? "e-name" : undefined}
            className={`${inputCls} ${errName ? "border-error" : "border-line-strong"}`}
          />
          {errName && <span id="e-name" className="text-[13px] text-error">{f.errName}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-company" className="text-sm font-semibold">{f.company}</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={160} value={values.company} onChange={set("company")} className={`${inputCls} border-line-strong`} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-email" className="text-sm font-semibold">
            {f.email} <span aria-hidden="true">*</span>
          </label>
          <input
            ref={emailRef}
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            placeholder="you@company.kz"
            value={values.email}
            onChange={set("email")}
            aria-invalid={errEmail}
            aria-describedby={errEmail ? "e-email" : undefined}
            className={`${inputCls} ${errEmail ? "border-error" : "border-line-strong"}`}
          />
          {errEmail && <span id="e-email" className="text-[13px] text-error">{f.errEmail}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-phone" className="text-sm font-semibold">{f.phone}</label>
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+7" value={values.phone} onChange={set("phone")} className={`${inputCls} border-line-strong`} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-msg" className="text-sm font-semibold">{f.message}</label>
        <textarea
          id="f-msg"
          name="message"
          rows={4}
          maxLength={4000}
          placeholder={f.messagePh}
          value={values.message}
          onChange={set("message")}
          className="w-full resize-y rounded-xl border-[1.5px] border-line-strong bg-white px-3.5 py-3 text-base text-ink placeholder:text-[#8a909b] focus:border-ink focus:outline-none"
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="m-0 rounded-xl bg-[#FEF3F2] px-4 py-3 text-sm text-error">
            {f.errGeneric}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-accent px-5 text-[17px] font-bold text-ink transition-opacity disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? f.sending : f.submit}
        {status !== "sending" && <ArrowRight />}
      </button>
      <p className="m-0 text-[13px] text-muted">
        {f.consentA}{" "}
        <Link href={privacyHref} className="underline">
          {f.consentLink}
        </Link>
        {f.consentB}
      </p>
    </form>
  );
}
