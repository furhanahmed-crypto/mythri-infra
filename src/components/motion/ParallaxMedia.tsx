"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Slow zoom-out of a photo as its frame scrolls through the viewport.
 * Scales inside an overflow-hidden frame, so layout never shifts.
 */
export function ParallaxMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-2xl", className)}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { scale, y }}>
        {children}
      </motion.div>
    </div>
  );
}
