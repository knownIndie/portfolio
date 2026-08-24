import GitHubActivity from "./GitHubActivity";
import GitHubContributions from "./GitHubContributions";
import ExperienceCard from "./ExperienceCard";
import ProjectCard from "./ProjectCard";
import type { V2Props } from "./types";
import Link from "next/link";
import { getModernExperience, getModernProjects } from "@/lib/portfolio/modern";

const heroTechnologies = [
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "AI tooling",
] as const;

export default function Home({ content }: V2Props) {
  const projects = getModernProjects(content).slice(0, 4);
  const firstName = content.profile.name.split(" ")[0];
  const profileLinks = [...content.links]
    .filter((link) => ["github", "linkedin", "email"].includes(link.type))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const experiences = getModernExperience(content)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 2);

  return (
    <main id="main-content">
      <section className="v2-profile" aria-labelledby="profile-name">
        <div className="v2-monogram" aria-hidden="true">
          AB
        </div>
        <h1 id="profile-name" className="v2-hero-title">
          Hi, I&apos;m {firstName}. <span>{content.profile.headline}</span>
        </h1>
        <p className="v2-hero-copy">{content.profile.shortBio}</p>

        <div className="v2-hero-stack" aria-label="Primary technologies">
          <span>I build with</span>
          {heroTechnologies.map((technology) => (
            <span className="v2-tech-pill" key={technology}>
              {technology}
            </span>
          ))}
          <span>and care about the path from request to result.</span>
        </div>

        <div className="v2-hero-actions">
          <a className="v2-button v2-button-outline" href={content.resumePath}>
            Resume / CV <span aria-hidden="true">↗</span>
          </a>
          <a
            className="v2-button v2-button-solid"
            href={`mailto:${content.profile.email}`}
          >
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>

        <p className="v2-availability">
          <span aria-hidden="true" />
          {content.profile.availability} · {content.profile.location}
        </p>

        <div className="v2-social-links" aria-label="Profile links">
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

      <GitHubContributions />

      <section className="v2-section" aria-labelledby="selected-projects">
        <div className="v2-sectionhead">
          <div>
            <p className="v2-section-kicker">Selected work</p>
            <h2 id="selected-projects">Projects I can explain end to end.</h2>
          </div>
          <Link className="v2-link" href="/projects">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="v2-project-list">
          {projects.map((project) => (
            <ProjectCard detailed project={project} key={project.id} />
          ))}
        </div>
      </section>

      <GitHubActivity />

      <section className="v2-section" aria-labelledby="experience-heading">
        <div className="v2-sectionhead">
          <div>
            <p className="v2-section-kicker">Experience</p>
            <h2 id="experience-heading">Where I have been building.</h2>
          </div>
          <a className="v2-link" href="/resume">
            Full resume <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="v2-experience-list">
          {experiences.map((experience) => (
            <ExperienceCard
              detailed
              experience={experience}
              key={experience.id}
            />
          ))}
        </div>
      </section>

      <section
        className="v2-section v2-about-preview"
        aria-labelledby="about-heading"
      >
        <div>
          <p className="v2-section-kicker">About</p>
          <h2 id="about-heading">A practical route into AI engineering.</h2>
        </div>
        <div className="v2-prose">
          {content.profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="v2-contact" aria-labelledby="contact-heading">
        <div>
          <p className="v2-section-kicker">Contact</p>
          <h2 id="contact-heading">Have a role or problem worth discussing?</h2>
          <p>{content.profile.availability}.</p>
        </div>
        <a
          className="v2-button v2-button-solid"
          href={`mailto:${content.profile.email}`}
        >
          Send an email <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
