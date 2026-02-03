// src/app/about/page.tsx
export const metadata = {
  title: "About · Aryan Bhardwaj",
  description:
    "About Aryan Bhardwaj — full‑stack developer focused on performance, product UX, and reliable systems.",
};

export default function AboutPage() {
  return (
    <main className="py-12">
      <article className="card-strong rounded-[32px] p-8 md:p-10">
        <header className="mb-8">
          <p className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            About
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-[color:var(--ink)]">
            Building full‑stack products with clarity and pace.
          </h1>
        </header>

        <section className="space-y-6 text-sm leading-relaxed text-[color:var(--muted)]">
          <p>
            I’m <strong className="text-[color:var(--ink)]">Aryan Bhardwaj</strong>,
            a full‑stack developer who cares about performance, accessibility,
            and reliable systems. I build fast Next.js products with thoughtful
            UI and solid backend architecture.
          </p>

          <p>
            My approach blends product thinking with engineering discipline:
            consistent spacing systems, lightweight components, and UX that feels
            calm and intentional. I’m especially excited by teams that care about
            craft and measurable user outcomes.
          </p>

          <p>
            Tooling: Next.js, React, TypeScript, Tailwind, Node, Express, GraphQL,
            MongoDB, PostgreSQL, Prisma, Stripe, and Clerk.
          </p>
        </section>

        <div className="section-divider my-8" />

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-[color:var(--ink)]">
              What I’m looking for
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Full‑stack roles, internships, or collaborations where I can own
              UI/UX execution, backend workflows, and performance tuning.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[color:var(--ink)]">
              Collaboration style
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Clear communication, fast iteration, and a preference for shipping
              small and polishing often.
            </p>
          </div>
        </section>

        <footer className="mt-10 text-sm text-[color:var(--muted)]">
          Let’s connect:{" "}
          <a
            href="mailto:bhardwaj03aryan@gmail.com"
            className="font-medium text-[color:var(--ink)]"
          >
            bhardwaj03aryan@gmail.com
          </a>
          {" "}·{" "}
          <a
            href="https://www.linkedin.com/in/aryan-bhardwaj-56129422b/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[color:var(--ink)]"
          >
            LinkedIn
          </a>
        </footer>
      </article>
    </main>
  );
}
