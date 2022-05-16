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
import Pomes from "~/features/second-selection-screen/images/PomesIcon";
import { styleConstants as C } from "~/style/styleConstants";

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
      borderWidth: 1,
      borderColor: "#EEEEEE",
      marginHorizontal: 16,
    },
    buttonWidth: {
      width: "100%",
    },
    textDijeliPommes: {
      opacity: 0.6,
    },
    Pomfri: {
      height: 40,
      width: 40,
    },
    justifySpaceEvenly: {
      justifyContent: "space-evenly",
    },
  });
}

export const SecondSelectionScreen = observer(function SecondSelectionScreen() {
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
                {restaurant.phone.replace(/ /g, "-").replace(/385-/g, "0")}
              </Text>
            </View>
          </View>
        </View>
        <View paddingLarge alignItemsCenter style={S.mySelectionContainer}>
          <Text sizeMediumLarge weightSemiBold>
            Moj odabir
          </Text>
          <Spacer large />
          <Button
            title="Odaberi za sebe"
            style={S.buttonWidth}
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

        <View paddingLarge style={S.mySelectionContainer}>
          <View
            alignItemsCenter
            paddingHorizontalExtraLarge
            flexDirectionRow
            style={S.justifySpaceEvenly}
          >
            <View>
              <Pomes />
            </View>
            <Spacer />
            <View alignItemsCenter>
              <Text sizeMediumLarge weightSemiBold>
                Pommes party(0)
              </Text>

              <Text style={S.textDijeliPommes} sizeExtraSmall>
                Dijeli pommes sa kolegama
              </Text>
            </View>
            <Spacer />
            <View>
              <Pomes />
            </View>
          </View>

          <Spacer large />
          <Button title="Kreiraj party!" style={S.buttonWidth} />
        </View>
      </View>
    </Screen>
  );
});
