import { createBrowserHistory } from "history";
import {
  applyMiddleware,
  compose,
  createStore as store,
  Middleware,
  Store,
} from "redux";
import createSagaMiddleware, { END, Task } from "redux-saga";
import { createRootReducer } from "./modules/";

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

export const createStore = (...middlewares: Middleware[]): SagaStore => {
  const reduxStore = store(
    createRootReducer(history),
    undefined,
    compose(applyMiddleware(...[...middlewares, sagaMiddleware])),
  );
  return {
    close: () => reduxStore.dispatch(END),
    dispatch: reduxStore.dispatch,
    getState: reduxStore.getState,
    replaceReducer: reduxStore.replaceReducer,
    runSaga: sagaMiddleware.run,
    subscribe: reduxStore.subscribe,
  };
};

export interface SagaStore extends Store<any> {
  runSaga: (saga: () => any) => Task;
  close: () => void;
}
