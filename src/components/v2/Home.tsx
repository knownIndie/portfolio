import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import type { V2Props } from "./types";

export default function Home({ content }: V2Props) {
  const projects = [...content.projects]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 3);
  const profileLinks = [...content.links]
    .filter((link) =>
      ["github", "linkedin", "email", "resume"].includes(link.type),
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main id="main-content">
      <section className="v2-profile" aria-labelledby="profile-name">
        <div className="v2-identity">
          <div className="v2-monogram" aria-hidden="true">
            AB
          </div>
          <div>
            <h1 id="profile-name">{content.profile.name}</h1>
            <p>Full-stack TypeScript developer</p>
            <a href={`mailto:${content.profile.email}`}>
              {content.profile.email}
            </a>
          </div>
        </div>
        <p className="v2-intro">{content.profile.shortBio}</p>
        <p className="v2-availability">
          <span aria-hidden="true" />
          {content.profile.availability} · {content.profile.location}
        </p>
        <div className="v2-profile-links" aria-label="Profile links">
          {profileLinks.map((link) => {
            const external = link.url.startsWith("http");

            return (
              <a
                href={link.url}
                key={link.id}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {link.label}
                {external ? <span aria-hidden="true"> ↗</span> : null}
                {external ? (
                  <span className="v2-sr">, opens in a new tab</span>
                ) : null}
              </a>
            );
          })}
        </div>
      </section>

      <section className="v2-section" aria-labelledby="selected-projects">
        <div className="v2-sectionhead">
          <h2 id="selected-projects">Selected projects</h2>
          <a className="v2-link" href="/projects">
            Project details
          </a>
        </div>
        <div className="v2-project-list">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="v2-section" aria-labelledby="experience-heading">
        <div className="v2-sectionhead">
          <h2 id="experience-heading">Experience</h2>
          <a className="v2-link" href="/resume">
            Full resume
          </a>
        </div>
        <div className="v2-experience-list">
          {content.experience.slice(0, 3).map((experience) => (
            <ExperienceCard experience={experience} key={experience.id} />
          ))}
        </div>
      </section>

      <section className="v2-contact" aria-labelledby="contact-heading">
        <div>
          <h2 id="contact-heading">Let&apos;s work together.</h2>
          <p>{content.profile.availability}.</p>
        </div>
        <a className="v2-text-button" href={`mailto:${content.profile.email}`}>
          Send an email <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
