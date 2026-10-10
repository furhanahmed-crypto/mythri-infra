"use client";

import Link from "next/link";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  event: AnalyticsEvent;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
};

export function TrackedLink({
  href,
  event,
  children,
  className,
  external,
  "aria-label": ariaLabel,
}: Props) {
  const onClick = () => trackEvent(event);

  if (
    external ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http")
  ) {
    return (
      <a
        href={href}
        className={cn(className)}
        onClick={onClick}
        aria-label={ariaLabel}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
