import type {
  PortfolioContent,
  PortfolioLinkType,
} from "@/lib/portfolio/types";

export const PORTFOLIO_SHEET_RANGES = [
  "Control!A1:B",
  "Profile!A1:C",
  "Projects!A1:P",
  "ProjectHighlights!A1:E",
  "Experience!A1:J",
  "ExperienceHighlights!A1:E",
  "Education!A1:I",
  "Links!A1:F",
] as const;

export type GoogleSheetsValueRange = {
  range?: string;
  values?: unknown[][];
};

const EXPECTED_HEADERS = {
  Control: ["key", "value"],
  Profile: ["key", "value", "state"],
  Projects: [
    "id",
    "slug",
    "title",
    "short_description",
    "description",
    "status",
    "year",
    "technologies_csv",
    "repository_url",
    "live_url",
    "npm_url",
    "image_path",
    "role",
    "featured",
    "sort_order",
    "state",
  ],
  ProjectHighlights: ["id", "project_id", "highlight", "sort_order", "state"],
  Experience: [
    "id",
    "organization",
    "role",
    "location",
    "start_date",
    "end_date",
    "summary",
    "technologies_csv",
    "sort_order",
    "state",
  ],
  ExperienceHighlights: [
    "id",
    "experience_id",
    "highlight",
    "sort_order",
    "state",
  ],
  Education: [
    "id",
    "institution",
    "credential",
    "field",
    "start_date",
    "end_date",
    "summary",
    "sort_order",
    "state",
  ],
  Links: ["id", "type", "label", "url", "sort_order", "state"],
} as const;

type SheetName = keyof typeof EXPECTED_HEADERS;
type Row = Record<string, unknown>;

export class PortfolioCmsValidationError extends Error {
  readonly issues: string[];

  constructor(issues: string[]) {
    super(
      `Google Sheets portfolio content is invalid:\n- ${issues.join("\n- ")}`,
    );
    this.name = "PortfolioCmsValidationError";
    this.issues = issues;
  }
}

function getSheetName(range: string | undefined): SheetName | undefined {
  const name = range?.split("!")[0]?.replaceAll("'", "");
  return name && name in EXPECTED_HEADERS ? (name as SheetName) : undefined;
}

function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function rowsFromRange(
  sheetName: SheetName,
  valueRange: GoogleSheetsValueRange | undefined,
  issues: string[],
): Row[] {
  if (!valueRange) {
    issues.push(`${sheetName}: required tab or range was not returned`);
    return [];
  }

  const values = valueRange.values ?? [];
  const expectedHeaders = EXPECTED_HEADERS[sheetName];
  const actualHeaders = (values[0] ?? []).map(cell);

  if (
    actualHeaders.length !== expectedHeaders.length ||
    expectedHeaders.some((header, index) => actualHeaders[index] !== header)
  ) {
    issues.push(
      `${sheetName}: header row must be exactly: ${expectedHeaders.join(", ")}`,
    );
    return [];
  }

  return values.slice(1).flatMap((valuesRow) => {
    if (valuesRow.every((value) => cell(value) === "")) return [];
    return [
      Object.fromEntries(
        expectedHeaders.map((header, index) => [header, valuesRow[index]]),
      ),
    ];
  });
}

function required(
  row: Row,
  key: string,
  location: string,
  issues: string[],
): string {
  const value = cell(row[key]);
  if (!value) issues.push(`${location}.${key}: required value is empty`);
  return value;
}

function optional(row: Row, key: string): string | undefined {
  const value = cell(row[key]);
  return value || undefined;
}

function parseInteger(
  value: unknown,
  location: string,
  issues: string[],
): number {
  const parsed = Number(cell(value));
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    issues.push(`${location}: must be a non-negative integer`);
    return 0;
  }
  return parsed;
}

function parseBoolean(
  value: unknown,
  location: string,
  issues: string[],
): boolean {
  if (value === true || cell(value).toLowerCase() === "true") return true;
  if (value === false || cell(value).toLowerCase() === "false") return false;
  issues.push(`${location}: must be TRUE or FALSE`);
  return false;
}

