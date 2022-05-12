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

export const PastOrdersScreen = observer(function PastOrdersScreen() {
  const S = useStyle();
  return (
    <Screen preventScroll>
      <View paddingLarge style={S.pastOrderContainer}>
        <Text sizeLarge weightBold>
          Prošle narudžbe
        </Text>
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.5}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                Fast Food Forever
              </Text>
              <Text sizeSmall>05.06.2020</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                Pizzeria Napoli
              </Text>
              <Text sizeSmall>05.06.2020</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                Fast Food Forever
              </Text>
              <Text sizeSmall>05.06.2020</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View paddingLarge flexDirectionRow style={S.pastOrderContainer}>
            <View>
              <Text sizeMediumLarge weightSemiBold>
                Fast Food Forever
              </Text>
              <Text sizeSmall>05.06.2020</Text>
            </View>
            <View style={S.alignCenter}>
              <Line />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
});
