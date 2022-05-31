import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { useStyle } from "./SelectionScreen";

export const MySelection = observer(function MySelection(props: {
  restaurant: typeof restaurantData[0];
  orderInCart:
    | {
        name: string;
        price: number;
        condiments: string[];
      }
    | undefined;
}) {
  const S = useStyle();
  const navigation = useNavigation();
  const { orderInCart, restaurant } = props;

  return (
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
  );
});
