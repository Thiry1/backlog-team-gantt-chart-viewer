import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Issue } from "../client/backlog/types";
import { Chart as ChartView, ChartProps } from "../components/chart/chart";
import { State } from "../redux/modules";
import { initializeChartPage } from "../redux/modules/actions";
import { GroupIssuesState } from "../redux/modules/groupIssues/groupIssues";
import { SpaceState } from "../redux/modules/space/space";
interface PropsFromState {
  groupIssues: GroupIssuesState;
  space: SpaceState;
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
    const props = this.createChartProps(
      this.props.groupIssues.groupIssues[
        parseInt(this.props.match.params.id, 10)
      ],
    );
    // return <div>{JSON.stringify(this.props)}</div>;
    console.log(props);
    return <ChartView {...props} />;
  }

  private createChartProps = (issues: Issue[]): ChartProps | null => {
    if (!issues || issues.length === 0) {
      return null;
    }
    const groups: ChartProps["groups"] = [];
    const items: ChartProps["items"] = [];
    issues.forEach(issue => {
      const isGroupRegistered = groups.some(
        group => group.id === issue.assignee.id,
      );
      if (!isGroupRegistered) {
        groups.push({
          id: issue.assignee.id,
          title: issue.assignee.name,
          stackItems: true,
        } as any); // stackItems が型定義にない
      }

      items.push({
        id: issue.id,
        group: issue.assignee.id,
        title: `[${issue.issueKey}] ${issue.summary}`,
        start_time: moment(issue.startDate).startOf("day"),
        end_time: moment(issue.dueDate).endOf("day"),
      });
    });
    return {
      groups,
      items,
      defaultTimeStart: moment().startOf("day"),
      defaultTimeEnd: moment()
        .endOf("day")
        .add("1", "months"),
      canMove: false,
      canChangeGroup: false,
      dragSnap: 3600 * 24 * 1000,
      itemTouchSendsClick: true,
      onItemClick: (itemId: number) => {
        const target = issues.find(issue => issue.id === itemId);
        window.open(
          `${this.props.space.spaceUrl}view/${target.issueKey}`,
          "_blank",
        );
      },
    };
  };
}

const mapStateToProps = (state: State): PropsFromState => {
  console.log("state", state);
  return {
    groupIssues: state.groupIssues,
    space: state.space,
  };
};
export const Chart = compose(
  withRouter,
  connect<PropsFromState, Dispatcher>(
    mapStateToProps,
    { initializeChartPage },
  ),
)(Component);
