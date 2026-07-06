"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type ButtonTooltipProps = React.ComponentProps<typeof Button> & {
  tooltip: Omit<React.ComponentProps<typeof Tooltip>, "children"> & {
    contentSlot: Omit<React.ComponentProps<typeof TooltipContent>, "children"> & {
      content: React.ReactNode;
    };
  };
};

function ButtonTooltip({ ref, tooltip, className, ...props }: ButtonTooltipProps) {
  const { contentSlot, ...tooltipProps } = tooltip;

  return (
    <Tooltip {...tooltipProps}>
      <TooltipTrigger render={<Button ref={ref} className={className} {...props} />} />
      <TooltipContent {...contentSlot}>{contentSlot.content}</TooltipContent>
    </Tooltip>
  );
}

export { ButtonTooltip, type ButtonTooltipProps };
