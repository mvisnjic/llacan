import { NavigationContainerProps } from "@react-navigation/native";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { createStore } from "~/mobx/createStore";
import { createPersistence } from "~/services/createPersistence";
import { createHttp } from "~/services/http/createHttp";
import { environment } from "./environment";
import { createNotificationService } from "./services/createNotificationService";
import { createQueryClient } from "./services/createQueryClient";

export async function initialize() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const queryClient = createQueryClient();
  const http = createHttp();
  const persistence = createPersistence();
  const notificationService = createNotificationService();

  const store = await createStore({ http, persistence, notificationService });

  // Passed to NavigationContainer
  const navigationContainerProps: Partial<NavigationContainerProps> =
    environment.PERSIST_NAVIGATION_STATE
      ? {
          initialState: await persistence.get("navigation state"),
          onStateChange: (state: any) =>
            persistence.set("navigation state", state),
        }
      : {};

  return { store, queryClient, navigationContainerProps };
}
