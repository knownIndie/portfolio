import V1ProjectLinks from "@/components/v1/pages/V1ProjectLinks";
import {
  findLink,
  formatDateRange,
  sortedProjects,
} from "@/components/v1/shared";
import type { PortfolioContent } from "@/lib/portfolio/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type V1HomeProps = {
  content: PortfolioContent;
};

export default function V1Home({ content }: V1HomeProps) {
  const projects = sortedProjects(content);
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const selected = projects
    .filter((project) => project.id !== featured?.id)
    .slice(0, 2);
  const email =
    findLink(content, "email")?.url ?? `mailto:${content.profile.email}`;
  const linkedin = findLink(content, "linkedin");
  const stack = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  ).slice(0, 5);

  return (
    <main id="main-content" className="v1-home">
      <section className="v1-card-strong v1-hero v1-reveal">
        <div>
          <p className="v1-mono v1-eyebrow">
            Full-Stack Developer · {content.profile.location}
          </p>
          <h1>{content.profile.headline}</h1>
          <p className="v1-hero-copy">{content.profile.shortBio}</p>
        </div>
        <div className="v1-hero-actions">
          <Link href="/v1/resume" className="v1-primary-button">
            View Resume
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <a href={email} className="v1-secondary-button">
            Contact
          </a>
        </div>
        <div className="v1-hero-facts">
          <div>
            <p className="v1-mono">Focus</p>
            <p>Product UX, backend logic, and reliable workflows.</p>
          </div>
          <div>
            <p className="v1-mono">Stack</p>
            <p>{stack.join(", ")}.</p>
          </div>
          <div>
            <p className="v1-mono">Currently</p>
            <p>{content.profile.availability}.</p>
          </div>
        </div>
      </section>

      <section
        className="v1-card v1-credibility v1-reveal v1-delay-1"
        aria-label="Profile summary"
      >
        <div>
          <span className="v1-mono">Projects</span>
          <strong>{projects.length} documented builds</strong>
        </div>
        <div>
          <span className="v1-mono">Core stack</span>
          <strong>{stack.slice(0, 3).join(" + ")}</strong>
        </div>
        <div>
          <span className="v1-mono">Availability</span>
          <strong>{content.profile.availability}</strong>
        </div>
      </section>

      {featured ? (
        <section className="v1-card-strong v1-featured v1-reveal v1-delay-2">
          <div className="v1-featured-header">
            <div>
              <p className="v1-mono v1-eyebrow">Featured Case Study</p>
              <h2>{featured.title}</h2>
              {featured.role ? (
                <p className="v1-role">{featured.role}</p>
              ) : null}
              <p className="v1-featured-copy">{featured.description}</p>
            </div>
            <V1ProjectLinks project={featured} prominent />
          </div>
          {featured.imagePath ? (
            <div className="v1-project-image">
              <Image
                src={featured.imagePath}
                alt={`${featured.title} preview`}
                width={1400}
                height={800}
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          ) : null}
          {featured.highlights.length ? (
            <div className="v1-highlight-grid">
              {featured.highlights.map((highlight) => (
                <div key={highlight}>{highlight}</div>
              ))}
            </div>
          ) : null}
          <div className="v1-tags">
            {featured.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>
      ) : null}

      {selected.length ? (
        <section className="v1-project-section v1-reveal v1-delay-2">
          <div className="v1-section-heading">
            <div>
              <p className="v1-mono v1-eyebrow">Selected projects</p>
              <h2>Learning builds from my full-stack journey</h2>
            </div>
            <Link href="/v1/projects" className="v1-view-all">
              View all <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="v1-project-grid">
            {selected.map((project) => (
              <article key={project.id} className="v1-card v1-project-card">
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <div className="v1-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
                <V1ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {content.experience.length || content.education.length ? (
        <section className="v1-card v1-timeline v1-reveal v1-delay-3">
          <div className="v1-section-heading">
            <div>
              <p className="v1-mono v1-eyebrow">Experience</p>
              <h2>Work & study timeline</h2>
            </div>
          </div>
          <div className="v1-timeline-grid">
            <div>
              <h3>Experience</h3>
              <ol>
                {[...content.experience]
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((item) => (
                    <li key={item.id}>
                      <span className="v1-timeline-dot" aria-hidden="true" />
                      <h4>{item.organization}</h4>
                      <p>{item.role}</p>
                      <time>
                        {formatDateRange(item.startDate, item.endDate)}
                      </time>
                      {item.highlights.length ? (
                        <ul>
                          {item.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
              </ol>
            </div>
            <div>
              <h3>Education</h3>
              <ol>
                {[...content.education]
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((item) => (
                    <li key={item.id}>
                      <span
                        className="v1-timeline-dot v1-timeline-dot-teal"
                        aria-hidden="true"
                      />
                      <h4>{item.credential}</h4>
                      <p>
                        {item.field ? `${item.field} · ` : ""}
                        {item.institution}
                      </p>
                      <time>
                        {formatDateRange(item.startDate, item.endDate)}
                      </time>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </section>
      ) : null}

      <section className="v1-card v1-contact v1-reveal v1-delay-3">
        <div>
          <p className="v1-mono v1-eyebrow">Let’s talk</p>
          <h2>Interested in working together?</h2>
          <p>{content.profile.availability}.</p>
        </div>
        <div className="v1-contact-actions">
          <a href={email} className="v1-primary-button">
            Email Me <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {linkedin ? (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="v1-secondary-button"
            >
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}
