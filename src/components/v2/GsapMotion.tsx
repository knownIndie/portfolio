"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function GsapMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const root = document.querySelector<HTMLElement>(".v2-shell");

    if (!root) return;

    const interactionCleanups: Array<() => void> = [];
    let removeScrollListener: (() => void) | undefined;
    let removeRevealObserver: (() => void) | undefined;
    const context = gsap.context(() => {
      const select = <T extends HTMLElement = HTMLElement>(selector: string) =>
        Array.from(root.querySelectorAll<T>(selector));

      const bind = (
        target: HTMLElement,
        eventName: keyof HTMLElementEventMap,
        handler: EventListener,
      ) => {
        target.addEventListener(eventName, handler);
        interactionCleanups.push(() =>
          target.removeEventListener(eventName, handler),
        );
      };

      const animate = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
      ) => {
        const targets = select(selector);

        if (targets.length === 0) return;

        gsap.fromTo(targets, from, to);
      };

      animate(
        ".v2-profile, .v2-detail-hero, .v2-page-heading",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" },
      );
      const revealTargets = select(
        ".v2-section, .v2-contact, .v2-project, .v2-contribution-shell, .v2-activity-item, .v2-experience, .v2-education, .v2-detail-image, .v2-detail-layout, .v2-detail-contributions, .v2-project-contribution, .v2-resume-frame",
      );

      if (revealTargets.length > 0) {
        gsap.set(revealTargets, { opacity: 0, y: 20 });

        const reveal = (target: HTMLElement) => {
          gsap.to(target, {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                reveal(entry.target as HTMLElement);
                observer.unobserve(entry.target);
              }
            },
            { rootMargin: "0px 0px -8%", threshold: 0.08 },
          );

          for (const target of revealTargets) observer.observe(target);
          removeRevealObserver = () => observer.disconnect();
        } else {
          for (const target of revealTargets) reveal(target);
        }
      }

      const cells = select(".v2-contribution-cell");

      if (cells.length > 0) {
        gsap.fromTo(
          cells,
          { opacity: 0, scale: 0.75 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.24,
            stagger: { each: 0.002, from: "random" },
            ease: "power2.out",
            delay: 0.25,
          },
        );
      }

      const cards = select(".v2-project");

      for (const card of cards) {
        const media = card.querySelector<HTMLElement>(
          ".v2-project-media img, .v2-project-media-placeholder",
        );
        const body = card.querySelector<HTMLElement>(".v2-project-body");
        const technologyChips = Array.from(
          card.querySelectorAll<HTMLElement>(".v2-project-techs li"),
        );
        const cardTargets = [card, media, body, ...technologyChips].filter(
          (target): target is HTMLElement => Boolean(target),
        );

        const liftCard: EventListener = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.01,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (media) {
            gsap.to(media, {
              scale: 1.05,
              duration: 0.42,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (body) {
            gsap.to(body, {
              y: -3,
              duration: 0.28,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (technologyChips.length > 0) {
            gsap.to(technologyChips, {
              y: -2,
              duration: 0.2,
              stagger: 0.018,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const resetCard: EventListener = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: "power3.out",
            overwrite: "auto",
          });

          if (media) {
            gsap.to(media, {
              scale: 1,
              duration: 0.42,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (body) {
            gsap.to(body, {
              y: 0,
              duration: 0.34,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (technologyChips.length > 0) {
            gsap.to(technologyChips, {
              y: 0,
              duration: 0.22,
              stagger: 0.012,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        const pressCard: EventListener = () => {
          gsap.to(card, {
            y: -4,
            scale: 0.985,
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const leaveCardFocus: EventListener = (event) => {
          const nextTarget = (event as FocusEvent).relatedTarget;

          if (nextTarget instanceof Node && card.contains(nextTarget)) return;

          resetCard(event);
        };

        bind(card, "pointerenter", liftCard);
        bind(card, "pointerleave", resetCard);
        bind(card, "pointerdown", pressCard);
        bind(card, "pointerup", liftCard);
        bind(card, "focusin", liftCard);
        bind(card, "focusout", leaveCardFocus);
        interactionCleanups.push(() => gsap.killTweensOf(cardTargets));
      }

      const surfaceCards = select(
        ".v2-contribution-shell, .v2-activity-list, .v2-experience, .v2-education, .v2-detail-image, .v2-detail-aside, .v2-resume-frame",
      );

      for (const surface of surfaceCards) {
        const raiseSurface: EventListener = () => {
          gsap.to(surface, {
            y: -5,
            scale: 1.005,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        const settleSurface: EventListener = () => {
          gsap.to(surface, {
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        bind(surface, "pointerenter", raiseSurface);
        bind(surface, "pointerleave", settleSurface);
        bind(surface, "focusin", raiseSurface);
        bind(surface, "focusout", settleSurface);
        interactionCleanups.push(() => gsap.killTweensOf(surface));
      }

      const listItems = select(
        ".v2-activity-item, .v2-detail-list li, .v2-project-contribution",
      );

      for (const item of listItems) {
        const moveItem: EventListener = () => {
          gsap.to(item, {
            x: 5,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const resetItem: EventListener = () => {
          gsap.to(item, {
            x: 0,
            duration: 0.24,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        bind(item, "pointerenter", moveItem);
        bind(item, "pointerleave", resetItem);
        bind(item, "focusin", moveItem);
        bind(item, "focusout", resetItem);
        interactionCleanups.push(() => gsap.killTweensOf(item));
      }

      const contributionGraph = select(".v2-contribution-graph")[0];

      if (contributionGraph) {
        const graphCells = Array.from(
          contributionGraph.querySelectorAll<HTMLElement>(
            ".v2-contribution-cell",
          ),
        );
        const animateGraph: EventListener = () => {
          gsap.to(graphCells, {
            scale: 1.12,
            y: -1,
            duration: 0.2,
            stagger: { each: 0.001, from: "random" },
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const resetGraph: EventListener = () => {
          gsap.to(graphCells, {
            scale: 1,
            y: 0,
            duration: 0.22,
            stagger: { each: 0.0005, from: "random" },
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const highlightCell: EventListener = (event) => {
          const cell = (event.target as Element).closest<HTMLElement>(
            ".v2-contribution-cell",
          );

          if (!cell || !contributionGraph.contains(cell)) return;

          gsap.to(cell, {
            scale: 1.7,
            y: -2,
            duration: 0.16,
            ease: "back.out(2)",
            overwrite: "auto",
          });
        };
        const resetCell: EventListener = (event) => {
          const cell = (event.target as Element).closest<HTMLElement>(
            ".v2-contribution-cell",
          );

          if (!cell || !contributionGraph.contains(cell)) return;

          gsap.to(cell, {
            scale: 1.12,
            y: -1,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        bind(contributionGraph, "pointerenter", animateGraph);
        bind(contributionGraph, "pointerleave", resetGraph);
        bind(contributionGraph, "pointerover", highlightCell);
        bind(contributionGraph, "pointerout", resetCell);
        interactionCleanups.push(() => gsap.killTweensOf(graphCells));
      }

      const interactiveTargets = select(
        ".v2-nav a, .v2-button, .v2-text-button, .v2-link, .v2-detail-back, .v2-social-links a, .v2-footer-links a, .v2-project-links a, .v2-activity-item a, .v2-project-contribution a, .v2-tech-pill, .v2-stack li, .v2-detail-stack li",
      );

      for (const target of interactiveTargets) {
        const raise: EventListener = () => {
          gsap.to(target, {
            y: -2,
            scale: 1,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const settle: EventListener = () => {
          gsap.to(target, {
            y: 0,
            scale: 1,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const press: EventListener = () => {
          gsap.to(target, {
            y: 0,
            scale: 0.96,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        bind(target, "pointerenter", raise);
        bind(target, "pointerleave", settle);
        bind(target, "pointerdown", press);
        bind(target, "pointerup", raise);
        bind(target, "focusin", raise);
        bind(target, "focusout", settle);
        interactionCleanups.push(() => gsap.killTweensOf(target));
      }

      const nav = select(".v2-nav")[0];

      if (!nav) return;

      gsap.fromTo(
        nav,
        { opacity: 0, y: -14, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.out",
        },
      );

      const navItems = select(".v2-brand, .v2-navlinks > *");

      if (navItems.length > 0) {
        gsap.fromTo(
          navItems,
          { opacity: 0, y: -8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.045,
            delay: 0.12,
            ease: "power2.out",
          },
        );
      }

      let lastScrollY = window.scrollY;
      let scrollFrame: number | null = null;
      let isScrolled = lastScrollY > 24;
      nav.classList.toggle("v2-nav-scrolled", isScrolled);

      const updateNav = () => {
        const currentScrollY = window.scrollY;
        const nextIsScrolled = currentScrollY > 24;
        const isMovingDown = currentScrollY > lastScrollY;

        if (nextIsScrolled !== isScrolled) {
          isScrolled = nextIsScrolled;
          nav.classList.toggle("v2-nav-scrolled", isScrolled);
        }

        gsap.to(nav, {
          scale: isScrolled ? 0.985 : 1,
          y: isMovingDown && currentScrollY > 120 ? -5 : 0,
          duration: 0.24,
          ease: "power2.out",
          overwrite: "auto",
        });

        lastScrollY = currentScrollY;
        scrollFrame = null;
      };

      const handleScroll = () => {
        if (scrollFrame !== null) return;

        scrollFrame = window.requestAnimationFrame(updateNav);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      removeScrollListener = () => {
        window.removeEventListener("scroll", handleScroll);

        if (scrollFrame !== null) {
          window.cancelAnimationFrame(scrollFrame);
        }
      };
    }, root);

    return () => {
      for (const cleanup of interactionCleanups) cleanup();
      removeScrollListener?.();
      removeRevealObserver?.();
      context.revert();
    };
  }, [pathname]);

  return null;
}
