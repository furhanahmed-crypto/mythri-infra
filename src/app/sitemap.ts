import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const paths = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/capabilities",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
