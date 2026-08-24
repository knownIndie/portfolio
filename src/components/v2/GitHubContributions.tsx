import { getGitHubContributions, type GitHubContribution } from "@/lib/github";

function formatContributionDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

function getContributionWeeks(
  contributions: GitHubContribution[],
): Array<Array<GitHubContribution | null>> {
  if (contributions.length === 0) return [];

  const firstDate = new Date(`${contributions[0].date}T00:00:00Z`);
  const leadingEmptyDays = firstDate.getUTCDay();
  const padded: Array<GitHubContribution | null> = [
    ...new Array<GitHubContribution | null>(leadingEmptyDays).fill(null),
    ...contributions,
  ];
  const trailingEmptyDays = (7 - (padded.length % 7)) % 7;

  padded.push(
    ...new Array<GitHubContribution | null>(trailingEmptyDays).fill(null),
  );

  const weeks: Array<Array<GitHubContribution | null>> = [];
  for (let index = 0; index < padded.length; index += 7) {
    weeks.push(padded.slice(index, index + 7));
  }

  return weeks;
}

function getContributionLevel(level: number): number {
  return Math.min(Math.max(level, 0), 4);
}

export default async function GitHubContributions() {
  const activity = await getGitHubContributions();
  const weeks = getContributionWeeks(activity.contributions);

  return (
    <section className="v2-section" aria-labelledby="contributions-heading">
      <div className="v2-sectionhead">
        <div>
          <p className="v2-section-kicker">Consistency</p>
          <h2 id="contributions-heading">GitHub contributions</h2>
        </div>
        <a
          className="v2-link"
          href={activity.profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open profile <span aria-hidden="true">↗</span>
          <span className="v2-sr">, opens in a new tab</span>
        </a>
      </div>

      {weeks.length > 0 ? (
        <div className="v2-contribution-shell">
          <div className="v2-contribution-scroll">
            <div
              className="v2-contribution-graph"
              role="img"
              aria-label={`${activity.total.toLocaleString("en-IN")} GitHub contributions in the last year`}
            >
              {weeks.map((week, weekIndex) => (
                <div className="v2-contribution-week" key={`week-${weekIndex}`}>
                  {week.map((contribution, dayIndex) => {
                    if (!contribution) {
                      return (
                        <span
                          aria-hidden="true"
                          className="v2-contribution-cell v2-contribution-level-0"
                          key={`empty-${weekIndex}-${dayIndex}`}
                        />
                      );
                    }

                    const level = getContributionLevel(contribution.level);

                    return (
                      <span
                        aria-hidden="true"
                        className={`v2-contribution-cell v2-contribution-level-${level}`}
                        key={contribution.date}
                        title={`${contribution.count} contribution${contribution.count === 1 ? "" : "s"} on ${formatContributionDate(contribution.date)}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="v2-contribution-footer">
            <p>
              {activity.total.toLocaleString("en-IN")} contributions in the last
              year.
            </p>
            <div
              className="v2-contribution-legend"
              aria-label="Contribution intensity legend"
            >
              <span>Less</span>
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  aria-hidden="true"
                  className={`v2-contribution-cell v2-contribution-level-${index}`}
                  key={index}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="v2-empty-state">
          Contribution history is available on my GitHub profile.
        </p>
      )}
    </section>
  );
}
