"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Container } from "@/components/ui/Container";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-bg/95 backdrop-blur transition-shadow duration-200",
        scrolled && "border-border shadow-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Mythri Infra home"
          onClick={() => setOpen(false)}
        >
          <Image
            src={siteConfig.logoPath}
            alt="Mythri Infra logo"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium text-text-muted transition-colors hover:text-text",
                  active &&
                    "text-text underline decoration-accent decoration-2 underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <TrackedLink
            href={`tel:${siteConfig.phone.primaryTel}`}
            event="click_to_call"
            className="inline-flex min-h-11 items-center justify-center rounded-[5px] bg-accent px-4 py-2 text-[0.9375rem] font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Call Now
          </TrackedLink>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-text transition",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-text transition",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-text transition",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-bg lg:hidden"
          aria-label="Mobile"
        >
          <Container className="flex flex-col py-3">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3 text-base font-medium last:border-b-0",
                    active ? "text-text" : "text-text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
