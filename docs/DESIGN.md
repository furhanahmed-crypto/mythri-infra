# DESIGN — Mythri Infra Website

## 1. Design direction

**Clean and simple construction-industry site:** white background, charcoal text, one accent (construction yellow). Generous whitespace. Mobile first. Real site photography only — excavators, dumpers, sand reaches, finished roads. No stock skyscrapers, no purple gradients, no glassmorphism, no emoji decoration.

Tone: capable, local, trustworthy — not corporate-glossy or “startup SaaS.”

## 2. Brand & visual identity

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-surface` | `#F7F8F9` | Subtle section banding (alternate sections only) |
| `--color-text` | `#1F2328` | Body and headings |
| `--color-text-muted` | `#5B6168` | Supporting copy, captions |
| `--color-border` | `#E5E7EB` | Dividers, table rules, input borders |
| `--color-accent` | `#E8A100` | Primary CTA, links hover underline, focus rings accent |
| `--color-accent-hover` | `#C98B00` | Button hover |
| `--color-accent-ink` | `#1F2328` | Text on accent buttons (high contrast) |
| `--color-inverse` | `#1F2328` | Dark footer or dark strip if needed |
| `--color-inverse-text` | `#FFFFFF` | Text on inverse |

**Pending client:** final brand colours. Until approved, use charcoal + construction yellow above.

### Logo

- File: `mythri-infra-logo.svg`
- Header: left-aligned, clear space ≥ 16px
- Do not stretch; max header height ~40–48px
- Footer may use monochrome/logo-mark if needed for contrast

## 3. Typography

**One sans-serif family only** — choose **Inter**, **Manrope**, or **Poppins** (pick one project-wide; recommended: **Manrope** for slightly industrial feel, or **Inter** for neutrality).

| Role | Size (mobile → desktop) | Weight | Notes |
|------|-------------------------|--------|-------|
| H1 | 1.75rem → 2.5rem | 700 | Page title; ~70 chars max line |
| H2 | 1.375rem → 1.75rem | 700 | Section |
| H3 | 1.125rem → 1.25rem | 600 | Cards, service names |
| Body | 1rem → 1.0625rem | 400 | Line-height 1.6 |
| Small / label | 0.875rem | 500 | Numbers strip labels, table meta |
| Button | 0.9375rem | 600 | Sentence case |

Rules:

- Exactly one H1 per page
- Never skip heading levels
- Footer and numbers strip: **not** headings — use `<p>` / `<strong>` / `<address>`
- Max ~70 characters per line for body in reading columns (`max-width` ~40–42rem for prose)

## 4. Spacing scale

Use a 4px base:

`4, 8, 12, 16, 24, 32, 48, 64, 96`

| Context | Guidance |
|---------|----------|
| Section vertical padding | 48–64px mobile, 64–96px desktop |
| Component gap | 16–24px |
| Card internal padding | 16–24px |
| Page horizontal gutter | 16px mobile, 24–32px tablet, constrained content `max-width: 72rem` centered |

Generous whitespace is a brand requirement — prefer more space over denser packing.

## 5. Layout patterns

### Header (all pages)

- Sticky top
- Logo | nav (Home, About, Services, Projects, Capabilities, Contact) | **Call Now** button
- Mobile: hamburger or compact nav; Call Now remains visible; WhatsApp floats separately
- Active link: charcoal underline or accent underline (2px)

### Footer (all pages)

- Tagline: “Mythri Infra — Earthwork & Infrastructure Contractors, Kakinada”
- Quick links
- Head office + branch office
- Phones + email + GSTIN + © 2026
- Semantic `<address>` for physical addresses; no H1–H3 in footer

### Floating WhatsApp

- Mobile only (or mobile-primary)
- Fixed bottom-right, above safe area
- Brand green WhatsApp mark is allowed for recognition; keep size modest (~48–56px tap target)

### Page shells

