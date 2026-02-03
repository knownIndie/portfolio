import { cn } from "@/lib/utils";
import { projectItems } from "@/lib/data/Project";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function FeaturedCaseStudy({ className }: { className?: string }) {
  const featured = projectItems.find((project) => project.featured);

  if (!featured) {
    return null;
  }

  return (
    <section
      className={cn(
        "card-strong overflow-hidden rounded-[32px] p-8 md:p-10",
        className,
      )}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <span className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Featured Case Study
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink)] md:text-4xl">
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

      {featured.logo && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-[rgba(29,27,22,0.16)] bg-black shadow-[0_18px_40px_rgba(29,27,22,0.16)]">
          <Image
            src={featured.logo}
            alt={`${featured.title} preview`}
            width={1400}
            height={800}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      )}

      {featured.highlights && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-2xl border border-[rgba(29,27,22,0.12)] bg-white/70 p-4 text-sm text-[color:var(--muted)]"
            >
              {highlight}
            </div>
          ))}
        </div>
      )}

      {featured.tech && (
        <div className="mt-6 flex flex-wrap gap-2">
          {featured.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgba(29,27,22,0.14)] px-3 py-1 text-xs font-medium text-[color:var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
