import { cn } from "@/lib/utils";

/**
 * Interim wordmark that adapts to light/dark. Replace with the client's
 * final `mythri-infra-logo.svg` once delivered (TASKS.md Phase 4).
 */
export function Logo({
  className,
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="bg-brand-gradient relative flex size-8 items-end justify-center gap-[3px] overflow-hidden rounded-lg p-1.5 shadow-md shadow-primary/30 transition-transform duration-500 group-hover/logo:-rotate-6"
      >
        <span className="h-2 w-1 rounded-[1px] bg-primary-foreground/90 transition-[height] duration-300 group-hover/logo:h-4" />
        <span className="h-3.5 w-1 rounded-[1px] bg-primary-foreground/90 transition-[height] delay-75 duration-300 group-hover/logo:h-2.5" />
        <span className="h-5 w-1 rounded-[1px] bg-primary-foreground/90 transition-[height] delay-150 duration-300 group-hover/logo:h-3.5" />
      </span>
      <span
        className={cn(
          "font-heading text-[1.15rem] leading-none font-extrabold tracking-tight",
          inverse ? "text-inverse-foreground" : "text-foreground",
        )}
      >
        Mythri{" "}
        <span
          className={cn(
            "font-semibold",
            inverse ? "text-inverse-foreground/60" : "text-muted-foreground",
          )}
        >
          Infra
        </span>
      </span>
    </span>
  );
}
