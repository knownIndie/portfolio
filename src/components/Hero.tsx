import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

function Hero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "card-strong relative overflow-hidden rounded-[32px] p-8 md:p-12",
        className,
      )}
    >
      <div className="reveal">
        <p className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
          Full‑Stack Developer · Delhi, India
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-[color:var(--ink)] md:text-4xl">
          Full‑stack products with fast UX, clean architecture, and reliable
          data flows.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[color:var(--muted)] md:text-lg">
          From polished Next.js interfaces to secure backends and payments, I
          focus on shipping MVPs that feel complete.
        </p>
      </div>

      <div className="reveal reveal-delay-1 mt-8 flex flex-wrap gap-3">
        <Link
          href="/resume"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--paper)] shadow-[0_12px_30px_rgba(29,27,22,0.2)] transition hover:-translate-y-0.5"
        >
          View Resume
          <ArrowUpRight size={16} />
        </Link>
        <a
          href="mailto:bhardwaj03aryan@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(29,27,22,0.2)] px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:bg-white/80"
        >
          Contact
        </a>
      </div>

      <div className="reveal reveal-delay-2 mt-10 flex flex-wrap gap-6 border-t border-[rgba(29,27,22,0.12)] pt-6 text-sm text-[color:var(--muted)]">
        <div>
          <p className="mono text-xs uppercase tracking-[0.24em]">Focus</p>
          <p className="mt-2">Product UX, backend logic, payments.</p>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-[0.24em]">Stack</p>
          <p className="mt-2">
            Next.js, TypeScript, Prisma, Postgres, Stripe.
          </p>
        </div>
        <div>
          <p className="mono text-xs uppercase tracking-[0.24em]">Currently</p>
          <p className="mt-2">Open to full‑stack roles & internships.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
