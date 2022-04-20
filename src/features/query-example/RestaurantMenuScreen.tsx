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
import { MenuInstance } from "~/mobx/entities/menu/Menu";
import { styleConstants as C } from "~/style/styleConstants";
import { menuData } from "./menuData";

interface MenuListItemProps {
  menuItem: MenuInstance;
}

interface Menu {
  category: string;
  name: string;
  price: number;
  description?: string;
}

const MenuListItem = observer(function MenuListItem({
  menuItem,
}: MenuListItemProps) {
  return (
    <View
      paddingHorizontalLarge
      paddingVerticalSmall
      flexDirectionRow
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        marginBottom: -10,
      }}
    >
      <View>
        <Text sizeMedium weightSemiBold>
          {menuItem.name}
        </Text>
        <Text sizeExtraSmall>{menuItem.description}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} centerContent>
        <Text>{menuItem.price},00</Text>
      </View>
    </View>
  );
});

const FlatlistHeader = observer((props: { restaurant: any }) => {
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
      {props.restaurant.tags.map((tag: string) => (
        <View
          key={tag}
          paddingHorizontalLarge
          paddingVerticalMedium
          style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
          flexDirectionRow
          alignItemsCenter
        >
          <Text sizeLarge weightBold>
            {tag}
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
      ))}
    </>
  );
});

export const RestaurantMenuScreen = observer(function RestaurantMenuScreen({
  route,
}) {
  const { restaurant } = route.params;
  const specificMenu = menuData.find((menu) => menu.title === restaurant.title);
  const query = useQuery(["menuList"], () => {
    return Promise.resolve<Menu[]>(specificMenu.menu);
  });
  const menus = query.data;

  const insets = useSafeAreaInsets();

  return (
    <Screen preventScroll>
      <View style={{ paddingBottom: 10 }}>
        <FlatList
          data={menus}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          keyExtractor={(menu) => String(JSON.stringify(menu))}
          renderItem={({ item }) => <MenuListItem menuItem={item} />}
          ListHeaderComponent={<FlatlistHeader restaurant={restaurant} />}
        />
      </View>
    </Screen>
  );
});
