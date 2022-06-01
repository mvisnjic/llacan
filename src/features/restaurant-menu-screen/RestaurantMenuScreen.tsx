import { useRoute } from "@react-navigation/native";
import { Dictionary } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Screen } from "~/components/Screen";
import { Spinner } from "~/components/Spinner";
import { View } from "~/components/View";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { useStore } from "~/mobx/utils/useStore";
import { FlatlistHeader } from "./FlatlistHeader";
import { MenuListItem } from "./MenuListItem";

interface MenuItem {
  category: string;
  name: string;
  price: number;
  description: string;
}

export interface MenuListItemProps {
  menuCategory: { category: string; categoryItems: [MenuItem] };
  restaurant: any;
}

export const RestaurantMenuScreen = observer(function RestaurantMenuScreen() {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const store = useStore();

  const { restaurant } = route.params as {
    restaurant: RestaurantInstance;
  };

  const menuQuery = useQuery(["menuList"], () => {
    return store.menuStore.readMenuList(restaurant.title);
  });

  const menu = menuQuery.data as unknown as Dictionary<[MenuItem]>;

  const menuObjectConvertedToArray = [];
  for (const key in menu) {
    menuObjectConvertedToArray.push({
      category: key,
      categoryItems: menu[key],
    });
  }

  const menuArrayCastToCorrectType = menuObjectConvertedToArray as {
    category: string;
    categoryItems: [MenuItem];
  }[];

  if (menuQuery.isLoading || menuQuery.isIdle) {
    return (
      <View flex centerContent paddingExtraLarge>
        <Spinner />
      </View>
    );
  } else if (menuQuery.isError) {
    return (
      <View flex centerContent paddingExtraLarge>
        <Spinner />
      </View>
    );
  } else {
    return (
      <Screen preventScroll>
        <View>
          <FlatList
            data={menuArrayCastToCorrectType}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            keyExtractor={(menuItem) => String(JSON.stringify(menuItem))}
            renderItem={({ item }) => (
              <MenuListItem menuCategory={item} restaurant={restaurant} />
            )}
            ListHeaderComponent={<FlatlistHeader restaurant={restaurant} />}
          />
        </View>
      </Screen>
    );
  }
});
