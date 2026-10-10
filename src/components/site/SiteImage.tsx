import Image from "next/image";
import { cn } from "@/lib/utils";

type Aspect = "hero" | "card" | "square" | "wide" | "portrait";

const aspects: Record<Aspect, string> = {
  hero: "aspect-[4/3] lg:aspect-[5/4]",
  card: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
  portrait: "aspect-[4/5]",
};

type SiteImageProps = {
  src: string;
  alt: string;
  /** Kept for content audit / filename convention; rendered asset is `src`. */
  fileName: string;
  className?: string;
  aspect?: Aspect | null;
  priority?: boolean;
  sizes?: string;
};

/** Renders a local image from `/public/images`. */
export function SiteImage({
  src,
  alt,
  className,
  aspect = "card",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px",
}: SiteImageProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/5",
        aspect ? aspects[aspect] : null,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
