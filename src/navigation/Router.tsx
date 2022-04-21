// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MainTabParams, TopLevelStackParams } from "./RouterTypes";
import {
  NavigationContainer,
  NavigationContainerProps,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import React from "react";
import { Header } from "~/components/Header";
import { DropdownExample } from "~/features/dropdown/DropdownExample";
import { HomeScreen } from "~/features/home-screen/HomeScreen";
import { LoginScreen } from "~/features/login/LoginScreen";
import { QueryExample } from "~/features/query-example/QueryExample";
import { useStore } from "~/mobx/utils/useStore";
import { TopLevelStackParams } from "./RouterTypes";

// const Tabs = createBottomTabNavigator<MainTabParams>();
const Stack = createNativeStackNavigator<TopLevelStackParams>();

export interface RouterProps {}

export const Router = observer(function Router({
  navigationContainerProps,
}: {
  navigationContainerProps: Partial<NavigationContainerProps>;
}) {
  const store = useStore();

  return (
    <NavigationContainer
      ref={store.navigationStore.setNavigation}
      {...navigationContainerProps}
    >
      <Stack.Navigator
        screenOptions={{ header: (props) => <Header {...props} /> }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="QueryExample"
          component={QueryExample}
          options={{ title: "QueryExample" }}
        />

        <Stack.Screen
          name="DropdownExample"
          component={DropdownExample}
          options={{ title: "DropdownExample" }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "HomeScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
