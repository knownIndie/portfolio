import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function About({ content }: V2Props) {
  return (
    <main id="main-content" className="v2-section">
      <VersionSwitch classicHref="/v1/about" />
      <p className="v2-eyebrow">Context</p>
      <h1 className="v2-heading">About the work</h1>
      <div className="v2-lede">
        {content.profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="v2-section" aria-labelledby="education-heading">
        <p className="v2-eyebrow">Education</p>
        <h2 id="education-heading">Foundations</h2>
        <div className="v2-timeline">
          {content.education.map((education) => (
            <article key={education.id}>
              <time>
                {education.startDate} to {education.endDate || "Present"}
              </time>
              <div>
                <h3>
                  {education.credential} · {education.institution}
                </h3>
                <p>{education.field || education.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
