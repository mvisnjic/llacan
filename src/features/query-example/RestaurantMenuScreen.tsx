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
import { titleCase } from "../../utils/titleCase";
import { menuData } from "./menuData";

interface MenuListItemProps {
  menuItem: MenuInstance;
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
      }}
    >
      <View style={{ maxWidth: "75%" }}>
        <Text sizeMedium weightSemiBold numberOfLines={1}>
          {menuItem.name}
        </Text>
        {menuItem.description && (
          <Text sizeExtraSmall numberOfLines={2}>
            {titleCase(menuItem.description /*.replace(/,(?=[^\s])/g, ", ")*/)}
          </Text>
        )}
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} centerContent>
        <Text>{menuItem.price},00 kn</Text>
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
    return Promise.resolve<MenuInstance[]>(specificMenu?.menu);
  });
  const menu = query.data;

  const insets = useSafeAreaInsets();
  return (
    <Screen preventScroll>
      <View>
        <FlatList
          data={menu}
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
