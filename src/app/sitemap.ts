import type { MetadataRoute } from "next";
import { getPortfolioContent } from "@/lib/portfolio/content";
import { getModernProjects } from "@/lib/portfolio/modern";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const content = await getPortfolioContent();
  const projectPaths = getModernProjects(content).map(
    (project) => `/projects/${project.slug}`,
  );

  return ["", "/about", "/projects", "/resume", ...projectPaths].map(
    (pathname) => ({
      url: `${baseUrl}${pathname}`,
      changeFrequency: "monthly" as const,
      priority: pathname === "" ? 1 : 0.8,
    }),
  );
}
