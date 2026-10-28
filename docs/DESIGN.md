# DESIGN — Mythri Infra Website (v3)

v2 introduced shadcn/ui, light + dark themes and Framer Motion "fluid" animations. v3 (agency request: "too simple") adds a display font, warm amber gradients, ambient light effects and pointer-driven micro-interactions. Brand constraints from the Digi Carotene handover still apply.

## 1. Design direction

**Modern, warm, construction-grade.** White (light) or pure black (dark) surfaces, logo navy `#002858` text, steel greys from the mark, and a warm amber/copper CTA accent that complements the navy (earthwork niche — not logo-only). Strong display type, real site photography, and contrast rhythm from black bands (stats panel, "Why" band, closing CTA) between light sections.

Tone: capable, local, trustworthy — premium, but still a site office, not a SaaS landing page.

Visual motifs (all decorative, `aria-hidden`):

- **Aurora** (`.aurora`) — slowly drifting amber light behind heroes, page headers and dark panels
- **Cursor glow** (`CursorGlow`) — soft amber light trailing the mouse across a section
- **Survey grid** (`.bg-grid`) and **contour lines** (`ContourField`) — drawing-sheet and levelling nods
- **Border beam** (`.border-beam`) — light travelling around dark panels
- **Hatching** (`.bg-hatch`) — inside photo placeholders

Allowed with limits: gradient text on **one phrase per heading** (`Highlight` / `SectionHeading highlight`), glass cards (`backdrop-blur`) floating over photos or headers.

Not allowed: purple/indigo themes, neon glows, extra hues beyond the amber family (plus WhatsApp green / status green dot), stock skylines, emoji decoration.

## 2. Theme tokens

Tokens are shadcn CSS variables in `src/app/globals.css`, written in OKLCH and exposed to Tailwind via `@theme inline`. Always use the semantic utilities (`bg-background`, `text-muted-foreground`, `bg-primary`, …), never raw hex in components.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `background` | `#FFFFFF` | `#000000` pure black (dark only) | Page |
| `foreground` | `#002858` (logo navy) | near-white | Text |
| `brand-navy` / `brand-steel` | `#002858` / `#6B7378` | same (fixed) | Logo wordmark on light plates |
| `card` / `popover` | `#FFFFFF` | near-black `#242424` | Cards, menus, sheets |
| `primary` | `#D4941A` (warm amber) | `#E0A428` (lifted) | CTAs, active states, accents |
| `primary-foreground` | deep navy | near-black | Text on amber |
| `primary-deep` | `#B86B1E` copper | copper (lifted) | Gradient end (`bg-brand-gradient`, primary buttons) |
| `highlight-from` / `highlight-to` | darker ambers (≥ 3:1 on white) | bright ambers | `.text-gradient` heading highlights |
| `secondary` / `muted` | cool chalk | navy muted | Subtle fills, tab lists |
| `muted-foreground` | logo steel grey | light steel | Supporting copy |
| `accent` | `#F4EEE4` warm sand | warm dark sand | Icon tiles, hover fills |
| `border` / `input` | cool grey | white 10% / 14% | Dividers, fields |
| `ring` | amber | amber | Focus rings |
| `destructive` | `#B42318` | `#F04438` | Form errors |
| `surface` | cool chalk | near-black | Alternating section bands |
| `inverse` / `inverse-foreground` | pure black / light | pure black / light | Legacy inverse; footer uses forced `dark` + `bg-background` |
| `whatsapp` | `#25D366` | slightly darker | Floating WhatsApp only |

Radius: `--radius: 0.625rem`. Buttons and inputs use `rounded-lg`, cards `rounded-xl`, large panels `rounded-2xl`/`rounded-3xl`. No pill CTAs except the circular WhatsApp button.

### Theme behaviour

- `next-themes` with `attribute="class"`, **default light** for every first visit; System preference disabled so OS dark mode never auto-applies
- Toggle: `ThemeToggle` icon button in the header — opt-in dark only; one click flips Light ↔ Dark
- `<html suppressHydrationWarning>`; `disableTransitionOnChange` to avoid colour flashes
- Embedded Google Map is colour-inverted in dark mode so it doesn't glare
- `viewport.themeColor` set for both schemes

### Logo

Client logo in `public/images/brand/`. Header/footer use square `mythri-infra-mark.webp` + navy/"Infra" wordmark (`Logo`). Favicon / apple touch icons in `src/app/` are derived from the same mark. Footer passes `onDark` (white plate). Schema/OG: `mythri-infra-logo.webp`.

## 3. Typography

