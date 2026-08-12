import type { PortfolioContent } from "./types";

export const fallbackPortfolioContent: PortfolioContent = {
  schemaVersion: "1",
  contentVersion: "local-fallback",
  profile: {
    name: "Aryan Bhardwaj",
    headline: "Full-stack developer building reliable product experiences.",
    shortBio:
      "I build focused web products across frontend systems, backend workflows, payments, authentication, and developer tooling.",
    about: [
      "I am a full-stack developer who cares about performance, accessibility, and reliable systems. I build fast Next.js products with thoughtful interfaces and solid backend architecture.",
      "My approach blends product judgment with engineering discipline: clear information hierarchy, lightweight components, and workflows that solve a concrete user problem.",
    ],
    location: "India",
    availability:
      "Open to full-stack roles, internships, and focused collaborations",
    email: "bhardwaj03aryan@gmail.com",
  },
  projects: [
    {
      id: "kontxt-cli",
      slug: "kontxt-cli",
      title: "kontxt-cli",
      shortDescription:
        "A published developer CLI that packages relevant codebase context for AI tools without dragging in generated or irrelevant files.",
      description:
        "Built for deterministic context packaging, token-aware splitting, sensible ignore rules, Git scopes, path safety, and copy-ready output.",
      status: "Published",
      year: "2025",
      technologies: ["Node.js", "TypeScript", "CLI", "npm", "File system APIs"],
      repositoryUrl: "https://github.com/knownIndie/kontxt-cli",
      npmUrl: "https://www.npmjs.com/package/kontxt-cli",
      role: "CLI Tool Developer",
      highlights: [
        "Designed deterministic file discovery and context packaging for real repositories.",
        "Added token-aware splitting, bounded concurrency, path safety, and Git-aware scopes.",
        "Published the tool to npm as a reusable product rather than a one-off script.",
      ],
      featured: true,
      sortOrder: 1,
    },
    {
      id: "luma",
      slug: "luma",
      title: "LUMA",
      shortDescription:
        "A course marketplace MVP covering instructor authoring, checkout, enrollment, and student access.",
      description:
        "A full-stack marketplace built around the core instructor-to-student transaction flow.",
      status: "Case study",
      year: "2025",
      technologies: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Clerk",
        "Stripe",
      ],
      repositoryUrl: "https://github.com/knownIndie/luma",
      liveUrl: "https://luma-aryan.vercel.app/",
      imagePath: "/luma.png",
      role: "Full-stack Developer",
      highlights: [
        "Built instructor CRUD for courses, chapters, and lessons with role-based access.",
        "Integrated Stripe Checkout and webhooks for payment-backed enrollment creation.",
        "Composed nested Prisma queries for the student learning experience.",
      ],
      featured: true,
      sortOrder: 2,
    },
    {
      id: "voidtube",
      slug: "voidtube",
      title: "VoidTube",
      shortDescription:
        "A Manifest V3 Chrome extension for YouTube watch-time analytics, creator tracking, distraction controls, and Markdown export.",
      description:
        "Built around browser lifecycle constraints, YouTube SPA navigation, local aggregation, and interfaces injected into an existing product.",
      status: "Released",
      year: "2026",
      technologies: [
        "JavaScript",
        "Manifest V3",
        "Chrome APIs",
        "DOM integration",
        "Local storage",
      ],
      repositoryUrl: "https://github.com/knownIndie/VoidYoutube",
      liveUrl: "https://youtu.be/EFV6m1Znz7c",
      role: "Browser Extension Developer",
      highlights: [
        "Handled YouTube SPA navigation and page lifecycle events for watch-session tracking.",
        "Aggregated local daily activity into weekly summaries within extension storage constraints.",
        "Injected analytics and focus controls into YouTube without replacing the host interface.",
      ],
      featured: false,
      sortOrder: 3,
    },
  ],
  experience: [
    {
      id: "skynet-2025",
      organization: "SkynetDev.space",
      role: "Frontend Developer",
      startDate: "2025",
      summary:
        "Built the Next.js and Tailwind application foundation with reusable interface blocks and responsive behavior.",
      highlights: [
        "Structured reusable UI blocks for faster iteration and consistent spacing.",
        "Focused on typography, accessibility, and responsive layout behavior.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      sortOrder: 1,
    },
  ],
  education: [
    {
      id: "btech-2027",
      institution: "Maharshi Dayanand University",
      credential: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2023",
      endDate: "2027",
      summary: "Focused on software engineering, algorithms, and databases.",
      sortOrder: 1,
    },
    {
      id: "school-2022",
      institution: "Jinvani Bharti Public School",
      credential: "School",
      startDate: "2012",
      endDate: "2022",
      sortOrder: 2,
    },
  ],
  links: [
    {
      id: "github",
      type: "github",
      label: "GitHub",
      url: "https://github.com/knownIndie",
      sortOrder: 1,
    },
    {
      id: "linkedin",
      type: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/aryan-bhardwaj-56129422b/",
      sortOrder: 2,
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      url: "mailto:bhardwaj03aryan@gmail.com",
      sortOrder: 3,
    },
    {
      id: "resume",
      type: "resume",
      label: "Resume",
      url: "/Aryan_Bhardwaj_Resume.pdf",
      sortOrder: 4,
    },
  ],
  resumePath: "/Aryan_Bhardwaj_Resume.pdf",
};
