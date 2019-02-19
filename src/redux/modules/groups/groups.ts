import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Group } from "../../../client/backlog/types";
import { createAction } from "../../../util/createAction";
import { INITIALIZE_GROUPS_PAGE } from "../actions";
import { State } from "../index";

export const SET_GROUPS = "btgcv/SET_GROUPS";
export const setGroups = createAction<Group[]>(SET_GROUPS);

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
  yield all([takeLatest(INITIALIZE_GROUPS_PAGE, runFetchGroups)]);
}
