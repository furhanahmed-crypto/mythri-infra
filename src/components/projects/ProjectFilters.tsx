"use client";

import { useMemo, useState } from "react";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/cn";
import type { ProjectCategory } from "@/content/projects";

type FeaturedItem = {
  h3: string;
  p: string;
  category: ProjectCategory;
  image: { alt: string; fileName: string };
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
      category === "all"
        ? tableRows
        : tableRows.filter((row) => row.category === category),
    [category, tableRows],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "min-h-10 rounded-[5px] border px-4 py-2 text-sm font-medium transition-colors",
              active === filter
                ? "border-accent bg-accent text-accent-ink"
                : "border-border bg-bg text-text-muted hover:border-text",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="mb-8">{featuredH2}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {visibleFeatured.map((item) => (
            <article key={item.h3} className="space-y-3">
              <MediaPlaceholder
                alt={item.image.alt}
                fileName={item.image.fileName}
                aspect="wide"
              />
              <h3>{item.h3}</h3>
              <p className="text-text-muted">{item.p}</p>
            </article>
          ))}
        </div>
        {visibleFeatured.length === 0 ? (
          <p className="text-text-muted">No featured projects in this category.</p>
        ) : null}
      </div>

      <div>
        <h2 className="mb-6">{tableH2}</h2>
        <div className="overflow-x-auto rounded-[5px] border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface text-text">
              <tr>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Client / Main contractor</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={`${row.year}-${row.project}`} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3 align-top font-medium">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 align-top">{row.project}</td>
                  <td className="px-4 py-3 align-top">{row.location}</td>
                  <td className="px-4 py-3 align-top">{row.client}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
