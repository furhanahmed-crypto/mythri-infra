# ARCHITECTURE — Mythri Infra Website

## 1. Overview

A mostly static, SEO-first marketing site with one dynamic surface: the contact enquiry form. Prefer server-rendered or statically generated HTML for crawlability and performance.

**Recommended stack (v1):**

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js (App Router) + TypeScript | SSG/SSR, metadata API, API routes for form |
| Styling | Tailwind CSS + CSS variables for tokens | Matches DESIGN.md tokens; fast iteration |
| Hosting | Vercel (or equivalent Node-capable host) | Edge CDN, HTTPS, env secrets |
| Forms | Next.js Route Handler → email provider | Resend / Nodemailer / SES |
| Analytics | GA4 via `@next/third-parties` or gtag | Call / WhatsApp / form events |
| Spam | Honeypot + optional reCAPTCHA v3 | Required by PRD |
| Images | `next/image` + WebP assets in `/public` | Size, lazy-load, CLS control |
| Schema | JSON-LD components per page | Organization / LocalBusiness / etc. |

Alternatives (Astro + serverless form) are acceptable if they meet the same SEO and form requirements. Do not introduce a headless CMS until content velocity requires it.

## 2. High-level diagram

```
Browser
  │
  ├─ Static pages (SSG): /, /about, /services, /projects, /capabilities, /contact
  ├─ Assets: /public/images/*, logo SVG
  ├─ SEO: metadata, canonical, OG, sitemap.xml, robots.txt
  ├─ JSON-LD scripts
  │
  └─ POST /api/contact ──► spam checks ──► email provider ──► client inbox
                              │
                              └─ GA4 conversion (client-side on success)
```

## 3. Repository layout (target)

```
mythri-infra/
├── AGENTS.md
├── README.md
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── MEMORY.md
│   ├── RULES.md
│   ├── TASKS.md
│   └── SECURITY.md
├── public/
│   ├── images/          # WebP + SVG per handover file names
│   ├── robots.txt
│   └── mythri-infra-logo.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx           # header, footer, Organization schema, GA4
│   │   ├── page.tsx             # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── capabilities/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/contact/route.ts
│   ├── components/
│   │   ├── layout/   Header, Footer, WhatsAppFloat
│   │   ├── seo/      JsonLd
│   │   ├── ui/       Button, Section, Card primitives
│   │   └── forms/    EnquiryForm
│   ├── content/      # typed page copy / SEO strings (derived from PDF)
│   ├── lib/          # email, analytics helpers, constants
│   └── styles/
└── Mythri_Infra_Website_Content_SEO_Handover.pdf
```

## 4. Components & responsibilities

| Component | Responsibility |
|-----------|----------------|
| `Header` | Logo, 6 nav links, sticky, Call Now `tel:+917993949799` |
| `Footer` | Tagline, quick links, both addresses (`<address>`), phones, email, GSTIN, © 2026 — no heading tags |
| `WhatsAppFloat` | Mobile floating link `https://wa.me/917993949799`; fire GA4 event |
| `EnquiryForm` | Client validation + multipart upload (BOQ ≤ 10 MB); POST API |
| `JsonLd` | Inject page-specific schema |
| Page sections | Map 1:1 to PDF sections (Hero, NumbersStrip, ServiceBlocks, ProjectTable, FleetGrid, etc.) |

## 5. Data & content

- **No database in v1.** Copy, project tables, fleet counts, and SEO strings live in typed modules under `src/content/` (or MDX if preferred).
- Source of truth for wording: the Digi Carotene PDF. Content modules should mirror it closely so SEO strings stay exact.
- Images referenced by handover file names (e.g. `home-hero-fleet.webp`).

## 6. APIs

### `POST /api/contact`

**Input (multipart/form-data or JSON + separate upload):**

- name, company?, phone, email?, projectType, projectLocation?, message?, file? (pdf/xlsx, ≤ 10 MB)
- honeypot field (must be empty)
- optional reCAPTCHA token

**Behavior:**

1. Validate fields and file type/size
2. Reject honeypot / failed captcha
3. Send email to client addresses (env-configured)
4. Return `{ ok: true }` or structured error
5. Do not store PII on disk beyond email provider logs

**Output:** 200 on success; 400 validation; 429 rate limit; 500 on mail failure.

## 7. SEO & routing

- App Router file-based routes matching PRD URLs
- Per-page `generateMetadata()` with exact titles/descriptions/keywords from PDF
- Canonical via `metadataBase` + `alternates.canonical`
- `sitemap.ts` lists all 6 URLs; `robots.ts` allows crawl and points to sitemap
- Force HTTPS and one hostname at host/CDN level (redirect www ↔ apex)

### Schema placement

| Page | Schema |
|------|--------|
| All | Organization (logo, name, url) |
| Home, Contact | GeneralContractor / LocalBusiness (both addresses, phones, foundingDate 2016, areaServed AP) |
| Services | Service (per block) + BreadcrumbList |
| Projects | ItemList + BreadcrumbList |
| Capabilities | BreadcrumbList |
| About | Organization with founders when bios available |

## 8. Integrations

| Integration | Purpose |
|-------------|---------|
| Email provider | Deliver enquiries |
| GA4 | Pageviews + events: `click_to_call`, `whatsapp_click`, `generate_lead` |
| Google Maps embed | Contact “Find Us” + Get Directions |
| Google Business Profile | Link when created |
| reCAPTCHA v3 (optional but recommended) | Bot friction |

## 9. Technical decisions

1. **SSG by default** — content changes infrequently; rebuild on deploy.
2. **No CMS v1** — reduces attack surface and cost; PDF → content modules.
3. **Mobile-first CSS** — sticky header, floating WhatsApp, large tap targets.
4. **Semantic HTML first** — cards/sections are layout, not heading spam; numbers strip uses `<p>`/`<strong>`, not headings.
5. **Analytics events on CTAs** — not only pageviews.
6. **Placeholder strategy** — until client assets arrive, use labeled placeholders that never ship stock skyscraper imagery.

## 10. Environments

| Env | Purpose |
|-----|---------|
| Local | `next dev`; form can log to console if mail keys missing |
| Preview | Per-PR URL; use test inbox |
| Production | Live domain; real mail + GA4 + captcha |

Secrets only via environment variables (see SECURITY.md).

## 11. Performance budget

- Hero image heavily compressed; prioritize LCP element
- No autoplay video
- Lazy-load below-fold images
- Prefer system-font fallback while loading Inter / Manrope / Poppins (one family only)
- Avoid heavy client JS; keep form and analytics as the main client bundles
