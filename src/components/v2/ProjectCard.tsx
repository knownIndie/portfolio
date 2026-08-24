import type { ProjectCardProps } from "./types";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  project,
  detailed = false,
}: ProjectCardProps) {
  const localImagePath = project.imagePath?.startsWith("/")
    ? project.imagePath
    : null;
  const detailHref = `/projects/${project.slug}`;

  return (
    <article className="v2-project">
      <Link
        aria-label={`View ${project.title} project details`}
        className="v2-project-card-link"
        href={detailHref}
      />
      {localImagePath ? (
        <div className="v2-project-media">
          <Image
            src={localImagePath}
            alt={`${project.title} preview`}
            width={1400}
            height={800}
            sizes="(max-width: 720px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className="v2-project-media v2-project-media-placeholder">
          <span>{project.title}</span>
          <span>{project.status}</span>
        </div>
      )}

      <div className="v2-project-body">
        <div className="v2-project-heading">
          <div>
            <h3>{project.title}</h3>
            {project.role ? (
              <p className="v2-project-role">{project.role}</p>
            ) : null}
            <ul
              className="v2-project-techs"
              aria-label={`${project.title} technologies`}
            >
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
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

        <div className="v2-project-links">
          <Link className="v2-project-detail-link" href={detailHref}>
            View project <span aria-hidden="true">↗</span>
          </Link>
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
      </div>
    </article>
  );
}
