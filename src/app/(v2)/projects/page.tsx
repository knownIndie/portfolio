import type { Metadata } from "next";
import V2Projects from "@/components/v2/pages/V2Projects";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected products and engineering work by Aryan Bhardwaj.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const content = await getPortfolioContent();
  return <V2Projects content={content} />;
}
