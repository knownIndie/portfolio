import type { ExperienceCardProps } from "./types";
export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article>
      <time>
        {experience.startDate} — {experience.endDate || "Present"}
      </time>
      <div>
        <h3>
          {experience.role} · {experience.organization}
        </h3>
        {experience.summary && <p>{experience.summary}</p>}
        <div className="v2-tags">
          {experience.technologies.map((t) => (
            <span className="v2-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <ul className="v2-list">
          {experience.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
