import { cn } from "@/lib/utils";

/**
 * Infinite horizontal scroller (CSS only). The second track is a visual
 * duplicate and hidden from assistive tech. Pauses on hover.
 */
export function Marquee({
  children,
  reverse = false,
  duration = 36,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("marquee", reverse && "marquee-reverse", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <ul className="marquee-track">{children}</ul>
      <ul className="marquee-track" aria-hidden="true">
        {children}
      </ul>
    </div>
  );
}
