import type { Metadata } from "next";
import V1Home from "@/components/v1/pages/V1Home";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function ClassicHomePage() {
  const content = await getPortfolioContent();
  return <V1Home content={content} />;
}
