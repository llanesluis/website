import type { Activity } from "@/components/contribution-graph";
import { GitHubContributions } from "@/components/github-contributions";
import { GITHUB_USERNAME } from "@/config/site";
import { getCachedContributions } from "@/lib/get-cached-contributions";

export async function Contributions() {
  let data: Activity[] = [];
  try {
    data = await getCachedContributions(GITHUB_USERNAME);
  } catch {
    return null;
  }
  if (!data.length) return null;

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="contributions">
      <h2 className="trail-highlight heading">Contributions</h2>
      <GitHubContributions
        contributions={Promise.resolve(data)}
        githubProfileUrl={`https://github.com/${GITHUB_USERNAME}`}
      />
    </section>
  );
}
