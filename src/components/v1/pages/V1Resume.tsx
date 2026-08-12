import { formatDateRange } from "@/components/v1/shared";
import V1VersionSwitch from "@/components/v1/shell/V1VersionSwitch";
import type { PortfolioContent } from "@/lib/portfolio/types";

type V1ResumeProps = {
  content: PortfolioContent;
};

export default function V1Resume({ content }: V1ResumeProps) {
  return (
    <main id="main-content" className="v1-page">
      <V1VersionSwitch canonicalPath="/resume" />
      <section className="v1-card-strong v1-resume-card">
        <div className="v1-resume-header">
          <div>
            <p className="v1-mono v1-eyebrow">Resume</p>
            <h1>{content.profile.name}</h1>
            <p>
              {content.profile.headline} · {content.profile.availability}
            </p>
          </div>
          <a href={content.resumePath} download className="v1-primary-button">
            Download PDF
          </a>
        </div>

        <div className="v1-resume-summary">
          <p>{content.profile.shortBio}</p>
          <p>
            {content.profile.email} · {content.profile.location}
          </p>
        </div>

        <div className="v1-resume-fallback">
          <section>
            <h2>Experience</h2>
            {[...content.experience]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item) => (
                <article key={item.id}>
                  <h3>
                    {item.role} · {item.organization}
                  </h3>
                  <time>{formatDateRange(item.startDate, item.endDate)}</time>
                  {item.summary ? <p>{item.summary}</p> : null}
                </article>
              ))}
          </section>
          <section>
            <h2>Education</h2>
            {[...content.education]
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((item) => (
                <article key={item.id}>
                  <h3>
                    {item.credential}
                    {item.field ? `, ${item.field}` : ""}
                  </h3>
                  <p>{item.institution}</p>
                  <time>{formatDateRange(item.startDate, item.endDate)}</time>
                </article>
              ))}
          </section>
        </div>

        <div className="v1-resume-embed">
          <iframe
            src={content.resumePath}
            title={`${content.profile.name} resume`}
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
