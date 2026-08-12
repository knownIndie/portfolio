import type {
  PortfolioContent,
  PortfolioExperience,
  PortfolioProject,
} from "@/lib/portfolio/types";
export type V2Props = { content: PortfolioContent };
export type ProjectCardProps = {
  project: PortfolioProject;
  detailed?: boolean;
};
export type ExperienceCardProps = {
  experience: PortfolioExperience;
  detailed?: boolean;
};
