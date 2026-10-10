# RULES — AI Agent Instructions (Mythri Infra)

This is the instruction manual for any agent working in this repository. Follow these rules over improvisation.

## 1. Source of truth order

1. `docs/SECURITY.md` — never violate
2. `docs/RULES.md` — this file
3. `docs/PRD.md` + Digi Carotene PDF — product & copy
4. `docs/DESIGN.md` — UI/UX
5. `docs/ARCHITECTURE.md` — structure
6. `docs/TASKS.md` — what to implement next
7. `docs/MEMORY.md` — constraints & past decisions

If code and docs disagree on product copy/SEO, **prefer the PDF / PRD** and update code.

## 2. Coding conventions

- TypeScript strict; no `any` unless justified with a comment
- Prefer Server Components; mark `"use client"` only for form, mobile nav, analytics hooks
- Components: small, composable, named after UI purpose (`Header`, `FleetGrid`, `EnquiryForm`)
- Colocate page-specific sections under the route or a clear `components/sections/` tree
- Content strings in `src/content/*`, not hardcoded deep inside presentational components when reused
- Use `next/image` for all raster images
- Tailwind utility classes + CSS variables from DESIGN tokens
- Filenames: `kebab-case` for assets; `PascalCase` for React components

## 3. Required practices

- One `<h1>` per page; preserve H1 → H2 → H3 order from the PDF
- Implement meta title, description, keywords **exactly** as specified
- Every content image gets the prescribed `alt`; decorative icons `alt=""`
- `tel:` and WhatsApp links on every required CTA; track GA4 events
- Contact form: validate server-side, enforce 10 MB / file types, spam protection
- Keep footer semantics: no heading tags; use `<address>` for offices
- Respect `prefers-reduced-motion`
- Update `docs/TASKS.md` status when completing work
- Record durable decisions in `docs/MEMORY.md`

## 4. Forbidden actions

- Do not invent or publish client turnover figures
- Do not use stock skyscraper / generic city imagery
- Do not publish NOTE-only instructions as user-visible copy
- Do not add client brand logos without permission (use text fallback)
- Do not claim firm founded in 2002; use the 2002 experience / 2016 established framing
- Do not add NR Constructions / KPC Projects rows until client provides data
- Do not introduce a CMS, auth system, or database “for later” without request
- Do not commit secrets, `.env` files, or service account keys
- Do not weaken spam protection or disable HTTPS/canonical redirects in production config
- Do not add purple SaaS themes, emoji clutter, or autoplay video
- Do not skip accessibility basics (labels, focus, contrast)
- Do not rewrite marketing copy for “style” — SEO strings are intentional

## 5. Git & delivery hygiene

- Commit only when the user asks
- Keep PRs focused (e.g. layout shell vs. projects table vs. form API)
- Never force-push protected branches
- Do not use `--no-verify` unless explicitly requested

## 6. When assets are missing

- Use neutral placeholders with the **target filename / alt text** as caption
- Do not block entire page implementation waiting on photos
- Mark client blockers in TASKS.md; do not fake logos

## 7. Definition of done (per task)

- Matches PRD acceptance for that slice
- Matches DESIGN tokens/patterns
- No new linter/type errors
- SEO/schema still valid if the page was touched
- TASKS.md updated
