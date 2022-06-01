import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "~/components/Screen";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { styleConstants as C } from "~/style/styleConstants";
import { shadow } from "~/utils/shadow";
import { Header } from "./Header";
import { List } from "./List";

export interface RestaurantListItemProps {
  restaurant: RestaurantInstance;
}

export const allOrdersAreActive = true;
export const userName = "User";

export function useStyle() {
  return StyleSheet.create({
    container: {
      backgroundColor: allOrdersAreActive
        ? C.colorBackgroundThemeSofter
        : C.colorBackgroundLight,
      ...shadow(5),
    },
  });
}

export const RestaurantPickScreen = observer(function RestaurantPickScreen() {
  return (
    <Screen preventScroll>
      <Header />
      <List />
    </Screen>
  );
});