Two families via `next/font`: **Bricolage Grotesque** (`--font-display`, mapped to `font-heading`) for headings, numbers, logo wordmark and captions; **Manrope** (`--font-sans`) for body and UI.

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| H1 | `clamp(2.25rem → 4.25rem)` | 800 | Line-height 1.02, tracking -0.03em, `text-wrap: balance` |
| H2 | `clamp(1.75rem → 3rem)` | 700 | Line-height 1.08 |
| H3 | `clamp(1.125rem → 1.35rem)` | 650 | |
| Body | 1rem, lead paragraphs `text-lg`/`text-xl` | 400 | Line-height 1.65, `text-wrap: pretty` |
| Eyebrow | `text-[0.7rem]`, `tracking-[0.18em]`, uppercase | 600 | Amber-tinted pill with a pulsing dot |
| Numbers | `text-4xl`–`text-6xl`, `tabular-nums`, gradient | 800 | Numbers strip only |

Rules:

- Exactly one H1 per page; never skip levels
- Footer and numbers strip are **not** headings (`<p>`, `<strong>`, `<address>`)
- Prose max width ~42rem (`max-w-2xl`)
- Eyebrows are short UI labels ("Services", "Clients", "Process"); headings and body copy stay verbatim from the handover

## 4. Spacing & layout

- Container: `max-w-7xl`, gutters `px-5 / sm:px-6 / lg:px-8` (`components/site/Container`)
- Section rhythm: `py-16 md:py-24 lg:py-28` (`components/site/Section`); `surface` prop for alternating bands
- Common layouts: 12-column grids with a sticky left heading (`lg:col-span-4/5`, `lg:sticky lg:top-28`) and content on the right
- Card gaps 16–24px; card padding 20–32px

### Page shells

1. **Home:** hero (copy left with gradient "Kakinada" + drawn underline; ONGC project photo right with tilt, glass caption and two floating cards; aurora + grid + contours + cursor glow) → dark stats panel overlapping the hero edge → What We Do (spotlight bento linking to each service) → Trusted By (two-row marquee) → Why Choose (dark band, sticky heading + spotlight cards) → Featured Projects (tilt cards) → closing CTA panel (border beam)
2. **Interior pages:** `PageHeader` (breadcrumb, H1, intro, optional actions, wide photo) → sections → closing CTA
3. **Services:** sticky "On this page" index with scroll-spy (desktop) + alternating image/text service blocks
4. **Projects:** shadcn `Tabs` filter → animated featured cards → shadcn `Table` (2016–present) → team-experience timeline (2002–2015)
5. **Capabilities:** fleet card grid with count chips → HTML org chart → scroll-linked process timeline
6. **Contact:** details cards (left) + form card (right) → map with Directions/WhatsApp

### Header

Sticky; solid background that gains a hairline border, soft shadow and light blur after scroll. Desktop nav uses a sliding pill (`layoutId`) for hover/active plus a yellow dot under the active item. Right side: theme toggle, **Call Now** (icon-only below 380px, label kept for screen readers), and on mobile a `Sheet` menu with nav, Call and WhatsApp buttons.

### Footer

Inverse band: logo + tagline, quick links, offices (`<address>`), contact, then GSTIN and © 2026. Column labels are `<p>`, not headings.

## 5. Components (shadcn/ui)

Installed in `src/components/ui/` (Radix base, Nova preset): `button`, `card`, `badge`, `input`, `textarea`, `label`, `select`, `sheet`, `table`, `tabs`, `separator`, `dropdown-menu`, `alert`, `aspect-ratio`, `tooltip`.

| Need | Use |
|------|-----|
| CTAs | `Button` with `asChild` around `Link` / `TrackedLink`; `size="xl"` (44px) for page CTAs |
| Cards | `Card` / `CardContent`; hover = lift `-translate-y-1` + shadow |
| Labels/chips | `Badge` (`secondary` for years/categories) |
| Mobile nav | `Sheet` (right) |
| Theme | `DropdownMenu` radio group |
| Filters | `Tabs` |
| Tabular data | `Table` inside a `Card` |
| Form | `Input`, `Textarea`, `Select`, `Label`, `Alert` |

Custom site primitives live in `src/components/site/` (`Container`, `Section`, `SectionHeading`, `PageHeader`, `MediaPlaceholder`, `TrackedLink`). Do not put non-shadcn components in `components/ui/`.

Button sizes: shadcn's defaults are compact (h-8/h-9). Use `xl` (h-11, added locally) for any primary page action so tap targets stay ≥ 44px.

## 6. Motion — "fluid" system

Library: `framer-motion`. Wrapped in `MotionConfig reducedMotion="user"`.

**Character:** low-stiffness springs that settle like water finding its level. Elements rise ~28px, fade in and un-blur (6px → 0).

```ts
fluidSpring = { type: "spring", stiffness: 60, damping: 17, mass: 0.9 }
```

