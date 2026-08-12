import { cache } from "react";
import {
  isGoogleSheetsCmsConfigured,
  loadPortfolioContentFromGoogleSheets,
} from "@/lib/portfolio-cms";
import { fallbackPortfolioContent } from "./fallback";
import type { PortfolioContent } from "./types";

export const getPortfolioContent = cache(
  async (): Promise<PortfolioContent> => {
    if (!isGoogleSheetsCmsConfigured()) {
      return fallbackPortfolioContent;
    }

    return loadPortfolioContentFromGoogleSheets();
  },
);
