import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Icon } from "~/components/Icon";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { styleConstants as C } from "~/style/styleConstants";
import { removeBracketsAroundText } from "~/utils/removeBracketsAroundText";
import { titleCase } from "../../utils/titleCase";
import { MenuItem } from "./RestaurantMenuScreen";

export interface MenuListItemProps {
  menuCategory: { category: string; categoryItems: [MenuItem] };
  restaurant: RestaurantInstance;
}

export const MenuListItem = observer(function MenuListItem({
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
          onPress={() => {
            restaurant.addOrder(itemInCategory);
            navigation.navigate("ItemDetailsScreen", {
              menuItem: itemInCategory,
              restaurant: restaurant,
            });
          }}
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
