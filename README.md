# Mythri Infra Website

Marketing and SEO website for **Mythri Infra** — earthwork and infrastructure contractors based in Kakinada, Andhra Pradesh.

Prepared by **Digi Carotene** from the Website Content & SEO Handover (10 October 2026).

## Pages

| URL | Page |
|-----|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/projects` | Projects |
| `/capabilities` | Capabilities |
| `/contact` | Contact |

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical / schema base URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4
- `RESEND_API_KEY` + `CONTACT_*` — enquiry email delivery
- `RECAPTCHA_*` — optional v3 spam check

Without Resend keys, local form submissions validate and log to the server console.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + design tokens (`docs/DESIGN.md`)
- Manrope font
- Contact Route Handler → Resend
- JSON-LD schema, sitemap, robots

## Documentation

| Doc | Purpose |
|-----|---------|
| [AGENTS.md](./AGENTS.md) | Entry point for AI agents |
| [docs/PRD.md](./docs/PRD.md) | Product goals & acceptance |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System structure |
| [docs/DESIGN.md](./docs/DESIGN.md) | Visual system |
| [docs/TASKS.md](./docs/TASKS.md) | Backlog & status |
| [docs/RULES.md](./docs/RULES.md) | Agent coding rules |
| [docs/SECURITY.md](./docs/SECURITY.md) | Security boundaries |
| [docs/MEMORY.md](./docs/MEMORY.md) | Decisions & constraints |

Content source of truth: `Mythri_Infra_Website_Content_SEO_Handover.pdf`.

## Status

**v1 app implemented** (Phases 0–3). Remaining work is mostly client assets, env/host config, and launch QA — see `docs/TASKS.md`.

Photo slots use labeled placeholders until real site images arrive. Trusted-by logos are text-only pending permission.

## Business contact

- Phone: 79939 49799 · 99488 76799 · Office 95736 50799
- Email: mythriinfraa@gmail.com
- Head office: Turangi, Kakinada – 533016
