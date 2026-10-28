import { siteConfig } from "./site";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    email: siteConfig.email.primary,
    telephone: siteConfig.phone.primaryTel,
    foundingDate: siteConfig.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addresses.head.streetAddress,
      addressLocality: siteConfig.addresses.head.addressLocality,
      addressRegion: siteConfig.addresses.head.addressRegion,
      postalCode: siteConfig.addresses.head.postalCode,
      addressCountry: siteConfig.addresses.head.addressCountry,
    },
  };
}

export function generalContractorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logoPath),
    telephone: "+91-9966976799",
    email: siteConfig.email.primary,
    foundingDate: siteConfig.foundingDate,
    areaServed: siteConfig.areaServed,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addresses.head.streetAddress,
      addressLocality: siteConfig.addresses.head.addressLocality,
      addressRegion: siteConfig.addresses.head.addressRegion,
      postalCode: siteConfig.addresses.head.postalCode,
      addressCountry: siteConfig.addresses.head.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.primaryTel,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Telugu"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.officeTel,
        contactType: "customer service",
        areaServed: "IN",
      },
    ],
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchemas(
  services: Array<{ name: string; description: string }>,
) {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.areaServed,
  }));
}

export function projectItemListSchema(
  projects: Array<{ name: string; description: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      description: project.description,
    })),
  };
}
