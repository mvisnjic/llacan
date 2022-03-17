import { NavigationContainerProps } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalProvider } from "~/components/ModalProvider";
import { AlertProvider } from "./components/AlertProvider";
import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { Splash } from "./components/Splash";
import { initialize } from "./initialize";
import { MSTProvider } from "./mobx/MSTProvider";
import { RootStoreInstance } from "./mobx/RootStore";
import { Router } from "./navigation/Router";
import { reloadIfStoreInitializedTwice } from "./reloadIfStoreInitializedTwice";
import { useMSTFastRefresh } from "./useMSTFastRefresh";

const S = StyleSheet.create({
  flex: { flex: 1 },
});

export function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const store = useRef<RootStoreInstance | undefined>(undefined);
  const queryClient = useRef<QueryClient | undefined>(undefined);
  const navigationContainerProps = useRef<
    Partial<NavigationContainerProps> | undefined
  >(undefined);

  useMSTFastRefresh(store);

  useEffect(() => {
    initialize().then((context) => {
      reloadIfStoreInitializedTwice(store.current);
      store.current = context.store;
      queryClient.current = context.queryClient;
      navigationContainerProps.current = context.navigationContainerProps;

      setIsReady(true);
    });
  }, []);

  return (
    <>
      {isReady && (
        <MSTProvider store={store.current}>
          <QueryClientProvider client={queryClient.current as QueryClient}>
            <SafeAreaProvider>
              <KeyboardAvoidingView
                enabled={Platform.select({ android: false, default: true })}
                behavior="padding"
                style={S.flex}
              >
                <ModalProvider>
                  <AlertProvider>
                    <Router
                      navigationContainerProps={
                        navigationContainerProps.current as Partial<NavigationContainerProps>
                      }
                    />
                  </AlertProvider>
                </ModalProvider>
              </KeyboardAvoidingView>
            </SafeAreaProvider>
          </QueryClientProvider>
        </MSTProvider>
      )}

      <Splash isReady={isReady} />
    </>
  );
}
