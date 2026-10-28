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

- Light theme (default): white background, logo navy `#002858`, steel greys, warm amber/copper CTA accent
- Default theme is always **light** (`defaultTheme="light"`, `enableSystem={false}`); users opt into dark via toggle
- Dark theme only: pure black surfaces (no blue cast); light `:root` tokens stay navy + amber
- Type pairing (v3, agency request): **Bricolage Grotesque** headings + **Manrope** body
- Gradients use `primary` → `primary-deep` (burnt amber) only; gradient text limited to one highlighted phrase per heading
- UI built on shadcn/ui; motion via framer-motion with one shared "fluid" spring
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
| Logo + site photos | Client logo in `public/images/brand/`; temp Unsplash + Commons WebPs in heroes/services/projects/fleet (ImagesBazaar not scraped); client photos still preferred for go-live |
| Partner photos | Dummy AI portraits in place for layout; replace with client photos before go-live |

## Technical decisions

- Stack: Next.js 16 App Router + TypeScript + Tailwind v4 (see ARCHITECTURE.md)
- **Static export:** `output: "export"` → `out/` after `next build`; `images.unoptimized: true`; serve with `npm start` (`serve out`). Cache Components disabled because it conflicts with `force-static` required by export on robots/sitemap. **`/api/contact` is omitted from `out/`** — form needs a Node/serverless host or drop `output: "export"`.
- Fonts: Bricolage Grotesque (`--font-display` → `font-heading`) + Manrope (`--font-sans`)
- No database / no CMS in v1
- Form → Resend email when `RESEND_API_KEY` set; otherwise logs in non-production
- Spam: honeypot always on; reCAPTCHA v3 when secret present
- GA4 events on tel, WhatsApp, form submit via `TrackedLink` / form success
- Missing photos use `MediaPlaceholder` (filename + alt), not stock imagery
- Trusted By row uses **text names** until logo permission arrives
- Footer copyright year fixed to **2026** (handover); avoid `new Date()` under Cache Components prerender
- shadcn initialised with Radix base + Nova preset (`components.json`); the preset's Geist font was removed in favour of Manrope
- shadcn colour variables replaced with brand OKLCH values for `:root` and `.dark`; extra tokens: `surface`, `inverse`, `inverse-foreground`, `whatsapp`
- Added a local `xl` button size (h-11) for 44px tap targets; shadcn defaults are compact
- `Logo` uses client mark (`images/brand/mythri-infra-mark.webp`) + navy wordmark; footer uses `onDark` light plate
- Team structure diagram rendered as HTML (theme-aware); `images/diagrams/team-structure.svg` kept as fallback

## Lessons / pitfalls to avoid

1. **Do not invent stock imagery** when photos are missing — use labeled placeholders.
2. **Do not put stats in heading tags** — harms outline and contradicts handover.
3. **Do not merge 2002 and 2016** into a single “est. 2002” claim without client OK.
4. **Do not ship client logos** without written permission.
5. **Do not skip canonical / https host normalisation** — duplicate URLs kill SEO.
6. **Do not autoplay video** or ship uncompressed heroes — LCP budget is strict.
7. **Do not expose form inboxes or API keys** in client bundles.
8. **Keep PDF NOTE lines out of production copy.**
9. **Case-insensitive filesystem:** our old `components/ui/Button.tsx` collided with shadcn's `button.tsx`. Custom primitives now live in `components/site/`.
10. **`cn` is a real package** (`cn` from shadcn). `src/lib/utils.ts` must stay `export { cn } from "cn"`; a blanket replace once turned it into a circular self-import.
11. **Hero text must not depend on hydration** — use CSS entrance animations above the fold; Framer only for in-view reveals.
12. **Hydration warnings mentioning `data-cursor-ref`** come from the Cursor browser automation tool, not the app.
13. **Turbopack can serve a stale `globals.css`** after rapid successive edits (new utilities silently missing). Fix: stop the dev server, `rm -rf .next`, restart.
14. **Dark bands in light mode:** add the `dark` class to a section — the `.dark` token block re-scopes every shadcn variable inside it.
15. **`scroll-behavior: smooth` on `<html>` breaks App Router scroll-to-top** unless you also set `data-scroll-behavior="smooth"` on `<html>`. Without the data attr, Next cannot temporarily force `auto` during navigations; `scrollTop = 0` animates, then `scrollIntoView()` on the page segment wins and lands ~header-height (~72px) below the top. See https://nextjs.org/docs/messages/missing-data-scroll-behavior

## Changelog of decisions

| Date | Decision |
|------|----------|
| 2026-10-28 | Enabled `output: "export"` → `out/`; turned off cacheComponents/partialPrefetching; form API not in static export |
| 2026-10-10 | Docs scaffold created from Digi Carotene SEO handover PDF |
| 2026-10-10 | Default visual system: charcoal + construction yellow pending brand confirmation |
| 2026-10-10 | Client logo installed; palette → navy `#002858` + steel + amber/copper CTAs; images reorganised under `public/images/{brand,heroes,services,projects,fleet,team,diagrams,og}/` |
| 2026-10-10 | Implemented full 6-page Next.js site + contact API; Manrope + placeholders until client assets |
| 2026-10-10 | v2 redesign: shadcn/ui, light + dark themes (next-themes), framer-motion fluid animations; DESIGN.md rewritten |
| 2026-10-10 | Filled placeholders with Wikimedia Commons earthwork photos (incl. Andhra Pradesh excavator). ImagesBazaar skipped (paid licence). Partner portraits stay empty. |
| 2026-10-10 | v3 visual upgrade (agency request): ONGC project photo as home hero; Bricolage Grotesque headings; burnt-amber gradient shade; aurora/cursor-glow/spotlight/tilt/magnetic/marquee effects; dark "Why" band and stats panel; back-to-top + scroll progress |
| 2026-10-10 | Featured projects → Embla carousel (loop, 3s autoplay, arrows + dots). Footer uses forced `dark` + deep black to match Why band. What We Do icons use primary fill by default. |
| 2026-10-10 | SpotlightCard: centred amber wash as default (`isolate` so -z wash stays above card fill); hover is lift/border/glow only — no cursor chase. Featured carousel: Next/Prev loop; slide py padding so hover shadow isn’t clipped by Embla overflow. |
| 2026-10-10 | Diversified duplicate Commons slots (sand, drainage, roller, dumper, drill, blade, mining, roads). Still temporary until licensed Mythri/ImagesBazaar set. |
| 2026-10-10 | All page image slots filled (services/projects/capabilities/about heroes + fleet). Partner cards use temporary AI dummy portraits until client photos. |
