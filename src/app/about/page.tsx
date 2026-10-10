import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Handshake,
  ShieldCheck,
  User,
  BadgeCheck,
} from "lucide-react";
import { aboutContent } from "@/content/about";
import { buildPageMetadata } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteImage } from "@/components/site/SiteImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export const metadata = buildPageMetadata({
  ...aboutContent.seo,
  path: "/about",
});

const valueIcons = [CalendarCheck, BadgeCheck, ShieldCheck, Handshake];

export default function AboutPage() {
  const { header, story, approach, leadership, values, people, registered, cta } =
    aboutContent;

  return (
    <>
      <JsonLd
        data={{
          ...organizationSchema(),
          founder: leadership.partners.map((partner) => ({
            "@type": "Person",
            name: partner.h3.replace(/^Mr\.\s/, ""),
            jobTitle: partner.role,
          })),
        }}
      />

      <PageHeader crumb="About" h1={header.h1} intro={header.intro} image={header.image} />

      {/* Story */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="Story" title={story.h2} />
            </div>
          </div>
          <Stagger className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-8">
            {story.paragraphs.map((paragraph) => (
              <StaggerItem as="p" key={paragraph.slice(0, 32)}>
                {paragraph}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* Approach */}
      <Section surface>
        <Reveal>
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {approach.h2}
            </h2>
            <p className="mt-6 text-2xl leading-snug font-semibold tracking-tight text-foreground md:text-3xl">
              <span className="text-primary" aria-hidden="true">
                “
              </span>
              {approach.p}
              <span className="text-primary" aria-hidden="true">
                ”
              </span>
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Leadership */}
      <Section>
        <SectionHeading eyebrow="Partners" title={leadership.h2} />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {leadership.partners.map((partner) => (
            <StaggerItem key={partner.h3}>
              <Card className="h-full flex-col gap-0 py-0 sm:flex-row">
                <SiteImage
                  src={partner.image.src}
                  alt={partner.image.alt}
                  fileName={partner.image.fileName}
                  aspect="portrait"
                  className="rounded-none ring-0 sm:w-56 sm:shrink-0"
                />
                <CardContent className="flex flex-col justify-center gap-2 p-6 md:p-8">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <User className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2">{partner.h3}</h3>
                  <p className="font-medium text-primary">{partner.role}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Values */}
      <Section surface>
        <SectionHeading eyebrow="Values" title={values.h2} highlight="Stand For" />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.items.map((item, i) => {
            const Icon = valueIcons[i];
            return (
              <StaggerItem key={item.h3}>
                <SpotlightCard className="h-full p-6">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground ring-1 ring-primary/15 transition-all duration-500 group-hover/spot:-rotate-6 group-hover/spot:scale-110 group-hover/spot:bg-primary group-hover/spot:text-primary-foreground group-hover/spot:shadow-lg group-hover/spot:shadow-primary/40">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6">{item.h3}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.p}</p>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* People & compliance */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Compliance"
              title={people.h2}
              highlight="Fully Protected"
              description={people.intro}
            />
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Card className="p-6 md:p-8">
              <ul className="grid gap-4 sm:grid-cols-2">
                {people.list.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border bg-surface p-6 md:flex-row md:items-center md:p-8">
          <p className="text-sm text-muted-foreground md:text-base">{registered}</p>
          <Button asChild size="xl" className="group shrink-0">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight
                data-icon="inline-end"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
