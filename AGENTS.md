# AGENTS.md — Mythri Infra

Instructions for AI coding agents working in this repository.

## Mission

Build and maintain the Mythri Infra marketing website: six SEO-ready pages, global chrome (header/footer/WhatsApp), and a secure contact enquiry form. Match Digi Carotene’s content/SEO handover; do not freestyle brand copy or visuals.

## Read before you code

In order:

1. [docs/SECURITY.md](./docs/SECURITY.md)
2. [docs/RULES.md](./docs/RULES.md)
3. [docs/PRD.md](./docs/PRD.md)
4. [docs/DESIGN.md](./docs/DESIGN.md)
5. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
6. [docs/TASKS.md](./docs/TASKS.md) — pick the next unchecked task
7. [docs/MEMORY.md](./docs/MEMORY.md) — constraints and past decisions

Primary copy/SEO source: `Mythri_Infra_Website_Content_SEO_Handover.pdf`.

## Non-negotiables

- Exact meta titles/descriptions/keywords and heading hierarchy from the handover
- Brand palette via shadcn tokens only: logo navy `#002858` + steel greys, warm amber/copper CTA accent (complements navy for the earthwork niche); light (default) and pure-black dark themes; Bricolage Grotesque headings + Manrope body; client logo from `public/images/brand/`; real construction photos only
- Build UI from shadcn/ui (`src/components/ui`) and site primitives (`src/components/site`); animate with the shared Framer Motion primitives (`src/components/motion`)
- Every change must work in light and dark mode and with reduced motion
- No stock skyscrapers; no turnover figures; no NOTE text in the UI
- Client logos only with permission; otherwise text names
- Form: server validation, 10 MB PDF/Excel cap, spam protection, no public upload directory
- Never commit secrets
- Update `docs/TASKS.md` (and `docs/MEMORY.md` when decisions change)

## How to work

1. Choose the highest-priority open task in `docs/TASKS.md`
2. Implement the smallest slice that meets Definition of Done in RULES.md
3. Keep SEO/schema intact when touching pages
4. Prefer placeholders with correct alt/filename over fake assets
5. Do not commit unless the user asks

## Stack target

Next.js App Router + TypeScript + Tailwind v4 + shadcn/ui + next-themes + framer-motion. Details in ARCHITECTURE.md; visual system and motion rules in DESIGN.md. Do not add a CMS, auth, or database unless the PRD is updated.

## Done looks like

Pages match PRD acceptance, design tokens, and SEO checklist; contact path works; launch blockers tracked honestly in TASKS.md.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
