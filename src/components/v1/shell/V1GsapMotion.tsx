"use client";

import gsap from "gsap";
import { useEffect } from "react";

export default function V1GsapMotion() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).get("preview") !== "v1"
    ) {
      return;
    }

    const shell = document.querySelector<HTMLElement>(".v1-shell");

    if (!shell) return;

    const pageElements = Array.from(
      shell.querySelectorAll<HTMLElement>(
        ":scope > .v1-nav-wrap, :scope > main, :scope > .v1-footer",
      ),
    );
    const context = gsap.context(() => {
      gsap.fromTo(
        pageElements,
        { opacity: 0, y: 14, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.055,
          ease: "power2.out",
        },
      );
    }, shell);

    return () => context.revert();
  }, []);

  return null;
}
