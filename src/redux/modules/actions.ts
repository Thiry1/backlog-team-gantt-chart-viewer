import { Group } from "../../client/backlog/types";
import { createAction } from "../../util/createAction";

export const INITIALIZE_CLIENT = "btgcv/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);

export const FETCH_GROUPS = "btgcv/FETCH_GROUPS";
export const fetchGroups = createAction<void>(FETCH_GROUPS);

export const SET_GROUPS = "btgcv/SET_GROUPS";
export const setGroups = createAction<Group[]>(SET_GROUPS);

export const INITIALIZE_GROUPS_PAGE = "btgcv/INITIALIZE_GROUPS_PAGE";
export const initializeGroupsPage = createAction<void>(INITIALIZE_GROUPS_PAGE);

export const INITIALIZE_CHART_PAGE = "btgcv/INITIALIZE_CHART_PAGE";
export const initializeChartPage = createAction<void>(INITIALIZE_CHART_PAGE);
