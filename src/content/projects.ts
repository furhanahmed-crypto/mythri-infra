export type ProjectCategory = "earthwork" | "roads" | "sand" | "mining";

export const projectsContent = {
  seo: {
    title: "Projects | Earthwork & Road Works by Mythri Infra",
    description:
      "Earthwork, road, drainage and sand works for L&T, NCC, IJM, Kakinada SEZ, APMDC, APSHCL and ECL. See our projects across Andhra Pradesh and beyond.",
    keywords:
      "Mythri Infra projects, Kakinada SEZ road works, ONGC Kakinada earthwork, sand reach East Godavari, APSHCL land filling Tanuku, earthwork projects Andhra Pradesh",
  },
  header: {
    image: {
      src: "/images/heroes/projects.webp",
      alt: "Road paving crew laying asphalt on an infrastructure project",
      fileName: "projects.webp",
    },
    h1: "Our Projects",
    intro:
      "Two decades of groundwork across Andhra Pradesh, Telangana and beyond, for some of India's most respected names.",
  },
  filters: ["All", "Earthwork", "Roads", "Sand", "Mining"] as const,
  featured: {
    h2: "Featured Projects",
    items: [
      {
        h3: "Free Sand Policy Reaches — Teeparru & Kakaraparru",
        p: "District Level Sand Committee, East Godavari · 2025. Manual excavation, transport, stocking and loading of sand at three open reaches.",
        category: "sand" as ProjectCategory,
        image: {
          src: "/images/projects/teeparru-sand-reach.webp",
          alt: "Sand and gravel quarry representing sand excavation and supply works",
          fileName: "teeparru-sand-reach.webp",
        },
      },
      {
        h3: "Internal Roads, Kakinada SEZ",
        p: "Auro Infra Pvt Ltd, Kakinada · 2024. Construction of internal roads for Kakinada SEZ.",
        category: "roads" as ProjectCategory,
        image: {
          src: "/images/projects/kakinada-sez-roads.webp",
          alt: "Asphalt paver on a road construction project",
          fileName: "kakinada-sez-roads.webp",
        },
      },
      {
        h3: "NPI Housing Layout, Tanuku",
        p: "APSHCL, West Godavari · 2023. Filling of low-lying house sites.",
        category: "earthwork" as ProjectCategory,
        image: {
          src: "/images/projects/apshcl-tanuku.webp",
          alt: "Active construction site representing layout earthwork and filling",
          fileName: "apshcl-tanuku.webp",
        },
      },
      {
        h3: "ONGC Project Works, Kakinada",
        p: "Larsen & Toubro · 2019 – present.",
        category: "earthwork" as ProjectCategory,
        image: {
          src: "/images/projects/ongc-kakinada.webp",
          alt: "Heavy machinery on an industrial earthwork project site",
          fileName: "ongc-kakinada.webp",
        },
      },
    ],
  },
  firmProjects: {
    h2: "Projects by Mythri Infra (2016 – present)",
    rows: [
      {
        year: "2025",
        project:
          "Sand excavation, transport, stocking & loading — Teeparru-2, Teeparru-3, Kakaraparru-1 (free sand policy)",
        location: "East Godavari",
        client: "District Level Sand Committee",
        category: "sand" as ProjectCategory,
      },
      {
        year: "2024",
        project: "Internal roads, Kakinada SEZ",
        location: "Kakinada",
        client: "Auro Infra Pvt Ltd",
        category: "roads" as ProjectCategory,
      },
      {
        year: "2023",
        project: "Filling of low-lying house sites, NPI housing layout",
        location: "Tanuku",
        client: "APSHCL",
        category: "earthwork" as ProjectCategory,
      },
      {
        year: "2021–22",
        project: "Drain works & soil filling, Kakinada SEZ",
        location: "Kakinada",
        client: "Kakinada SEZ Ltd (Aurobindo)",
        category: "earthwork" as ProjectCategory,
      },
      {
        year: "2021–22",
        project: "Coal mining works",
        location: "West Bengal",
        client: "ECL (BPCPL & ARETPL JV)",
        category: "mining" as ProjectCategory,
      },
      {
        year: "2020",
        project: "Sand excavation & transportation",
        location: "Andhra Pradesh",
        client: "APMDC",
        category: "sand" as ProjectCategory,
      },
      {
        year: "2020",
        project: "Sand supply",
        location: "Visakhapatnam",
        client: "L&T Construction",
        category: "sand" as ProjectCategory,
      },
      {
        year: "2019–now",
        project: "ONGC project works",
        location: "Kakinada",
        client: "Larsen & Toubro",
        category: "earthwork" as ProjectCategory,
      },
      {
        year: "2017–19",
        project: "APTIDCO housing works",
        location: "East Godavari",
        client: "NCC Ltd",
        category: "earthwork" as ProjectCategory,
      },
      {
        year: "2016",
        project: "Aparna Projects",
        location: "Samalkota",
        client: "Aparna",
        category: "earthwork" as ProjectCategory,
      },
    ],
  },
  teamExperience: {
    h2: "Our Team's Earlier Experience (2002 – 2015)",
    intro:
      "Before establishing Mythri Infra, our team executed works on these projects.",
    rows: [
      {
        year: "2014–15",
        project: "NSL Projects",
        location: "Rayadurgam, Hyderabad",
        client: "NSL",
      },
      {
        year: "2013",
        project: "Sports Academy",
        location: "Haldwani, Uttarakhand",
        client: "NCC",
      },
      {
        year: "2012",
        project: "Trident project",
        location: "Budni, Madhya Pradesh",
        client: "NCC Ltd",
      },
      {
        year: "2011",
        project: "BDL site works",
        location: "Bhanur, Hyderabad",
        client: "NCC Ltd",
      },
      {
        year: "2010",
        project: "NIT Warangal",
        location: "Warangal",
        client: "NCC Ltd",
      },
      {
        year: "2008",
        project: "NIMS Hospital",
        location: "Bibinagar, Hyderabad",
        client: "NCC Ltd",
      },
      {
        year: "2006",
        project: "Due Point site",
        location: "Turkapally, Hyderabad",
        client: "Hindu Projects",
      },
      {
        year: "2004",
        project: "Malaysian Township",
        location: "Kukatpally, Hyderabad",
        client: "IJM",
      },
      {
        year: "2002",
        project: "Warangal–Khammam highway road works",
        location: "Telangana",
        client: "IJM – Gayathri Projects",
      },
    ],
  },
  cta: { label: "Discuss Your Project", href: "/contact" },
} as const;
