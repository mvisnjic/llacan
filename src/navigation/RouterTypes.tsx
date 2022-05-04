import { RouteProp as RNRouteProp } from "@react-navigation/native";

// --------------------------------------------
// Start navigator params definitions

//TopLevelStack > MainTab
export type MainTabParams = {
  LoginScreen: undefined;
};

// TopLevelStack
export type TopLevelStackParams = {
  LoginScreen: MainTabParams;
  FormExample: undefined;
  RestaurantMenuScreen: { restaurant: any };
  ItemDetailsScreen: { menuItem: any };
  RestaurantPickScreen: undefined;
  DropdownExample: undefined;
  HomeScreen: undefined;
  SelectionScreen: undefined;
  SecondSelectionScreen: undefined;
};

// End navigator params definitions
// --------------------------------------------

export type ScreenName = keyof TopLevelStackParams;

// Param prop getter
export type RouteProp<ScreenName_ extends ScreenName> =
  ScreenName_ extends keyof TopLevelStackParams
    ? RNRouteProp<TopLevelStackParams, ScreenName_>
    : never;

// Type navigation globally
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends TopLevelStackParams {}
  }
}
