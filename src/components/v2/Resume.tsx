import ExperienceCard from "./ExperienceCard";
import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function Resume({ content }: V2Props) {
  return (
    <main id="main-content" className="v2-section">
      <VersionSwitch classicHref="/v1/resume" />
      <div className="v2-sectionhead">
        <div>
          <p className="v2-eyebrow">Recruiter view</p>
          <h1 className="v2-heading">Resume</h1>
        </div>
        <a className="v2-button primary" href={content.resumePath} download>
          Download PDF
        </a>
      </div>
      <div className="v2-timeline">
        {content.experience.map((experience) => (
          <ExperienceCard experience={experience} key={experience.id} />
        ))}
      </div>
      <div className="v2-resume-frame">
        <iframe
          src={content.resumePath}
          title={`${content.profile.name} resume`}
        />
      </div>
    </main>
  );
}
