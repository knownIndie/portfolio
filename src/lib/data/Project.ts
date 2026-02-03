// src/lib/data/projects.ts
export type ProjectItem = {
  id: string;
  title: string;
  year?: string;
  description: string;
  tech?: string[];
  repo?: string;
  demo?: string;
  logo?: string; // put images in /public/logos/, e.g. "/logos/cloudline.png"
  role?: string;
  highlights?: string[];
  featured?: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    id: "luma",
    title: "LUMA — Minimal Course Marketplace",
    year: "2025",
    description:
      "A minimal course marketplace MVP shipped in 10 days. Focused on the core loop: instructor creation, secure payments, and instant student access.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Tailwind",
      "Shadcn UI",
      "Neon (Postgres)",
      "Prisma",
      "Clerk",
      "Stripe",
    ],
    repo: "https://github.com/Anastand/luma",
    demo: "https://luma-37ek.vercel.app/",
    role: "Full‑Stack Developer",
    logo: "/luma.png",
    highlights: [
      "Built instructor CRUD for courses, chapters, and lessons with role-based access flows.",
      "Integrated Stripe checkout + webhooks for reliable enrollment creation after payment.",
      "Optimized student view data with nested Prisma queries and handled currency serialization.",
    ],
    featured: true,
  },
  {
    id: "cloudline-weather",
    title: "Cloudline (weather2.0)",
    year: "2024",
    description:
      "Modern weather web app (React + Vite + TypeScript + Tailwind). Features location-based forecasts, hourly & 7-day views, favorites, dynamic backgrounds and a polished glass UI.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Open-Meteo API"],
    repo: "https://github.com/anastand/weather2.0",
    demo: "https://cloudline-sigma.vercel.app",
    logo: "",
  },
  {
    id: "recipes-finder",
    title: "Recipes Finder",
    year: "2024",
    description:
      "Recipe search app built with React, Vite and Tailwind. Uses TheMealDB API for recipe search and details — demonstrates API fetching, client routing and reusable UI components.",
    tech: ["React", "Vite", "Tailwind", "TheMealDB API"],
    repo: "https://github.com/anastand/Recipes-Finder",
    demo: "https://recipes-finder-kappa.vercel.app",
    logo: "/logos/recipes.png",
  },
  {
    id: "react-todo",
    title: "React Todo",
    year: "2023",
    description:
      "Small todo application used to learn React fundamentals: state management, local storage, component composition and basic CRUD UI patterns.",
    tech: ["React", "CSS"],
    repo: "https://github.com/anastand/react-todo",
    demo: "https://react-todo-mauve-delta.vercel.app",
    logo: "/logos/todo.png",
  },
  {
    id: "react-projects-collection",
    title: "React-Projects (collection)",
    year: "2023",
    description:
      "A curated set of React starter projects exploring component patterns, hooks, and state management. Built to strengthen fundamentals before moving into Next.js.",
    tech: ["React", "JavaScript", "Vite/CRA"],
    repo: "https://github.com/anastand/React-Projects",
    logo: "/logos/react-projects.png",
    demo: "https://react-projects-alpha-weld.vercel.app/",
  },
];
