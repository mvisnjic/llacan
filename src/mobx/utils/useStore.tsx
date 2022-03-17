import React from "react";
import { MSTContext } from "~/mobx/MSTContext";
import { RootStoreInstance } from "../RootStore";

export function useStore(): RootStoreInstance {
  const store = React.useContext(MSTContext);
  if (!store) {
    throw new Error("useStore called without Provider");
  }
  return store;
}
