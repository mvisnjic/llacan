import _ from "lodash";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { menuData } from "~/features/restaurant-menu-screen/menuData";
import { MenuItem } from "./Menu";

export interface MenuStoreInstance extends Instance<typeof MenuStore> {}
export interface MenuStoreSnapshotIn extends SnapshotIn<typeof MenuStore> {}
export interface MenuStoreSnapshotOut extends SnapshotOut<typeof MenuStore> {}

export const MenuStore = types
  .model("MenuStore", {
    map: types.map(MenuItem),
  })
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        e.price = Number(e.price);
        return self.map.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    readMenuList(restaurantName: string) {
      const specificMenu = menuData.find(
        (menu) => menu.title === restaurantName
      );
      if (!specificMenu) throw new Error("Missing specificMenu");
      const response = self.process(specificMenu.menu);
      const groupedResponse = _.groupBy(response, "category");
      return groupedResponse;
    },
  }));
