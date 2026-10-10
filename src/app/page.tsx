import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  Construction,
  Droplets,
  HardHat,
  MapPin,
  Mountain,
  Phone,
  Route,
  ShieldCheck,
  Shovel,
  Sparkles,
  Truck,
  Users,
  Waves,
} from "lucide-react";
import { homeContent } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";
import { generalContractorSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteImage } from "@/components/site/SiteImage";
import { TrackedLink } from "@/components/site/TrackedLink";
import { Highlight } from "@/components/site/Highlight";
import { Marquee } from "@/components/site/Marquee";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { ContourField } from "@/components/motion/ContourField";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingWords } from "@/components/motion/RotatingWords";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { Tilt } from "@/components/motion/Tilt";
import { FeaturedProjectsCarousel } from "@/components/home/FeaturedProjectsCarousel";

export const metadata = buildPageMetadata({
  ...homeContent.seo,
  path: "/",
});

const serviceIcons = [Shovel, Route, Droplets, Waves, Mountain];
const whyIcons = [Truck, HardHat, ShieldCheck];
const numberIcons = [CalendarClock, Construction, Truck, Users];

export default function HomePage() {
  const { hero, numbers, whatWeDo, trustedBy, why, featuredProjects, closingCta } =
    homeContent;
  const serviceNames = whatWeDo.items.map((item) => item.h3);
  const fleet = numbers[1];

  return (
    <>
      <JsonLd data={generalContractorSchema()} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="aurora -z-30" aria-hidden="true" />
        <div className="bg-grid mask-radial absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
        <ContourField className="-z-10 text-primary/25 dark:text-primary/15" />
        <CursorGlow className="-z-10" />

        <Container className="grid items-center gap-14 pt-12 pb-24 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-32">
          <div className="lg:col-span-6">
            <Badge
              variant="outline"
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both h-8 gap-2 rounded-full border-primary/30 bg-background/70 px-3.5 text-xs backdrop-blur duration-700"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <MapPin aria-hidden="true" className="text-primary" />
              Kakinada, Andhra Pradesh
            </Badge>
            <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-6 delay-100 duration-1000">
              <Highlight text={hero.h1} match="Kakinada" underline />
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-7 max-w-xl text-lg text-muted-foreground delay-200 duration-1000 md:text-xl">
              {hero.intro}
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-9 flex flex-col gap-3 delay-300 duration-1000 sm:flex-row">
              <Magnetic>
                <Button asChild size="xl" className="group w-full sm:w-auto">
                  <Link href={hero.primaryCta.href}>
                    {hero.primaryCta.label}
                    <ArrowRight
                      data-icon="inline-end"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="xl" variant="outline" className="group bg-background/70 backdrop-blur">
                <TrackedLink href={hero.secondaryCta.href} event="click_to_call">
                  <Phone
                    data-icon="inline-start"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-rotate-12"
                  />
                  {hero.secondaryCta.label}
                </TrackedLink>
              </Button>
            </div>
            <ul className="animate-in fade-in fill-mode-both mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground delay-500 duration-1000">
              {why.items.map((item) => (
                <li key={item.h3} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                  {item.h3}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            <div
              className="bg-brand-gradient absolute -inset-6 -z-10 rounded-[2rem] opacity-25 blur-3xl"
              aria-hidden="true"
            />
            <div className="animate-in fade-in zoom-in-95 fill-mode-both delay-200 duration-1000">
              <Tilt className="rounded-3xl">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 shadow-foreground/20 ring-foreground/10">
                  <SiteImage
                    src={hero.image.src}
                    alt={hero.image.alt}
                    fileName={hero.image.fileName}
                    aspect="hero"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="rounded-none ring-0 transition-transform duration-1000 group-hover/tilt:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                    aria-hidden="true"
                  />
                  <Link
                    href="/projects"
                    className="group/cap absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-black/30 p-4 text-white backdrop-blur-md transition-colors hover:bg-black/45 md:inset-x-6 md:bottom-6 md:p-5"
                  >
                    <span>
                      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-primary uppercase">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        {hero.featured.label}
                      </span>
                      <span className="mt-1 block font-heading text-lg leading-tight font-bold md:text-xl">
                        {hero.featured.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-white/75">{hero.featured.meta}</span>
                    </span>
                    <span className="bg-brand-gradient flex size-10 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-transform duration-500 group-hover/cap:rotate-45">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </Tilt>
            </div>

            {/* Floating cards */}
            <div className="float-slow absolute -top-5 -left-3 z-20 hidden sm:block md:-left-8">
              <div className="animate-in fade-in slide-in-from-left-4 fill-mode-both flex items-center gap-3 rounded-2xl border bg-background/85 py-3 pr-5 pl-3 shadow-xl shadow-foreground/10 backdrop-blur-md delay-700 duration-1000">
                <span className="bg-brand-gradient flex size-10 items-center justify-center rounded-xl text-primary-foreground">
                  <Construction className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block text-xs text-muted-foreground">{whatWeDo.h2}</span>
                  <RotatingWords words={serviceNames} className="font-heading font-bold text-foreground" />
                </span>
              </div>
            </div>
            <div className="float-slower absolute -right-2 -bottom-7 z-20 hidden sm:block xl:-right-8">
              <div className="animate-in fade-in slide-in-from-right-4 fill-mode-both flex items-center gap-3 rounded-2xl border bg-background/85 py-3 pr-5 pl-4 shadow-xl shadow-foreground/10 backdrop-blur-md delay-1000 duration-1000">
                <span className="relative flex size-2.5" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block font-heading text-xl font-extrabold text-foreground">
                    {fleet.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{fleet.label}</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Numbers strip — <p>/<strong>, not headings */}
      <Container className="relative z-10 -mt-12 lg:-mt-16">
        <Reveal>
          <div className="dark border-beam relative isolate overflow-hidden rounded-3xl bg-background text-foreground shadow-2xl shadow-foreground/20">
            <div className="aurora -z-10 opacity-40" aria-hidden="true" />
            <div
              className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {numbers.map((item, i) => {
                const Icon = numberIcons[i];
                return (
                  <p
                    key={item.label}
                    className={cn(
                      "group/stat flex flex-col gap-3 px-6 py-7 transition-colors duration-500 hover:bg-white/[0.03] md:px-8 md:py-9",
                      i < 2 && "border-b lg:border-b-0",
                      i % 2 === 0 && "border-r",
                      i === 1 && "lg:border-r",
                    )}
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25 transition-transform duration-500 group-hover/stat:-rotate-6 group-hover/stat:scale-110">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <strong className="text-gradient font-heading text-4xl font-extrabold tracking-tight md:text-6xl">
                      <CountUp value={item.value} />
                    </strong>
                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                  </p>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>

      {/* What We Do */}
      <Section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Services"
            title={whatWeDo.h2}
            highlight="Do"
            description={whatWeDo.intro}
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="outline" size="xl" className="group">
              <Link href={whatWeDo.cta.href}>
                {whatWeDo.cta.label}
                <ArrowRight
                  data-icon="inline-end"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {whatWeDo.items.map((item, i) => {
            const Icon = serviceIcons[i];
            return (
              <StaggerItem
                key={item.h3}
                className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <Link href={`/services#${slugify(item.h3)}`} className="block h-full rounded-2xl">
                  <SpotlightCard className="h-full p-6 md:p-7">
                    <span
                      className="pointer-events-none absolute -right-2 -bottom-6 font-heading text-[7rem] leading-none font-extrabold text-primary/10"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-start justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-1 ring-primary/15">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover/spot:border-primary/50 group-hover/spot:bg-primary group-hover/spot:text-primary-foreground">
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/spot:translate-x-0.5 group-hover/spot:-translate-y-0.5" />
                      </span>
                    </div>
                    <h3 className="mt-10 transition-colors duration-300 group-hover/spot:text-primary">
                      {item.h3}
                    </h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.p}
                    </p>
                  </SpotlightCard>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Trusted By — text names until logo permission */}
      <section className="relative overflow-hidden border-y bg-surface py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Clients"
            title={trustedBy.h2}
            highlight="Leading Names"
            align="center"
          />
        </Container>
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-3">
          {[false, true].map((reverse) => (
            <Marquee key={String(reverse)} reverse={reverse} duration={reverse ? 44 : 38}>
              {(reverse ? [...trustedBy.names].reverse() : trustedBy.names).map((name) => (
                <li
                  key={name}
                  className="group/client flex shrink-0 items-center gap-3 rounded-full border bg-background px-6 py-3 font-heading text-base font-semibold whitespace-nowrap text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/50 hover:text-foreground md:text-lg"
                >
                  <span
                    className="size-2 rotate-45 rounded-[2px] bg-primary/40 transition-colors duration-300 group-hover/client:bg-primary"
                    aria-hidden="true"
                  />
                  {name}
                </li>
              ))}
            </Marquee>
          ))}
        </Reveal>
      </section>

      {/* Why Choose — dark band in both themes */}
      <section className="dark relative isolate overflow-hidden bg-background py-16 text-foreground md:py-24 lg:py-28">
        <div className="aurora -z-10 opacity-30" aria-hidden="true" />
        <div className="bg-grid mask-radial absolute inset-0 -z-10 opacity-30" aria-hidden="true" />
        <CursorGlow className="-z-10" size={640} />
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeading eyebrow="Why us" title={why.h2} highlight="Mythri Infra" />
                <Reveal delay={0.15} className="mt-8">
                  <Magnetic>
                    <Button asChild size="xl" className="group">
                      <Link href={closingCta.cta.href}>
                        {closingCta.cta.label}
                        <ArrowRight
                          data-icon="inline-end"
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </Button>
                  </Magnetic>
                </Reveal>
              </div>
            </div>
            <Stagger className="grid gap-4 lg:col-span-7">
              {why.items.map((item, i) => {
                const Icon = whyIcons[i];
                return (
                  <StaggerItem key={item.h3}>
                    <SpotlightCard className="flex items-start gap-5 bg-card/60 p-6 backdrop-blur md:p-8">
                      <span className="bg-brand-gradient flex size-14 shrink-0 items-center justify-center rounded-2xl text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 group-hover/spot:scale-110 group-hover/spot:-rotate-6">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3>{item.h3}</h3>
                          <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-2 text-muted-foreground">{item.p}</p>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <Section>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Projects" title={featuredProjects.h2} highlight="Projects" />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="outline" size="xl" className="group">
              <Link href={featuredProjects.cta.href}>
                {featuredProjects.cta.label}
                <ArrowRight
                  data-icon="inline-end"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-12">
          <FeaturedProjectsCarousel items={featuredProjects.items} />
        </Reveal>
      </Section>

      <ClosingCta
        h2={closingCta.h2}
        p={closingCta.p}
        cta={closingCta.cta}
        phone={{ display: siteConfig.phone.primaryDisplay, tel: siteConfig.phone.primaryTel }}
      />
    </>
  );
}
