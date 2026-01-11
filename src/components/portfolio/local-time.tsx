"use client";

import { TZDate, tzOffset } from "@date-fns/tz";
import { format } from "date-fns";
import { useEffect, useState } from "react";

// Mazatlan, Sinaloa: UTC-7 (Mexico no longer observes DST)
const TIME_ZONE = "America/Mazatlan";

export function LocalTime() {
  const [timeString, setTimeString] = useState<string>("");
  const [diffText, setDiffText] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get time in target timezone using TZDate
      const targetTime = TZDate.tz(TIME_ZONE);
      const formattedTime = format(targetTime, "HH:mm");
      setTimeString(formattedTime);

      // Calculate timezone offset difference using tzOffset
      const viewerOffset = -now.getTimezoneOffset(); // in minutes
      const targetOffset = tzOffset(TIME_ZONE, now); // in minutes

      const minutesDiff = Math.abs(targetOffset - viewerOffset);
      const hoursDiff = minutesDiff / 60;

      let diff = "";
      if (hoursDiff < 1) {
        diff = "";
      } else {
        const hours = Math.floor(hoursDiff);
        const isAhead = targetOffset > viewerOffset;
        const hoursText = hours === 1 ? "hour" : "hours";
        diff = `${hours} ${hoursText} ${isAhead ? "ahead" : "behind"}`;
      }
      setDiffText(diff);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeString) {
    return (
      <span className="animate-pulse">
        <span className="font-mono tabular-nums">00:00</span>{" "}
        <span className="text-muted-foreground uppercase">GMT-0</span>
      </span>
    );
  }

  return (
    <span>
      <span className="font-mono tabular-nums">{timeString}</span>{" "}
      <span className="text-muted-foreground">
        <span className="uppercase">GMT-7</span>
        {diffText && ` · ${diffText}`}
      </span>
    </span>
  );
}
