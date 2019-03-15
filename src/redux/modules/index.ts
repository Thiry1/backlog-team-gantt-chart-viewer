import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import * as groupIssues from "./groupIssues/groupIssues";
import * as groups from "./groups/groups";
import * as service from "./service/service";
import * as space from "./space/space";

export interface State {
  groups: groups.GroupsState;
  groupIssues: groupIssues.GroupIssuesState;
  service: service.ServiceState;
  space: space.SpaceState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    groups: groups.reducer,
    groupIssues: groupIssues.reducer,
    service: service.reducer,
    space: space.reducer,
  });

export function* rootSaga(): SagaIterator {
  yield all([
    fork(groups.rootSaga),
    fork(service.rootSaga),
    fork(groupIssues.rootSaga),
    fork(space.rootSaga),
  ]);
}
