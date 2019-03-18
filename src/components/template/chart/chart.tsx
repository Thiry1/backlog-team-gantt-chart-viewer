import * as React from "react";
import { Timeline, TimelineProps } from "../../atoms/timeline/timeline";

export interface ChartProps {
  timeline: TimelineProps;
}

export const Chart: React.FunctionComponent<ChartProps> = (
  props: ChartProps,
) => {
  return (
    <>
      <Timeline {...props.timeline} />
    </>
  );
};
