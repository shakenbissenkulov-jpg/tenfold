"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Content } from "@/content/types";
import { privacyPath } from "@/content/site";

const KEY = "tf-callback-seen";
const DELAY_MS = 1500;

type Status = "idle" | "sending" | "success" | "error";

/** Asks new visitors for their phone number shortly after they land. Shown once per browser session. */
export function CallbackModal({ c }: { c: Content }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("+7 ");
  const [website, setWebsite] = useState("");
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const p = c.popup;

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen) return;
    const t = setTimeout(() => {
      const d = ref.current;
      if (d && !d.open && typeof d.showModal === "function") {
        d.showModal();
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(phone.length, phone.length);
      }
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const digits = phone.replace(/\D/g, "");
  const ok = digits.length >= 10;
  const close = () => ref.current?.close();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    if (!ok) return inputRef.current?.focus();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: phone.trim(), website, source: "callback", lang: c.lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const err = tried && !ok;

  return (
    <dialog
      ref={ref}
      aria-labelledby="cb-title"
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-auto w-[calc(100%-32px)] max-w-[460px] rounded-[20px] border-0 bg-white p-0 text-ink shadow-[0_24px_64px_rgba(13,16,22,0.25)] backdrop:bg-ink/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="relative p-7 sm:p-9">
        <button
          type="button"
          onClick={close}
          aria-label={p.close}
          className="absolute right-3 top-3 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] text-muted hover:bg-sand-2 hover:text-ink"
        >
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        {status === "success" ? (
          <div role="status" className="pr-8">
            <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </div>
            <h2 id="cb-title" className="mt-5 text-2xl font-normal leading-tight tracking-[-0.02em]">{p.done}</h2>
            <p className="mt-2 text-muted">{p.doneSub}</p>
            <button type="button" onClick={close} className="mt-6 min-h-11 cursor-pointer rounded-[10px] bg-ink px-5 text-white hover:bg-ink-2">
              {p.close}
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit}>
            <h2 id="cb-title" className="pr-8 text-[24px] font-normal leading-[1.2] tracking-[-0.02em] sm:text-[26px]">{p.title}</h2>
            <p className="mt-3 text-[15px] text-muted">{p.sub}</p>

            <label htmlFor="cb-phone" className="mt-6 block text-sm font-medium">{p.label}</label>
            <input
              ref={inputRef}
              id="cb-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={24}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={err}
              aria-describedby={err ? "cb-err" : undefined}
              className={`mt-1.5 min-h-[52px] w-full rounded-[10px] border bg-paper px-3.5 text-lg text-ink focus:border-ink focus:outline-none ${err ? "border-error" : "border-field"}`}
            />
            {err && <span id="cb-err" className="mt-1.5 block text-[13px] text-error">{p.err}</span>}

            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            {status === "error" && (
              <p role="alert" className="mb-0 mt-4 rounded-[10px] bg-[#FEF3F2] px-4 py-3 text-sm text-error">{c.errGeneric}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[10px] bg-ink px-5 font-medium text-white hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? p.sending : p.submit}
              {status !== "sending" && <span aria-hidden="true">→</span>}
            </button>
            <button type="button" onClick={close} className="mt-2 min-h-11 w-full cursor-pointer rounded-[10px] text-[15px] text-muted hover:text-ink">
              {p.later}
            </button>
            <p className="mb-0 mt-3 text-center text-[12px] text-muted">
              {c.consentA}{" "}
              <Link href={privacyPath[c.lang]} className="underline">{c.consentLink}</Link>
              {c.consentB}
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
