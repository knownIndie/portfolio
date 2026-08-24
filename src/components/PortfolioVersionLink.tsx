"use client";

import gsap from "gsap";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";

type PortfolioVersionLinkProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
  href: string;
  knobOffset: number;
  title: string;
};

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export default function PortfolioVersionLink({
  ariaLabel,
  children,
  className,
  href,
  knobOffset,
  title,
}: PortfolioVersionLinkProps) {
  const isTransitioning = useRef(false);

  useEffect(() => {
    const resetTransitionStyles = () => {
      isTransitioning.current = false;
      const shell = document.querySelector<HTMLElement>(".v2-shell, .v1-shell");

      if (!shell) return;

      gsap.set([shell, ...Array.from(shell.children)], {
        clearProps: "filter,opacity,transform",
      });
    };

    window.addEventListener("pageshow", resetTransitionStyles);
    return () => window.removeEventListener("pageshow", resetTransitionStyles);
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      isModifiedClick(event) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    event.preventDefault();

    if (isTransitioning.current) return;

    isTransitioning.current = true;
    const link = event.currentTarget;
    const knob = link.querySelector<HTMLElement>("[data-version-knob]");
    const shell = document.querySelector<HTMLElement>(".v2-shell, .v1-shell");
    const pageElements = shell
      ? Array.from(shell.children).filter(
          (element): element is HTMLElement => element instanceof HTMLElement,
        )
      : [];

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => window.location.assign(href),
    });

    if (knob) {
      timeline.to(
        knob,
        {
          x: knobOffset,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0,
      );
    }

    if (pageElements.length > 0) {
      timeline.to(
        pageElements,
        {
          opacity: 0,
          y: knobOffset > 0 ? -14 : 14,
          duration: 0.32,
          stagger: 0.025,
          ease: "power2.in",
        },
        0,
      );
    }

    if (shell) {
      timeline.to(
        shell,
        {
          scale: 0.985,
          filter: "blur(6px)",
          duration: 0.36,
          ease: "power2.inOut",
        },
        0,
      );
    }

    if (!shell && !knob) {
      window.location.assign(href);
    }
  };

  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={href}
      onClick={handleClick}
      title={title}
    >
      {children}
    </a>
  );
}
