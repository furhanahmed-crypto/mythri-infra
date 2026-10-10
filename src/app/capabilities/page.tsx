import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilitiesContent } from "@/content/capabilities";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteImage } from "@/components/site/SiteImage";
import { ProcessTimeline } from "@/components/capabilities/ProcessTimeline";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export const metadata = buildPageMetadata({
  ...capabilitiesContent.seo,
  path: "/capabilities",
});

function splitFleet(h3: string) {
  const [name, count] = h3.split(" — ");
  return { name, count };
}

export default function CapabilitiesPage() {
  const { header, fleet, team, process, cta } = capabilitiesContent;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Capabilities", path: "/capabilities" },
        ])}
      />

      <PageHeader crumb="Capabilities" h1={header.h1} intro={header.intro} image={header.image} />

      {/* Fleet */}
      <Section>
        <SectionHeading
          eyebrow="Owned fleet"
          title={fleet.h2}
          highlight="Fleet"
          description={fleet.intro}
        />
        <Stagger stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.items.map((item) => {
            const { name, count } = splitFleet(item.h3);
            return (
              <StaggerItem key={item.h3}>
                <SpotlightCard className="h-full">
                  <div className="relative overflow-hidden">
                    <SiteImage
                      src={item.image.src}
                      alt={item.image.alt}
                      fileName={item.image.fileName}
                      className="rounded-none ring-0 transition-transform duration-1000 group-hover/spot:scale-[1.08]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="flex items-center justify-between gap-4">
                      <span>{name}</span>
                      <span className="sr-only"> — </span>
                      <span className="flex min-w-12 items-center justify-center rounded-xl bg-accent px-2.5 py-1 font-heading text-lg font-bold text-accent-foreground tabular-nums transition-all duration-500 group-hover/spot:bg-primary group-hover/spot:text-primary-foreground group-hover/spot:shadow-lg group-hover/spot:shadow-primary/40">
                        {count}
                      </span>
                    </h3>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Team */}
      <Section surface>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="People" title={team.h2} description={team.p} />
          </div>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <figure
              role="img"
              aria-label={team.diagram.alt}
              className="rounded-2xl border bg-background p-6 md:p-10"
            >
              <div aria-hidden="true" className="flex flex-col items-center gap-0 text-center">
                <div className="rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-background">
                  Managing Partner
                  <span className="block text-xs font-medium opacity-70">Head Office</span>
                </div>
                <span className="h-8 w-px bg-border" />
                <div className="relative grid w-full max-w-md grid-cols-2 gap-4 before:absolute before:top-0 before:right-1/4 before:left-1/4 before:h-px before:bg-border">
                  {["Project Manager", "Project Accountant"].map((role) => (
                    <div key={role} className="flex flex-col items-center">
                      <span className="h-5 w-px bg-border" />
                      <div className="w-full rounded-xl bg-primary px-3 py-3 text-sm font-bold text-primary-foreground">
                        {role}
                        <span className="block text-xs font-medium opacity-70">Site</span>
                      </div>
                      <span className="h-6 w-px bg-border" />
                      <div className="w-full rounded-xl border bg-card px-3 py-3 text-xs font-medium text-muted-foreground md:text-sm">
                        {role === "Project Manager"
                          ? "Construction team & workmen"
                          : "Accounts, stores & admin"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow="Process" title={process.h2} highlight="Work" />
              <Reveal delay={0.15} className="mt-8">
                <Button asChild size="xl" className="group">
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
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessTimeline steps={process.steps} />
          </div>
        </div>
      </Section>
    </>
  );
}
