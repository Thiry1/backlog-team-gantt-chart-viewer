import * as React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Group } from "../client/backlog/types";
import * as Views from "../components";
import { State } from "../redux/modules";
import { initializeGroupsPage } from "../redux/modules/actions";
interface PropsFromState {
  groups: Group[];
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
    const props: Views.GroupsProps = {
      groupList: {
        groups: this.props.groups,
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
    groups: state.groups.groups,
  };
};
export const Groups = compose(
  connect<PropsFromState, Dispatcher>(
    mapStateToProps,
    { initializeGroupsPage },
  ),
)(Component);
