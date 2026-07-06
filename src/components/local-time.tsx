"use client";

import { useEffect, useId, useState } from "react";
import { TZDate, tzOffset } from "@date-fns/tz";
import { format } from "date-fns";

import { InlineScript } from "@/components/inline-script";
import { AUTHOR } from "@/config/author";

const TIME_ZONE = AUTHOR.timeZone;

/**
 * Local clock, rendered without a hydration flash. The parent (a Server
 * Component) passes the current `HH:mm` in the author's time zone as `initial`,
 * so the server HTML is already correct. On a hard load the `InlineScript`
 * re-derives the time from the client clock before first paint (in case the
 * page was statically cached), and the effect then ticks it live and computes
 * the viewer's "X ahead/behind" offset.
 */
export function LocalTime({ initial }: { initial: string }) {
  const id = useId();
  const [time, setTime] = useState(initial);
  const [diff, setDiff] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(format(TZDate.tz(TIME_ZONE), "HH:mm"));

      const viewerOffset = -now.getTimezoneOffset();
      const targetOffset = tzOffset(TIME_ZONE, now);
      const hoursDiff = Math.abs(targetOffset - viewerOffset) / 60;

      if (hoursDiff < 1) {
        setDiff("");
      } else {
        const hours = Math.floor(hoursDiff);
        const label = hours === 1 ? "hour" : "hours";
        setDiff(`${hours} ${label} ${targetOffset > viewerOffset ? "ahead" : "behind"}`);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span>
      <span id={id} className="font-mono tabular-nums" suppressHydrationWarning>
        {time}
      </span>{" "}
      <span className="text-muted-foreground">
        <span className="uppercase">{AUTHOR.timeZoneLabel}</span>
        {diff && ` · ${diff}`}
      </span>
      <InlineScript
        html={`{var n=document.getElementById(${JSON.stringify(id)});if(n){try{n.textContent=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",hour12:false,timeZone:${JSON.stringify(TIME_ZONE)}}).format(new Date())}catch(e){}}}`}
      />
    </span>
  );
}
