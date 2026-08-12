import type { ProjectCardProps } from "./types";

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="v2-card">
      <div className="v2-meta">
        <span>{project.status}</span>
        {project.year ? <span>{project.year}</span> : null}
      </div>
      <h3>{project.title}</h3>
      <p>{project.shortDescription}</p>

      {project.highlights.length > 0 ? (
        <ul className="v2-list">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}

      <div className="v2-tags" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <span className="v2-tag" key={technology}>
            {technology}
          </span>
        ))}
      </div>

      <div className="v2-actions">
        {project.liveUrl ? (
          <a
            className="v2-link"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
          >
            Live <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {project.repositoryUrl ? (
          <a
            className="v2-link"
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            Source <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {project.npmUrl ? (
          <a
            className="v2-link"
            href={project.npmUrl}
            target="_blank"
            rel="noreferrer"
          >
            npm <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
