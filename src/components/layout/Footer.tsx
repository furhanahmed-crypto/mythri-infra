import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { TrackedLink } from "@/components/ui/TrackedLink";

export function Footer() {
  return (
    <footer className="mt-auto bg-inverse text-inverse-text">
      <Container className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16">
        <div className="space-y-4">
          <p className="text-base font-semibold">{siteConfig.tagline}</p>
          <p className="text-sm text-white/70">
            GSTIN: {siteConfig.gstin}
          </p>
          <p className="text-sm text-white/70">
            © 2026 Mythri Infra. All rights reserved.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Quick links
          </p>
          <ul className="space-y-2 text-sm">
            {siteConfig.nav
              .filter((item) => item.href !== "/")
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="space-y-4 text-sm md:col-span-2 lg:col-span-1">
          <address className="not-italic space-y-3 text-white/85">
            <p>
              <span className="font-semibold text-inverse-text">
                {siteConfig.addresses.head.label}:
              </span>{" "}
              {siteConfig.addresses.head.lines.join(", ")}
            </p>
            <p>
              <span className="font-semibold text-inverse-text">
                {siteConfig.addresses.branch.label}:
              </span>{" "}
              {siteConfig.addresses.branch.lines.join(", ")}
            </p>
          </address>
          <p className="text-white/85">
            Phone:{" "}
            <TrackedLink
              href={`tel:${siteConfig.phone.primaryTel}`}
              event="click_to_call"
              className="hover:text-accent"
            >
              {siteConfig.phone.primaryDisplay}
            </TrackedLink>
            {" · "}
            <TrackedLink
              href={`tel:${siteConfig.phone.secondaryTel}`}
              event="click_to_call"
              className="hover:text-accent"
            >
              {siteConfig.phone.secondaryDisplay}
            </TrackedLink>
            {" · Office: "}
            <TrackedLink
              href={`tel:${siteConfig.phone.officeTel}`}
              event="click_to_call"
              className="hover:text-accent"
            >
              {siteConfig.phone.officeDisplay}
            </TrackedLink>
          </p>
          <p className="text-white/85">
            Email:{" "}
            <a
              href={`mailto:${siteConfig.email.primary}`}
              className="hover:text-accent"
            >
              {siteConfig.email.primary}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