1. **Home:** Hero (full-bleed image) → Numbers strip → What We Do (5 icon cards) → Trusted By → Why Choose → Featured Projects → Closing CTA  
2. **Interior pages:** Page header (image + H1 + intro) → content sections → end CTA  
3. **Contact:** Two-column (details | form) stacking to single column on mobile → Map section

### Hero

- Full-bleed photographic plane (edge-to-edge)
- Overlay: light dark gradient only as needed for text contrast — keep copy charcoal on white panel **or** white text on darkened photo; pick one pattern sitewide
- Hero budget: brand/logo (header), one H1, one short paragraph, one CTA group — no stats in the hero overlay except the dedicated Numbers strip below

## 6. Components

### Buttons

| Variant | Style |
|---------|-------|
| Primary | bg accent `#E8A100`, text charcoal, radius 4–6px, padding 12×20 |
| Secondary | outline charcoal or accent border, transparent fill |
| Text / link | Accent or charcoal underline on hover |

No pill-full (`rounded-full`) CTAs; slight radius only.

### Cards

- Allowed for interactive or scannable groups: service cards, project cards, fleet cards
- Prefer light border or spacing separation over heavy shadow
- Icon cards (What We Do): decorative icons `alt=""`

### Numbers strip

- Four large figures + small labels
- Not headings; use `<p>` + `<strong>` for the number

### Logo row (Trusted By)

- Grayscale logos, even spacing
- If logo permission missing: plain text names in a quiet row

### Tables (Projects)

- Responsive: horizontal scroll on small screens or stacked definition lists
- Clear Year / Project / Location / Client columns
- Separate “Team’s Earlier Experience” table with explanatory intro

### Form controls

- Labels above fields; required marked with *
- 44px min height inputs
- Focus: 2px accent or charcoal ring
- Error text muted red (`#B42318`), adjacent to field
- File input: accept PDF/Excel, show 10 MB limit helper text

### Map

- Embedded iframe or map image + Get Directions button
- Adjacent WhatsApp CTA

## 7. Imagery

| Rule | Detail |
|------|--------|
| Format | WebP for photos; SVG for logo/diagrams |
| Weight | Target &lt; 200 KB each |
| Attributes | Always width/height; lazy below fold; hero eager |
| Alt text | Exactly as specified in the PDF handover |
| Content | Real sites only |
| Placeholders | Neutral gray + caption of intended shot name until assets arrive |

Suggested hero/content filenames are defined in the PDF (e.g. `home-hero-fleet.webp`, `fleet-dumper.webp`).

## 8. Responsive breakpoints

| Name | Min width | Notes |
|------|-----------|-------|
| sm | 640px | |
| md | 768px | Nav expands; contact two-column |
| lg | 1024px | Full desktop header |
| xl | 1280px | Max content comfort |

Mobile-first CSS. Test sticky header + WhatsApp + click-to-call on real phones.

## 9. Motion & interaction

Keep motion subtle and purposeful (2–3 patterns max):

1. Header shadow appears after scroll (short transition)
2. Buttons: background/border 150–200ms ease
3. Optional fade-up on section enter (respect `prefers-reduced-motion: reduce` — disable transforms)

No autoplay video, no parallax heavy enough to hurt LCP, no infinite carousels for hero.

## 10. Accessibility

- Colour contrast: charcoal on white and charcoal on accent meet WCAG AA
- Focus visible on all interactive elements
- Skip-to-content link
- Form errors announced / associated with `aria-describedby`
- Map iframe titled appropriately

## 11. Do / Don’t

**Do**

- White + charcoal + yellow
- Real construction photography
- Generous whitespace
- One font family
- Sticky Call Now + WhatsApp path to contact

**Don’t**

- Purple/indigo SaaS themes, cream-serif editorial looks, neon glows
- Stock city skylines
- Heading tags in footer or numbers strip
- Dense dashboard-style first viewport
- Multiple accent colours or gradient text
