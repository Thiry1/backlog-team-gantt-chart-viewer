import * as React from "react";
import { useContext } from "react";
import { StoreContext } from "redux-react-hook";

export const Container = () => {
  const store = useContext(StoreContext);
  return <div>{JSON.stringify(store.getState())}</div>;
};
