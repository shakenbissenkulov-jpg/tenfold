import { NextResponse } from "next/server";

export const runtime = "nodejs";

const NEEDS = {
  idea: "Есть идея",
  problem: "Есть проблема в бизнесе",
  know: "Знаю, что нужно сделать",
  team: "Нужна команда",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never see this field. Pretend success so bots learn nothing.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const contact = str(body.contact, 200);
  const company = str(body.company, 160);
  const message = str(body.message, 4000);
  const lang = body.lang === "en" ? "EN" : body.lang === "kz" ? "KZ" : "RU";
  const needKey = (typeof body.need === "string" && body.need in NEEDS ? body.need : "idea") as keyof typeof NEEDS;

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (contact.length < 5) errors.contact = "required";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Tenfold <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("[lead] RESEND_API_KEY or LEAD_TO_EMAIL is not set — inquiry NOT delivered.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["С чем пришли", NEEDS[needKey]],
    ["Имя", name],
    ["Компания", company || "—"],
    ["Контакт", contact],
    ["Язык сайта", lang],
  ];

  const html = `
    <h2 style="font-family:Arial,sans-serif">Новая заявка с сайта Tenfold</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#5A5F69">${esc(k)}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#5A5F69;margin-top:16px">Об идее или задаче:</p>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(message || "—")}</p>
  `;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message || "—"}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        ...(EMAIL_RE.test(contact) ? { reply_to: contact } : {}),
        subject: `Заявка: ${name}${company ? ` (${company})` : ""} — ${NEEDS[needKey]}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[lead] Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] Resend request failed", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
