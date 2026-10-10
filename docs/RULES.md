# RULES — AI Agent Instructions (Mythri Infra)

This is the instruction manual for any agent working in this repository. Follow these rules over improvisation.

## 1. Source of truth order

1. `docs/SECURITY.md` — never violate
2. `docs/RULES.md` — this file
3. `docs/PRD.md` + Digi Carotene PDF — product & copy
4. `docs/DESIGN.md` — UI/UX, tokens, motion
5. `docs/ARCHITECTURE.md` — structure
6. `docs/TASKS.md` — what to implement next
7. `docs/MEMORY.md` — constraints & past decisions

If code and docs disagree on product copy/SEO, **prefer the PDF / PRD** and update code.

## 2. Coding conventions

- TypeScript strict; no `any` unless justified with a comment
- Prefer Server Components; mark `"use client"` only for interactive pieces (nav, theme toggle, motion wrappers, filters, form)
- Components: small, composable, named after UI purpose (`Header`, `FleetGrid`, `EnquiryForm`)
- Content strings in `src/content/*`, not hardcoded deep inside presentational components when reused
- Use `next/image` for all raster images
- Filenames: `kebab-case` for assets; `PascalCase` for our components; shadcn files stay lowercase in `components/ui`
- Class merging via `cn` from `@/lib/utils`

### UI layer

- **Use shadcn/ui components first** (`Button`, `Card`, `Badge`, `Tabs`, `Table`, `Sheet`, `Select`, `Input`, …). Add new ones with `npx shadcn@latest add <name>`.
- `src/components/ui/` contains **only** shadcn components. Our primitives go in `src/components/site/`.
- macOS filesystems are case-insensitive: never create `Button.tsx` etc. next to shadcn's `button.tsx`.
- Style with **semantic tokens only** (`bg-background`, `text-muted-foreground`, `bg-primary`, `bg-surface`, `bg-inverse`). No raw hex colours in components; new colours become CSS variables in `globals.css` for both `:root` and `.dark`.
- Every UI change must look correct in **both light and dark** themes.
- Links styled as buttons: `<Button asChild>` wrapping `Link` or `TrackedLink`. Page CTAs use `size="xl"`.

### Motion

- Use the shared primitives in `components/motion` (`Reveal`, `Stagger`/`StaggerItem`, `CountUp`) and `fluidSpring`; don't invent new spring values per component.
- Above-the-fold headings/intro: CSS `animate-in` classes only (no Framer), so LCP isn't tied to hydration.
- Motion must never be required to read content; SSR HTML contains final text.
- Respect reduced motion (already handled by `MotionConfig reducedMotion="user"`; check custom loops with `useReducedMotion`).

## 3. Required practices

- One `<h1>` per page; preserve H1 → H2 → H3 order from the PDF
- Implement meta title, description, keywords **exactly** as specified
- Every content image gets the prescribed `alt`; decorative icons `aria-hidden` / `alt=""`
- `tel:` and WhatsApp links via `TrackedLink` so GA4 events fire
- Contact form: validate client-side for UX **and** server-side for security, enforce 10 MB / file types, spam protection
- Keep footer semantics: no heading tags; use `<address>` for offices
- Update `docs/TASKS.md` status when completing work
- Record durable decisions in `docs/MEMORY.md`

## 4. Forbidden actions

- Do not invent or publish client turnover figures
- Do not use stock skyscraper / generic city imagery
- Do not publish NOTE-only instructions as user-visible copy
- Do not add client brand logos without permission (use text fallback)
- Do not claim firm founded in 2002; use the 2002 experience / 2016 established framing
- Do not add NR Constructions / KPC Projects rows until client provides data
- Do not introduce a CMS, auth system, or database "for later" without request
- Do not commit secrets, `.env` files, or service account keys
- Do not weaken spam protection or disable HTTPS/canonical redirects in production config
- Do not add purple SaaS themes, extra accent colours, gradient text, emoji clutter, or autoplay video
- Do not skip accessibility basics (labels, focus, contrast in both themes)
- Do not rewrite marketing copy for "style" — SEO strings are intentional (short eyebrow labels are the only UI-added text)
- Do not run blanket find/replace over `src/lib/utils.ts` or generated shadcn files without re-checking imports

## 5. Git & delivery hygiene

- Commit only when the user asks
- Keep PRs focused (e.g. layout shell vs. projects table vs. form API)
- Never force-push protected branches
- Do not use `--no-verify` unless explicitly requested

## 6. When assets are missing

- Use `MediaPlaceholder` with the **target filename / alt text**
- Do not block page implementation waiting on photos
- Mark client blockers in TASKS.md; do not fake logos

## 7. Definition of done (per task)

- Matches PRD acceptance for that slice
- Matches DESIGN tokens/patterns in light **and** dark mode
- `npx tsc --noEmit`, `npm run lint` and `npm run build` pass
- SEO/schema still valid if the page was touched
- TASKS.md updated
