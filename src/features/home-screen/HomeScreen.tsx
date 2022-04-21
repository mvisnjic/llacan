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
          title="Query example"
          onPress={() => navigation.navigate("QueryExample")}
        />

        <Spacer />

        <Button
          title="Dropdown example"
          onPress={() => navigation.navigate("DropdownExample")}
        />

        <Spacer />
      </View>
    </Screen>
  );
});
