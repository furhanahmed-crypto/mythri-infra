import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-20 md:py-28">
      <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
        404
      </p>
      <h1>Page not found</h1>
      <p className="max-w-xl text-text-muted">
        The page you are looking for does not exist or may have moved. Head back
        home or contact Mythri Infra for your next earthwork project.
      </p>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact Us
        </ButtonLink>
      </div>
    </Container>
  );
}
