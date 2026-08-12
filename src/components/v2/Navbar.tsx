import type { V2Props } from "./types";
import Link from "next/link";
import VersionSwitch from "./VersionSwitch";

export default function Navbar({ content }: V2Props) {
  return (
    <nav className="v2-nav" aria-label="Primary navigation">
      <Link className="v2-brand" href="/">
        {content.profile.name.split(" ")[0]}
      </Link>
      <div className="v2-navlinks">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/resume">Resume</Link>
        <a className="v2-email-link" href={`mailto:${content.profile.email}`}>
          Email
        </a>
        <VersionSwitch />
      </div>
    </nav>
  );
}
