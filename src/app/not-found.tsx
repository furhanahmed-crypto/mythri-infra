import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="animate-in fade-in zoom-in-95 fill-mode-both font-mono text-7xl font-extrabold tracking-tighter text-primary duration-700 md:text-9xl">
          404
        </p>
        <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-6 delay-100 duration-700">
          Page not found
        </h1>
        <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-4 max-w-md text-muted-foreground delay-200 duration-700">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-8 flex flex-col gap-3 delay-300 duration-700 sm:flex-row">
          <Button asChild size="xl">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/contact">
              <MessageSquare data-icon="inline-start" aria-hidden="true" />
              Contact Us
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
