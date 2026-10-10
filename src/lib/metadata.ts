import type { Metadata } from "next";
import { siteConfig } from "./site";

type PageSeo = {
  title: string;
  description: string;
  keywords: string;
  path: string;
};

export function buildPageMetadata({
  title,
  description,
  keywords,
  path,
}: PageSeo): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = new URL(siteConfig.ogImagePath, siteConfig.url).toString();

  return {
    title,
    description,
    keywords: keywords.split(",").map((k) => k.trim()),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Earthwork & Infrastructure Contractors`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
