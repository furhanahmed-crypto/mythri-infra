export const siteConfig = {
  name: "Mythri Infra",
  legalName: "Mythri Infra",
  tagline: "Mythri Infra — Earthwork & Infrastructure Contractors, Kakinada",
  description:
    "Earthwork, road, drainage and sand supply contractors in Kakinada, AP. Own fleet of 40+ machines.",
  foundingDate: "2016",
  gstin: "37ABDFM4972H1ZZ",
  areaServed: "Andhra Pradesh",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logoPath: "/images/brand/mythri-infra-logo.webp",
  ogImagePath: "/images/og/default.webp",
  email: {
    primary: "mythriinfraa@gmail.com",
    secondary: "mythriinfraa1@gmail.com",
  },
  phone: {
    primaryDisplay: "99669 76799",
    primaryTel: "+919966976799",
  },
  whatsappUrl: "https://wa.me/919966976799",
  addresses: {
    head: {
      label: "Head Office",
      lines: [
        "D.No. 6-222, Near Bhaskara Kalyana Mandapam, Opp. HP Bunk, Turangi",
        "Kakinada – 533016, Andhra Pradesh",
      ],
      streetAddress:
        "D.No. 6-222, Near Bhaskara Kalyana Mandapam, Opp. HP Bunk, Turangi",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      postalCode: "533016",
      addressCountry: "IN",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Turangi+Kakinada+533016",
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Turangi%20Kakinada%20533016&t=&z=15&ie=UTF8&iwloc=&output=embed",
    },
    branch: {
      label: "Branch Office",
      lines: [
        "Road No. 3, R.R. Nagar, NFCL Road",
        "Kakinada – 533003, Andhra Pradesh",
      ],
      streetAddress: "Road No. 3, R.R. Nagar, NFCL Road",
      addressLocality: "Kakinada",
      addressRegion: "Andhra Pradesh",
      postalCode: "533003",
      addressCountry: "IN",
    },
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
