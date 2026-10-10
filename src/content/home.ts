export const homeContent = {
  seo: {
    title: "Earthwork & Road Contractors in Kakinada | Mythri Infra",
    description:
      "Earthwork, road, drainage and sand supply contractors in Kakinada, AP. Own fleet of 40+ machines. Trusted by L&T, NCC and government bodies.",
    keywords:
      "earthwork contractors Kakinada, road contractors Kakinada, civil contractors Andhra Pradesh, sand suppliers Kakinada, excavation contractors East Godavari, infrastructure contractors AP",
  },
  hero: {
    image: {
      src: "/images/projects/ongc-kakinada.webp",
      alt: "Earthwork for ONGC project in Kakinada executed for Larsen & Toubro",
      fileName: "ongc-kakinada.webp",
    },
    featured: {
      label: "Featured project",
      title: "ONGC Project Works, Kakinada",
      meta: "Larsen & Toubro · 2019 – present",
    },
    h1: "Earthwork & Infrastructure Contractors in Kakinada",
    intro:
      "Earthwork, roads, drainage and sand supply across Andhra Pradesh, delivered on time with our own fleet. Trusted by L&T, NCC and government bodies.",
    primaryCta: { label: "View Our Projects", href: "/projects" },
    secondaryCta: {
      label: "Call 79939 49799",
      href: "tel:+917993949799",
      track: "click_to_call" as const,
    },
  },
  numbers: [
    { value: "20+", label: "Years of Experience" },
    { value: "40+", label: "Owned Machines" },
    { value: "25", label: "Dumpers" },
    { value: "230+", label: "Staff & Workmen" },
  ],
  whatWeDo: {
    h2: "What We Do",
    intro:
      "From the first cut of the excavator to the final roller pass, we handle the groundwork every project depends on.",
    items: [
      {
        h3: "Earthwork & Site Development",
        p: "Excavation, soil filling and levelling for SEZs, layouts and industrial sites.",
      },
      {
        h3: "Road Construction",
        p: "Highway works and internal roads, from formation to compaction.",
      },
      {
        h3: "Drainage Works",
        p: "Site and storm water drains that keep large sites dry and usable.",
      },
      {
        h3: "Sand Excavation & Supply",
        p: "Excavation, transport and stocking of sand for government and private projects.",
      },
      {
        h3: "Mining Support Works",
        p: "Excavation and haulage support for coal and mineral mining.",
      },
    ],
    cta: { label: "Explore Our Services", href: "/services" },
  },
  trustedBy: {
    h2: "Trusted by Leading Names",
    // Logos pending permission — text fallback per RULES/MEMORY
    names: [
      "Larsen & Toubro",
      "NCC Limited",
      "IJM",
      "ONGC",
      "Kakinada SEZ",
      "APMDC",
      "APTIDCO",
      "APSHCL",
    ],
  },
  why: {
    h2: "Why Choose Mythri Infra",
    items: [
      {
        h3: "Our Own Fleet",
        p: "We own 40+ machines, including 25 dumpers. No waiting on hired equipment; work starts when we say it will.",
      },
      {
        h3: "Experienced Team",
        p: "30 site staff and 200 skilled workmen with experience on highways, townships, SEZs and mines.",
      },
      {
        h3: "Fully Compliant",
        p: "PF, ESI, insurance and bank-paid wages for every worker. No compliance surprises for main contractors.",
      },
    ],
  },
  featuredProjects: {
    h2: "Featured Projects",
    items: [
      {
        h3: "Internal Roads, Kakinada SEZ",
        p: "Auro Infra Pvt Ltd · 2024",
        image: {
          src: "/images/projects/kakinada-sez-roads.webp",
          alt: "Internal road construction at Kakinada SEZ by Mythri Infra",
          fileName: "kakinada-sez-roads.webp",
        },
      },
      {
        h3: "Free Sand Policy Reaches, East Godavari",
        p: "District Level Sand Committee · 2025",
        image: {
          src: "/images/projects/teeparru-sand-reach.webp",
          alt: "Sand excavation and stocking at Teeparru sand reach, East Godavari",
          fileName: "teeparru-sand-reach.webp",
        },
      },
      {
        h3: "ONGC Project Works, Kakinada",
        p: "Larsen & Toubro · 2019 – present",
        image: {
          src: "/images/projects/ongc-kakinada.webp",
          alt: "Earthwork for ONGC project in Kakinada executed for Larsen & Toubro",
          fileName: "ongc-kakinada.webp",
        },
      },
    ],
    cta: { label: "See All Projects", href: "/projects" },
  },
  closingCta: {
    h2: "Have a Project in Andhra Pradesh? Let's Talk.",
    p: "Share your scope or BOQ and we'll get back within one working day.",
    cta: { label: "Get in Touch", href: "/contact" },
  },
} as const;
