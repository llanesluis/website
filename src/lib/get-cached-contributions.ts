import "server-only";

import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/contribution-graph";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

export const getGitHubContributions = unstable_cache(
  async (username: string) => {
    const apiUrl = process.env.GITHUB_CONTRIBUTIONS_API_URL?.trim();
    if (!apiUrl) {
      throw new Error("GITHUB_CONTRIBUTIONS_API_URL is not set");
    }

    const res = await fetch(`${apiUrl}/v4/${username}?y=last`);
    if (!res.ok) {
      throw new Error(`Contributions API failed with status ${res.status}`);
    }

    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions ?? [];
  },
  ["github-contributions-v2"],
  { revalidate: 86400 }
);
