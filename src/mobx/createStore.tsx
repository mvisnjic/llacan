import { NotificationServiceType } from "~/services/createNotificationService";
import { PersistenceStatic } from "~/services/createPersistence";
import { HttpStatic } from "~/services/http/createHttp";
import { RootStore } from "./RootStore";

export interface Environment {
  persistence: PersistenceStatic;
  http: HttpStatic;
  notificationService: NotificationServiceType;
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);
  await rootStore.authStore.initializeTokenSync();
  rootStore.notificationStore.initialize();
  await rootStore.i18n.initialize();

  return rootStore;
}
