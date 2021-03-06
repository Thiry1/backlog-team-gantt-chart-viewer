import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router";
import { Chart } from "./container/Chart";
import { ErrorBoundary } from "./container/ErrorBoundary";
import { Groups } from "./container/Groups";
import { rootSaga } from "./redux/modules";
import { initializeClient } from "./redux/modules/actions";
import { createStore, history } from "./redux/store";

const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Groups} />
            <Route path="/chart/:id" component={Chart} />
          </Switch>
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app"),
  );
});
