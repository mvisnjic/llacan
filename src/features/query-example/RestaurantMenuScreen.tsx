import { useRoute } from "@react-navigation/native";
import _, { Dictionary } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Icon } from "~/components/Icon";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";
import { removeBracketsAroundText } from "~/utils/removeBracketsAroundText";
import { titleCase } from "../../utils/titleCase";
import { menuData } from "./menuData";

interface Menu {
  category: string;
  name: string;
  price: number;
  description: string;
}

interface MenuListItemProps {
  menuItem: { key: string; menu: [Menu] };
}

const MenuListItem = observer(function MenuListItem({
  menuItem,
}: MenuListItemProps) {
  return (
    <View>
      <View
        key={menuItem.key}
        paddingHorizontalLarge
        paddingVerticalMedium
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
        flexDirectionRow
        alignItemsCenter
      >
        <Text sizeLarge weightBold>
          {menuItem.key}
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
      {menuItem.menu.map((itemInCategory) => (
        <View
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
        >
          <View style={{ maxWidth: "75%" }}>
            <Text sizeMedium weightSemiBold numberOfLines={1}>
              {itemInCategory.name.trim()}
            </Text>
            {itemInCategory.description && (
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
        </View>
      ))}
    </View>
  );
});

const FlatlistHeader = observer(function FlatlistHeader(props: {
  restaurant: any;
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

  const { restaurant } = route.params as { restaurant: typeof menuData[0] };

  const specificMenu = menuData.find((menu) => menu.title === restaurant.title);
  if (!specificMenu) throw new Error("Missing specificMenu");

  const specificMenuGrouped = _.groupBy(specificMenu.menu, "category");

  const menu2 = specificMenuGrouped as Dictionary<[Menu]>;

  const query = useQuery(["menuList"], () => {
    return Promise.resolve(menu2);
  });

  // if (query.isLoading || query.isIdle) return "Loading state";
  // if (query.isError) return "Error state";

  const menu = query.data; /*as {
    category: string;
    name: string;
    price: number;
    description: string;
  }[];*/

  // if (!menu) throw new Error("Missing menu");

  const arr = [];

  for (const key in menu) {
    arr.push({ key: key, menu: menu[key] });
  }

  const arr2 = arr as { key: string; menu: [Menu] }[];

  return (
    <Screen preventScroll>
      <View>
        <FlatList
          data={arr2}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          keyExtractor={(menuItem) => String(JSON.stringify(menuItem))}
          renderItem={({ item }) => <MenuListItem menuItem={item} />}
          ListHeaderComponent={<FlatlistHeader restaurant={restaurant} />}
        />
      </View>
    </Screen>
  );
});
