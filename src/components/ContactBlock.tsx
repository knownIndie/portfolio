import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export default function ContactBlock({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "card rounded-[28px] px-6 py-6 md:px-8 md:py-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mono text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Let’s talk
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[color:var(--ink)]">
            Interested in working together?
          </h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            I’m open to full‑stack roles, internships, and collaboration on
            ambitious products.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:bhardwaj03aryan@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--paper)] transition hover:-translate-y-0.5"
          >
            Email Me
            <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/aryan-bhardwaj-56129422b/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(29,27,22,0.2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5"
          >
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
