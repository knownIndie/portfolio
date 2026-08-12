import type { PortfolioProject } from "@/lib/portfolio/types";
import { ArrowUpRight } from "lucide-react";

type V1ProjectLinksProps = {
  project: PortfolioProject;
  prominent?: boolean;
};

export default function V1ProjectLinks({
  project,
  prominent = false,
}: V1ProjectLinksProps) {
  const className = prominent ? "v1-project-action" : "v1-text-link";

  return (
    <div className={prominent ? "v1-project-actions" : "v1-inline-links"}>
      {project.repositoryUrl ? (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          GitHub
          {prominent ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
        </a>
      ) : null}
      {project.npmUrl ? (
        <a
          href={project.npmUrl}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          npm{prominent ? " package" : ""}
          {prominent ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
        </a>
      ) : null}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className={
            prominent
              ? "v1-project-action v1-project-action-accent"
              : "v1-text-link v1-text-link-accent"
          }
        >
          {prominent ? "Live Site" : "Live Demo"}
          {prominent ? <ArrowUpRight size={14} aria-hidden="true" /> : null}
        </a>
      ) : null}
    </div>
  );
}
