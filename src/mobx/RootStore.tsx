import { types, Instance } from "mobx-state-tree";
import { AuthStore } from "./Auth";
import { I18n } from "./I18n";
import { NavigationStore } from "./NavigationStore";
import { UIStore } from "./UIStore";
import { ConfigStore } from "./entities/config/ConfigStore";
import { NotificationStore } from "./entities/notification/NotificationStore";
import { PersonStore } from "./entities/person/PersonStore";
import { RestaurantStore } from "./entities/restaurant/RestaurantStore";
import { UserStore } from "./entities/user/UserStore";

export const RootStore = types.model("RootStore", {
  configStore: types.optional(ConfigStore, {}),
  authStore: types.optional(AuthStore, {}),
  i18n: types.optional(I18n, {}),
  userStore: types.optional(UserStore, {}),
  personStore: types.optional(PersonStore, {}),
  uiStore: types.optional(UIStore, {}),
  navigationStore: types.optional(NavigationStore, {}),
  notificationStore: types.optional(NotificationStore, {}),
  restaurantStore: types.optional(RestaurantStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
