import type { ProjectCardProps } from "./types";

export default function ProjectCard({
  project,
  detailed = false,
}: ProjectCardProps) {
  return (
    <article className="v2-project">
      <div className="v2-project-heading">
        <div>
          <h3>{project.title}</h3>
          {project.role ? (
            <p className="v2-project-role">{project.role}</p>
          ) : null}
        </div>
        <div className="v2-project-meta">
          <span>{project.status}</span>
          {project.year ? <span>{project.year}</span> : null}
        </div>
      </div>
      <p className="v2-project-description">
        {detailed ? project.description : project.shortDescription}
      </p>

      {detailed && project.highlights.length > 0 ? (
        <ul className="v2-detail-list">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}

      <p className="v2-stack" aria-label={`${project.title} technologies`}>
        {project.technologies.join(" · ")}
      </p>

      <div className="v2-project-links">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live demo <span aria-hidden="true">↗</span>
            <span className="v2-sr">, opens in a new tab</span>
          </a>
        ) : null}
        {project.repositoryUrl ? (
          <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
            Source <span aria-hidden="true">↗</span>
            <span className="v2-sr">, opens in a new tab</span>
          </a>
        ) : null}
        {project.npmUrl ? (
          <a href={project.npmUrl} target="_blank" rel="noreferrer">
            npm <span aria-hidden="true">↗</span>
            <span className="v2-sr">, opens in a new tab</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
