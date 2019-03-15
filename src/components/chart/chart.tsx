import * as React from "react";
import Timeline, { ReactCalendarTimelineProps } from "react-calendar-timeline";
const classNames = require("./chart.scss");
import "react-calendar-timeline/lib/Timeline.css";
export type ChartProps = ReactCalendarTimelineProps;
export const Chart: React.FunctionComponent<ChartProps> = (
  props: ChartProps,
) => {
  if (props.items.length === 0) {
    return <p>データがありません</p>;
  }
  return (
    <div className={classNames.chart}>
      <Timeline sidebarContent={<div />} {...props} />
    </div>
  );
};
