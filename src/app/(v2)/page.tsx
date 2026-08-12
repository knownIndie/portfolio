import V2Home from "@/components/v2/pages/V2Home";
import { getPortfolioContent } from "@/lib/portfolio/content";

export const dynamic = "force-static";

export default async function HomePage() {
  const content = await getPortfolioContent();
  return <V2Home content={content} />;
}
