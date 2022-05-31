import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { IconButton } from "~/components/IconButton";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { useStore } from "~/mobx/utils/useStore";
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
    circle: {
      width: 40,
      height: 40,
      borderRadius: 100 / 2,
      backgroundColor: C.colorBackgroundTheme,
    },
  });
}

export const SelectionScreen = observer(function SelectionScreen() {
  const S = useStyle();
  const navigation = useNavigation();
  const route = useRoute();
  const store = useStore();

  const { restaurant, order } = route.params as {
    restaurant: typeof restaurantData[0];
    order: { name: string; price: number; condiments: string[] };
  };

  const [orderInCart, setOrderInCart] = useState(order);

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
            disabled={!!orderInCart}
            onPress={() =>
              navigation.navigate("RestaurantMenuScreen", {
                restaurant: restaurant,
              })
            }
          />
        </View>
        {orderInCart && (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EEEEEE",
              display: "flex",
            }}
            paddingMedium
            flexDirectionRow
          >
            <View centerContent style={{ width: 70 }}>
              <View style={S.circle} />
              <Text
                sizeMedium
                weightSemiBold
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                User
              </Text>
            </View>
            <Spacer />
            <View>
              <View flexDirectionRow>
                <Text sizeMediumLarge weightSemiBold style={{ width: 220 }}>
                  {orderInCart.name}
                </Text>
                <View centerContent>
                  <Text sizeMediumLarge alignCenter>
                    {orderInCart.price},00 kn
                  </Text>
                </View>
              </View>
              <View flexDirectionRow>
                <Text sizeMediumSmall style={{ width: 220 }}>
                  {store.condimentStore.selectedCondimentsAsStrings.join(", ")}
                </Text>
                <IconButton
                  iconName="trash-can-outline"
                  iconColor={C.colorTextDanger}
                  centerContent
                  style={{ flex: 1 }}
                  onPress={() => setOrderInCart(undefined)}
                />
              </View>
            </View>
          </View>
        )}
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
