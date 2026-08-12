import ProjectCard from "./ProjectCard";
import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function Projects({ content }: V2Props) {
  const projects = [...content.projects].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <main id="main-content" className="v2-section">
      <VersionSwitch classicHref="/v1/projects" />
      <p className="v2-eyebrow">Selected proof</p>
      <h1 className="v2-heading">Projects</h1>
      <p className="v2-lede">
        A focused set of products and tools with the implementation details and
        proof links needed for a technical review.
      </p>
      <div className="v2-grid v2-project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </main>
  );
}
