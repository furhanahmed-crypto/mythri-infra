import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { TrackedLink } from "@/components/site/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { Magnetic } from "@/components/motion/Magnetic";
import { siteConfig } from "@/lib/site";

export function ClosingCta({
  h2,
  p,
  cta,
  phone = { display: siteConfig.phone.primaryDisplay, tel: siteConfig.phone.primaryTel },
}: {
  h2: string;
  p?: string;
  cta: { label: string; href: string };
  phone?: { display: string; tel: string };
}) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="dark border-beam relative isolate overflow-hidden rounded-[2rem] bg-background px-6 py-14 text-foreground shadow-2xl shadow-foreground/25 md:px-14 md:py-20">
            <div className="aurora -z-10 opacity-50" aria-hidden="true" />
            <div className="bg-grid mask-radial absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
            <CursorGlow className="-z-10" />
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2>{h2}</h2>
                {p ? <p className="mt-4 max-w-xl text-lg text-muted-foreground">{p}</p> : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
                <Magnetic className="lg:w-full">
                  <Button asChild size="xl" className="group w-full">
                    <Link href={cta.href}>
                      {cta.label}
                      <ArrowRight
                        data-icon="inline-end"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="xl" variant="outline" className="group bg-transparent">
                  <TrackedLink href={`tel:${phone.tel}`} event="click_to_call">
                    <Phone
                      data-icon="inline-start"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-rotate-12"
                    />
                    {phone.display}
                  </TrackedLink>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
