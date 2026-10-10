import { cn } from "@/lib/cn";

type MediaPlaceholderProps = {
  alt: string;
  fileName: string;
  className?: string;
  aspect?: "hero" | "card" | "square" | "wide";
};

const aspects = {
  hero: "aspect-[16/10] md:aspect-[21/9]",
  card: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

/** Neutral placeholder until client photos arrive — DESIGN.md / RULES.md */
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
        "flex w-full flex-col items-center justify-center gap-2 bg-[#E8EAED] text-center text-text-muted",
        aspects[aspect],
        className,
      )}
    >
      <span className="max-w-[90%] px-3 font-mono text-xs md:text-sm">{fileName}</span>
      <span className="max-w-md px-4 text-sm leading-snug">{alt}</span>
    </div>
  );
}
