"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { fluidItem } from "@/components/motion/Reveal";

export function ProcessTimeline({ steps }: { steps: ReadonlyArray<{ h3: string; p: string }> }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.6 });

  return (
    <ol ref={ref} className="relative space-y-10 md:space-y-14">
      <span className="absolute top-2 bottom-2 left-5 w-px bg-border" aria-hidden="true" />
      <motion.span
        className="absolute top-2 bottom-2 left-5 w-px origin-top bg-primary"
        style={{ scaleY: fill }}
        aria-hidden="true"
      />
      {steps.map((step) => {
        const match = step.h3.match(/^(\d+)\.\s*(.*)$/);
        const num = match?.[1] ?? "";
        const title = match?.[2] ?? step.h3;
        return (
          <motion.li
            key={step.h3}
            className="relative grid grid-cols-[2.5rem_1fr] gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={fluidItem}
          >
            <span className="relative z-10 flex size-10 items-center justify-center rounded-full border bg-background font-mono text-sm font-bold text-foreground shadow-sm">
              {num}
            </span>
            <div className="pt-1.5">
              <h3>
                <span className="sr-only">{num}. </span>
                {title}
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">{step.p}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
