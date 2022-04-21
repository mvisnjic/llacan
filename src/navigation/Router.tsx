// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { MainTabParams, TopLevelStackParams } from "./RouterTypes";
// import { HomeScreen } from "~/features/home-screen/HomeScreen";
import {
  NavigationContainer,
  NavigationContainerProps,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import React from "react";
import { Header } from "~/components/Header";
import { DropdownExample } from "~/features/dropdown/DropdownExample";
import { LoginScreen } from "~/features/login/LoginScreen";
import { RestaurantMenuScreen } from "~/features/restaurant-menu-screen/RestaurantMenuScreen";
import { RestaurantPickScreen } from "~/features/restaurant-pick-screen/RestaurantPickScreen";
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
          name="RestaurantPickScreen"
          component={RestaurantPickScreen}
        />

        <Stack.Screen
          name="RestaurantMenuScreen"
          component={RestaurantMenuScreen}
        />

        <Stack.Screen name="DropdownExample" component={DropdownExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
