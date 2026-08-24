import { cache } from "react";
import {
  isGoogleSheetsCmsConfigured,
  loadPortfolioContentFromGoogleSheets,
} from "@/lib/portfolio-cms";
import { fallbackPortfolioContent } from "./fallback";
import type { PortfolioContent } from "./types";

function normalizePortfolioContent(
  content: PortfolioContent,
): PortfolioContent {
  return {
    ...content,
    projects: content.projects.map((project) =>
      project.status.toLowerCase() === "case study"
        ? { ...project, status: "MVP" }
        : project,
    ),
    experience: content.experience.map((experience) =>
      experience.organization.trim().toLowerCase() === "skynetdev.space"
        ? { ...experience, endDate: "Dec 2025" }
        : experience,
    ),
  };
}

export const getPortfolioContent = cache(
  async (): Promise<PortfolioContent> => {
    if (!isGoogleSheetsCmsConfigured()) {
      return normalizePortfolioContent(fallbackPortfolioContent);
    }

    return normalizePortfolioContent(
      await loadPortfolioContentFromGoogleSheets(),
    );
  },
);
