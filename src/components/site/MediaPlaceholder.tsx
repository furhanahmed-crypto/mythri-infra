import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  alt: string;
  fileName: string;
  className?: string;
  aspect?: "hero" | "card" | "square" | "wide" | "portrait";
};

const aspects = {
  hero: "aspect-[4/3] lg:aspect-[5/4]",
  card: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
};

/** Placeholder until client photos arrive — never stock imagery (RULES.md). */
export function MediaPlaceholder({
  alt,
  fileName,
  className,
  aspect = "card",
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "group/media relative isolate flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-muted text-center ring-1 ring-foreground/5",
        aspects[aspect],
        className,
      )}
    >
      <div className="bg-hatch absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/[0.06] to-transparent"
        aria-hidden="true"
      />
      <span className="flex size-10 items-center justify-center rounded-full bg-background/80 text-muted-foreground ring-1 ring-foreground/10 transition-transform duration-500 group-hover/media:scale-110">
        <Camera className="size-4" aria-hidden="true" />
      </span>
      <span className="max-w-[85%] font-mono text-[11px] text-muted-foreground md:text-xs">
        {fileName}
      </span>
      <span className="max-w-[80%] text-xs leading-snug text-muted-foreground/80 md:text-sm">
        {alt}
      </span>
    </div>
  );
}
