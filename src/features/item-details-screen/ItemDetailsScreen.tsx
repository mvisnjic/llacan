import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";
import { removeBracketsAroundText } from "~/utils/removeBracketsAroundText";
import { titleCase } from "~/utils/titleCase";

function useStyle() {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    orderButton: {
      position: "absolute",
      bottom: C.spacingLarge,
      paddingBottom: insets.bottom,
      alignSelf: "center",
      width: "100%",
    },
  });
}

const condiments = [
  "kečap",
  "ajvar",
  "majoneza",
  "kiseli krastavci",
  "zelena salata",
  "rajčica",
  "luk",
  "chilli",
];

const CondimentItem = function CondimentItem({
  condiment,
}: {
  condiment: string;
}) {
  const [isPressedIn, setIsPressedIn] = useState(false);
  const colorOfBackground = isPressedIn
    ? C.colorBackgroundThemeSoft
    : C.colorBackgroundLightDark;

  return (
    <View style={{ backgroundColor: colorOfBackground, borderRadius: 40 }}>
      <TouchableOpacity
        onPress={() => setIsPressedIn(!isPressedIn)}
        paddingHorizontalLarge
        paddingVerticalMedium
      >
        <Text>{condiment}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ItemDetailsScreen = observer(function ItemDetailsScreen() {
  const S = useStyle();
  const navigation = useNavigation();
  const route = useRoute();

  const { menuItem } = route.params as {
    menuItem: any;
  };

  return (
    <Screen preventScroll>
      <View paddingExtraLarge>
        <Text alignCenter sizeExtraLarge weightBold>
          {menuItem.name}
        </Text>
        {menuItem.description && (
          <>
            <Spacer />
            <Text alignCenter>
              {titleCase(
                removeBracketsAroundText(
                  menuItem.description.replace(/,(?=[^\s])/g, ", ").trim()
                )
              )}
            </Text>
          </>
        )}
        <Spacer large />
        <Text weightSemiBold>Odaberite dodatke</Text>
        <Spacer />
        {condiments.map((condiment) => (
          <View key={condiment} paddingSmall>
            <CondimentItem condiment={condiment} />
          </View>
        ))}
      </View>
      <View paddingHorizontalLarge style={S.orderButton}>
        <Button
          title={"Dodaj za " + menuItem.price + ",00 kn"}
          onPress={() => navigation.navigate("SelectionScreen")}
        />
      </View>
    </Screen>
  );
});
