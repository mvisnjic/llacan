import _ from "lodash";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { Restaurant, RestaurantInstance } from "./Restaurant";

export interface RestaurantStoreInstance
  extends Instance<typeof RestaurantStore> {}
export interface RestaurantStoreSnapshotIn
  extends SnapshotIn<typeof RestaurantStore> {}
export interface RestaurantStoreSnapshotOut
  extends SnapshotOut<typeof RestaurantStore> {}

export const RestaurantStore = types
  .model("RestaurantStore", {
    map: types.map(Restaurant),
  })
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        return self.map.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    readRestaurantList(): RestaurantInstance[] {
      const response = self.process(restaurantData);
      return response as any;
    },
  }))
  .views((self) => ({
    get activeOrderRestaurants() {
      return Array.from(self.map)
        .filter((restaurant) => restaurant[1].activeOrder)
        .map((restaurant) => restaurant[1]);
    },
  }));
