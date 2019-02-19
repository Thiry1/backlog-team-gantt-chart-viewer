import { createAction } from "../../util/createAction";

export const INITIALIZE_CLIENT = "btgcv/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);

export const INITIALIZE_GROUPS_PAGE = "btgcv/INITIALIZE_GROUPS_PAGE";
export const initializeGroupsPage = createAction<void>(INITIALIZE_GROUPS_PAGE);
