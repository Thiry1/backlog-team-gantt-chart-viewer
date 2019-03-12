import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { Group } from "../../../client/backlog/types";
import { createAction } from "../../../util/createAction";
import {
  FETCH_GROUPS,
  INITIALIZE_GROUPS_PAGE,
  SET_GROUPS,
  setGroups,
} from "../actions";
import { State } from "../index";

export const SET_LOADING = "btgcv/groups/SET_LOADING";
export const setLoading = createAction<boolean>(SET_LOADING);

export interface GroupsState {
  groups: Group[];
  loading: boolean;
}

const initialState: GroupsState = {
  groups: [],
  loading: false,
};

export function* runFetchGroups(): SagaIterator {
  try {
    yield put(setLoading(true));
    const backlogService = yield select(
      (state: State) => state.service.backlogService,
    );
    const groups: Group[] = yield call(backlogService.fetchGroups);
    yield put(
      setGroups({
        groups,
        loading: false,
      }),
    );
  } catch (e) {
    console.error("failed to fetch groups", e);
    yield put(setGroups(initialState));
  }
}

export const reducer = handleActions<GroupsState, any>(
  {
    [SET_GROUPS]: (state, action: Action<GroupsState>) => action.payload,
    [SET_LOADING]: (state, action: Action<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
  initialState,
);

export function* rootSaga(): SagaIterator {
  yield all([
    takeLatest([INITIALIZE_GROUPS_PAGE, FETCH_GROUPS], runFetchGroups),
  ]);
}
