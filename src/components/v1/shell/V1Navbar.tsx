"use client";

import type { PortfolioContent } from "@/lib/portfolio/types";
import V1VersionSwitch from "@/components/v1/shell/V1VersionSwitch";
import { findLink } from "@/components/v1/shared";
import { GithubIcon, Mail, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type V1NavbarProps = {
  content: PortfolioContent;
  className?: string;
};

const navigation = [
  { title: "About", href: "/v1/about" },
  { title: "Projects", href: "/v1/projects" },
  { title: "Resume", href: "/v1/resume" },
] as const;

export default function V1Navbar({ content, className = "" }: V1NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const github = findLink(content, "github");
  const email =
    findLink(content, "email")?.url ?? `mailto:${content.profile.email}`;

  return (
    <header className={`v1-nav-wrap ${className}`}>
      <div className="v1-card-strong v1-navbar">
        <Link href="/v1" className="v1-brand">
          {content.profile.name}
        </Link>

        <nav aria-label="Portfolio navigation" className="v1-desktop-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="v1-mode-and-actions">
          <V1VersionSwitch />
          <div className="v1-desktop-actions">
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
            <a href={email} className="v1-icon-button" aria-label="Email Aryan">
              <Mail size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="v1-mobile-actions">
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
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="v1-menu-button"
              aria-expanded={isOpen}
              aria-controls="v1-mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <MenuIcon size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen ? (
        <nav
          id="v1-mobile-menu"
          aria-label="Portfolio navigation mobile"
          className="v1-card v1-mobile-menu"
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/v1/resume"
            onClick={() => setIsOpen(false)}
            className="v1-mobile-primary"
          >
            View Resume
          </Link>
          <a href={email} className="v1-mobile-secondary">
            Email Me
          </a>
        </nav>
      ) : null}
    </header>
  );
}
