"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Soft, low-stiffness spring: elements settle like water finding level. */
export const fluidSpring: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 17,
  mass: 0.9,
};

export const fluidItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: fluidSpring,
  },
};

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  p: motion.p,
  figure: motion.figure,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  id?: string;
};

/** Fades + rises a single block into place when it enters the viewport. */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  id,
}: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: fluidItem.hidden,
        visible: {
          ...(fluidItem.visible as object),
          transition: { ...fluidSpring, delay },
        },
      }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
};

/** Parent that ripples its `StaggerItem` children in sequence. */
export function Stagger({
  children,
  className,
  as = "div",
  stagger = 0.09,
  delay = 0,
}: StaggerProps) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Component = tags[as];
  return (
    <Component className={cn(className)} variants={fluidItem}>
      {children}
    </Component>
  );
}
