import _ from "lodash";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { menuData } from "~/features/restaurant-menu-screen/menuData";
import { Condiment, CondimentInstance } from "./Condiment";

export interface CondimentStoreInstance
  extends Instance<typeof CondimentStore> {}
export interface CondimentStoreSnapshotIn
  extends SnapshotIn<typeof CondimentStore> {}
export interface CondimentStoreSnapshotOut
  extends SnapshotOut<typeof CondimentStore> {}

export const CondimentStore = types
  .model("CondimentStore", {
    map: types.map(Condiment),
  })
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        const f = { name: e, isSelected: false };
        return self.map.put(f);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    readCondimentsList(): CondimentInstance[] {
      const condimentMenu = menuData.find(
        (menu) => menu.title === "Basic Condiments"
      );
      if (!condimentMenu) throw new Error("Missing condimentMenu");
      const response = self.process(condimentMenu.menu);
      return response as any;
    },
    selectCondiment(condimentName: string) {
      const selectedCondiment = self.map.get(condimentName);
      if (selectedCondiment) {
        selectedCondiment.chooseCondiment();
      } else {
        console.log("Condiment doesn't exist");
      }
    },
  }))
  .views((self) => ({
    get condimentsAsStrings() {
      return Array.from(self.map).map((condiment) => condiment[0]);
    },
    get selectedCondiments() {
      return new Map(
        Array.from(self.map).filter(([_k, v]) => v.isChosen === true)
      );
    },
    get selectedCondimentsAsStrings() {
      return Array.from(self.map)
        .filter(([_k, v]) => v.isChosen === true)
        .map((condiment) => condiment[0]);
    },
  }));
