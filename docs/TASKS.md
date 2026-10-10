# TASKS — Mythri Infra Website

Track implementation against PRD, Architecture, and Design.  
Status: `[ ]` todo · `[~]` in progress · `[x]` done · `[-]` blocked / deferred

---

## Phase 0 — Foundation

- [x] Ingest Digi Carotene PDF into docs (`PRD`, `ARCHITECTURE`, `DESIGN`, `MEMORY`, `RULES`, `TASKS`, `SECURITY`)
- [x] Root `README.md` + `AGENTS.md`
- [x] Scaffold Next.js (App Router) + TypeScript + Tailwind
- [x] Add design tokens / global styles from DESIGN.md
- [x] Configure `metadataBase`, fonts (one family: Manrope), absolute URLs
- [x] Env example file (no secrets): mail, GA4, captcha, public site URL

## Phase 1 — Global chrome & SEO plumbing

- [x] `Header` — logo, 6 links, sticky, Call Now
- [x] `Footer` — addresses, phones, email, GSTIN, quick links (no headings)
- [x] Floating WhatsApp (mobile) + GA4 hook points
- [x] Shared layout with Organization JSON-LD
- [x] `sitemap.ts` + `robots.ts`
- [x] Canonical + OG/Twitter defaults (1200×630 image placeholder)
- [x] 404 page consistent with brand

## Phase 2 — Pages (content + structure)

### Home `/`

- [x] Hero + CTAs (Projects, Call)
- [x] Numbers strip (4 figures, not headings)
- [x] What We Do — 5 icon cards + Explore Services
- [x] Trusted By — grayscale logos or text fallback
- [x] Why Choose Mythri Infra — 3 points
- [x] Featured Projects — 3 cards + See All
- [x] Closing CTA
- [x] Metadata + GeneralContractor schema

### About `/about`

- [x] Page header
- [x] Our Story + Our Approach
- [x] Leadership cards (placeholders for bio/photo OK)
- [x] Values (On Time, Quality, Safety, Relationships)
- [x] People & compliance list
- [x] Registered details + Work With Us CTA
- [x] Metadata + Organization/founders schema when ready

### Services `/services`

- [x] Page header
- [x] Five service blocks with images, copy, recent work
- [x] Quote CTA
- [x] Metadata + Service schema per block + BreadcrumbList

### Projects `/projects`

- [x] Page header
- [x] Optional filter chips (All / Earthwork / Roads / Sand / Mining)
- [x] Featured project cards
- [x] Table: Projects 2016–present (omit NR/KPC)
- [x] Table: Team experience 2002–2015 with clarifying copy
- [x] Discuss CTA
- [x] Metadata + ItemList + BreadcrumbList

### Capabilities `/capabilities`

- [x] Page header
- [x] Fleet grid (name, count, image) for all machines in PDF
- [x] Team copy + org structure graphic
- [x] How We Work — 5 steps
- [x] Get a Quote CTA
- [x] Metadata + BreadcrumbList

### Contact `/contact`

- [x] Get in Touch details (`tel:`, `mailto:`, `<address>`)
- [x] Enquiry form UI (all fields + BOQ upload)
- [x] Success / error states
- [x] Map embed + Get Directions + WhatsApp
- [x] Metadata + GeneralContractor + ContactPoint schema

## Phase 3 — Form backend & integrations

- [x] `POST /api/contact` validation + rate limit
- [x] Email delivery to client inboxes (Resend when configured; console log in local/dev)
- [x] Honeypot (+ reCAPTCHA v3 if keys available)
- [x] GA4: `click_to_call`, `whatsapp_click`, `generate_lead` (fires when measurement ID set)
- [-] Wire production domain redirects (https + www policy) — configure on host/DNS at deploy

## Phase 4 — Assets & client confirmations

- [ ] Replace logo with final SVG/PNG
- [ ] Import 15–25 real site photos (WebP, &lt;200KB, correct alts)
- [ ] Partner photos + bios
- [ ] Confirm 2002 / 2016 framing in copy
- [x] Client logo permissions or text-only trust row (text fallback shipped)
- [ ] Domain + domain email cutover (update schema + footer)
- [ ] Google Business Profile + map link
- [-] Optional: certificates / appreciation letters section

## Phase 5 — QA & launch

- [x] Heading outline audit (one H1, no skips) on all pages — verified in content structure
- [x] Meta/canonical/OG audit vs PDF — titles/descriptions/keywords match content modules
- [ ] Schema validation (Rich Results) — run against deployed URL
- [ ] Lighthouse mobile LCP &lt; 2.5s pass attempt — after real hero images
- [ ] Form E2E test (file upload, spam rejection) — with Resend keys
- [ ] Cross-browser + real-device tap targets
- [ ] Submit sitemap in Google Search Console
- [ ] Go-live checklist signed off with Digi Carotene / client

---

## Suggested implementation order

1. ~~Scaffold + tokens + Header/Footer~~  
2. ~~Home (sets patterns)~~  
3. ~~Services → Projects → Capabilities → About~~  
4. ~~Contact UI + API~~  
5. ~~Analytics + schema polish~~  
6. Asset swap + launch QA  

## Current focus

**Application v1 is implemented.** Next: client asset drop (logo, photos, bios), configure `NEXT_PUBLIC_SITE_URL` / Resend / GA4, then deploy and run Rich Results + Lighthouse.
