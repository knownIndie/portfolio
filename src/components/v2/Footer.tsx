import type { V2Props } from "./types";

export default function Footer({ content }: V2Props) {
  const footerLinks = [...content.links]
    .filter((link) => ["github", "linkedin", "email"].includes(link.type))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <footer className="v2-footer">
      <span>
        © {new Date().getFullYear()} {content.profile.name}
      </span>
      <div className="v2-footer-links">
        {footerLinks.map((link) => {
          const external = link.url.startsWith("http");

          return (
            <a
              href={link.url}
              key={link.id}
              rel={external ? "noreferrer" : undefined}
              target={external ? "_blank" : undefined}
            >
              {link.label}
              {external ? (
                <span className="v2-sr">, opens in a new tab</span>
              ) : null}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
