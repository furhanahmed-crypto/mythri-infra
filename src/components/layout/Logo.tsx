import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand mark + wordmark from the client logo.
 * `onDark` — mark on the dark band with light wordmark (no white plate).
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
      <Image
        src="/images/brand/mythri-infra-mark.webp"
        alt=""
        width={160}
        height={120}
        priority={!onDark}
        className={cn(
          "h-9 w-auto transition-transform duration-500 group-hover/logo:-rotate-3 md:h-10",
          onDark && "rounded-sm bg-white/95 p-1 shadow-sm",
        )}
        aria-hidden="true"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.05rem] font-extrabold tracking-[0.04em] uppercase md:text-[1.15rem]",
            onDark ? "text-white" : "text-foreground",
          )}
        >
          Mythri
        </span>
        <span
          className={cn(
            "mt-0.5 flex items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.28em] uppercase",
            onDark ? "text-white/65" : "text-muted-foreground",
          )}
        >
          <span
            className={cn("h-px w-2.5", onDark ? "bg-white/40" : "bg-muted-foreground/50")}
            aria-hidden="true"
          />
          Infra
          <span
            className={cn("h-px w-2.5", onDark ? "bg-white/40" : "bg-muted-foreground/50")}
            aria-hidden="true"
          />
        </span>
      </span>
      <span className="sr-only">Mythri Infra</span>
    </span>
  );
}
