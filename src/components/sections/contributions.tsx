import { Suspense } from "react";

import type { Activity } from "@/components/contribution-graph";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { GITHUB_USERNAME } from "@/config/site";
import { getGitHubContributions } from "@/lib/get-cached-contributions";

export function Contributions() {
  return (
    <Suspense fallback={<ContributionsFallback />}>
      <ContributionsSection username={GITHUB_USERNAME} />
    </Suspense>
  );
}

async function ContributionsSection({ username }: { username: string }) {
  let data: Activity[];
  try {
    data = await getGitHubContributions(username);
  } catch {
    return null;
  }
  if (!data.length) return null;

  return (
    <section className="flex flex-col gap-6 section-padding-y" id="contributions">
      <h2 className="trail-highlight heading">Contributions</h2>
      <GitHubContributions contributions={data} username={username} />
    </section>
  );
}

function ContributionsFallback() {
  return (
    <section className="flex flex-col gap-6 section-padding-y" id="contributions">
      <h2 className="trail-highlight heading">Contributions</h2>
      <GitHubContributionsFallback />
    </section>
  );
}
