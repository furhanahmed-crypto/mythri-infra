"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/site/Container";
import { TrackedLink } from "@/components/site/TrackedLink";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-background/75 shadow-[0_8px_30px_-18px] shadow-foreground/20 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <motion.div
        aria-hidden="true"
        className="bg-brand-gradient absolute inset-x-0 -bottom-px h-0.5 origin-left"
        style={{ scaleX: progress }}
      />
      <Container className="flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]">
        <Link href="/" aria-label="Mythri Infra — home" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(pathname, item.href);
              const highlight = hovered ? hovered === item.href : active;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.href)}
                    onFocus={() => setHovered(item.href)}
                    className={cn(
                      "relative z-10 block rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                  {highlight ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-muted ring-1 ring-foreground/5"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                    />
                  ) : null}
                  {active ? (
                    <span
                      className="absolute bottom-1 left-1/2 z-10 size-1 -translate-x-1/2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <Button asChild size="lg" className="h-10 px-3 font-semibold min-[380px]:px-4">
            <TrackedLink href={`tel:${siteConfig.phone.primaryTel}`} event="click_to_call">
              <Phone data-icon="inline-start" aria-hidden="true" />
              <span className="max-[379px]:sr-only">Call Now</span>
            </TrackedLink>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="size-10 lg:hidden"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] gap-0 sm:max-w-sm">
              <SheetHeader className="border-b px-5 py-4">
                <SheetTitle asChild>
                  <span>
                    <Logo />
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {siteConfig.nav.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.04 * i }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium transition-colors",
                            active
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                          {active ? (
                            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                          ) : null}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <Separator />
              <div className="grid gap-2 p-5">
                <Button asChild size="xl">
                  <TrackedLink href={`tel:${siteConfig.phone.primaryTel}`} event="click_to_call">
                    <Phone data-icon="inline-start" aria-hidden="true" />
                    Call {siteConfig.phone.primaryDisplay}
                  </TrackedLink>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <TrackedLink href={siteConfig.whatsappUrl} event="whatsapp_click" external>
                    <MessageCircle data-icon="inline-start" aria-hidden="true" />
                    WhatsApp
                  </TrackedLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
