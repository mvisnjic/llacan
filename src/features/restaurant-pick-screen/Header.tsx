import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";
import { userName } from "./RestaurantPickScreen";

export const Header = observer(function Header() {
  const navigation = useNavigation();

  return (
    <>
      <Spacer large />
      <Spacer small />

      <View paddingLarge>
        <Text sizeLarge weightBold>
          {userName}, odaberite željeni restoran
        </Text>
      </View>
      <Spacer extraLarge />
      <Spacer medium />

      <View
        paddingHorizontalLarge
        centerContent
        style={{ alignItems: "flex-end" }}
      >
        <Button
          outline
          title="Prošle narudžbe"
          paddingHorizontalLarge
          onPress={() => {
            navigation.navigate("PastOrdersScreen");
          }}
        >
          <Icon
            size={C.fontSizeLarge}
            name="clock-outline"
            color={C.colorBackgroundDark}
          />
        </Button>
      </View>
      <Spacer extraLarge />
    </>
  );
});
