import { useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Screen } from "~/components/Screen";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { styleConstants as C } from "~/style/styleConstants";
import { Header } from "./Header";
import { MySelection } from "./MySelection";
import { OtherUserOrderCount } from "./OtherUserOrderCount";
import { UserOrder } from "./UserOrder";

export function useStyle() {
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
  const route = useRoute();

  const { restaurant, order } = route.params as {
    restaurant: typeof restaurantData[0];
    order: { name: string; price: number; condiments: string[] };
  };

  const [orderInCart, setOrderInCart] = useState<typeof order | undefined>(
    order
  );

  return (
    <Screen preventScroll>
      <Header restaurant={restaurant} />
      <MySelection orderInCart={orderInCart} restaurant={restaurant} />
      {orderInCart && (
        <UserOrder orderInCart={orderInCart} setOrderInCart={setOrderInCart} />
      )}
      <OtherUserOrderCount />
      {/* TODO lista narudzbi ostalih usera */}
    </Screen>
  );
});
