"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/contribution-graph";
import { ExternalLink } from "@/components/external-link";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatPostDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function GitHubContributions({
  contributions,
  username,
  className,
}: {
  contributions: Activity[];
  username: string;
  className?: string;
}) {
  return (
    <ContributionGraph
      className={cn("gap-4", className)}
      data={contributions}
      blockSize={12}
      blockMargin={2}
      blockRadius={0}
      aria-label="GitHub Contributions Graph"
    >
      <ContributionGraphCalendar
        className="no-scrollbar **:data-[slot=month-labels]:text-muted-foreground"
        title="GitHub Contributions"
        aria-hidden
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger
              render={
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              }
            />
            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution{activity.count === 1 ? null : "s"} on{" "}
                {formatPostDate(activity.date, "MMM d, yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="gap-4 leading-none">
        <ContributionGraphTotalCount>
          {({ totalCount }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in the past 365 days on{" "}
              <ExternalLink
                className="text-foreground link-underline"
                href={`https://github.com/${username}`}
              >
                GitHub
              </ExternalLink>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend aria-hidden />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <Spinner className="text-muted-foreground" />
    </div>
  );
}
