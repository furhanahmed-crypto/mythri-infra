import { Droplets, Mountain, Route, Shovel, Waves } from "lucide-react";
import { servicesContent } from "@/content/services";
import { buildPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchemas } from "@/lib/schema";
import { slugify } from "@/lib/slug";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { SiteImage } from "@/components/site/SiteImage";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = buildPageMetadata({
  ...servicesContent.seo,
  path: "/services",
});

const icons = [Shovel, Route, Droplets, Waves, Mountain];

function splitLabel(text: string) {
  const idx = text.indexOf(":");
  if (idx === -1) return null;
  return { label: text.slice(0, idx + 1), rest: text.slice(idx + 1) };
}

export default function ServicesPage() {
  const { header, services, cta } = servicesContent;
  const index = services.map((s) => ({ id: slugify(s.h2), label: s.h2 }));

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

      <PageHeader crumb="Services" h1={header.h1} intro={header.intro} image={header.image} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <ServiceIndex items={index} />
          </aside>

          <div className="space-y-20 md:space-y-28 lg:col-span-9">
            {services.map((service, i) => {
              const Icon = icons[i];
              const [lead, recent] = service.paragraphs;
              const recentParts = splitLabel(recent);
              return (
                <article
                  key={service.h2}
                  id={index[i].id}
                  className="scroll-mt-28"
                >
                  <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
                    <Reveal className={i % 2 === 1 ? "md:order-2" : undefined}>
                      <SiteImage
                        src={service.image.src}
                        alt={service.image.alt}
                        fileName={service.image.fileName}
                        aspect="card"
                        className="rounded-2xl"
                      />
                    </Reveal>
                    <Reveal delay={0.08}>
                      <div className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">
                          {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="mt-6">{service.h2}</h2>
                      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{lead}</p>
                      <div className="mt-6 rounded-xl border-l-2 border-primary bg-surface px-5 py-4">
                        <p className="text-sm leading-relaxed">
                          {recentParts ? (
                            <>
                              <span className="font-semibold text-foreground">
                                {recentParts.label}
                              </span>
                              <span className="text-muted-foreground">{recentParts.rest}</span>
                            </>
                          ) : (
                            recent
                          )}
                        </p>
                      </div>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      <ClosingCta h2={cta.h2} p={cta.p} cta={cta.button} />
    </>
  );
}
