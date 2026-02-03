// src/app/resume/page.tsx
import React from "react";
import fs from "fs";
import path from "path";

export const metadata = {
  title: "Resume · Aryan Bhardwaj",
  description: "Resume — Aryan Bhardwaj",
};

export default function ResumePage() {
  const resumePath = path.join(
    process.cwd(),
    "public",
    "Aryan_Bhardwaj_Resume.pdf",
  );
  const resumeAvailable = fs.existsSync(resumePath);

  return (
    <main className="py-12">
      <section className="card-strong rounded-[32px] p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mono text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Resume
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-[color:var(--ink)]">
              Aryan Bhardwaj
            </h1>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Full‑Stack developer · Open to internships & roles
            </p>
          </div>
          {resumeAvailable && (
            <a
              href="/Aryan_Bhardwaj_Resume.pdf"
              download
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--ink)] px-5 py-2.5 text-sm font-semibold text-[color:var(--paper)] shadow-[0_12px_30px_rgba(29,27,22,0.2)] transition hover:-translate-y-0.5"
            >
              Download PDF
            </a>
          )}
        </div>

        {resumeAvailable ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[rgba(29,27,22,0.16)] bg-white/70">
            <iframe
              src="/Aryan_Bhardwaj_Resume.pdf"
              title="Aryan Bhardwaj Resume"
              className="h-[680px] w-full"
            />
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-[rgba(29,27,22,0.16)] bg-white/70 p-6 text-sm text-[color:var(--muted)]">
            Resume PDF not uploaded yet. Add it at{" "}
            <span className="mono">public/Aryan_Bhardwaj_Resume.pdf</span> to
            enable the embedded view and download.
          </div>
        )}
      </section>
    </main>
  );
}
