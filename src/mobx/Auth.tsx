import { AxiosResponse } from "axios";
import { autorun } from "mobx";
import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";
import { constants } from "~/constants";
import { Response } from "~/types/Response";
import { User, UserInstance } from "./entities/user/User";
import { getEnv } from "./utils/getEnv";
import { getRoot } from "./utils/getRoot";

export interface AuthStoreInstance extends Instance<typeof AuthStore> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStore> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStore> {}

export const AuthStore = types
  .model("AuthStore", {
    activeUser: types.safeReference(User),
    token: types.maybe(types.string),
  })
  .actions((self) => ({
    processAuthUser(user: any) {
      getRoot(self).userStore.process(user);
      if (user.token !== undefined) self.token = user.token;
      self.activeUser = user.id;
      return self.activeUser;
    },
  }))
  .actions((self) => ({
    silentLogin: flow(function* silentLogin(): any {
      const env = getEnv(self);

      try {
        const { data: user }: AxiosResponse = yield env.http.get("/me");
        self.processAuthUser(user);
        return true;
      } catch (error: any) {
        console.log("error in silent login", error.message);
        self.token = undefined;
        return false;
      }
    }),

    logout() {
      self.token = undefined;
    },

    changePassword: flow(function* changePassword(params: {
      passwordOld: string;
      password: string;
    }): any {
      const env = getEnv(self);
      const response = yield env.http.patch("/me/password", {
        password_old: params.passwordOld,
        password: params.password,
        password_confirmation: params.password,
      });

      self.processAuthUser(response.data);

      return response;
    }),
  }))
  .actions((self) => ({
    login: flow<Response<UserInstance>, [{ email: string; password: string }]>(
      function* login(params): any {
        const env = getEnv(self);

        const response: AxiosResponse = yield env.http.post("/login", params);

        response.data.data = self.processAuthUser(response.data.data);
        return response.data;
      }
    ),

    register: flow<
      Response<UserInstance>,
      [{ email: string; phone: string; password: string }]
    >(function* register(params): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.post(`/register`, params);
      response.data.data = self.processAuthUser(response.data.data);

      return response.data;
    }),

    updateProfile: flow(function* updateProfile(params: { name: string }): any {
      const env = getEnv(self);

      const response: AxiosResponse = yield env.http.post(`/me`, params);

      response.data.data = self.processAuthUser(response.data.data);

      return response.data;
    }),

    initializeTokenSync: flow(function* initializeTokenSync(): any {
      const env = getEnv(self);

      // sync token to api and persistence
      const token = yield env.persistence.get(
        constants.ASYNC_STORAGE_KEYS.TOKEN
      );
      self.token = token;

      autorun(() => {
        env.persistence.set(constants.ASYNC_STORAGE_KEYS.TOKEN, self.token);
      });

      autorun(() => {
        if (self.token) {
          env.http.defaults.headers.common["Authorization"] = self.token;
        } else {
          delete env.http.defaults.headers.common["Authorization"];
        }
      });
    }),
  }));
