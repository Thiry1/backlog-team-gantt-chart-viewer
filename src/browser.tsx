import * as React from "react";
import * as ReactDOM from "react-dom";
import { StoreContext } from "redux-react-hook";
import { Container } from "./container/container";
import { rootSaga } from "./redux/modules";
import { initializeClient } from "./redux/modules/actions";
import { createStore } from "./redux/store";

const store = createStore();
store.runSaga(rootSaga);
store.dispatch(initializeClient());

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <Container />
    </StoreContext.Provider>,
    document.getElementById("app"),
  );
});
