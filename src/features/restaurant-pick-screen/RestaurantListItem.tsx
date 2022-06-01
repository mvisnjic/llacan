import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";
import {
  RestaurantListItemProps,
  useStyle,
  allOrdersAreActive,
} from "./RestaurantPickScreen";

export const RestaurantListItem = observer(function RestaurantListItem({
  restaurant,
}: RestaurantListItemProps) {
  const S = useStyle();
  const navigation = useNavigation();

  return (
    <View paddingHorizontalLarge paddingVerticalMedium>
      <View paddingLarge style={S.container}>
        <Spacer />
        <Text sizeLarge weightBold>
          {restaurant.title}
        </Text>
        <Spacer small />
        <Text sizeSmall weightLight>
          {restaurant.tags.join(", ").toLowerCase()}
          {restaurant.hasPommes && ", pommes"}
        </Text>
        <Spacer large />

        <View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="home-outline"
              color={C.colorBackgroundDark}
            />
            <Spacer large />
            <Text sizeMedium weightLight>
              {restaurant.address}
            </Text>
          </View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="phone-outline"
              color={C.colorBackgroundDark}
            />
            <Spacer large />
            <Text sizeMedium weightLight>
              {restaurant.phone.replace(/ /g, "-").replace(/385-/g, "0")}
            </Text>
          </View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="circle-outline"
              color={allOrdersAreActive ? "#2DCB48" : C.colorBackgroundLight}
            />
            <Spacer large />
            <Text
              sizeMedium
              weightLight
              style={{
                color: allOrdersAreActive
                  ? C.colorBackgroundDark
                  : C.colorBackgroundLight,
              }}
            >
              Aktivna narudžba
            </Text>
          </View>
        </View>
        <Spacer large />
        <Button
          outline
          title="Menu i info"
          onPress={() =>
            navigation.navigate("RestaurantMenuScreen", {
              restaurant: restaurant,
            })
          }
        />
        <Spacer />
        <Button
          title={allOrdersAreActive ? "Pridruži se" : "Nova narudžba"}
          onPress={() =>
            restaurant.hasPommes
              ? navigation.navigate("SecondSelectionScreen", {
                  restaurant: restaurant,
                })
              : navigation.navigate("SelectionScreen", {
                  restaurant: restaurant,
                })
          }
        />
      </View>
    </View>
  );
});
