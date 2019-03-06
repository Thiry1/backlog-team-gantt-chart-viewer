import * as React from "react";
import { GroupList, GroupListProps } from "../groupList/groupList";

export interface GroupsProps {
  groupList: GroupListProps;
}

export const Groups: React.FunctionComponent<GroupsProps> = (
  props: GroupsProps,
) => {
  return (
    <>
      <GroupList {...props.groupList} />
    </>
  );
};
