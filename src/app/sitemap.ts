import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const paths = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/capabilities",
  "/contact",
] as const;

/** Build-time stamp — avoid `new Date()` if Cache Components is re-enabled later. */
const LAST_MODIFIED = new Date("2026-10-10");

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: LAST_MODIFIED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
