import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { View } from "~/components/View";

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Screen>
      <View paddingMedium>
        <Button
          title="Restaurant Pick Screen"
          onPress={() => navigation.navigate("RestaurantPickScreen")}
        />

        <Spacer />

        <Button
          title="Dropdown example"
          onPress={() => navigation.navigate("DropdownExample")}
        />

        <Spacer />

        <Button
          title="Form example"
          onPress={() => navigation.navigate("FormExample")}
        />

        <Spacer />

        <Button
          title="Restaurant Menu Screen"
          onPress={() => navigation.navigate("RestaurantMenuScreen")}
        />
      </View>
    </Screen>
  );
});
