import { useNavigation, useRoute } from "@react-navigation/native";
import { Dictionary } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Icon } from "~/components/Icon";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { removeBracketsAroundText } from "~/utils/removeBracketsAroundText";
import { titleCase } from "../../utils/titleCase";
import { restaurantData } from "../restaurant-pick-screen/restaurantData";

interface MenuItem {
  category: string;
  name: string;
  price: number;
  description: string;
}

interface MenuListItemProps {
  menuCategory: { category: string; categoryItems: [MenuItem] };
  restaurant: any;
}

const MenuListItem = observer(function MenuListItem({
  menuCategory,
  restaurant,
}: MenuListItemProps) {
  const navigation = useNavigation();
  return (
    <View>
      <View
        key={menuCategory.category}
        paddingHorizontalLarge
        paddingVerticalMedium
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
        flexDirectionRow
        alignItemsCenter
      >
        <Text sizeLarge weightBold>
          {menuCategory.category}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <Icon
            size={C.fontSizeLarge}
            name="menu-down-outline"
            color={C.colorBackgroundDark}
          />
        </View>
      </View>
      {menuCategory.categoryItems.map((itemInCategory) => (
        <TouchableOpacity
          key={JSON.stringify(itemInCategory)}
          paddingHorizontalLarge
          paddingVerticalSmall
          flexDirectionRow
          centerContent
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#EEEEEE",
            minHeight: 60,
          }}
          onPress={() =>
            navigation.navigate("ItemDetailsScreen", {
              menuItem: itemInCategory,
              restaurant: restaurant,
            })
          }
        >
          <View style={{ maxWidth: "75%" }}>
            <Text sizeMedium weightSemiBold numberOfLines={1}>
              {itemInCategory.name.trim()}
            </Text>
            {itemInCategory.description !== "" && (
              <Text sizeExtraSmall numberOfLines={2}>
                {titleCase(
                  removeBracketsAroundText(
                    itemInCategory.description
                      .replace(/,(?=[^\s])/g, ", ")
                      .trim()
                  )
                )}
              </Text>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }} centerContent>
            <Text>{itemInCategory.price},00 kn</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

const FlatlistHeader = observer(function FlatlistHeader(props: {
  restaurant: typeof restaurantData[0];
}) {
  return (
    <>
      <Image
        source={require("~/assets/street-fast-food-hamburger-with-bbq-grilled-steak-PE2NUQB1.png")}
        style={{ width: "100%" }}
      />

      <View paddingLarge>
        <Text sizeLarge weightBold>
          {props.restaurant.title}
        </Text>
      </View>

      <View
        paddingHorizontalLarge
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
      >
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeLarge}
            name="home-outline"
            color={C.colorBackgroundDark}
          />
          <Spacer />
          <Text sizeMediumSmall weightLight>
            {props.restaurant.address}
          </Text>
        </View>
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeLarge}
            name="phone-outline"
            color={C.colorBackgroundDark}
          />
          <Spacer />
          <Text sizeMediumSmall weightLight>
            {props.restaurant.phone.replace(/ /g, "-").replace(/385-/g, "0")}
          </Text>
        </View>
        <Spacer large />
        <Spacer />
      </View>
      <View paddingHorizontalLarge paddingVerticalMedium>
        <View
          style={{ borderColor: "#EEEEEE", borderWidth: 1 }}
          paddingHorizontalLarge
          paddingVerticalMedium
        >
          <Text weightSemiBold sizeMediumLarge>
            Dodaci
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingLarge>
          <Text sizeMediumSmall>
            kečap, ajvar, majoneza, kiseli krastavci, zelena salata, rajčica,
            luk, chilli
          </Text>
        </View>
      </View>
      <View
        paddingHorizontalLarge
        paddingVerticalMedium
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
      >
        <View
          style={{ borderColor: "#EEEEEE", borderWidth: 1 }}
          paddingHorizontalLarge
          paddingVerticalMedium
        >
          <Text weightSemiBold sizeMediumLarge>
            Kategorije
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingLarge>
          {props.restaurant.tags.map((tag: string) => (
            <Text weightSemiBold key={tag}>
              {tag.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
});

export const RestaurantMenuScreen = observer(function RestaurantMenuScreen() {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const store = useStore();

  const { restaurant } = route.params as {
    restaurant: typeof restaurantData[0];
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
