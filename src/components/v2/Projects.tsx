import ProjectCard from "./ProjectCard";
import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function Projects({ content }: V2Props) {
  const projects = [...content.projects].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <main id="main-content" className="v2-page">
      <VersionSwitch classicHref="/v1/projects" />
      <header className="v2-page-heading">
        <p>Projects</p>
        <h1>Products and tools I have shipped.</h1>
        <span>
          Three focused case summaries with implementation evidence and direct
          proof links.
        </span>
      </header>
      <div className="v2-project-list v2-project-list-detailed">
        {projects.map((project) => (
          <ProjectCard detailed project={project} key={project.id} />
        ))}
      </div>
    </main>
  );
}
