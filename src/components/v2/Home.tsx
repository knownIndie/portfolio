import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function Home({ content }: V2Props) {
  const featured = content.projects
    .filter((project) => project.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main id="main-content">
      <VersionSwitch classicHref="/v1" />

      <section className="v2-hero">
        <div>
          <p className="v2-eyebrow">
            Full-stack TypeScript developer · {content.profile.location}
          </p>
          <h1 className="v2-heading">{content.profile.headline}</h1>
          <p className="v2-lede">{content.profile.shortBio}</p>
          <div className="v2-actions">
            <a className="v2-button primary" href="/projects">
              View selected work
            </a>
            <a className="v2-button" href="/resume">
              View resume
            </a>
          </div>
        </div>

        <aside className="v2-proof" aria-label="Portfolio summary">
          <strong>{content.projects.length}</strong>
          <p>documented products and developer tools.</p>
          <strong>{content.experience.length}</strong>
          <p>documented experience entry with implementation evidence.</p>
        </aside>
      </section>

      <section className="v2-section" aria-labelledby="selected-projects">
        <div className="v2-sectionhead">
          <div>
            <p className="v2-eyebrow">Selected proof</p>
            <h2 id="selected-projects">Projects</h2>
          </div>
          <a className="v2-link" href="/projects">
            See all projects <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="v2-grid">
          {featured.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="v2-section" aria-labelledby="experience-heading">
        <div className="v2-sectionhead">
          <div>
            <p className="v2-eyebrow">Where I have worked</p>
            <h2 id="experience-heading">Experience</h2>
          </div>
        </div>
        <div className="v2-timeline">
          {content.experience.slice(0, 3).map((experience) => (
            <ExperienceCard experience={experience} key={experience.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
