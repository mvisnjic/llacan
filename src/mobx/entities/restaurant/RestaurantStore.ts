import { AxiosResponse } from "axios";
import _ from "lodash";
import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { getEnv } from "~/mobx/utils/getEnv";
import { PaginatedResponse } from "~/types/Response";
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
    readRestaurantList: flow<
      PaginatedResponse<RestaurantInstance>,
      [{ page: number }]
    >(function* readRestaurantList(params): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.get("/people", {
        params,
      });

      response.data.results = self.process(response.data.results);
      return response.data;
    }),
  }));
