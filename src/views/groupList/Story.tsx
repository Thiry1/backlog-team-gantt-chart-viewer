import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Group } from "../../client/backlog/types";
import { GroupList, GroupListProps } from "./groupList";

const props: GroupListProps = {
  groups: [
    {
      id: 1,
    } as Group,
    {
      id: 2,
    } as Group,
  ],
};

storiesOf("グループリスト", module).add("グループリストを表示できる", () => {
  return <GroupList {...props} />;
});
