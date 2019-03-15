import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { SpaceApiResponse } from "../../../client/backlog/types";
import { createAction } from "../../../util/createAction";
import { INITIALIZE_CLIENT } from "../actions";
import { State } from "../index";

export const SET_SPACE = "btgcv/space/SET_SPACE";
export const setSpace = createAction<SpaceState>(SET_SPACE);
export const SET_LOADING = "btgcv/space/SET_LOADING";
export const setLoading = createAction<boolean>(SET_LOADING);

export interface SpaceState {
  /**
   * backlog のスペースの URL.
   */
  spaceUrl: string;
  /**
   * 読み込み中か.
   */
  loading: boolean;
}

const initialState: SpaceState = {
  spaceUrl: "",
  loading: true,
};

export function* runFetchSpace(): SagaIterator {
  try {
    yield put(setLoading(true));
    const backlogService = yield select(
      (state: State) => state.service.backlogService,
    );
    const space: SpaceApiResponse = yield call(backlogService.fetchSpace);
    yield put(
      setSpace({
        spaceUrl: `https://${space.spaceKey}.backlog.com/`,
        loading: false,
      }),
    );
  } catch (e) {
    console.error("failed to fetch groups", e);
    yield put(setSpace(initialState)); // TODO: エラー表示
  }
}

export const reducer = handleActions<SpaceState, any>(
  {
    [SET_SPACE]: (state, action: Action<SpaceState>) => action.payload,
    [SET_LOADING]: (state, action: Action<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
  initialState,
);

export function* rootSaga(): SagaIterator {
  yield all([takeLatest([INITIALIZE_CLIENT], runFetchSpace)]);
}
