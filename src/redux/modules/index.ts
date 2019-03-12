import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as groupIssues from "./groupIssues/groupIssues";
import * as groups from "./groups/groups";
import * as service from "./service/service";

export interface State {
  groups: groups.GroupsState;
  groupIssues: groupIssues.GroupIssuesState;
  service: service.ServiceState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    groups: groups.reducer,
    groupIssues: groupIssues.reducer,
    service: service.reducer,
  });

export function* rootSaga(): SagaIterator {
  yield all([
    fork(groups.rootSaga),
    fork(service.rootSaga),
    fork(groupIssues.rootSaga),
  ]);
}
