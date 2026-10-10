"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A soft amber glow that trails the cursor across its parent section.
 * Listens on the parent so it never blocks clicks on content above it.
 */
export function CursorGlow({ className, size = 520 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(-999, { stiffness: 90, damping: 20 });
  const y = useSpring(-999, { stiffness: 90, damping: 20 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, color-mix(in oklch, var(--primary) 18%, transparent), transparent 65%)`;

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !parent) return;
      const rect = parent.getBoundingClientRect();
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }
    function leave() {
      x.set(-999);
      y.set(-999);
    }

    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ background }}
    />
  );
}
