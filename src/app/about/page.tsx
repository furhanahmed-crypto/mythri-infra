import { aboutContent } from "@/content/about";
import { buildPageMetadata } from "@/lib/metadata";
import { organizationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = buildPageMetadata({
  ...aboutContent.seo,
  path: "/about",
});

export default function AboutPage() {
  const {
    header,
    story,
    approach,
    leadership,
    values,
    people,
    registered,
    cta,
  } = aboutContent;

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

      <PageHeader h1={header.h1} intro={header.intro} image={header.image} />

      <Section>
        <h2>{story.h2}</h2>
        <div className="mt-4 max-w-3xl space-y-4 text-text-muted">
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section surface>
        <h2>{approach.h2}</h2>
        <p className="mt-4 max-w-3xl text-text-muted">{approach.p}</p>
      </Section>

      <Section>
        <h2>{leadership.h2}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {leadership.partners.map((partner) => (
            <article key={partner.h3} className="space-y-3">
              <MediaPlaceholder
                alt={partner.image.alt}
                fileName={partner.image.fileName}
                aspect="square"
                className="max-w-sm"
              />
              <h3>{partner.h3}</h3>
              <p className="text-text-muted">{partner.role}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface>
        <h2>{values.h2}</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {values.items.map((item) => (
            <article key={item.h3}>
              <h3>{item.h3}</h3>
              <p className="mt-2 text-text-muted">{item.p}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <h2>{people.h2}</h2>
        <p className="mt-3 text-text-muted">{people.intro}</p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-text-muted">
          {people.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-text-muted">{registered}</p>
        <div className="mt-8">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
