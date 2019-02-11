import { createAction } from "../../util/createAction";

export const INITIALIZE_CLIENT = "btgcv/INITIALIZE_CLIENT";
export const initializeClient = createAction<void>(INITIALIZE_CLIENT);
