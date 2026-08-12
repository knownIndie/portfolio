import type { Metadata } from "next";
import V1Projects from "@/components/v1/pages/V1Projects";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};

export default async function ClassicProjectsPage() {
  const content = await getPortfolioContent();
  return <V1Projects content={content} />;
}
