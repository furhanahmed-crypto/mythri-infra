# MEMORY — Mythri Infra Website

Long-lived context for agents and humans. Update when decisions change.

---

## Project identity

- **Client:** Mythri Infra (partnership firm), Kakinada, Andhra Pradesh
- **Agency:** Digi Carotene
- **Product:** 6-page marketing + SEO website
- **Content handover date:** 10 October 2026 (draft v1)
- **Primary content source:** `Mythri_Infra_Website_Content_SEO_Handover.pdf`

## Firm facts that must stay accurate

- Established as Mythri Infra: **2016**; team construction journey framed from **2002** (client must confirm framing)
- GSTIN: `37ABDFM4972H1ZZ`
- Area: Andhra Pradesh (also projects in Telangana and beyond)
- Typical contract size narrative: most contracts above ₹3 crore
- Stats for UI: 20+ years · 40+ machines · 25 dumpers · 230+ staff & workmen (30 staff + 200 workmen)
- Do **not** publish turnover figures from the company profile

## Leadership

- Managing Partner: Mr. Dantuluri Raja Gopal Raju — 79939 49799 · 99488 76799
- Partner: Mr. Dantuluri Murali Mohan Varma — 99491 79524
- Office: 95736 50799
- Bios (2–3 lines) pending from client

## Contact channels

- WhatsApp / primary mobile CTA: `+91 79939 49799` → `tel:+917993949799`, `https://wa.me/917993949799`
- Emails (until domain email): mythriinfraa@gmail.com · mythriinfraa1@gmail.com
- Head office Turangi 533016; Branch R.R. Nagar / NFCL Road 533003

## Design decisions locked (unless client overrides)

- White background, charcoal `#1F2328`, accent construction yellow `#E8A100`
- Single sans family (Inter / Manrope / Poppins — pick one)
- Real photos only; no stock skyscrapers
- Mobile first; sticky header; floating WhatsApp on mobile
- Footer uses `<p>` / `<address>`, never heading tags
- Numbers strip is not headings

## SEO decisions locked

- Exact meta titles/descriptions/keywords from PDF
- URLs: `/`, `/about`, `/services`, `/projects`, `/capabilities`, `/contact`
- GeneralContractor schema on Home & Contact
- Google largely ignores keywords meta; still include as requested
- Domain email to replace Gmail after domain goes live

## Content caution flags

| Item | Note |
|------|------|
| Client logos (L&T, NCC, IJM, ONGC, Kakinada SEZ, APMDC, APTIDCO, APSHCL, ECL) | Need permission; else text names |
| 2020 NR Constructions / KPC Projects | Omitted until scope shared |
| Pre-2016 project list | Label as **team experience**, not Mythri Infra firm projects |
| Partner bios/photos | Placeholder until client delivers |
| Logo + site photos | Pending asset drop |

## Technical decisions

- Stack: Next.js 16 App Router + TypeScript + Tailwind v4 (see ARCHITECTURE.md)
- Font choice locked: **Manrope** (one family sitewide)
- No database / no CMS in v1
- Form → Resend email when `RESEND_API_KEY` set; otherwise logs in non-production
- Spam: honeypot always on; reCAPTCHA v3 when secret present
- GA4 events on tel, WhatsApp, form submit via `TrackedLink` / form success
- Missing photos use `MediaPlaceholder` (filename + alt), not stock imagery
- Trusted By row uses **text names** until logo permission arrives
- Footer copyright year fixed to **2026** (handover); avoid `new Date()` under Cache Components prerender

## Lessons / pitfalls to avoid

1. **Do not invent stock imagery** when photos are missing — use labeled placeholders.
2. **Do not put stats in heading tags** — harms outline and contradicts handover.
3. **Do not merge 2002 and 2016** into a single “est. 2002” claim without client OK.
4. **Do not ship client logos** without written permission.
5. **Do not skip canonical / https host normalisation** — duplicate URLs kill SEO.
6. **Do not autoplay video** or ship uncompressed heroes — LCP budget is strict.
7. **Do not expose form inboxes or API keys** in client bundles.
8. **Keep PDF NOTE lines out of production copy.**

## Changelog of decisions

| Date | Decision |
|------|----------|
| 2026-10-10 | Docs scaffold created from Digi Carotene SEO handover PDF |
| 2026-10-10 | Default visual system: charcoal + construction yellow pending brand confirmation |
| 2026-10-10 | Implemented full 6-page Next.js site + contact API; Manrope + placeholders until client assets |
