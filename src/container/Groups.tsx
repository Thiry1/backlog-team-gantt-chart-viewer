import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import * as Views from "../components";
import { State } from "../redux/modules";
import { initializeGroupsPage } from "../redux/modules/actions";
import { GroupsState } from "../redux/modules/groups/groups";
interface PropsFromState {
  groups: GroupsState;
}
interface Dispatcher {
  initializeGroupsPage: () => void;
}
interface Props extends PropsFromState, Dispatcher {}
class Component extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.initializeGroupsPage();
  }

  public render(): JSX.Element {
    // TODO: suspense
    if (this.props.groups.loading) {
      return <p>グループ一覧読み込み中</p>;
    }

    const props: Views.GroupsProps = {
      groupList: {
        groups: this.props.groups.groups,
      },
    };
    return <Views.Groups {...props} />;
  }
}
// const Component = (props: Props): JSX.Element => {
//   useEffect(() => {
//     props.initializeGroupsPage();
//   }, []);
//   return <div>{props}</div>;
// };

const mapStateToProps = (state: State): PropsFromState => {
  console.log("state", state);
  return {
    groups: state.groups,
  };
};
export const Groups = compose(
  connect<PropsFromState, Dispatcher>(
    mapStateToProps,
    { initializeGroupsPage },
  ),
)(Component);
