import type {
  PortfolioContent,
  PortfolioExperience,
  PortfolioProject,
} from "./types";

const foodioProject: PortfolioProject = {
  id: "foodio",
  slug: "foodio",
  title: "FoodIO",
  shortDescription:
    "A restaurant and menu management platform in active development, with role-aware portals and onboarding workflows.",
  description:
    "A restaurant and menu management platform where I am building the owner, admin, and customer flows around restaurant setup, approval, and menu data. The product is still under active development.",
  status: "In progress",
  year: "2026",
  technologies: [
    "Next.js",
    "TypeScript",
    "Drizzle",
    "PostgreSQL/Neon",
    "Redis/Upstash",
    "JWT + Argon2",
    "Zod",
    "Docker Compose",
  ],
  repositoryUrl: "https://github.com/knownIndie/FOODIO",
  liveUrl: "https://foodio-liart.vercel.app",
  role: "Product and full-stack developer",
  highlights: [
    "Built role-aware owner, admin, and customer portal flows.",
    "Added restaurant onboarding, admin review, and local/hosted service modes.",
    "Worked through forward-only migration changes while keeping the project in active development.",
  ],
  featured: true,
  sortOrder: 1.5,
};

const inProgressProject: PortfolioProject = {
  id: "devscreen",
  slug: "devscreen",
  title: "DevScreen",
  shortDescription:
    "An interview-readiness application in active development for structured tests and planned AI evaluation.",
  description:
    "The current build covers authentication, onboarding, profile persistence, and the first database foundation. The core interview flow is still being built.",
  status: "In progress",
  year: "2026",
  technologies: [
    "Next.js",
    "TypeScript",
    "Better Auth",
    "Drizzle",
    "Neon PostgreSQL",
    "Zod",
    "Vercel AI SDK (planned)",
    "Google AI SDK (planned)",
  ],
  repositoryUrl: "https://github.com/knownIndie/devscreen",
  role: "Product and full-stack developer",
  highlights: [
    "Completed the foundation and Google sign-in flow.",
    "Built the first onboarding and profile persistence slice.",
    "Documented the boundary between objective scoring and planned AI interpretation.",
  ],
  featured: false,
  sortOrder: 3,
};

const modernOnlyProjects = [foodioProject, inProgressProject];

export function getModernProjects(
  content: PortfolioContent,
): PortfolioProject[] {
  const projects = [...content.projects];

  for (const modernProject of modernOnlyProjects) {
    if (!projects.some((project) => project.id === modernProject.id)) {
      projects.push(modernProject);
    }
  }

  return projects.sort(
    (a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title),
  );
}

export function getModernExperience(
  content: PortfolioContent,
): PortfolioExperience[] {
  return content.experience.map((experience) =>
    experience.organization === "SkynetDev.space"
      ? { ...experience, endDate: "Dec 2025" }
      : experience,
  );
}
