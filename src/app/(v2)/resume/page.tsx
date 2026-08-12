import type { Metadata } from "next";
import V2Resume from "@/components/v2/pages/V2Resume";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and professional summary for Aryan Bhardwaj.",
  alternates: { canonical: "/resume" },
};

export default async function ResumePage() {
  const content = await getPortfolioContent();
  return <V2Resume content={content} />;
}
