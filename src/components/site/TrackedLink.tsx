"use client";

import Link from "next/link";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Props = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
  event: AnalyticsEvent;
  external?: boolean;
};

export function TrackedLink({
  href,
  event,
  external,
  onClick,
  children,
  ...rest
}: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event);
    onClick?.(e);
  };

  const isNative =
    external ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http");

  if (isNative) {
    return (
      <a
        href={href}
        onClick={handleClick}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