function parseCsv(value: unknown): string[] {
  return cell(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateUnique(
  values: string[],
  location: string,
  issues: string[],
): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) issues.push(`${location}: duplicate value "${value}"`);
    seen.add(value);
  }
}

function validateHttpUrl(
  value: string | undefined,
  location: string,
  issues: string[],
): void {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      issues.push(`${location}: must use https:// or http://`);
    }
  } catch {
    issues.push(`${location}: must be a valid URL`);
  }
}

function validateLinkUrl(
  value: string,
  location: string,
  issues: string[],
): void {
  if (value.startsWith("/")) return;
  try {
    const url = new URL(value);
    if (!["https:", "http:", "mailto:"].includes(url.protocol)) {
      issues.push(
        `${location}: must be a local path, http(s) URL, or mailto URL`,
      );
    }
  } catch {
    issues.push(`${location}: must be a valid local path or URL`);
  }
}

function publishedRows(
  rows: Row[],
  sheetName: SheetName,
  issues: string[],
): Row[] {
  return rows.filter((row, index) => {
    const state = cell(row.state).toLowerCase();
    if (!["draft", "published", "archived"].includes(state)) {
      issues.push(
        `${sheetName} row ${index + 2}.state: must be draft, published, or archived`,
      );
    }
    return state === "published";
  });
}

function mapKeyValues(
  rows: Row[],
  sheetName: "Control" | "Profile",
  issues: string[],
): Map<string, string> {
  const result = new Map<string, string>();
  rows.forEach((row, index) => {
    const key = required(row, "key", `${sheetName} row ${index + 2}`, issues);
    const value = required(
      row,
      "value",
      `${sheetName} row ${index + 2}`,
      issues,
    );
    if (result.has(key)) issues.push(`${sheetName}: duplicate key "${key}"`);
    if (key) result.set(key, value);
  });
  return result;
}

function requireKey(
  values: Map<string, string>,
  key: string,
  sheetName: string,
  issues: string[],
): string {
  const value = values.get(key)?.trim() ?? "";
  if (!value)
    issues.push(`${sheetName}.${key}: required key is missing or empty`);
  return value;
}

