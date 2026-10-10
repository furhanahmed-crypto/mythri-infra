export const servicesContent = {
  seo: {
    title: "Earthwork, Road & Sand Supply Services | Mythri Infra",
    description:
      "Excavation, soil filling, internal roads, drainage, sand excavation and mining support works across Andhra Pradesh. Own fleet, on-time delivery.",
    keywords:
      "earthwork services Kakinada, soil filling contractors, land filling contractors East Godavari, internal road contractors, drainage contractors Kakinada, sand excavation contractors AP, sand transportation Kakinada, mining support contractors",
  },
  header: {
    image: {
      src: "/images/services-hero.webp",
      alt: "Excavator loading a dumper during earthwork by Mythri Infra",
      fileName: "services-hero.webp",
    },
    h1: "Our Services",
    intro:
      "From the first cut of the excavator to the final roller pass, we handle the groundwork that every project depends on.",
  },
  services: [
    {
      h2: "Earthwork & Site Development",
      image: {
        src: "/images/service-earthwork.webp",
        alt: "Soil filling and land levelling at Kakinada SEZ by Mythri Infra",
        fileName: "service-earthwork.webp",
      },
      paragraphs: [
        "Excavation, soil filling, land levelling and filling of low-lying sites for SEZs, housing layouts and industrial projects. Our own excavators, dumpers, graders and rollers keep the job moving.",
        "Recent work: Kakinada SEZ soil filling · APSHCL NPI housing layout, Tanuku (2023)",
      ],
    },
    {
      h2: "Road Construction",
      image: {
        src: "/images/service-road-construction.webp",
        alt: "Internal road under construction with grader and roller, Kakinada",
        fileName: "service-road-construction.webp",
      },
      paragraphs: [
        "Highway works and internal roads for industrial parks and townships, from formation and sub-grade to compaction.",
        "Recent work: Internal roads, Kakinada SEZ (2024) · Warangal–Khammam highway road works",
      ],
    },
    {
      h2: "Drainage Works",
      image: {
        src: "/images/service-drainage.webp",
        alt: "Site drain excavation work at an industrial site in Kakinada",
        fileName: "service-drainage.webp",
      },
      paragraphs: [
        "Storm water and site drains planned and built to keep large sites dry, safe and usable through the monsoon.",
        "Recent work: Kakinada SEZ drain works (2021–22)",
      ],
    },
    {
      h2: "Sand Excavation & Supply",
      image: {
        src: "/images/service-sand-supply.webp",
        alt: "Sand excavation and loading at an open sand reach in East Godavari",
        fileName: "service-sand-supply.webp",
      },
      paragraphs: [
        "Manual and machine excavation, transportation, stocking and loading of sand for government schemes and private projects.",
        "Recent work: DLSC free sand policy reaches, East Godavari (2025) · APMDC sand excavation · Sand supply to L&T, Visakhapatnam",
      ],
    },
    {
      h2: "Mining Support Works",
      image: {
        src: "/images/service-mining-support.webp",
        alt: "Heavy excavator and dumpers at a coal mining site",
        fileName: "service-mining-support.webp",
      },
      paragraphs: [
        "Excavation and haulage support for coal and mineral mining operations, with heavy machines such as the ZX 470.",
        "Recent work: ECL coal mining works, West Bengal (2021–22)",
      ],
    },
  ],
  cta: {
    h2: "Need a Reliable Earthwork Partner?",
    p: "Send us your scope or BOQ for your next tender or work order.",
    button: { label: "Request a Quote", href: "/contact" },
  },
} as const;
