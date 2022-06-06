import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import Line from "./images/Line";

function useStyle() {
  return StyleSheet.create({
    IconColor: {
      color: "#DADADA",
    },
    pastOrderContainer: {
      borderBottomWidth: 1,
      borderBottomColor: "#EEEEEE",
      justifyContent: "space-between",
    },
    alignCenter: {
      alignSelf: "center",
    },
  });
}

const pastOrders = [
  {
    id: 0,
    restaurant: "Fast Food Forever",
    date: "05.06.2020.",
  },
  {
    id: 1,
    restaurant: "Pizzeria Napoli",
    date: "05.06.2020.",
  },
  {
    id: 2,
    restaurant: "Fast Food Forever",
    date: "05.06.2020.",
  },
  {
    id: 3,
    restaurant: "Fast Food Forever",
    date: "05.06.2020.",
  },
];

export const PastOrdersScreen = observer(function PastOrdersScreen() {
  const S = useStyle();
  return (
    <Screen preventScroll>
      <View paddingLarge style={S.pastOrderContainer}>
        <Text sizeLarge weightBold>
          Prošle narudžbe
        </Text>
      </View>
      {pastOrders.map((order) => (
        <TouchableOpacity activeOpacity={0.5} key={order.id}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                {order.restaurant}
              </Text>
              <Text sizeSmall>{order.date}</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Screen>
  );
});