| Primitive | File | Use |
|-----------|------|-----|
| `Reveal` | `motion/Reveal.tsx` | Single block entering viewport (once) |
| `Stagger` + `StaggerItem` | `motion/Reveal.tsx` | Grids/lists rippling in, 60–90ms apart |
| `CountUp` | `motion/CountUp.tsx` | Numbers strip; SSR renders the final value |
| `ContourField` | `motion/ContourField.tsx` | Hero contour lines drawing in, then drifting |
| `ProcessTimeline` | `capabilities/ProcessTimeline.tsx` | Line fills with scroll progress (spring-smoothed) |
| Layout animations | Projects filter, nav pill, service index | `layout` / `layoutId` + `AnimatePresence` |
| `SpotlightCard` | `motion/SpotlightCard.tsx` | Cursor-following fill + lit border (services, why, values, fleet) |
| `Tilt` | `motion/Tilt.tsx` | 3D tilt + glare on hero photo and project cards (mouse only) |
| `Magnetic` | `motion/Magnetic.tsx` | Primary CTAs drift toward the cursor |
| `CursorGlow` | `motion/CursorGlow.tsx` | Amber light trailing the cursor across a section |
| `RotatingWords` | `motion/RotatingWords.tsx` | Hero floating card cycling service names (pauses on hover) |
| `ParallaxMedia` | `motion/ParallaxMedia.tsx` | Page-header photo zooms out with scroll (inside overflow-hidden) |
| `BackToTop` | `layout/BackToTop.tsx` | Desktop button with a scroll-progress ring |
| Header progress | `layout/Header.tsx` | Gradient bar under the header tracks page scroll |
| CSS effects | `globals.css` | `.aurora`, `.marquee`, `.btn-shine`, `.border-beam`, `.text-gradient`, `.draw-line`, `.float-slow` |

Shared hook: `hooks/use-pointer-position.ts` (pointer position as motion values — no React re-renders on move).

Rules:

- **Above-the-fold hero/page-header text uses CSS (`tw-animate-css`) entrance animations, not Framer.** It paints without waiting for hydration, protecting LCP.
- Below-the-fold content uses `Reveal`/`Stagger` with `viewport={{ once: true }}`.
- Never hide meaningful text behind JS-only state; SSR HTML must contain final copy (e.g. `CountUp`).
- Reduced motion: transforms are disabled by `MotionConfig`; `Tilt`, `Magnetic`, `ParallaxMedia` and `RotatingWords` check `useReducedMotion`; aurora, marquee, float, gradient pan and border beam stop via a reduced-motion media query; the hero underline renders fully drawn.
- Pointer effects (`Tilt`, `Magnetic`, `CursorGlow`) only respond to `pointerType === "mouse"`.
- Hover micro-interactions: 300–1000ms, transform/opacity/colour only.
- No autoplay video, no image carousels, no parallax that shifts layout. The client-name marquee pauses on hover; its duplicate track is `aria-hidden`.

## 7. Imagery

| Rule | Detail |
|------|--------|
| Format | WebP for photos; SVG for logo/diagrams |
| Weight | Target < 200 KB each |
| Attributes | Width/height set; lazy below the fold; hero eager |
| Alt text | Exactly as in the handover |
| Content | Real sites only |
| Placeholder | `MediaPlaceholder`: hatched muted panel, camera icon, file name + alt text, `role="img"` with the alt as label |

Team structure is rendered as an accessible HTML org chart (`figure role="img"` with the handover alt text) so it adapts to both themes.

## 8. Responsive

Mobile-first. Breakpoints: `sm 640`, `md 768`, `lg 1024` (desktop nav appears), `xl 1280`. No horizontal scroll at 360px. Tables scroll horizontally inside their card on small screens. Floating WhatsApp shows below `lg`.

## 9. Accessibility

- AA contrast in both themes (navy on amber for primary buttons)
- Visible focus rings (`ring` = yellow)
- Skip-to-content link
- Form: labels, `aria-invalid`, `aria-describedby` → error text with `role="alert"`, focus moves to first invalid field
- Breadcrumbs use `nav[aria-label="Breadcrumb"]` and `aria-current="page"`
- Icons decorative (`aria-hidden`); icon-only buttons have `aria-label`
- Map iframe has a descriptive `title`

## 10. Do / Don't

**Do:** semantic tokens, shadcn components, the two-font pairing, real photography, light/dark section rhythm, pointer effects that respect reduced motion, Call/WhatsApp always within one tap.

**Don't:** raw hex in components, hues outside the amber family, gradient text on whole headings, heading tags in footer/numbers, JS-gated hero text, long or bouncy animations that delay reading, rewriting handover copy for style.
