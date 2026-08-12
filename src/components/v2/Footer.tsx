import type { V2Props } from "./types";
export default function Footer({ content }: V2Props) {
  return (
    <footer className="v2-footer">
      <span>
        © {new Date().getFullYear()} {content.profile.name}
      </span>
      <span>
        {content.profile.location} · {content.profile.availability}
      </span>
      <a className="v2-link" href={`mailto:${content.profile.email}`}>
        {content.profile.email}
      </a>
    </footer>
  );
}
