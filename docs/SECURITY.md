# SECURITY — Mythri Infra Website

Security boundaries for a public marketing site with a contact form. These constraints must not be violated.

## 1. Threat model (v1)

| Asset | Risk |
|-------|------|
| Enquiry PII (name, phone, email, message, BOQ files) | Spam, scraping, leakage via logs or client JS |
| Inbox / API keys | Abuse if exposed in repo or browser bundle |
| Site integrity | Defacement via dependency or host compromise |
| SEO / redirects | Open redirects, host header issues |

No user accounts, no admin CMS, no payment data in v1 — keep it that way unless SECURITY.md is revised.

## 2. Secrets & configuration

- Store secrets only in environment variables / host secret manager
- Never commit `.env`, private keys, or service account JSON
- Provide `.env.example` with **placeholder names only**
- Required secret classes:
  - Email provider API key
  - `CONTACT_TO_EMAIL` (and optional CC)
  - reCAPTCHA secret (if enabled)
  - GA4 measurement ID is public; do not put private API secrets in `NEXT_PUBLIC_*` unless they are meant to be public
- Rotate keys if accidentally exposed

## 3. Contact form & file uploads

- Validate **server-side** (never trust the client alone)
- Allowed upload types: PDF and Excel only (`application/pdf`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`) — verify MIME + extension
- Max file size: **10 MB**; reject oversize before buffering unbounded streams
- Sanitize filenames; do not execute or serve uploaded files publicly
- Prefer forwarding as email attachments; if temporary disk is used, delete after send
- Honeypot field required; reCAPTCHA v3 strongly recommended in production
- Rate-limit by IP (e.g. edge middleware or provider limits)
- Do not reflect raw user HTML in success/error pages (XSS)
- Do not log full message bodies or file contents at `info` level in production

## 4. Authentication & authorization

- v1 has **no end-user auth**
- Do not add a public admin UI without authentication, CSRF protection, and an explicit PRD change
- Host/dashboard access (Vercel, DNS, email) limited to Digi Carotene / client admins

## 5. Data protection

- PII purpose: respond to project enquiries only
- Retention: follow email provider / client mailbox retention; do not build a shadow database of leads without consent and a retention policy
- Do not send PII to analytics (no phone/email in GA4 event params)
- HTTPS everywhere; HSTS at host if available
- Canonical host only (prevent duplicate cookie/SEO hosts)

## 6. Frontend / XSS / click safety

- Escape or use framework default text rendering for all user-provided strings
- Do not use `dangerouslySetInnerHTML` for enquiry content
- External links (`wa.me`, Google Maps, future GBP): `rel="noopener noreferrer"` where `target="_blank"`
- CSP: prefer a sensible Content-Security-Policy when hosting allows (at least avoid `unsafe-eval` unless required)

## 7. Dependencies & supply chain

- Pin lockfile; install from lockfile in CI
- Avoid obscure packages for email/spam when a well-maintained provider SDK exists
- Remove unused dependencies
- Apply security patches promptly

## 8. SEO / open redirect hygiene

- Do not implement open redirects based on query params
- Canonical and OG URLs must be constructed from a trusted `metadataBase` / env site URL, not the raw `Host` header alone

## 9. Privacy & compliance notes

- Show accurate business identity (GSTIN, addresses) — do not spoof
- If adding cookie-based analytics beyond GA4 essentials, add a minimal consent approach appropriate for the client’s jurisdiction and host audience
- Phone numbers on the site are intentional public business contacts

## 10. Incident basics

If keys leak or the form is abused:

1. Rotate provider keys immediately  
2. Enable/tighten rate limits and captcha  
3. Invalidate exposed preview deployments if needed  
4. Notify Digi Carotene project lead / client technical contact  

## 11. Agent non-negotiables

- Never disable spam checks “to test” in production
- Never commit secrets
- Never store BOQ uploads in `public/`
- Never add auth bypasses, backdoors, or debug endpoints that dump env vars
- Never weaken HTTPS / security headers to “fix” mixed content — fix the asset URL instead
