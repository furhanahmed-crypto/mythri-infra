import { homeContent } from "@/content/home";
import { buildPageMetadata } from "@/lib/metadata";
import { generalContractorSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { Container } from "@/components/ui/Container";

export const metadata = buildPageMetadata({
  ...homeContent.seo,
  path: "/",
});

export default function HomePage() {
  const { hero, numbers, whatWeDo, trustedBy, why, featuredProjects, closingCta } =
    homeContent;

  return (
    <>
      <JsonLd data={generalContractorSchema()} />

      <section className="relative">
        <MediaPlaceholder
          alt={hero.image.alt}
          fileName={hero.image.fileName}
          aspect="hero"
        />
        <Container className="py-10 md:py-14">
          <h1 className="max-w-4xl">{hero.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">{hero.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </ButtonLink>
            <TrackedLink
              href={hero.secondaryCta.href}
              event="click_to_call"
              className="inline-flex min-h-11 items-center justify-center rounded-[5px] border border-text px-5 py-3 text-[0.9375rem] font-semibold transition-colors hover:border-accent hover:bg-accent/10"
            >
              {hero.secondaryCta.label}
            </TrackedLink>
          </div>
        </Container>
      </section>

      <Section surface className="!py-10 md:!py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {numbers.map((item) => (
            <p key={item.label} className="text-center lg:text-left">
              <strong className="block text-3xl font-bold md:text-4xl">
                {item.value}
              </strong>
              <span className="mt-1 block text-sm font-medium text-text-muted">
                {item.label}
              </span>
            </p>
          ))}
        </div>
      </Section>

      <Section>
        <h2>{whatWeDo.h2}</h2>
        <p className="mt-3 max-w-2xl text-text-muted">{whatWeDo.intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.items.map((item) => (
            <article
              key={item.h3}
              className="rounded-[5px] border border-border p-5"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-[5px] bg-accent/20"
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
              </div>
              <h3>{item.h3}</h3>
              <p className="mt-2 text-sm text-text-muted">{item.p}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={whatWeDo.cta.href} variant="secondary">
            {whatWeDo.cta.label}
          </ButtonLink>
        </div>
      </Section>

      <Section surface>
        <h2>{trustedBy.h2}</h2>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-text-muted grayscale">
          {trustedBy.names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2>{why.h2}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {why.items.map((item) => (
            <article key={item.h3}>
              <h3>{item.h3}</h3>
              <p className="mt-2 text-text-muted">{item.p}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section surface>
        <h2>{featuredProjects.h2}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {featuredProjects.items.map((item) => (
            <article key={item.h3} className="space-y-3">
              <MediaPlaceholder
                alt={item.image.alt}
                fileName={item.image.fileName}
                aspect="card"
              />
              <h3>{item.h3}</h3>
              <p className="text-sm text-text-muted">{item.p}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={featuredProjects.cta.href} variant="secondary">
            {featuredProjects.cta.label}
          </ButtonLink>
        </div>
      </Section>

      <ClosingCta
        h2={closingCta.h2}
        p={closingCta.p}
        cta={closingCta.cta}
      />
    </>
  );
}
