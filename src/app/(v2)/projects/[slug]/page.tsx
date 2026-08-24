import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/v2/ProjectDetail";
import { getGitHubProjectContributions } from "@/lib/github";
import { getPortfolioContent } from "@/lib/portfolio/content";
import { getModernProjects } from "@/lib/portfolio/modern";

export const dynamic = "force-static";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  const content = await getPortfolioContent();
  return getModernProjects(content).find((project) => project.slug === slug);
}

export async function generateStaticParams() {
  const content = await getPortfolioContent();

  return getModernProjects(content).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Aryan Bhardwaj`,
      description: project.description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Aryan Bhardwaj`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const contributions = await getGitHubProjectContributions(
    project.repositoryUrl,
  );

  return <ProjectDetail contributions={contributions} project={project} />;
}
