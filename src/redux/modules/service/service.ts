import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { BacklogService } from "../../../service/backlogService";
import { createAction } from "../../../util/createAction";
import { isBrowser } from "../../../util/isBrowser";
import { INITIALIZE_CLIENT } from "../actions";
declare const buildEnv: any;
export const SET_SERVICE = "btgcv/SET_SERVICE";
export const setService = createAction<ServiceState>(SET_SERVICE);

export interface ServiceState {
  backlogService: BacklogService;
}

const initialState: ServiceState = {
  backlogService: null,
};

export function* runSetService(): SagaIterator {
  yield put(
    setService({
      backlogService: isBrowser
        ? require("../../../service/client").backlogService
        : require("../../../service/server").backlogService,
    }),
  );
}

export const reducer = handleActions<ServiceState, any>(
  {
    [SET_SERVICE]: (state, action: Action<ServiceState>) => action.payload,
  },
  initialState,
);

export function* rootSaga(): SagaIterator {
  yield all([takeLatest(INITIALIZE_CLIENT, runSetService)]);
}
