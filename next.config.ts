import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS → `out/` after `next build`. Serve that folder; `next start` does not apply.
  // cacheComponents / partialPrefetching are off: Cache Components forbids `dynamic = "force-static"`,
  // which `output: "export"` requires on robots/sitemap route handlers.
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
