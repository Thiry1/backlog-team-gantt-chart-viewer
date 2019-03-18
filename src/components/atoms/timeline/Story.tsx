import { storiesOf } from "@storybook/react";
import * as moment from "moment";
import * as React from "react";
import { Timeline, TimelineProps } from "./timeline";

const props: TimelineProps = {
  visibleTimeStart: moment(),
  visibleTimeEnd: moment().add("1", "months"),
  groups: [{ id: 1, title: "group 1" }, { id: 2, title: "group 2" }],
  items: [
    {
      id: 1,
      group: 1,
      title: "item 1",
      start_time: moment(),
      end_time: moment().add(1, "day"),
    },
    {
      id: 3,
      group: 1,
      title: "item 3",
      start_time: moment().add(2, "day"),
      end_time: moment().add(3, "day"),
    },
  ],
};

storiesOf("チャート", module).add("チャートを表示できる", () => {
  return <Timeline {...props} />;
});
