import { projectsContent } from "@/content/projects";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, projectItemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = buildPageMetadata({
  ...projectsContent.seo,
  path: "/projects",
});

export default function ProjectsPage() {
  const { header, filters, featured, firmProjects, teamExperience, cta } =
    projectsContent;

  return (
    <>
      <JsonLd
        data={[
          projectItemListSchema(
            featured.items.map((item) => ({
              name: item.h3,
              description: item.p,
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />

      <PageHeader h1={header.h1} intro={header.intro} image={header.image} />

      <Section>
        <ProjectFilters
          filters={filters}
          featuredH2={featured.h2}
          featuredItems={featured.items}
          tableH2={firmProjects.h2}
          tableRows={firmProjects.rows}
        />
      </Section>

      <Section surface>
        <h2>{teamExperience.h2}</h2>
        <p className="mt-3 max-w-3xl text-text-muted">{teamExperience.intro}</p>
        <div className="mt-6 overflow-x-auto rounded-[5px] border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-bg text-text">
              <tr>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Client / Main contractor</th>
              </tr>
            </thead>
            <tbody>
              {teamExperience.rows.map((row) => (
                <tr key={`${row.year}-${row.project}`} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3 align-top font-medium">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 align-top">{row.project}</td>
                  <td className="px-4 py-3 align-top">{row.location}</td>
                  <td className="px-4 py-3 align-top">{row.client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
