# PRD — Mythri Infra Website

**Client:** Mythri Infra, Kakinada, Andhra Pradesh  
**Prepared from:** Digi Carotene Website Content & SEO Handover (v1, 10 Oct 2026)  
**Product type:** Marketing / lead-generation website  
**Status:** Content draft v1 — items marked NOTE need client confirmation before go-live

---

## 1. Problem & Opportunity

Mythri Infra is an earthwork and infrastructure contractor (est. 2016; team experience since 2002) that wins work through reputation with main contractors (L&T, NCC, IJM, etc.) and government bodies. They lack a professional, SEO-ready web presence that:

- Ranks for local search intent (e.g. “earthwork contractors Kakinada”)
- Showcases owned fleet, compliance, and project track record
- Converts visitors into phone / WhatsApp / enquiry leads

## 2. Goals

| Goal | Success signal |
|------|----------------|
| Local SEO visibility | Unique titles/descriptions, schema, sitemap; GSC submission |
| Credible brand presence | Clean site with real photos, clear services & projects |
| Lead generation | Click-to-call, WhatsApp, contact form → email within 1 working day |
| Performance | LCP &lt; 2.5s on mobile; compressed images; no autoplay video |
| Maintainability | Content mapped to 6 static pages; agent-friendly docs |

### Non-goals (out of scope for v1)

- Client portal / project management
- Blog / CMS-heavy content system (unless added later)
- Turnover figures (intentionally excluded from company profile)
- Ecommerce or payment flows
- Multi-language

## 3. Target users

1. **Main contractors / procurement** — need proof of fleet, compliance, past clients
2. **Government / industrial clients** — need local presence, sand/earthwork capability
3. **Partners looking for quotes** — need fast contact (phone, WhatsApp, form + BOQ)

## 4. Scope — pages

| URL | Purpose |
|-----|---------|
| `/` | Home — hero, numbers, services teaser, trust logos, why us, featured projects, CTA |
| `/about` | Story, approach, leadership, values, people & compliance |
| `/services` | Five service deep-dives + quote CTA |
| `/projects` | Featured cards, full project tables (2016–present + team experience 2002–2015) |
| `/capabilities` | Fleet grid, team structure, 5-step process |
| `/contact` | Addresses, phones, emails, enquiry form, map, WhatsApp |

Global chrome: sticky header (logo, 6 nav links, Call Now), footer (quick links, both offices, phones, email, GSTIN), floating WhatsApp on mobile.

## 5. User stories

1. As a procurement lead, I can see services, fleet size, and named clients so I can shortlist Mythri Infra.
2. As a site visitor on mobile, I can call or WhatsApp in one tap from any page.
3. As a project owner, I can submit an enquiry with optional BOQ and get a response within one working day.
4. As a local searcher, I land on a page whose title/description match my query and that has valid LocalBusiness schema.
5. As a decision-maker, I can filter or scan projects by type (optional chips: All / Earthwork / Roads / Sand / Mining).

## 6. Functional requirements

### Sitewide

- Exactly one `<h1>` per page; heading order H1 → H2 → H3 with no skipped levels
- Unique `<title>`, meta description, meta keywords per page (as in handover)
- Self-referencing canonical (force `https` + single host: www or non-www)
- Open Graph + Twitter tags; `og:image` 1200×630 with logo
- Clean lowercase URLs: `/`, `/about`, `/services`, `/projects`, `/capabilities`, `/contact`
- Every content image uses prescribed alt text; decorative icons `alt=""`
- Images: WebP, &lt; 200 KB where practical, width/height set, lazy-load below fold
- `/sitemap.xml` and `robots.txt` pointing to sitemap
- JSON-LD: Organization sitewide; GeneralContractor on Home & Contact; Service + BreadcrumbList on Services; ItemList + BreadcrumbList on Projects; BreadcrumbList on Capabilities
- GA4 events for click-to-call, WhatsApp, and form submit (conversion)
- Sticky header + floating WhatsApp (mobile)
- Light theme by default (handover palette) with a Light ↔ Dark click toggle; both themes must meet AA contrast
- Subtle, reduced-motion-aware entrance animations; content readable without JavaScript

### Contact form

- Fields: Name*, Company, Phone*, Email, Project type* (Earthwork / Roads / Drainage / Sand Supply / Mining Support / Other), Project location, Message, Attach BOQ (optional PDF/Excel, max 10 MB)
- Success copy: “Thank you. Our team will contact you within one working day.”
- Deliver submissions to client email
- Spam protection (honeypot and/or reCAPTCHA v3)

### Content constraints

- Real site photos only (excavators, dumpers, sand reaches, finished roads) — no stock skyscrapers
- Do not publish NOTE items or client-pending content as final
- Client logos only with confirmation; otherwise show names as text
- Pre-2016 projects labeled as team experience, not firm projects
- Omit NR Constructions / KPC Projects (2020) until client provides scope

## 7. Acceptance criteria (v1 go-live)

- [ ] All 6 pages live with handover copy and SEO tags
- [ ] Header, footer, Call Now, WhatsApp work on mobile and desktop
- [ ] Contact form submits, emails client, shows success state, blocks spam
- [ ] Schema validates (Google Rich Results / Schema validator)
- [ ] Sitemap + robots.txt present; GSC property ready to submit
- [ ] Lighthouse mobile: LCP under ~2.5s on representative connection
- [ ] Client-pending assets (logo, photos, bios, logo permissions, domain email) resolved or gracefully placeholder-managed
- [ ] Google Business Profile linked from Contact map when available
- [ ] Domain email planned to replace Gmail once domain is live

## 8. Content source of truth

Primary copy and SEO strings live in:

`Mythri_Infra_Website_Content_SEO_Handover.pdf`

This PRD summarizes product intent. When copy conflicts with implementation drafts, prefer the PDF (unless client revises it).

## 9. Open client items (blockers / soft blockers)

1. High-res logo (SVG or PNG)
2. 15–25 real site photos (named per handover)
3. Partner photos + 2–3 line bios
4. Confirm 2002 team experience vs 2016 firm framing
5. Permission to name clients / use logos
6. NR Constructions & KPC Projects details or drop approval
7. Optional certificates / appreciation letters
8. Domain name + domain email
9. Brand colour approval (logo navy `#002858` + amber/copper CTAs — refine with client if needed)

## 10. Key business facts (for accurate UI copy)

- Partnership firm, est. 2016 · GSTIN: `37ABDFM4972H1ZZ`
- Head office: D.No. 6-222, Near Bhaskara Kalyana Mandapam, Opp. HP Bunk, Turangi, Kakinada – 533016
- Branch: Road No. 3, R.R. Nagar, NFCL Road, Kakinada – 533003
- Phones: 79939 49799 · 99488 76799 · Office 95736 50799 · Partner (Murali) 99491 79524
- Emails: mythriinfraa@gmail.com · mythriinfraa1@gmail.com
- Stats: 20+ years experience · 40+ owned machines · 25 dumpers · 230+ staff & workmen
- Managing Partner: Mr. Dantuluri Raja Gopal Raju · Partner: Mr. Dantuluri Murali Mohan Varma
