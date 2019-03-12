import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { State } from "../redux/modules";
import { initializeChartPage } from "../redux/modules/actions";
import { GroupIssuesState } from "../redux/modules/groupIssues/groupIssues";
interface PropsFromState {
  groupIssues: GroupIssuesState;
}
interface Dispatcher {
  initializeChartPage: (groupId: number) => void;
}
interface ReactRouterParams {
  match: {
    params: {
      id: string;
    };
  };
}
interface Props extends PropsFromState, Dispatcher, ReactRouterParams {}
class Component extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.initializeChartPage(parseInt(this.props.match.params.id, 10));
  }

  public render(): JSX.Element {
    // TODO: suspense
    if (this.props.groupIssues.loading) {
      return (
        <p>
          読み込み中
          <br />
          グループに所属しているメンバー数に比例して時間がかかります
        </p>
      );
    }
    return <div>{JSON.stringify(this.props)}</div>;
  }
}

const mapStateToProps = (state: State): PropsFromState => {
  console.log("state", state);
  return {
    groupIssues: state.groupIssues,
  };
};
export const Chart = compose(
  withRouter,
  connect<PropsFromState, Dispatcher>(
    mapStateToProps,
    { initializeChartPage },
  ),
)(Component);
