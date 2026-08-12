import V1ProjectLinks from "@/components/v1/pages/V1ProjectLinks";
import { sortedProjects } from "@/components/v1/shared";
import V1VersionSwitch from "@/components/v1/shell/V1VersionSwitch";
import type { PortfolioContent } from "@/lib/portfolio/types";
import Image from "next/image";

type V1ProjectsProps = {
  content: PortfolioContent;
};

export default function V1Projects({ content }: V1ProjectsProps) {
  const projects = sortedProjects(content);
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const others = projects.filter((project) => project.id !== featured?.id);

  return (
    <main id="main-content" className="v1-page">
      <V1VersionSwitch canonicalPath="/projects" />
      <header className="v1-projects-header">
        <p className="v1-mono v1-eyebrow">Portfolio</p>
        <h1>Case studies & builds</h1>
        <p>
          Selected projects with a focus on useful workflows, clean design, and
          reliable implementation.
        </p>
      </header>

      {featured ? (
        <section className="v1-card-strong v1-featured v1-projects-featured">
          <div className="v1-featured-header">
            <div>
              <p className="v1-mono v1-eyebrow">Featured</p>
              <h2>{featured.title}</h2>
              {featured.role ? (
                <p className="v1-role">{featured.role}</p>
              ) : null}
              <p className="v1-featured-copy">{featured.description}</p>
            </div>
            <V1ProjectLinks project={featured} prominent />
          </div>
          {featured.highlights.length ? (
            <div className="v1-highlight-grid">
              {featured.highlights.map((highlight) => (
                <div key={highlight}>{highlight}</div>
              ))}
            </div>
          ) : null}
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
          <div className="v1-tags">
            {featured.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </section>
      ) : null}

      <section className="v1-project-grid v1-all-projects">
        {others.map((project) => (
          <article key={project.id} className="v1-card v1-project-card">
            <div className="v1-project-card-title">
              <h2>{project.title}</h2>
              {project.year ? <span>{project.year}</span> : null}
            </div>
            <p>{project.description}</p>
            <div className="v1-tags">
              {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <V1ProjectLinks project={project} />
          </article>
        ))}
      </section>
    </main>
  );
}
