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
import { Menu, MenuInstance } from "./Menu";

export interface MenuStoreInstance extends Instance<typeof MenuStore> {}
export interface MenuStoreSnapshotIn extends SnapshotIn<typeof MenuStore> {}
export interface MenuStoreSnapshotOut extends SnapshotOut<typeof MenuStore> {}

export const MenuStore = types
  .model("MenuStore", {
    map: types.map(Menu),
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
    readMenuList: flow<PaginatedResponse<MenuInstance>, [{ page: number }]>(
      function* readMenuItemList(params): any {
        const env = getEnv(self);
        const response: AxiosResponse = yield env.http.get("/people", {
          params,
        });

        response.data.results = self.process(response.data.results);
        return response.data;
      }
    ),
  }));
