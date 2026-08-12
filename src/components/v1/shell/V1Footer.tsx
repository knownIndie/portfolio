import type { PortfolioContent } from "@/lib/portfolio/types";
import { findLink } from "@/components/v1/shared";
import { GithubIcon, Linkedin, Mail } from "lucide-react";

type V1FooterProps = {
  content: PortfolioContent;
  className?: string;
};

export default function V1Footer({ content, className = "" }: V1FooterProps) {
  const github = findLink(content, "github");
  const linkedin = findLink(content, "linkedin");
  const email =
    findLink(content, "email")?.url ?? `mailto:${content.profile.email}`;

  return (
    <footer className={`v1-card-strong v1-footer ${className}`}>
      <div>
        <p className="v1-footer-name">
          © {new Date().getFullYear()} {content.profile.name}
        </p>
        <p className="v1-footer-detail">
          {content.profile.availability} · {content.profile.location}
        </p>
      </div>
      <div className="v1-footer-links">
        <a href={email} className="v1-footer-email">
          <Mail size={14} aria-hidden="true" />
          {content.profile.email}
        </a>
        <span className="v1-footer-divider" aria-hidden="true" />
        {github ? (
          <a
            href={github.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${github.label} (opens in a new tab)`}
          >
            <GithubIcon size={16} aria-hidden="true" />
          </a>
        ) : null}
        {linkedin ? (
          <a
            href={linkedin.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${linkedin.label} (opens in a new tab)`}
          >
            <Linkedin size={16} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </footer>
  );
}
