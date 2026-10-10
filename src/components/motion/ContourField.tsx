"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const paths = [
  "M-100 120 C 150 60, 350 180, 600 110 S 1050 40, 1400 130",
  "M-100 190 C 180 130, 380 250, 640 180 S 1080 110, 1400 200",
  "M-100 260 C 200 200, 420 320, 680 250 S 1100 180, 1400 270",
  "M-100 330 C 220 270, 450 390, 720 320 S 1120 250, 1400 340",
  "M-100 400 C 240 340, 480 460, 760 390 S 1140 320, 1400 410",
  "M-100 470 C 260 410, 510 530, 800 460 S 1160 390, 1400 480",
];

/**
 * Slowly drifting survey contour lines — a nod to earthwork levelling.
 * Purely decorative; static when the user prefers reduced motion.
 */
export function ContourField({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1300 560"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 1 }
              : {
                  pathLength: 1,
                  opacity: 1,
                  x: [0, i % 2 === 0 ? 24 : -24, 0],
                  y: [0, i % 2 === 0 ? -6 : 6, 0],
                }
          }
          transition={{
            pathLength: { duration: 2.4, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.2, delay: 0.15 * i },
            x: { duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 11 + i * 2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </svg>
  );
}
