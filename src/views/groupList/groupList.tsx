import * as React from "react";
import { Link } from "react-router-dom";
import { Group } from "../../client/backlog/types";
export interface GroupListProps {
  groups: Group[];
}
export const GroupList: React.FunctionComponent<GroupListProps> = (
  props: GroupListProps,
) => {
  if (props.groups.length === 0) {
    return <p>グループがありません</p>;
  }
  return (
    <ul>
      {props.groups.map((group: Group) => {
        return (
          <li>
            <Link to={`/chart/${group.id}`}>{group.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};