export function parsePortfolioContentFromValueRanges(
  valueRanges: GoogleSheetsValueRange[],
  expectedSchemaVersion = "1",
): PortfolioContent {
  const issues: string[] = [];
  const bySheet = new Map<SheetName, GoogleSheetsValueRange>();

  for (const valueRange of valueRanges) {
    const sheetName = getSheetName(valueRange.range);
    if (sheetName) bySheet.set(sheetName, valueRange);
  }

  const controlRows = rowsFromRange("Control", bySheet.get("Control"), issues);
  const profileRows = publishedRows(
    rowsFromRange("Profile", bySheet.get("Profile"), issues),
    "Profile",
    issues,
  );
  const projectRows = publishedRows(
    rowsFromRange("Projects", bySheet.get("Projects"), issues),
    "Projects",
    issues,
  );
  const projectHighlightRows = publishedRows(
    rowsFromRange(
      "ProjectHighlights",
      bySheet.get("ProjectHighlights"),
      issues,
    ),
    "ProjectHighlights",
    issues,
  );
  const experienceRows = publishedRows(
    rowsFromRange("Experience", bySheet.get("Experience"), issues),
    "Experience",
    issues,
  );
  const experienceHighlightRows = publishedRows(
    rowsFromRange(
      "ExperienceHighlights",
      bySheet.get("ExperienceHighlights"),
      issues,
    ),
    "ExperienceHighlights",
    issues,
  );
  const educationRows = publishedRows(
    rowsFromRange("Education", bySheet.get("Education"), issues),
    "Education",
    issues,
  );
  const linkRows = publishedRows(
    rowsFromRange("Links", bySheet.get("Links"), issues),
    "Links",
    issues,
  );

  const control = mapKeyValues(controlRows, "Control", issues);
  const profileValues = mapKeyValues(profileRows, "Profile", issues);
  const schemaVersion = requireKey(
    control,
    "schema_version",
    "Control",
    issues,
  );
  const contentVersion = requireKey(
    control,
    "content_version",
    "Control",
    issues,
  );
  const resumePath = requireKey(control, "resume_path", "Control", issues);

  if (schemaVersion && schemaVersion !== expectedSchemaVersion) {
    issues.push(
      `Control.schema_version: expected "${expectedSchemaVersion}", received "${schemaVersion}"`,
    );
  }
  validateLinkUrl(resumePath, "Control.resume_path", issues);

  const profile = {
    name: requireKey(profileValues, "name", "Profile", issues),
    headline: requireKey(profileValues, "headline", "Profile", issues),
    shortBio: requireKey(profileValues, "short_bio", "Profile", issues),
    about: ["about_1", "about_2", "about_3"]
      .map((key) => profileValues.get(key)?.trim())
      .filter((value): value is string => Boolean(value)),
    location: requireKey(profileValues, "location", "Profile", issues),
    availability: requireKey(profileValues, "availability", "Profile", issues),
    email: requireKey(profileValues, "email", "Profile", issues),
  };
  if (profile.about.length === 0) {
    issues.push(
      "Profile: at least one published about_1, about_2, or about_3 key is required",
    );
  }
  if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
    issues.push("Profile.email: must be a valid email address");
  }

  const projectIds = projectRows.map((row, index) =>
    required(row, "id", `Projects row ${index + 2}`, issues),
  );
  const projectSlugs = projectRows.map((row, index) =>
    required(row, "slug", `Projects row ${index + 2}`, issues),
  );
  validateUnique(projectIds, "Projects.id", issues);
  validateUnique(projectSlugs, "Projects.slug", issues);
  const projectIdSet = new Set(projectIds);

  const projectHighlights = new Map<
    string,
    { value: string; order: number }[]
  >();
  const projectHighlightIds: string[] = [];
  projectHighlightRows.forEach((row, index) => {
    const location = `ProjectHighlights row ${index + 2}`;
    projectHighlightIds.push(required(row, "id", location, issues));
    const projectId = required(row, "project_id", location, issues);
    const highlight = required(row, "highlight", location, issues);
    const order = parseInteger(
      row.sort_order,
      `${location}.sort_order`,
      issues,
    );
    if (projectId && !projectIdSet.has(projectId)) {
      issues.push(
        `${location}.project_id: references unknown project "${projectId}"`,
      );
    }
    const list = projectHighlights.get(projectId) ?? [];
    list.push({ value: highlight, order });
    projectHighlights.set(projectId, list);
  });
  validateUnique(projectHighlightIds, "ProjectHighlights.id", issues);

  const projects = projectRows.map((row, index) => {
    const location = `Projects row ${index + 2}`;
    const id = projectIds[index];
    const repositoryUrl = optional(row, "repository_url");
    const liveUrl = optional(row, "live_url");
    const npmUrl = optional(row, "npm_url");
    const imagePath = optional(row, "image_path");
    validateHttpUrl(repositoryUrl, `${location}.repository_url`, issues);
    validateHttpUrl(liveUrl, `${location}.live_url`, issues);
    validateHttpUrl(npmUrl, `${location}.npm_url`, issues);
    if (imagePath) validateLinkUrl(imagePath, `${location}.image_path`, issues);

    return {
      id,
      slug: projectSlugs[index],
      title: required(row, "title", location, issues),
      shortDescription: required(row, "short_description", location, issues),
      description: required(row, "description", location, issues),
      status: required(row, "status", location, issues),
      year: optional(row, "year"),
      technologies: parseCsv(row.technologies_csv),
      repositoryUrl,
      liveUrl,
      npmUrl,
      imagePath,
      role: optional(row, "role"),
      highlights: (projectHighlights.get(id) ?? [])
        .sort((a, b) => a.order - b.order)
        .map(({ value }) => value),
      featured: parseBoolean(row.featured, `${location}.featured`, issues),
      sortOrder: parseInteger(row.sort_order, `${location}.sort_order`, issues),
    };
  });

  const experienceIds = experienceRows.map((row, index) =>
    required(row, "id", `Experience row ${index + 2}`, issues),
  );
  validateUnique(experienceIds, "Experience.id", issues);
  const experienceIdSet = new Set(experienceIds);
  const experienceHighlights = new Map<
    string,
    { value: string; order: number }[]
  >();
  const experienceHighlightIds: string[] = [];
  experienceHighlightRows.forEach((row, index) => {
    const location = `ExperienceHighlights row ${index + 2}`;
    experienceHighlightIds.push(required(row, "id", location, issues));
    const experienceId = required(row, "experience_id", location, issues);
    const highlight = required(row, "highlight", location, issues);
    const order = parseInteger(
      row.sort_order,
      `${location}.sort_order`,
      issues,
    );
    if (experienceId && !experienceIdSet.has(experienceId)) {
      issues.push(
        `${location}.experience_id: references unknown experience "${experienceId}"`,
      );
    }
    const list = experienceHighlights.get(experienceId) ?? [];
    list.push({ value: highlight, order });
    experienceHighlights.set(experienceId, list);
  });
  validateUnique(experienceHighlightIds, "ExperienceHighlights.id", issues);

  const experience = experienceRows.map((row, index) => {
    const location = `Experience row ${index + 2}`;
    const id = experienceIds[index];
    return {
      id,
      organization: required(row, "organization", location, issues),
      role: required(row, "role", location, issues),
      location: optional(row, "location"),
      startDate: required(row, "start_date", location, issues),
      endDate: optional(row, "end_date"),
      summary: optional(row, "summary"),
      highlights: (experienceHighlights.get(id) ?? [])
        .sort((a, b) => a.order - b.order)
        .map(({ value }) => value),
      technologies: parseCsv(row.technologies_csv),
      sortOrder: parseInteger(row.sort_order, `${location}.sort_order`, issues),
    };
  });

  const educationIds = educationRows.map((row, index) =>
    required(row, "id", `Education row ${index + 2}`, issues),
  );
  validateUnique(educationIds, "Education.id", issues);
  const education = educationRows.map((row, index) => {
    const location = `Education row ${index + 2}`;
    return {
      id: educationIds[index],
      institution: required(row, "institution", location, issues),
      credential: required(row, "credential", location, issues),
      field: optional(row, "field"),
      startDate: optional(row, "start_date"),
      endDate: optional(row, "end_date"),
      summary: optional(row, "summary"),
      sortOrder: parseInteger(row.sort_order, `${location}.sort_order`, issues),
    };
  });

  const allowedLinkTypes = new Set<PortfolioLinkType>([
    "email",
    "github",
    "linkedin",
    "resume",
    "other",
  ]);
  const linkIds = linkRows.map((row, index) =>
    required(row, "id", `Links row ${index + 2}`, issues),
  );
  validateUnique(linkIds, "Links.id", issues);
  const links = linkRows.map((row, index) => {
    const location = `Links row ${index + 2}`;
    const typeValue = required(row, "type", location, issues);
    if (!allowedLinkTypes.has(typeValue as PortfolioLinkType)) {
      issues.push(
        `${location}.type: must be email, github, linkedin, resume, or other`,
      );
    }
    const url = required(row, "url", location, issues);
    validateLinkUrl(url, `${location}.url`, issues);
    return {
      id: linkIds[index],
      type: typeValue as PortfolioLinkType,
      label: required(row, "label", location, issues),
      url,
      sortOrder: parseInteger(row.sort_order, `${location}.sort_order`, issues),
    };
  });

  if (projects.length === 0)
    issues.push("Projects: at least one published row is required");
  if (links.length === 0)
    issues.push("Links: at least one published row is required");

  if (issues.length > 0) throw new PortfolioCmsValidationError(issues);

  return {
    schemaVersion,
    contentVersion,
    profile,
    projects: projects.sort((a, b) => a.sortOrder - b.sortOrder),
    experience: experience.sort((a, b) => a.sortOrder - b.sortOrder),
    education: education.sort((a, b) => a.sortOrder - b.sortOrder),
    links: links.sort((a, b) => a.sortOrder - b.sortOrder),
    resumePath,
  };
}
