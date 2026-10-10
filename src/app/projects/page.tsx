import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsContent } from "@/content/projects";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, projectItemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

export const metadata = buildPageMetadata({
  ...projectsContent.seo,
  path: "/projects",
});

export default function ProjectsPage() {
  const { header, filters, featured, firmProjects, teamExperience, cta } = projectsContent;

  return (
    <>
      <JsonLd
        data={[
          projectItemListSchema(
            featured.items.map((item) => ({ name: item.h3, description: item.p })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />

      <PageHeader crumb="Projects" h1={header.h1} intro={header.intro} image={header.image} />

      <Section>
        <ProjectFilters
          filters={filters}
          featuredH2={featured.h2}
          featuredItems={featured.items}
          tableH2={firmProjects.h2}
          tableRows={firmProjects.rows}
        />
      </Section>

      {/* Pre-2016 works are team experience, not firm projects */}
      <Section surface>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="Team experience"
                title={teamExperience.h2}
                description={teamExperience.intro}
              />
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

          <div className="relative lg:col-span-8">
            <span
              className="absolute top-2 bottom-2 left-[5.25rem] w-px bg-border sm:left-[6.25rem]"
              aria-hidden="true"
            />
          <Stagger as="ol" stagger={0.06}>
            {teamExperience.rows.map((row) => (
              <StaggerItem
                as="li"
                key={`${row.year}-${row.project}`}
                className="relative grid grid-cols-[4.5rem_1fr] gap-6 py-4 sm:grid-cols-[5.5rem_1fr]"
              >
                <span className="pt-0.5 text-right font-mono text-sm font-semibold text-muted-foreground">
                  {row.year}
                </span>
                <span
                  className="absolute top-[1.4rem] left-[5.25rem] size-2.5 -translate-x-1/2 rounded-full border-2 border-surface bg-primary sm:left-[6.25rem]"
                  aria-hidden="true"
                />
                <div className="pl-2">
                  <p className="font-semibold text-foreground">{row.project}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {row.location} · {row.client}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          </div>
        </div>
      </Section>
    </>
  );
}
