import type { V2Props } from "./types";
import ModernLayout from "./ModernLayout";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Resume from "./Resume";
export default function PageSwitch({
  content,
  path = "/",
}: {
  content: V2Props["content"];
  path?: string;
}) {
  const page =
    path === "/about" ? (
      <About content={content} />
    ) : path === "/projects" ? (
      <Projects content={content} />
    ) : path === "/resume" ? (
      <Resume content={content} />
    ) : (
      <Home content={content} />
    );
  return <ModernLayout content={content}>{page}</ModernLayout>;
}
