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
npm run build   # writes static site to out/
npm start       # serves out/ on :3000 (not next start)
```

Static export does **not** include `POST /api/contact`. For production enquiries, host that route on a Node/serverless endpoint (or switch off `output: "export"` and deploy to a Node host).

## Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical / schema base URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — GA4
- `RESEND_API_KEY` + `CONTACT_*` — enquiry email delivery
- `RECAPTCHA_*` — optional v3 spam check

Without Resend keys, local form submissions validate and log to the server console.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (Radix base) themed with brand OKLCH variables
- Light / Dark / System themes via `next-themes`
- Framer Motion "fluid" spring animations (reduced-motion aware)
- Bricolage Grotesque (headings) + Manrope (body), lucide icons
- Contact Route Handler → Resend
- JSON-LD schema, sitemap, robots

Add shadcn components with `npx shadcn@latest add <component>`; they land in `src/components/ui/`.

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

**v2 redesign implemented** (shadcn/ui, light + dark, motion) on top of the v1 pages, SEO and contact API. Remaining work is mostly client review, client assets, env/host config, and launch QA — see `docs/TASKS.md`.

Photo slots use labeled placeholders until real site images arrive. Trusted-by logos are text-only pending permission.

## Business contact

- Phone: 79939 49799 · 99488 76799 · Office 95736 50799
- Email: mythriinfraa@gmail.com
- Head office: Turangi, Kakinada – 533016
