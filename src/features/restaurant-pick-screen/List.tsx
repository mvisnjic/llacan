import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { RestaurantListItem } from "./RestaurantListItem";

export const List = observer(function List() {
  const store = useStore();

  const restaurantQuery = useQuery(["restaurantList"], () => {
    return store.restaurantStore.readRestaurantList();
  });

  const restaurants = restaurantQuery.data;
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={restaurants}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        keyExtractor={(restaurant) => String(restaurant.id)}
        renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
      />
      <LinearGradient
        colors={[C.colorBackgroundLight, "rgba(255,255,255, 0)"]}
        style={{ width: "100%", height: 5, position: "absolute", top: 0 }}
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
      />
    </View>
  );
});
