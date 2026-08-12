import { GoogleAuth } from "google-auth-library";

import type { PortfolioContent } from "@/lib/portfolio/types";
import {
  PORTFOLIO_SHEET_RANGES,
  parsePortfolioContentFromValueRanges,
  type GoogleSheetsValueRange,
} from "./schema";

const SHEETS_READONLY_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";

type BatchGetResponse = {
  spreadsheetId?: string;
  valueRanges?: GoogleSheetsValueRange[];
};

export function isGoogleSheetsCmsConfigured(): boolean {
  return process.env.GOOGLE_SHEETS_CMS_ENABLED === "true";
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Google Sheets CMS is enabled, but required environment variable ${name} is missing`,
    );
  }
  return value;
}

export async function loadPortfolioContentFromGoogleSheets(): Promise<PortfolioContent> {
  if (!isGoogleSheetsCmsConfigured()) {
    throw new Error(
      "Google Sheets CMS is disabled. Set GOOGLE_SHEETS_CMS_ENABLED=true before loading Sheet content.",
    );
  }

  const spreadsheetId = requiredEnvironmentVariable(
    "GOOGLE_SHEETS_SPREADSHEET_ID",
  );
  const clientEmail = requiredEnvironmentVariable("GOOGLE_SHEETS_CLIENT_EMAIL");
  const privateKey = requiredEnvironmentVariable(
    "GOOGLE_SHEETS_PRIVATE_KEY",
  ).replaceAll("\\n", "\n");
  const expectedSchemaVersion =
    process.env.GOOGLE_SHEETS_EXPECTED_SCHEMA_VERSION?.trim() || "1";

  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: [SHEETS_READONLY_SCOPE],
    });
    const client = await auth.getClient();
    const response = await client.request<BatchGetResponse>({
      url: `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values:batchGet`,
      params: {
        ranges: [...PORTFOLIO_SHEET_RANGES],
        majorDimension: "ROWS",
        valueRenderOption: "UNFORMATTED_VALUE",
        dateTimeRenderOption: "FORMATTED_STRING",
      },
    });

    return parsePortfolioContentFromValueRanges(
      response.data.valueRanges ?? [],
      expectedSchemaVersion,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to load Google Sheets portfolio content from spreadsheet ${spreadsheetId}: ${message}`,
      { cause: error },
    );
  }
}

export {
  PORTFOLIO_SHEET_RANGES,
  PortfolioCmsValidationError,
  parsePortfolioContentFromValueRanges,
} from "./schema";
