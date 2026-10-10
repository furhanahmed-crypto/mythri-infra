"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ServiceIndex({ items }: { items: Array<{ id: string; label: string }> }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services on this page" className="sticky top-28">
      <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        On this page
      </p>
      <ul className="relative space-y-1 border-l">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="relative">
              {isActive ? (
                <motion.span
                  layoutId="service-index"
                  className="absolute top-0 -left-px h-full w-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  aria-hidden="true"
                />
              ) : null}
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex gap-3 py-2 pl-4 text-sm transition-colors",
                  isActive
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-mono text-xs leading-5 opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
