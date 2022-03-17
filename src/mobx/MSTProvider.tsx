import React, { ReactNode } from "react";
import { MSTContext } from "./MSTContext";
import { RootStoreInstance } from "./RootStore";

export function MSTProvider({
  children,
  store,
}: {
  children: ReactNode;
  store?: RootStoreInstance;
}) {
  return <MSTContext.Provider value={store}>{children}</MSTContext.Provider>;
}
