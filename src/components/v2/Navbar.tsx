import type { V2Props } from "./types";
import Link from "next/link";
export default function Navbar({ content }: V2Props) {
  return (
    <nav className="v2-nav" aria-label="Primary navigation">
      <Link className="v2-link" href="/">
        <strong>{content.profile.name}</strong>
      </Link>
      <div className="v2-navlinks">
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/resume">Resume</a>
        <a
          className="v2-button primary"
          href={`mailto:${content.profile.email}`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
