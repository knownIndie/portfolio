import { cn } from "@/lib/utils";
import { GithubIcon, Linkedin, Mail } from "lucide-react";

export default function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "mt-16 w-full rounded-3xl border border-[rgba(29,27,22,0.16)] bg-white/80 p-6 shadow-[0_20px_40px_rgba(29,27,22,0.08)] backdrop-blur",
        className,
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink)]">
            © {year} Aryan Bhardwaj
          </p>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            Open to full‑stack roles · Delhi, India (Remote‑friendly)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:bhardwaj03aryan@gmail.com"
            className="flex items-center gap-2 text-xs font-medium text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
          >
            <Mail size={14} />
            bhardwaj03aryan@gmail.com
          </a>
          <div className="h-4 w-px bg-[color:var(--muted-2)]" />
          <a
            href="https://github.com/anastand"
            target="_blank"
            rel="noreferrer"
            className="text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/aryan-bhardwaj-56129422b/"
            target="_blank"
            rel="noreferrer"
            className="text-[color:var(--muted)] transition hover:text-[color:var(--ink)]"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
