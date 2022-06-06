import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import Line from "./images/Line";

function useStyle() {
  return StyleSheet.create({
    IconColor: {
      color: "#DADADA",
    },
    pastOrderContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE",
      justifyContent: "space-between",
    },
    alignCenter: {
      alignSelf: "center",
    },
  });
}

export const ActiveOrdersScreen = observer(function ActiveOrdersScreen() {
  const S = useStyle();
  const store = useStore();

  const { activeOrderRestaurants } = store.restaurantStore;

  return (
    <Screen preventScroll>
      <View paddingLarge style={S.pastOrderContainer}>
        <Text sizeLarge weightBold>
          Aktivne narudžbe
        </Text>
      </View>
      {activeOrderRestaurants.map((restaurant) => (
        <TouchableOpacity activeOpacity={0.5} key={restaurant.id}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                {restaurant.title}
              </Text>
              <Text>{restaurant.activeOrder?.name}</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
