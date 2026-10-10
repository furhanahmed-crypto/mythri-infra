import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  children,
  className,
  containerClassName,
  surface = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  surface?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 md:py-24 lg:py-28",
        surface && "bg-surface",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
