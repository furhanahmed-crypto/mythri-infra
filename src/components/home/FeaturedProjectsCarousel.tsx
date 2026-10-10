"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/site/SiteImage";
import { cn } from "@/lib/utils";

type ProjectItem = {
  h3: string;
  p: string;
  image: { src: string; alt: string; fileName: string };
};

/**
 * Embla only enables `loop` when slide content is wide enough relative to the
 * viewport. One card + peek (~85–70%) keeps 3 items looping for both autoplay
 * and the Next / Prev buttons.
 */
export function FeaturedProjectsCarousel({ items }: { items: readonly ProjectItem[] }) {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const plugin = emblaApi.plugins()?.autoplay;
      if (!plugin) return;
      if (mq.matches) plugin.stop();
      else plugin.play();
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div className="relative">
      {/* Vertical padding keeps hover lift + shadow inside Embla's overflow clip */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y py-3 md:-ml-6 md:py-4">
          {items.map((item) => {
            const [client, year] = item.p.split(" · ");
            return (
              <div
                key={item.h3}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[75%] md:basis-[70%] md:pl-6 lg:basis-[55%]"
              >
                {/* Shadow on the outer shell so the link's overflow-hidden can't clip it */}
                <div className="h-full rounded-2xl shadow-sm transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-foreground/12">
                  <Link
                    href="/projects"
                    className="group/prj relative block h-full overflow-hidden rounded-2xl border bg-card"
                  >
                    <div className="relative overflow-hidden">
                      <SiteImage
                        src={item.image.src}
                        alt={item.image.alt}
                        fileName={item.image.fileName}
                        aspect="card"
                        className="rounded-none ring-0 transition-transform duration-700 group-hover/prj:scale-[1.04]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <Badge className="absolute top-4 left-4 border-white/20 bg-black/40 font-mono text-white backdrop-blur-md">
                        {year}
                      </Badge>
                      <span className="bg-brand-gradient absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full text-primary-foreground opacity-90 shadow-md transition-transform duration-300 group-hover/prj:scale-105">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <h3 className="transition-colors duration-300 group-hover/prj:text-primary-deep">
                        {item.h3}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        <span className="sr-only">{item.p}</span>
                        <span aria-hidden="true">{client}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Featured projects">
          {items.map((item, i) => (
            <button
              key={item.h3}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to ${item.h3}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selected === i
                  ? "w-8 bg-primary"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Previous project"
            onClick={scrollPrev}
            className="size-11 rounded-full"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Next project"
            onClick={scrollNext}
            className="size-11 rounded-full"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
