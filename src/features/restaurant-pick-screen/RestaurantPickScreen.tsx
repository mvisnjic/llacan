import { observer } from "mobx-react";
import React from "react";
import { Screen } from "~/components/Screen";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { Header } from "./Header";
import { List } from "./List";

export interface RestaurantListItemProps {
  restaurant: RestaurantInstance;
}

export const allOrdersAreActive = true;
export const userName = "User";

export const RestaurantPickScreen = observer(function RestaurantPickScreen() {
  return (
    <Screen preventScroll>
      <Header />
      <List />
    </Screen>
  );
});
