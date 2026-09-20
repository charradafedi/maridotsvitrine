# Maridots — maridots.com

Pre-launch technical preview and architecture research site for **Maridots**, an
international cross-border initiative into maritime compliance and risk
architecture (non-commercial prototype evaluation).

- **Framework:** Next.js 16 (App Router) · React 19 · TypeScript
- **Styling:** Tailwind CSS v4 with design tokens in `src/app/globals.css`
- **Email:** Resend, via a server-side route handler (research inquiries only)
- **Motion:** Framer Motion, deliberately limited to three motions site-wide

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Resend values
npm run dev
```

The site runs at http://localhost:3000.

## Project structure

```
src/
  app/
    (marketing)/          Public website: home, privacy, research notice
    api/contact/route.ts  Contact form handler (Resend)
    robots.ts             robots.txt
    sitemap.ts            sitemap.xml
    layout.tsx            Fonts, base metadata, Open Graph
    globals.css           Marketing design tokens
  components/marketing/   Website sections
  lib/contact-schema.ts   Shared form fields and validation
  lib/firm-values.ts      The five canonical firm values
public/
  logo.svg                Brand mark
  logotype.svg            Brand wordmark
  assets/                 Site photography
```

## Content

Section copy lives in the component that renders it, as a data array at the top
of the file. The two that change most often:

- `src/components/marketing/modules.tsx` — the module map. It mirrors the
  product sidebar; keep it in step with the app rather than adding marketing-only
  names.
- `src/components/marketing/integration.tsx` — the migration pipelines
  (fleet onboarding, crew CSV, sea service, certificate OCR).

### Firm values

`src/lib/firm-values.ts` holds the five canonical values — Compliance, Offline
audits, Risk management, High flexibility, Appreciated security. The hero strip
(`firm-values.tsx`) and the footer trust row both read from it, so the site
cannot drift into presenting different pillars in different places.

Knowledge & Reference, KPIs, Integrations, and Support are capabilities and
services. They keep their own sections and nav entries and are deliberately not
listed as values.

### Why the hero has no headline metrics

The hero previously carried a stats bar (`30/60/90`, `8`, `100%`, `2`). Those
numbers read as vanity proof: they described the product's own feature counts
rather than a customer outcome, and an executive buyer discounts figures that
cannot be attributed. It was replaced with the firm values strip, which states
capability in plain language. The rule going forward:

- No customer counts, uptime percentages, or module counts presented as proof.
- No public prices — tariffs are scoped per fleet.
- Illustrative figures may appear only inside the dashboard preview, which is
  labelled "Illustrative demo data" in the UI.

### Executive dashboard preview

`executive-dashboard.tsx` renders an "Executive command preview" with four
illustrative views (Overview, Compliance, Risk, Audits): certificate expiry
horizon bands with a legend, ring gauges for fleet/crew/audit closure, a risk
severity-by-likelihood matrix, barrier health sparklines, an overdue audit
callout, and a six-month compliance area chart. The insight panel beside it is
deliberately advisory — each card carries a severity chip, cited evidence, and a
suggested next action, with the decision left to the DPA or Quality Manager.

## Design tokens

Defined once in the `@theme` block of `src/app/globals.css` and consumed as
Tailwind utilities (`bg-ocean-600`, `text-ink-muted`, `border-line`, …).

| Token group | Values |
| --- | --- |
| Page background | `--color-canvas` `#f1f5f9`, `--color-canvas-deep` `#e2e8f0` |
| Ink | `--color-ink` `#0f172a`, `--color-ink-muted` `#475569`, `--color-ink-subtle` `#64748b` |
| Ocean primary | `--color-ocean-600` `#0284c7`, accents `#0ea5e9` / `#38bdf8` |
| Borders | `--color-line` `#cbd5e1`, `--color-line-soft` `#e2e8f0` |
| Dark rail | `--color-rail-900` `#0f172a`, `--color-rail-800` `#1e293b` |
| KPI RAG | `--color-rag-success` `#22c55e`, `--color-rag-warning` `#f59e0b`, `--color-rag-danger` `#ef4444` |

Typography is **Source Sans 3** for UI and **Source Serif 4** for display
headlines (`.display`), both self-hosted through `next/font`.

## Contact form and Resend setup

The form at `#contact` posts JSON to `POST /api/contact`. The route handler
validates the payload, applies a honeypot and per-instance rate limit, and sends
the enquiry with the Resend SDK. **The API key is only ever read server-side.**

Email shape:

| Field | Value |
| --- | --- |
| From | `CONTACT_FROM_EMAIL` (must be a verified sender on maridots.com) |
| To | `CONTACT_TO_EMAIL` (`info@maridots.com`) |
| Reply-To | the visitor's work email |
| Subject | `Maridots website enquiry — {Company}` |
| Body | all form fields, submission timestamp (UTC, ISO 8601), originating page URL |

### 1. Verify the domain in Resend

1. Sign in to [resend.com](https://resend.com) → **Domains** → **Add Domain**.
2. Enter `maridots.com` and pick the region closest to your users (e.g. `eu-west-1`).
3. Resend issues DNS records. Add them at your DNS provider:
   - **MX** and **TXT** records on the `send` subdomain (SPF / bounce handling)
   - **TXT** record `resend._domainkey` (DKIM)
   - Recommended: a **DMARC** `TXT` record on `_dmarc` — start with `v=DMARC1; p=none; rua=mailto:info@maridots.com`
4. Back in Resend, click **Verify**. Propagation is usually minutes, but allow up to 24 hours.

### 2. Create an API key

**API Keys** → **Create API Key** → permission *Sending access*, restricted to
`maridots.com`. Copy the key once; it is not shown again.

### 3. Set environment variables

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=info@maridots.com
CONTACT_FROM_EMAIL="Maridots Website <website@maridots.com>"
```

Locally these go in `.env.local` (git-ignored). In production set them in your
hosting provider's environment settings and redeploy.

> Without `RESEND_API_KEY` the form still succeeds and the enquiry is written to
> the server log instead of being emailed. That keeps local development working
> while DNS is pending — make sure the key is set before launch.

### 4. Test the send

With the dev server running:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Sender","company":"Test Shipping","role":"DPA (Designated Person Ashore)","email":"you@example.com","phone":"","fleetSize":"6–15 vessels","message":"Testing the Maridots contact route.","consent":true,"website":"","pageUrl":"http://localhost:3000/"}'
```

Expect `{"ok":true,"delivered":true}` and an email in the `info@maridots.com`
mailbox. Check Resend → **Emails** for the delivery log if it does not arrive.
Then submit the form in the browser to confirm the success and error states.

### Spam protection

- Hidden `website` honeypot field — populated submissions are silently accepted and discarded.
- Rate limit of 5 submissions per IP per 10 minutes, held in memory.

The rate limit is per server instance. On multi-instance or serverless hosting,
put a WAF, Turnstile/reCAPTCHA, or a shared store (Redis, Upstash) in front of
the route for stronger guarantees.

## SEO

- Title, description, keywords, Open Graph, and Twitter card in `src/app/layout.tsx`
- Organisation JSON-LD on the home page
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` and `src/app/robots.ts`
- `/api/` is excluded from crawling

## Before launch

- [ ] Replace `public/assets/*.png` with licensed or commissioned maritime photography — the current images are AI-generated placeholders
- [ ] Have `/privacy` and `/notice` reviewed by counsel before any commercial phase — both are `noindex` and written for a pre-launch research initiative, not for a trading company
- [ ] Verify the Resend domain and set the production environment variables
- [ ] Name the hosting provider in the privacy notice once deployment is final

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
