import { servicesContent } from "@/content/services";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchemas } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ClosingCta } from "@/components/sections/ClosingCta";

export const metadata = buildPageMetadata({
  ...servicesContent.seo,
  path: "/services",
});

export default function ServicesPage() {
  const { header, services, cta } = servicesContent;

  return (
    <>
      <JsonLd
        data={[
          ...serviceSchemas(
            services.map((service) => ({
              name: service.h2,
              description: service.paragraphs[0],
            })),
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <PageHeader h1={header.h1} intro={header.intro} image={header.image} />

      {services.map((service, index) => (
        <Section key={service.h2} surface={index % 2 === 1}>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <MediaPlaceholder
              alt={service.image.alt}
              fileName={service.image.fileName}
              aspect="wide"
            />
            <div>
              <h2>{service.h2}</h2>
              <div className="mt-4 space-y-4 text-text-muted">
                {service.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>
      ))}

      <ClosingCta h2={cta.h2} p={cta.p} cta={cta.button} />
    </>
  );
}
