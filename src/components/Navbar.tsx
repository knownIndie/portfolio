"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { GithubIcon, Mail, MenuIcon } from "lucide-react";
import { useState } from "react";
import { ghlink } from "../../constants";

function Navbar({ className }: { className?: string }) {
	const links = [
		{ title: "About", href: "/about" },
		{ title: "Projects", href: "/projects" },
		{ title: "Resume", href: "/resume" },
	];
	const [isopen, setIsopen] = useState<boolean>(false);
	return (
		<div className="relative">
			<div
				className={cn(
					"card-strong relative mx-auto mt-6 flex w-full items-center justify-between rounded-3xl px-5 py-4",
					className,
				)}
			>
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="rounded-full border border-[rgba(29,27,22,0.2)] px-4 py-1 text-sm font-semibold tracking-tight text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:bg-[color:var(--glass)]"
					>
						Aryan Bhardwaj
					</Link>
					<span className="hidden text-xs tracking-[0.24em] text-[color:var(--muted)] uppercase md:inline">
						Full‑Stack
					</span>
				</div>

				<div className="hidden items-center gap-6 text-sm text-[color:var(--muted)] md:flex">
					{links.map((link) => (
						<Link
							className="transition duration-200 hover:text-[color:var(--ink)]"
							href={link.href}
							key={link.href}
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className="hidden items-center gap-3 md:flex">
					<a
						href={ghlink}
						target="_blank"
						rel="noreferrer"
						className="text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
					>
						<GithubIcon size={16} />
					</a>
					<a
						href="mailto:bhardwaj03aryan@gmail.com"
						className="rounded-full border border-[rgba(29,27,22,0.2)] px-3 py-2 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
					>
						<Mail size={16} />
					</a>
				</div>

				<div className="flex items-center gap-3 md:hidden">
					<a
						href={ghlink}
						target="_blank"
						rel="noreferrer"
						className="text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
					>
						<GithubIcon size={16} />
					</a>
					<button
						type="button"
						onClick={() => setIsopen(!isopen)}
						className="rounded-full border border-[rgba(29,27,22,0.2)] p-2"
						aria-label="Open menu"
					>
						<MenuIcon size={18} />
					</button>
				</div>
			</div>

			{isopen && (
				<div className="card absolute inset-x-0 top-full z-50 mx-auto mt-3 rounded-3xl p-4">
					<div className="flex flex-col items-start gap-4 text-sm text-[color:var(--muted)]">
						{links.map((link) => (
							<Link
								className="font-medium text-[color:var(--ink)]"
								href={link.href}
								key={link.href}
								onClick={() => setIsopen(false)}
							>
								{link.title}
							</Link>
						))}
						<Link
							href="/resume"
							className="w-full rounded-full bg-[color:var(--ink)] px-4 py-2 text-center text-sm font-semibold text-[color:var(--paper)]"
						>
							View Resume
						</Link>
						<a
							href="mailto:bhardwaj03aryan@gmail.com"
							className="w-full rounded-full border border-[rgba(29,27,22,0.2)] px-4 py-2 text-center text-sm text-[color:var(--muted)]"
						>
							Email Me
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
