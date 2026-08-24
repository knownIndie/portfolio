import { getGitHubActivity } from "@/lib/github";

function formatCommitDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function GitHubActivity() {
  const activity = await getGitHubActivity();

  return (
    <section className="v2-section" aria-labelledby="github-heading">
      <div className="v2-sectionhead">
        <div>
          <p className="v2-section-kicker">Open source</p>
          <h2 id="github-heading">Recent GitHub work</h2>
        </div>
        <a
          className="v2-link"
          href={activity.profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          View profile <span aria-hidden="true">↗</span>
          <span className="v2-sr">, opens in a new tab</span>
        </a>
      </div>

      {activity.recentCommits.length > 0 ? (
        <div className="v2-activity-list">
          {activity.recentCommits.map((commit) => (
            <article className="v2-activity-item" key={commit.id}>
              <div>
                <a
                  className="v2-activity-message"
                  href={commit.commitUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {commit.message}
                  <span aria-hidden="true">↗</span>
                  <span className="v2-sr">, opens in a new tab</span>
                </a>
                <a
                  className="v2-activity-repository"
                  href={commit.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {commit.repository}
                  <span className="v2-sr">, opens in a new tab</span>
                </a>
              </div>
              <time dateTime={commit.date}>
                {formatCommitDate(commit.date)}
              </time>
            </article>
          ))}
        </div>
      ) : (
        <p className="v2-empty-state">
          Recent public commits are available on my GitHub profile.
        </p>
      )}

      {activity.publicRepositoryCount > 0 ? (
        <p className="v2-activity-note">
          Showing recent commits from public repositories. GitHub currently
          lists {activity.publicRepositoryCount} public repositories.
        </p>
      ) : null}
    </section>
  );
}
