import * as React from "react";
import CalendarTimeline, {
  ReactCalendarTimelineProps,
} from "react-calendar-timeline";
const classNames = require("./timeline.scss");
import "react-calendar-timeline/lib/Timeline.css";
export type TimelineProps = ReactCalendarTimelineProps;
export const Timeline: React.FunctionComponent<TimelineProps> = (
  props: TimelineProps,
) => {
  if (props.items.length === 0) {
    return <p>データがありません</p>;
  }
  return (
    <div className={classNames.timeline}>
      <CalendarTimeline sidebarContent={<div />} {...props} />
    </div>
  );
};
