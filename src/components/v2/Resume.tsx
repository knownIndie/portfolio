import ExperienceCard from "./ExperienceCard";
import type { V2Props } from "./types";
import { getModernExperience } from "@/lib/portfolio/modern";

export default function Resume({ content }: V2Props) {
  const experiences = getModernExperience(content);

  return (
    <main id="main-content" className="v2-page">
      <header className="v2-page-heading v2-page-heading-action">
        <div>
          <p>Resume</p>
          <h1>Experience and working history.</h1>
        </div>
        <a className="v2-text-button" href={content.resumePath} download>
          Download PDF <span aria-hidden="true">↓</span>
        </a>
      </header>
      <div className="v2-experience-list v2-experience-list-detailed">
        {experiences.map((experience) => (
          <ExperienceCard
            detailed
            experience={experience}
            key={experience.id}
          />
        ))}
      </div>
      <div className="v2-resume-frame">
        <iframe
          loading="lazy"
          src={content.resumePath}
          title={`${content.profile.name} resume`}
        />
      </div>
    </main>
  );
}
