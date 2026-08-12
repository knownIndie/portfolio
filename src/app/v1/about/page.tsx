import type { Metadata } from "next";
import V1About from "@/components/v1/pages/V1About";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default async function ClassicAboutPage() {
  const content = await getPortfolioContent();
  return <V1About content={content} />;
}
