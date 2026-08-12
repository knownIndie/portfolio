import { findLink } from "@/components/v1/shared";
import type { PortfolioContent } from "@/lib/portfolio/types";

type V1AboutProps = {
  content: PortfolioContent;
};

export default function V1About({ content }: V1AboutProps) {
  const linkedin = findLink(content, "linkedin");
  const technologies = Array.from(
    new Set(content.projects.flatMap((project) => project.technologies)),
  );

  return (
    <main id="main-content" className="v1-page">
      <article className="v1-card-strong v1-page-card">
        <header className="v1-page-header">
          <p className="v1-mono v1-eyebrow">About</p>
          <h1>{content.profile.headline}</h1>
        </header>

        <section className="v1-prose">
          {content.profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {technologies.length ? (
            <p>Tooling: {technologies.join(", ")}.</p>
          ) : null}
        </section>

        <div className="v1-section-divider" />

        <section className="v1-about-grid">
          <div>
            <h2>What I’m looking for</h2>
            <p>{content.profile.availability}.</p>
          </div>
          <div>
            <h2>Where I work</h2>
            <p>{content.profile.location}.</p>
          </div>
        </section>

        <footer className="v1-article-footer">
          Let’s connect:{" "}
          <a href={`mailto:${content.profile.email}`}>
            {content.profile.email}
          </a>
          {linkedin ? (
            <>
              {" · "}
              <a href={linkedin.url} target="_blank" rel="noreferrer">
                {linkedin.label}
              </a>
            </>
          ) : null}
        </footer>
      </article>
    </main>
  );
}
