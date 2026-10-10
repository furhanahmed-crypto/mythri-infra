"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SiteImage } from "@/components/site/SiteImage";
import { Reveal } from "@/components/motion/Reveal";
import { fluidSpring } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProjectCategory } from "@/content/projects";

type FeaturedItem = {
  h3: string;
  p: string;
  category: ProjectCategory;
  image: { src: string; alt: string; fileName: string };
};

type FirmRow = {
  year: string;
  project: string;
  location: string;
  client: string;
  category: ProjectCategory;
};

const filterMap: Record<string, ProjectCategory | "all"> = {
  All: "all",
  Earthwork: "earthwork",
  Roads: "roads",
  Sand: "sand",
  Mining: "mining",
};

const categoryLabel: Record<ProjectCategory, string> = {
  earthwork: "Earthwork",
  roads: "Roads",
  sand: "Sand",
  mining: "Mining",
};

export function ProjectFilters({
  filters,
  featuredH2,
  featuredItems,
  tableH2,
  tableRows,
}: {
  filters: readonly string[];
  featuredH2: string;
  featuredItems: readonly FeaturedItem[];
  tableH2: string;
  tableRows: readonly FirmRow[];
}) {
  const [active, setActive] = useState("All");
  const category = filterMap[active] ?? "all";

  const visibleFeatured = useMemo(
    () =>
      category === "all"
        ? featuredItems
        : featuredItems.filter((item) => item.category === category),
    [category, featuredItems],
  );

  const visibleRows = useMemo(
    () =>
      category === "all" ? tableRows : tableRows.filter((row) => row.category === category),
    [category, tableRows],
  );

  return (
    <Tabs value={active} onValueChange={setActive} className="gap-0">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2>{featuredH2}</h2>
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <TabsList aria-label="Filter projects by type" className="h-10! p-1">
            {filters.map((filter) => (
              <TabsTrigger key={filter} value={filter} className="px-3.5 sm:px-4">
                {filter}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Reveal>

      <TabsContent value={active} forceMount className="mt-10">
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleFeatured.map((item) => (
              <motion.article
                key={item.h3}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={fluidSpring}
              >
                <Tilt max={4} className="h-full rounded-2xl">
                  <Card className="group/prj h-full gap-0 rounded-2xl py-0 transition-shadow duration-500 hover:shadow-2xl hover:shadow-foreground/15">
                    <div className="relative overflow-hidden">
                      <SiteImage
                        src={item.image.src}
                        alt={item.image.alt}
                        fileName={item.image.fileName}
                        aspect="wide"
                        className="rounded-none ring-0 transition-transform duration-1000 group-hover/prj:scale-[1.08]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover/prj:opacity-100"
                        aria-hidden="true"
                      />
                      <Badge className="absolute top-4 left-4 border-white/20 bg-black/40 text-white backdrop-blur-md">
                        {categoryLabel[item.category]}
                      </Badge>
                    </div>
                    <CardContent className="flex flex-col gap-3 p-6 md:p-7">
                      <h3>{item.h3}</h3>
                      <p className="leading-relaxed text-muted-foreground">{item.p}</p>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {visibleFeatured.length === 0 ? (
          <p className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
            No featured projects in this category — see the full list below.
          </p>
        ) : null}

        <Reveal className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2>{tableH2}</h2>
            <span className="text-sm text-muted-foreground tabular-nums">
              {visibleRows.length} of {tableRows.length} shown
            </span>
          </div>
          <Card className="mt-6 py-0">
            <Table>
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead className="w-28 pl-5">Year</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="pr-5">Client / Main contractor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {visibleRows.map((row) => (
                    <motion.tr
                      key={`${row.year}-${row.project}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b transition-colors hover:bg-muted/40"
                    >
                      <TableCell className="pl-5 align-top font-mono text-xs font-semibold whitespace-nowrap">
                        {row.year}
                      </TableCell>
                      <TableCell className="min-w-64 align-top whitespace-normal">
                        {row.project}
                      </TableCell>
                      <TableCell className="align-top text-muted-foreground">
                        {row.location}
                      </TableCell>
                      <TableCell className="pr-5 align-top whitespace-normal">
                        {row.client}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </Card>
        </Reveal>
      </TabsContent>
    </Tabs>
  );
}
