import VersionSwitch from "./VersionSwitch";
import type { V2Props } from "./types";

export default function About({ content }: V2Props) {
  return (
    <main id="main-content" className="v2-page">
      <VersionSwitch classicHref="/v1/about" />
      <header className="v2-page-heading">
        <p>About</p>
        <h1>How I approach product engineering.</h1>
      </header>
      <div className="v2-prose">
        {content.profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="v2-section" aria-labelledby="education-heading">
        <div className="v2-sectionhead">
          <h2 id="education-heading">Education</h2>
        </div>
        <div className="v2-education-list">
          {content.education.map((education) => (
            <article className="v2-education" key={education.id}>
              <div>
                <h3>{education.institution}</h3>
                <p>{education.credential}</p>
                <p>{education.field || education.summary}</p>
              </div>
              <time>
                {education.startDate} to {education.endDate || "Present"}
              </time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
