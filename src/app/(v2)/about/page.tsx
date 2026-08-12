import type { Metadata } from "next";
import V2About from "@/components/v2/pages/V2About";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Aryan Bhardwaj and how he approaches full-stack product development.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const content = await getPortfolioContent();
  return <V2About content={content} />;
}
