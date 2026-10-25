# Tenfold — website

Marketing site for Tenfold. Next.js (App Router) + TypeScript + Tailwind CSS.

- `/` — Russian (default) · `/en` — English · `/kz` — Kazakh
- `/privacy`, `/en/privacy`, `/kz/privacy` — privacy policy (**placeholder — replace before launch**)
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
   | `LEAD_TO_EMAIL` | Inbox(es) that receive inquiries, comma-separated, e.g. `hello@tenfold.kz,shaken.bissenkulov@gmail.com` |
   | `LEAD_FROM_EMAIL` | Sender on a domain verified in Resend, e.g. `Tenfold <leads@tenfold.kz>` |

4. Deploy, then add your domain under **Settings → Domains**.
5. Submit a test inquiry on the live site and confirm the email arrives.

Without `RESEND_API_KEY` and `LEAD_TO_EMAIL` the form shows an error to the visitor and nothing is sent — it never pretends to succeed.

### Resend setup
1. Create an account at resend.com.
2. **Domains → Add domain**, add the DNS records it shows at your domain registrar, wait for "Verified".
3. **API Keys → Create** (permission: sending access) and paste into Vercel.
Until the domain is verified you can use `Tenfold <onboarding@resend.dev>` as the sender, but Resend then only delivers to the email address of your Resend account.

## Deploy to tenfold.kz (VPS in Kazakhstan)

.kz rules require the site (A/AAAA/CNAME records) to be served from a server physically in Kazakhstan, so tenfold.kz runs on a VPS rather than Vercel. `deploy/` holds a Docker setup: the Next.js app behind Caddy, which issues HTTPS certificates automatically.

1. Rent an Ubuntu 22.04/24.04 VPS in Kazakhstan (1 vCPU, 2 GB RAM is enough).
2. DNS for tenfold.kz: `A @ → <VPS IP>` and `A www → <VPS IP>`.
3. On the server as root: `curl -fsSL https://raw.githubusercontent.com/shakenbissenkulov-jpg/tenfold/main/deploy/setup.sh | bash`
4. `nano /opt/tenfold/deploy/.env` — fill in `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.
5. `bash /opt/tenfold/deploy/update.sh` — builds and starts the site on https://tenfold.kz.

Auto-deploy: add repository secrets `VPS_HOST` (server IP) and `VPS_SSH_KEY` (private SSH key allowed on the server; `VPS_USER` if not root). Every push to main then runs `update.sh` on the server via `.github/workflows/deploy-kz.yml`. Without the secrets the workflow does nothing.

## Editing content

All copy lives in `content/`:

- `content/ru.ts`, `content/en.ts`, `content/kz.ts` — page text in each language (keep all three in sync)
- `content/site.ts` — contact email, phone, site URL

Empty email/phone values are hidden on the page.

## Before launch — open items

- [ ] Kazakh text (`content/kz.ts`) reviewed by a native speaker
- [ ] SLA response times confirmed by the team

Search the content files for `[` to find every remaining placeholder.

- [ ] Business email in `content/site.ts` (phone is set)
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

Onest is self-hosted from `public/fonts` (SIL Open Font License), with Latin and Cyrillic subsets including Kazakh letters. No requests go to Google.
