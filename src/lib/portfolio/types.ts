export type PortfolioLinkType =
  | "email"
  | "github"
  | "linkedin"
  | "resume"
  | "other";

export type PortfolioProfile = {
  name: string;
  headline: string;
  shortBio: string;
  about: string[];
  location: string;
  availability: string;
  email: string;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  status: string;
  year?: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  npmUrl?: string;
  imagePath?: string;
  role?: string;
  highlights: string[];
  featured: boolean;
  sortOrder: number;
};

export type PortfolioExperience = {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
  technologies: string[];
  sortOrder: number;
};

export type PortfolioEducation = {
  id: string;
  institution: string;
  credential: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  sortOrder: number;
};

export type PortfolioLink = {
  id: string;
  type: PortfolioLinkType;
  label: string;
  url: string;
  sortOrder: number;
};

export type PortfolioContent = {
  schemaVersion: string;
  contentVersion: string;
  profile: PortfolioProfile;
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  links: PortfolioLink[];
  resumePath: string;
};
