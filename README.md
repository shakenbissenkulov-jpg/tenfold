# Tenfold — website

Marketing site for Tenfold. Next.js (App Router) + TypeScript + Tailwind CSS.

- `/` — Russian (default) · `/en` — English · Kazakh is shown as "coming soon"
- `/privacy`, `/en/privacy` — privacy policy (**placeholder — replace before launch**)
- `/api/lead` — lead form endpoint, emails each inquiry via [Resend](https://resend.com)

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev                  # http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** that repository. Framework preset: Next.js (detected automatically).
3. Add environment variables (Project → Settings → Environment Variables):

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | Your production URL, e.g. `https://tenfold.kz` |
   | `RESEND_API_KEY` | API key from Resend |
   | `LEAD_TO_EMAIL` | Inbox that receives inquiries (comma-separate several) |
   | `LEAD_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `Tenfold <leads@tenfold.kz>` |

4. Deploy, then add your domain under **Settings → Domains**.
5. Submit a test inquiry on the live site and confirm the email arrives.

Without `RESEND_API_KEY` and `LEAD_TO_EMAIL` the form shows an error to the visitor and nothing is sent — it never pretends to succeed.

### Resend setup
1. Create an account at resend.com.
2. **Domains → Add domain**, add the DNS records it shows at your domain registrar, wait for "Verified".
3. **API Keys → Create** (permission: sending access) and paste into Vercel.
Until the domain is verified you can use `Tenfold <onboarding@resend.dev>` as the sender, but Resend then only delivers to the email address of your Resend account.

## Editing content

All copy lives in `content/`:

- `content/ru.ts`, `content/en.ts` — page text in each language (keep both in sync)
- `content/site.ts` — contact email, phone, site name, case-study link

Empty email/phone values are hidden on the page.

## Before launch — open items

Search the content files for `[` to find every remaining placeholder.

- [ ] Contact email and phone in `content/site.ts`
- [ ] `[X дней]` / `[X days]` — proposal and team-match timing (process section)
- [ ] `[X рабочих дней]` — start time (FAQ)
- [ ] Engineer vetting steps (Why Tenfold, FAQ)
- [ ] Working languages (FAQ)
- [ ] Pricing labels `[За проект]`, `[Помесячно]` and replacement terms (engagement models)
- [ ] КазахЮвелир case: confirm challenge/solution, add the result, and confirm permission to name the client
- [ ] Privacy policy text (`components/PrivacyPage.tsx`) — required because the form collects personal data
- [ ] Confirm the "you own the code" commitment matches your contracts

## Analytics

`@vercel/analytics` is included. Turn it on in Vercel → Project → Analytics; it records nothing until enabled.

## Fonts

Unbounded, Manrope and JetBrains Mono are self-hosted from `public/fonts` (SIL Open Font License), with Latin and Cyrillic subsets including Kazakh letters. No requests go to Google.
