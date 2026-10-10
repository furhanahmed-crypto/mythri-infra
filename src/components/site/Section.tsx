import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  children,
  className,
  surface = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  surface?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-24",
        surface && "bg-surface",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
