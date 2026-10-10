import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { Highlight } from "./Highlight";

/**
 * Eyebrow is a short UI label (not marketing copy). The H2 and description
 * must come verbatim from the handover; `highlight` only restyles a phrase.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] text-foreground/80 uppercase">
          <span className="relative flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 [animation-duration:2.4s]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl">
        <Highlight text={title} match={highlight} />
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base text-muted-foreground md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
