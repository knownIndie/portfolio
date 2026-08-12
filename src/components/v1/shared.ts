import type {
  PortfolioContent,
  PortfolioLink,
  PortfolioProject,
} from "@/lib/portfolio/types";

export function sortedProjects(content: PortfolioContent): PortfolioProject[] {
  return [...content.projects].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function sortedLinks(content: PortfolioContent): PortfolioLink[] {
  return [...content.links].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function findLink(
  content: PortfolioContent,
  type: PortfolioLink["type"],
): PortfolioLink | undefined {
  return sortedLinks(content).find((link) => link.type === type);
}

export function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate) return endDate ?? "";
  return `${startDate} – ${endDate ?? "Present"}`;
}
