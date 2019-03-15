import { Action, handleActions } from "redux-actions";
import { SagaIterator } from "redux-saga";
import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import {
  Group,
  Issue,
  IssuesApiRequestParams,
  User,
} from "../../../client/backlog/types";
import { createAction } from "../../../util/createAction";
import { fetchGroups, INITIALIZE_CHART_PAGE, setGroups } from "../actions";
import { State } from "../index";

export const SET_GROUP_ISSUES = "btgcv/SET_GROUP_ISSUES";
export const setGroupIssues = createAction<GroupIssuesState>(SET_GROUP_ISSUES);
export const SET_LOADING = "btgcv/groupIssues/SET_LOADING";
export const setLoading = createAction<boolean>(SET_LOADING);

export interface GroupIssuesState {
  groupIssues: {
    [groupId: number]: Issue[];
  };
  loading: boolean;
}

const initialState: GroupIssuesState = {
  groupIssues: {},
  loading: true,
};

export function* runFetchGroupIssues(action: Action<number>): SagaIterator {
  try {
    yield put(setLoading(true));
    const backlogService = yield select(
      (state: State) => state.service.backlogService,
    );
    if ((yield select((state: State) => state.groups.groups)).length === 0) {
      // グループ情報がない場合は fetch する.
      yield put(fetchGroups());
      yield take(setGroups);
    }
    const targetGroup = yield select((state: State) =>
      state.groups.groups.find((group: Group) => group.id === action.payload),
    );

    if (!targetGroup) {
      const groups = yield select((state: State) => state.groups.groups);
      console.error("runFetchGroupIssues: target not found", groups);
      return;
    }

    const groupIssues: Issue[] = [];
    // 課題取得 API は1リクエストで最大100件までしか取得できない.
    // ガントチャートを作成するのに十分なデータを取得するためにユーザーごとに API を叩く.
    for (const user of targetGroup.members) {
      const params: IssuesApiRequestParams = {
        assigneeId: [user.id],
      };
      const issues: Issue[] = yield call(backlogService.fetchIssues, params);
      groupIssues.push(...issues);
    }
    yield put(
      setGroupIssues({
        groupIssues: {
          ...(yield select((state: State) => state.groupIssues.groupIssues)),
          [targetGroup.id]: groupIssues,
        },
        loading: false,
      }),
    );
  } catch (e) {
    console.error("failed to fetch group issues", e);
    yield put(setGroupIssues(initialState));
  }
}

export const reducer = handleActions<GroupIssuesState, any>(
  {
    [SET_GROUP_ISSUES]: (state, action: Action<GroupIssuesState>) =>
      action.payload,
    [SET_LOADING]: (state, action: Action<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
  },
  initialState,
);

export function* rootSaga(): SagaIterator {
  yield all([takeLatest(INITIALIZE_CHART_PAGE, runFetchGroupIssues)]);
}
