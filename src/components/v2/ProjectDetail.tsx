import Image from "next/image";
import Link from "next/link";
import type { GitHubProjectContribution } from "@/lib/github";
import type { PortfolioProject } from "@/lib/portfolio/types";

type ProjectDetailProps = {
  project: PortfolioProject;
  contributions: GitHubProjectContribution[];
};

function formatContributionDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ProjectDetail({
  project,
  contributions,
}: ProjectDetailProps) {
  const localImagePath = project.imagePath?.startsWith("/")
    ? project.imagePath
    : null;

  return (
    <main id="main-content" className="v2-page v2-project-detail">
      <Link className="v2-detail-back" href="/projects">
        <span aria-hidden="true">←</span> All projects
      </Link>

      <header className="v2-detail-hero">
        <div className="v2-detail-meta">
          <span>{project.status}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <h1>{project.title}</h1>
        <p className="v2-detail-lede">{project.shortDescription}</p>
        <div className="v2-detail-actions">
          {project.liveUrl ? (
            <a
              className="v2-button v2-button-solid"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <span aria-hidden="true">↗</span>
              <span className="v2-sr">, opens in a new tab</span>
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a
              className="v2-button v2-button-outline"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source <span aria-hidden="true">↗</span>
              <span className="v2-sr">, opens in a new tab</span>
            </a>
          ) : null}
          {project.npmUrl ? (
            <a
              className="v2-button v2-button-outline"
              href={project.npmUrl}
              target="_blank"
              rel="noreferrer"
            >
              npm <span aria-hidden="true">↗</span>
              <span className="v2-sr">, opens in a new tab</span>
            </a>
          ) : null}
        </div>
      </header>

      {localImagePath ? (
        <div className="v2-detail-image">
          <Image
            src={localImagePath}
            alt={`${project.title} preview`}
            width={1400}
            height={800}
            sizes="(max-width: 900px) 100vw, 68rem"
            priority
          />
        </div>
      ) : null}

      <div className="v2-detail-layout">
        <section className="v2-detail-section" aria-labelledby="build-heading">
          <p className="v2-section-kicker">The project</p>
          <h2 id="build-heading">What I built</h2>
          <p className="v2-detail-description">{project.description}</p>
          {project.highlights.length > 0 ? (
            <ul className="v2-detail-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}
        </section>

        <aside className="v2-detail-aside" aria-labelledby="stack-heading">
          <p className="v2-section-kicker">Implementation</p>
          <h2 id="stack-heading">Stack</h2>
          <ul className="v2-detail-stack">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {project.role ? (
            <p className="v2-detail-role">
              <span>Role</span>
              {project.role}
            </p>
          ) : null}
        </aside>
      </div>

      <section
        className="v2-detail-contributions"
        aria-labelledby="project-contributions-heading"
      >
        <div className="v2-sectionhead">
          <div>
            <p className="v2-section-kicker">GitHub evidence</p>
            <h2 id="project-contributions-heading">Project contributions</h2>
          </div>
          {project.repositoryUrl ? (
            <a
              className="v2-link"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              Full history <span aria-hidden="true">↗</span>
              <span className="v2-sr">, opens in a new tab</span>
            </a>
          ) : null}
        </div>

        {contributions.length > 0 ? (
          <ul className="v2-project-contribution-list">
            {contributions.map((contribution) => (
              <li className="v2-project-contribution" key={contribution.id}>
                <span
                  aria-hidden="true"
                  className="v2-project-contribution-marker"
                />
                <a
                  href={contribution.commitUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contribution.message}
                  <span aria-hidden="true">↗</span>
                  <span className="v2-sr">, opens in a new tab</span>
                </a>
                <time dateTime={contribution.date}>
                  {formatContributionDate(contribution.date)}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="v2-empty-state">
            Recent authored commits are available in the project repository.
          </p>
        )}
      </section>
    </main>
  );
}
