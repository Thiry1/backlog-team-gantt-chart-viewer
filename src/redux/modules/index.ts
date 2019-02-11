import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";

// export interface State {}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });

export function* rootSaga(): SagaIterator {
  // yield all([fork(players.rootSaga)]);
}
