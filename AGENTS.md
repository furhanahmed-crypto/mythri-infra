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
- Charcoal `#1F2328` + accent `#E8A100` + white; one sans font; real construction photos only
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

Next.js App Router + TypeScript + Tailwind. Details in ARCHITECTURE.md. Do not add a CMS, auth, or database unless the PRD is updated.

## Done looks like

Pages match PRD acceptance, design tokens, and SEO checklist; contact path works; launch blockers tracked honestly in TASKS.md.
