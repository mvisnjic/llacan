import _ from "lodash";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { menuData } from "~/features/restaurant-menu-screen/menuData";
import { Condiment } from "./Condiment";

export interface CondimentStoreInstance
  extends Instance<typeof CondimentStore> {}
export interface CondimentStoreSnapshotIn
  extends SnapshotIn<typeof CondimentStore> {}
export interface CondimentStoreSnapshotOut
  extends SnapshotOut<typeof CondimentStore> {}

export const CondimentStore = types
  .model("CondimentStore", {
    map: types.map(Condiment),
    // selectedMap: types.map(Condiment),
  })
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    // resetSelectedState() {
    //   self.selectedMap.clear();
    // },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        const f = { name: e, isSelected: false };
        // console.log("f:", f);
        return self.map.put(f);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    readCondimentsList() {
      const condimentMenu = menuData.find(
        (menu) => menu.title === "Basic Condiments"
      );
      if (!condimentMenu) throw new Error("Missing condimentMenu");
      const response = self.process(condimentMenu.menu);
      return response;
    },
    selectCondiment(condimentName: string) {
      const selectedCondiment = self.map.get(condimentName);
      if (selectedCondiment) {
        selectedCondiment.chooseCondiment();
        // selectedCondiment.isChosen
        //   ? self.selectedMap.put(selectedCondiment)
        //   : self.selectedMap.delete(selectedCondiment.name);
      } else {
        console.log("Condiment doesn't exist");
      }
    },
  }));
// .views((self) => ({
//   selectedCondiments() {
//     return self.map.filter((condiment) => condiment.isChosen === true);
//   },
// }));
