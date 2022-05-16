import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { styleConstants as C } from "~/style/styleConstants";
import { formatPhoneNumber } from "~/utils/formatPhoneNumber";

function useStyle() {
  return StyleSheet.create({
    Image: {
      width: C.windowWidth,
      height: 187,
      position: "absolute",
    },
    imageContainer: {
      width: C.windowWidth,
      height: 187,
    },
    textContainer: {
      color: C.colorTextLight,
      marginTop: 43,
      marginLeft: 16,
      marginRight: 89,
    },
    IconColor: {
      color: "#DADADA",
    },
    mySelectionContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE",
      justifyContent: "space-between",
    },
  });
}

export const SelectionScreen = observer(function SelectionScreen() {
  const S = useStyle();
  const navigation = useNavigation();
  const route = useRoute();

  const { restaurant } = route.params as {
    restaurant: typeof restaurantData[0];
  };

  return (
    <Screen preventScroll>
      <View>
        <View style={S.imageContainer}>
          <Image
            source={require("~/assets/street-fast-food-hamburger-with-bbq-grilled-steak-PE2NUQB1.png")}
            style={S.Image}
          />
          <View style={S.textContainer}>
            <Text sizeExtraLarge weightBold colorLight>
              {restaurant.title}
            </Text>
            <Spacer />
            <View flexDirectionRow alignItemsCenter>
              <Icon
                size={C.fontSizeMediumLarge}
                name="home-outline"
                style={S.IconColor}
              />
              <Spacer />
              <Text sizeMediumSmall weightLight colorLight>
                {restaurant.address}
              </Text>
            </View>
            <Spacer />
            <View flexDirectionRow alignItemsCenter>
              <Icon
                size={C.fontSizeMediumLarge}
                name="phone-outline"
                style={S.IconColor}
              />
              <Spacer />
              <Text sizeMediumSmall weightLight colorLight>
                {formatPhoneNumber(restaurant.phone)}
              </Text>
            </View>
          </View>
        </View>
        <View
          paddingLarge
          flexDirectionRow
          alignItemsCenter
          style={S.mySelectionContainer}
        >
          <Text sizeMediumLarge weightSemiBold>
            Moj odabir
          </Text>
          <Button
            title="Odaberi za sebe"
            onPress={() =>
              navigation.navigate("RestaurantMenuScreen", {
                restaurant: restaurant,
              })
            }
          />
        </View>
        <View
          paddingLarge
          flexDirectionRow
          alignItemsCenter
          style={S.mySelectionContainer}
        >
          <Text sizeMediumLarge weightSemiBold>
            Ostali(0)
          </Text>
        </View>
      </View>
    </Screen>
  );
});
