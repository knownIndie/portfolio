import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return ["", "/about", "/projects", "/resume"].map((pathname) => ({
    url: `${baseUrl}${pathname}`,
    changeFrequency: "monthly" as const,
    priority: pathname === "" ? 1 : 0.8,
  }));
}
