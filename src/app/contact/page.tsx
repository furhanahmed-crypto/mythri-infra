import { contactContent } from "@/content/contact";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";
import { generalContractorSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = buildPageMetadata({
  ...contactContent.seo,
  path: "/contact",
});

export default function ContactPage() {
  const { header, details, form, map } = contactContent;

  return (
    <>
      <JsonLd data={generalContractorSchema()} />

      <PageHeader h1={header.h1} intro={header.intro} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <h2>{details.h2}</h2>

            <div>
              <h3>Head Office</h3>
              <address className="mt-2 not-italic text-text-muted">
                {siteConfig.addresses.head.lines.join(", ")}
              </address>
            </div>

            <div>
              <h3>Branch Office</h3>
              <address className="mt-2 not-italic text-text-muted">
                {siteConfig.addresses.branch.lines.join(", ")}
              </address>
            </div>

            <div>
              <h3>Phone</h3>
              <p className="mt-2 space-y-1 text-text-muted">
                <span className="block">
                  Mr. D. Raja Gopal Raju (Managing Partner):{" "}
                  <TrackedLink
                    href={`tel:${siteConfig.phone.primaryTel}`}
                    event="click_to_call"
                    className="font-medium text-text hover:text-accent"
                  >
                    {siteConfig.phone.primaryDisplay}
                  </TrackedLink>
                  {" · "}
                  <TrackedLink
                    href={`tel:${siteConfig.phone.secondaryTel}`}
                    event="click_to_call"
                    className="font-medium text-text hover:text-accent"
                  >
                    {siteConfig.phone.secondaryDisplay}
                  </TrackedLink>
                </span>
                <span className="block">
                  Mr. D. Murali Mohan Varma (Partner):{" "}
                  <TrackedLink
                    href={`tel:${siteConfig.phone.partnerMuraliTel}`}
                    event="click_to_call"
                    className="font-medium text-text hover:text-accent"
                  >
                    {siteConfig.phone.partnerMuraliDisplay}
                  </TrackedLink>
                </span>
                <span className="block">
                  Office:{" "}
                  <TrackedLink
                    href={`tel:${siteConfig.phone.officeTel}`}
                    event="click_to_call"
                    className="font-medium text-text hover:text-accent"
                  >
                    {siteConfig.phone.officeDisplay}
                  </TrackedLink>
                </span>
              </p>
            </div>

            <div>
              <h3>Email</h3>
              <p className="mt-2 text-text-muted">
                <a
                  href={`mailto:${siteConfig.email.primary}`}
                  className="font-medium text-text hover:text-accent"
                >
                  {siteConfig.email.primary}
                </a>
                {" · "}
                <a
                  href={`mailto:${siteConfig.email.secondary}`}
                  className="font-medium text-text hover:text-accent"
                >
                  {siteConfig.email.secondary}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6">{form.h2}</h2>
            <EnquiryForm />
          </div>
        </div>
      </Section>

      <Section surface>
        <h2>{map.h2}</h2>
        <div className="mt-6 overflow-hidden rounded-[5px] border border-border">
          <iframe
            title="Mythri Infra Head Office, Turangi, Kakinada"
            src={siteConfig.addresses.head.mapsEmbedUrl}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={siteConfig.addresses.head.mapsUrl} external>
            Get Directions
          </ButtonLink>
          <TrackedLink
            href={siteConfig.whatsappUrl}
            event="whatsapp_click"
            external
            className="inline-flex min-h-11 items-center justify-center rounded-[5px] border border-text px-5 py-3 text-[0.9375rem] font-semibold transition-colors hover:border-accent hover:bg-accent/10"
          >
            WhatsApp Us
          </TrackedLink>
        </div>
      </Section>
    </>
  );
}
