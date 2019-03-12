import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Group } from "../../../client/backlog/types";
import {
  FETCH_GROUPS,
  INITIALIZE_GROUPS_PAGE,
  SET_GROUPS,
  setGroups,
} from "../actions";
import { State } from "../index";

export interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: [],
};

export function* runFetchGroups(): SagaIterator {
  try {
    const backlogService = yield select(
      (state: State) => state.service.backlogService,
    );
    const groups = yield call(backlogService.fetchGroups);
    yield put(setGroups(groups));
  } catch (e) {
    console.error("failed to fetch groups", e);
    yield put(setGroups([]));
  }
}

export const reducer = handleActions<GroupsState, any>(
  {
    [SET_GROUPS]: (state, action: Action<Group[]>) => ({
      groups: action.payload,
    }),
  },
  initialState,
);

export function* rootSaga(): SagaIterator {
  yield all([
    takeLatest([INITIALIZE_GROUPS_PAGE, FETCH_GROUPS], runFetchGroups),
  ]);
}
