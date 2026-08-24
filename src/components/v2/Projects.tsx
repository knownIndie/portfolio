import ProjectCard from "./ProjectCard";
import type { V2Props } from "./types";
import { getModernProjects } from "@/lib/portfolio/modern";

export default function Projects({ content }: V2Props) {
  const projects = getModernProjects(content);

  return (
    <main id="main-content" className="v2-page">
      <header className="v2-page-heading">
        <p>Projects</p>
        <h1>Products and tools I am building.</h1>
        <span>
          Selected work with implementation evidence and direct proof links.
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
