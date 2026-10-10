import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/site/Container";
import { TrackedLink } from "@/components/site/TrackedLink";
import { Separator } from "@/components/ui/separator";
import { Logo } from "./Logo";

const linkClass =
  "bg-[linear-gradient(var(--primary),var(--primary))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat text-muted-foreground transition-[color,background-size] duration-300 hover:bg-[length:100%_1px] hover:text-primary focus-visible:text-primary";

/** Footer uses <p> / <address> only — no heading tags (handover requirement). */
export function Footer() {
  return (
    <footer className="dark relative mt-auto overflow-hidden bg-background text-foreground">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden="true"
      />
      <div className="aurora pointer-events-none absolute inset-0 -z-0 opacity-25" aria-hidden="true" />
      <Container className="relative grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="relative space-y-5 lg:col-span-4">
          <Logo onDark />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="relative space-y-4 lg:col-span-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground/70 uppercase">
            Quick links
          </p>
          <ul className="space-y-2.5 text-sm">
            {siteConfig.nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <address className="relative space-y-4 text-sm not-italic lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground/70 uppercase">
            Offices
          </p>
          {[siteConfig.addresses.head, siteConfig.addresses.branch].map((office) => (
            <p key={office.label} className="flex gap-3 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block font-semibold text-foreground">
                  {office.label}
                </span>
                {office.lines.join(", ")}
              </span>
            </p>
          ))}
        </address>

        <div className="relative space-y-4 text-sm lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground/70 uppercase">
            Contact
          </p>
          <p className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="flex flex-wrap gap-x-2 gap-y-1">
              <TrackedLink href={`tel:${siteConfig.phone.primaryTel}`} event="click_to_call" className={linkClass}>
                {siteConfig.phone.primaryDisplay}
              </TrackedLink>
              <span className="text-foreground/30" aria-hidden="true">·</span>
              <TrackedLink href={`tel:${siteConfig.phone.secondaryTel}`} event="click_to_call" className={linkClass}>
                {siteConfig.phone.secondaryDisplay}
              </TrackedLink>
              <span className="text-foreground/30" aria-hidden="true">·</span>
              <span className="text-muted-foreground">
                Office:{" "}
                <TrackedLink href={`tel:${siteConfig.phone.officeTel}`} event="click_to_call" className={linkClass}>
                  {siteConfig.phone.officeDisplay}
                </TrackedLink>
              </span>
            </span>
          </p>
          <p className="flex gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <a href={`mailto:${siteConfig.email.primary}`} className={linkClass}>
              {siteConfig.email.primary}
            </a>
          </p>
        </div>
      </Container>

      <div aria-hidden="true" className="pointer-events-none relative overflow-hidden select-none">
        <Container>
          <p className="bg-gradient-to-b from-foreground/[0.09] to-transparent bg-clip-text pb-2 text-center font-heading text-[clamp(3.5rem,14vw,12rem)] leading-[0.85] font-extrabold tracking-tighter whitespace-nowrap text-transparent">
            Mythri Infra
          </p>
        </Container>
      </div>

      <Container className="relative">
        <Separator className="bg-foreground/10" />
        <div className="flex flex-col gap-2 py-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>GSTIN: {siteConfig.gstin}</p>
          <p>© 2026 Mythri Infra. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
