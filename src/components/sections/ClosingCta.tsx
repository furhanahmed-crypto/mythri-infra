import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function ClosingCta({
  h2,
  p,
  cta,
}: {
  h2: string;
  p?: string;
  cta: { label: string; href: string };
}) {
  return (
    <Section surface>
      <div className="max-w-2xl">
        <h2>{h2}</h2>
        {p ? <p className="mt-3 text-text-muted">{p}</p> : null}
        <div className="mt-6">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
