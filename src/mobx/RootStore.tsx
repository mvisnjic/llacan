import { types, Instance } from "mobx-state-tree";
import { AuthStore } from "./Auth";
import { I18n } from "./I18n";
import { NavigationStore } from "./NavigationStore";
import { UIStore } from "./UIStore";
import { CondimentStore } from "./entities/condiment/CondimentStore";
import { ConfigStore } from "./entities/config/ConfigStore";
import { MenuStore } from "./entities/menu/MenuStore";
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
  menuStore: types.optional(MenuStore, {}),
  condimentStore: types.optional(CondimentStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
