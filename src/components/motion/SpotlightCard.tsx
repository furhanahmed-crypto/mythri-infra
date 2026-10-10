import { cn } from "@/lib/utils";

/**
 * Card with a soft amber wash centred by default. Hover is restrained:
 * slight lift, stronger border, a touch more glow — no cursor chasing.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/spot relative isolate rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:shadow-primary/15",
        className,
      )}
    >
      {/* `isolate` keeps this wash above the card fill (without it, -z-10 falls behind the page). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
      >
        <div
          className="absolute top-1/2 left-1/2 aspect-square w-[min(140%,22rem)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out group-hover/spot:scale-105"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 20%, transparent), transparent 68%)",
          }}
        />
      </div>
      <div
        aria-hidden="true"
        className="mask-ring pointer-events-none absolute inset-0 rounded-[inherit] opacity-40 transition-opacity duration-300 group-hover/spot:opacity-90"
        style={{
          background:
            "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 50%, transparent), transparent 72%)",
        }}
      />
      {children}
    </div>
  );
}
