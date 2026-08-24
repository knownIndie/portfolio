import type { ExperienceCardProps } from "./types";

export default function ExperienceCard({
  experience,
  detailed = false,
}: ExperienceCardProps) {
  return (
    <article className="v2-experience">
      <div className="v2-experience-copy">
        <h3>{experience.organization}</h3>
        <p>{experience.role}</p>
        {detailed && experience.summary ? (
          <p className="v2-experience-summary">{experience.summary}</p>
        ) : null}
        {detailed && experience.highlights.length > 0 ? (
          <ul className="v2-detail-list">
            {experience.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}
        {detailed ? (
          <ul
            className="v2-stack"
            aria-label={`${experience.organization} technologies`}
          >
            {experience.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="v2-experience-meta">
        <time>
          {experience.startDate} to {experience.endDate || "Present"}
        </time>
        {experience.location ? <span>{experience.location}</span> : null}
      </div>
    </article>
  );
}
