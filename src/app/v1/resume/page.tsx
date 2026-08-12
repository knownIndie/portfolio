import type { Metadata } from "next";
import V1Resume from "@/components/v1/pages/V1Resume";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume",
  alternates: { canonical: "/resume" },
};

export default async function ClassicResumePage() {
  const content = await getPortfolioContent();
  return <V1Resume content={content} />;
}
