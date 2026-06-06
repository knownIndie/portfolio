import { cn } from "@/lib/utils";
import React from "react";
import { projectItems } from "@/lib/data/Project";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Projects({ className }: { className?: string }) {
	const selected = projectItems
		.filter(
			(item) =>
				!item.featured && !["recipes-finder", "react-todo"].includes(item.id),
		)
		.slice(0, 2);

	return (
		<section className={cn("perf-section mx-auto mt-12", className)}>
			<div className="mb-6 flex items-center justify-between">
				<div>
					<p className="mono text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
						Selected projects
					</p>
					<h2 className="mt-2 text-3xl font-semibold text-[color:var(--ink)]">
						Learning builds from my early full‑stack journey
					</h2>
				</div>
				<Link
					href="/projects"
					className="hidden items-center gap-2 text-sm font-semibold text-[color:var(--ink)] transition hover:translate-x-1 md:inline-flex"
				>
					View all
					<ArrowUpRight size={14} />
				</Link>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				{selected.map((project) => (
					<article
						key={project.id}
						className="card rounded-[24px] p-5 transition hover:-translate-y-1"
					>
						<h3 className="text-lg font-semibold text-[color:var(--ink)]">
							{project.title}
						</h3>
						<p className="mt-2 text-sm text-[color:var(--muted)]">
							{project.description}
						</p>
						{project.tech && (
							<div className="mt-4 flex flex-wrap gap-2">
								{project.tech.map((tech) => (
									<span
										key={tech}
										className="rounded-full border border-[rgba(29,27,22,0.14)] px-2.5 py-1 text-[11px] text-[color:var(--muted)]"
									>
										{tech}
									</span>
								))}
							</div>
						)}
						<div className="mt-4 flex gap-3 text-sm">
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
							{project.npm && (
								<a
									href={project.npm}
									target="_blank"
									rel="noreferrer"
									className="font-medium text-[color:var(--accent)]"
								>
									npm
								</a>
							)}
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
