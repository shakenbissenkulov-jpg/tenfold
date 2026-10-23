"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Content, NeedId } from "@/content/types";
import { privacyPath } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";
const NEEDS: NeedId[] = ["idea", "problem", "know", "team"];

const field =
  "min-h-12 w-full rounded-[10px] border bg-paper px-3.5 text-base text-ink placeholder:text-faint focus:border-ink focus:outline-none";

export function LeadForm({ c }: { c: Content }) {
  const [need, setNeed] = useState<NeedId>("idea");
  const [v, setV] = useState({ name: "", company: "", contact: "", message: "", website: "" });
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const nameOk = v.name.trim().length > 0;
  const contactOk = v.contact.trim().length >= 5;
  const errName = tried && !nameOk;
  const errContact = tried && !contactOk;
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!nameOk) return nameRef.current?.focus();
    if (!contactOk) return contactRef.current?.focus();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, need, lang: c.lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentName(v.name.trim().split(/\s+/)[0] ?? "");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setV({ name: "", company: "", contact: "", message: "", website: "" });
    setTried(false);
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[440px] flex-col items-start justify-center">
        <div aria-hidden="true" className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-accent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </div>
        <h3 className="mt-6 text-[30px] font-normal tracking-[-0.02em]">{sentName ? `${c.thanks}, ${sentName}.` : `${c.thanks}.`}</h3>
        <p className="mt-2.5 text-muted">{c.okBody}</p>
        <button type="button" onClick={reset} className="mt-6 min-h-11 cursor-pointer rounded-[10px] border border-ink bg-white px-5 text-ink hover:bg-ink hover:text-white">
          {c.okAgain}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label={c.formLabel} className="flex flex-col gap-5">
      <fieldset className="m-0 border-0 p-0">
        <legend className="p-0 text-[15px] font-medium">{c.fNeed}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map((id) => {
            const on = need === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setNeed(id)}
                className={`min-h-10 cursor-pointer rounded-lg border px-4 text-sm transition-colors ${on ? "border-ink bg-ink text-white" : "border-field bg-white text-ink hover:border-ink"}`}
              >
                {c.needs[id]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-name" className="text-sm font-medium">{c.fName} <span aria-hidden="true">*</span></label>
          <input ref={nameRef} id="f-name" name="name" type="text" autoComplete="name" required maxLength={120} value={v.name} onChange={set("name")} aria-invalid={errName} aria-describedby={errName ? "e-name" : undefined} className={`${field} ${errName ? "border-error" : "border-field"}`} />
          {errName && <span id="e-name" className="text-[13px] text-error">{c.errName}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="f-company" className="text-sm font-medium">{c.fCompany}</label>
          <input id="f-company" name="company" type="text" autoComplete="organization" maxLength={160} value={v.company} onChange={set("company")} className={`${field} border-field`} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-contact" className="text-sm font-medium">{c.fContact} <span aria-hidden="true">*</span></label>
        <input ref={contactRef} id="f-contact" name="contact" type="text" autoComplete="email" required maxLength={200} placeholder={c.fContactPh} value={v.contact} onChange={set("contact")} aria-invalid={errContact} aria-describedby={errContact ? "e-contact" : undefined} className={`${field} ${errContact ? "border-error" : "border-field"}`} />
        {errContact && <span id="e-contact" className="text-[13px] text-error">{c.errContact}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="f-msg" className="text-sm font-medium">{c.fMsg}</label>
        <textarea id="f-msg" name="message" rows={4} maxLength={4000} placeholder={c.fMsgPh} value={v.message} onChange={set("message")} className="w-full resize-y rounded-[10px] border border-field bg-paper px-3.5 py-3 text-base text-ink placeholder:text-faint focus:border-ink focus:outline-none" />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="m-0 rounded-[10px] bg-[#FEF3F2] px-4 py-3 text-sm text-error">{c.errGeneric}</p>
        )}
      </div>

      <button type="submit" disabled={status === "sending"} className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-0 bg-ink px-5 text-base font-medium text-white hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70">
        {status === "sending" ? c.fSending : c.fSubmit}
        {status !== "sending" && <span aria-hidden="true">→</span>}
      </button>
      <p className="m-0 text-[13px] text-muted">
        {c.consentA}{" "}
        <Link href={privacyPath[c.lang]} className="underline">{c.consentLink}</Link>
        {c.consentB}
      </p>
    </form>
  );
}
