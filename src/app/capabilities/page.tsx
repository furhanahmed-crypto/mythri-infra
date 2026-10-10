import Image from "next/image";
import { capabilitiesContent } from "@/content/capabilities";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = buildPageMetadata({
  ...capabilitiesContent.seo,
  path: "/capabilities",
});

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

      <PageHeader h1={header.h1} intro={header.intro} image={header.image} />

      <Section>
        <h2>{fleet.h2}</h2>
        <p className="mt-3 max-w-3xl text-text-muted">{fleet.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.items.map((item) => (
            <article
              key={item.h3}
              className="overflow-hidden rounded-[5px] border border-border"
            >
              <MediaPlaceholder
                alt={item.image.alt}
                fileName={item.image.fileName}
                aspect="card"
              />
              <div className="p-4">
                <h3>{item.h3}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section surface>
        <h2>{team.h2}</h2>
        <p className="mt-3 max-w-3xl text-text-muted">{team.p}</p>
        <div className="mt-8 overflow-hidden rounded-[5px] border border-border bg-bg">
          <Image
            src={team.diagram.src}
            alt={team.diagram.alt}
            width={720}
            height={320}
            className="h-auto w-full"
          />
        </div>
      </Section>

      <Section>
        <h2>{process.h2}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {process.steps.map((step) => (
            <li key={step.h3}>
              <h3>{step.h3}</h3>
              <p className="mt-2 text-text-muted">{step.p}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
