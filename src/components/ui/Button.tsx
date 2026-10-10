import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink hover:bg-accent-hover border border-transparent",
  secondary:
    "bg-transparent text-text border border-text hover:border-accent hover:text-accent-ink hover:bg-accent/10",
  inverse:
    "bg-inverse-text text-inverse hover:bg-accent hover:text-accent-ink border border-transparent",
};

const base =
  "inline-flex items-center justify-center min-h-11 px-5 py-3 text-[0.9375rem] font-semibold rounded-[5px] transition-colors duration-150";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);

  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
