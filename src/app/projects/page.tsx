// src/app/projects/page.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { projectItems } from "@/lib/data/Project";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Projects · Aryan Bhardwaj",
  description:
    "Projects by Aryan Bhardwaj — case studies and polished frontend builds.",
};

export default function ProjectsPage() {
  const featured = projectItems.find((project) => project.featured);
  const others = projectItems.filter(
    (project) =>
      !project.featured &&
      !["recipes-finder", "react-todo"].includes(project.id),
  );

  return (
    <main className="py-12">
      <header className="mb-10">
        <p className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Portfolio
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-[color:var(--ink)]">
          Case studies & builds
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-[color:var(--muted)]">
          Selected frontend projects with a focus on clean design, responsive
          layouts, and fast user experiences.
        </p>
      </header>

      {featured && (
        <section className="card-strong rounded-[32px] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Featured
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink)]">
                {featured.title}
              </h2>
              {featured.role && (
                <p className="mt-2 text-sm text-[color:var(--muted)]">
                  {featured.role}
                </p>
              )}
              <p className="mt-4 text-base text-[color:var(--muted)]">
                {featured.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {featured.repo && (
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(29,27,22,0.2)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5"
                >
                  GitHub
                  <ArrowUpRight size={14} />
                </a>
              )}
              {featured.demo && (
                <a
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(255,107,53,0.3)] transition hover:-translate-y-0.5"
                >
                  Live Site
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>

          {featured.highlights && (
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {featured.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-[rgba(29,27,22,0.12)] bg-[color:var(--glass)] p-4 text-sm text-[color:var(--muted)] shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          )}

          {featured.logo && (
            <div className="mt-8 overflow-hidden rounded-3xl border border-[rgba(29,27,22,0.16)] bg-black shadow-[0_18px_40px_rgba(29,27,22,0.16)]">
              <Image
                src={featured.logo}
                alt={`${featured.title} preview`}
                width={1400}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          )}
        </section>
      )}

      <section className={cn("mt-10 grid gap-6 md:grid-cols-2")}>
        {others.map((project) => (
          <article
            key={project.id}
            className="card rounded-[26px] p-6 transition hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold text-[color:var(--ink)]">
              {project.title}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {project.description}
            </p>
            {project.tech && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[rgba(29,27,22,0.14)] px-2.5 py-1 text-[11px] text-[color:var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 flex gap-4 text-sm">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[color:var(--ink)]"
                >
                  GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[color:var(--accent)]"
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
