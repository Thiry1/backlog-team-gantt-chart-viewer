import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { Group } from "../../client/backlog/types";
import { GroupList, GroupListProps } from "./groupList";
const props: GroupListProps = {
  groups: [
    {
      id: 1,
      name: "hoge",
    } as Group,
    {
      id: 2,
      name: "fuga",
    } as Group,
  ],
};

storiesOf("グループリスト", module).add("グループリストを表示できる", () => {
  return (
    <Router>
      <GroupList {...props} />
    </Router>
  );
});
