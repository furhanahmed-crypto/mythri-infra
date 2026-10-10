import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SiteImage } from "./SiteImage";
import { Container } from "./Container";
import { Reveal } from "@/components/motion/Reveal";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";

type ImageMeta = {
  src: string;
  alt: string;
  fileName: string;
};

export function PageHeader({
  h1,
  intro,
  image,
  crumb,
  children,
}: {
  h1: string;
  intro: string;
  image?: ImageMeta;
  crumb: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b">
      <div className="aurora -z-20 opacity-40" aria-hidden="true" />
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <CursorGlow className="-z-10" />
      <Container className="pt-10 pb-12 md:pt-16 md:pb-16">
        <nav aria-label="Breadcrumb" className="animate-in fade-in duration-700">
          <ol className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-foreground">
              {crumb}
            </li>
          </ol>
        </nav>
        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
              {h1}
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-5 max-w-2xl text-lg text-muted-foreground delay-150 duration-700 md:text-xl">
              {intro}
            </p>
            {children ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-8 delay-300 duration-700">
                {children}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
      {image ? (
        <Container className="pb-12 md:pb-16">
          <Reveal>
            <ParallaxMedia className="aspect-[16/9] rounded-3xl shadow-2xl ring-1 shadow-foreground/15 ring-foreground/10 md:aspect-[21/8]">
              <SiteImage
                src={image.src}
                alt={image.alt}
                fileName={image.fileName}
                aspect={null}
                priority
                sizes="100vw"
                className="h-full w-full rounded-none ring-0"
              />
            </ParallaxMedia>
          </Reveal>
        </Container>
      ) : null}
    </header>
  );
}
