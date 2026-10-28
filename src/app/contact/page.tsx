import { Building2, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { contactContent } from "@/content/contact";
import { siteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";
import { generalContractorSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { TrackedLink } from "@/components/site/TrackedLink";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = buildPageMetadata({
  ...contactContent.seo,
  path: "/contact",
});

const telLink = "font-semibold text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline";

export default function ContactPage() {
  const { header, details, form, map } = contactContent;
  const { phone, email, addresses } = siteConfig;

  return (
    <>
      <JsonLd data={generalContractorSchema()} />

      <PageHeader crumb="Contact" h1={header.h1} intro={header.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <TrackedLink href={`tel:${phone.primaryTel}`} event="click_to_call">
              <Phone data-icon="inline-start" aria-hidden="true" />
              Call {phone.primaryDisplay}
            </TrackedLink>
          </Button>
          <Button asChild size="xl" variant="outline">
            <TrackedLink href={siteConfig.whatsappUrl} event="whatsapp_click" external>
              <MessageCircle data-icon="inline-start" aria-hidden="true" />
              WhatsApp Us
            </TrackedLink>
          </Button>
        </div>
      </PageHeader>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Contact details */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2>{details.h2}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4">
              <StaggerItem>
                <Card className="flex-row gap-4 p-5">
                  <IconTile icon={Building2} />
                  <div>
                    <h3 className="text-base!">Head Office</h3>
                    <address className="mt-1 text-sm leading-relaxed text-muted-foreground not-italic">
                      {addresses.head.lines.join(", ")}
                    </address>
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="flex-row gap-4 p-5">
                  <IconTile icon={MapPin} />
                  <div>
                    <h3 className="text-base!">Branch Office</h3>
                    <address className="mt-1 text-sm leading-relaxed text-muted-foreground not-italic">
                      {addresses.branch.lines.join(", ")}
                    </address>
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="flex-row gap-4 p-5">
                  <IconTile icon={Phone} />
                  <div className="min-w-0">
                    <h3 className="text-base!">Phone</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <TrackedLink href={`tel:${phone.primaryTel}`} event="click_to_call" className={telLink}>
                        {phone.primaryDisplay}
                      </TrackedLink>
                    </p>
                  </div>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="flex-row gap-4 p-5">
                  <IconTile icon={Mail} />
                  <div className="min-w-0">
                    <h3 className="text-base!">Email</h3>
                    <p className="mt-1 flex flex-wrap gap-x-2 text-sm text-muted-foreground">
                      <a href={`mailto:${email.primary}`} className={telLink}>
                        {email.primary}
                      </a>
                      <span aria-hidden="true">·</span>
                      <a href={`mailto:${email.secondary}`} className={telLink}>
                        {email.secondary}
                      </a>
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            </Stagger>
          </div>

          {/* Enquiry form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <Card className="relative overflow-hidden py-0 shadow-xl shadow-foreground/5">
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" aria-hidden="true" />
              <CardContent className="p-6 md:p-10">
                <h2 className="mb-8">{form.h2}</h2>
                <EnquiryForm />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <Section surface>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2>{map.h2}</h2>
            <p className="mt-3 text-muted-foreground">
              {addresses.head.label}: {addresses.head.lines.join(", ")}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <a href={addresses.head.mapsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation data-icon="inline-start" aria-hidden="true" />
                Get Directions
              </a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <TrackedLink href={siteConfig.whatsappUrl} event="whatsapp_click" external>
                <MessageCircle data-icon="inline-start" aria-hidden="true" />
                WhatsApp Us
              </TrackedLink>
            </Button>
          </Reveal>
        </div>
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-2xl border shadow-sm">
            <iframe
              title="Mythri Infra Head Office, Turangi, Kakinada"
              src={addresses.head.mapsEmbedUrl}
              className="h-80 w-full border-0 md:h-[28rem] dark:opacity-90 dark:[filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}

function IconTile({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground" aria-hidden="true">
      <Icon className="size-5" />
    </span>
  );
}
