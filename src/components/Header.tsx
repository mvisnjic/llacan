import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { shadow } from "~/utils/shadow";
import { IconButton } from "./IconButton";
import { Spacer } from "./Spacer";
import { Text } from "./Text";
import { View } from "./View";

const headerHeight = 52;

const S = StyleSheet.create({
  container: {
    ...shadow(5),
  },
  headerContainer: {
    height: headerHeight,
    backgroundColor: C.colorBackgroundTheme,
    justifyContent: "space-between",
  },
  backButton: {
    height: headerHeight,
    width: headerHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLeft: { position: "absolute", top: 0, left: 0, bottom: 0 },
  headerRight: { position: "absolute", top: 0, right: 0, bottom: 0 },
  titleText: { flex: 1 },
});

type HeaderProps = NativeStackHeaderProps | BottomTabHeaderProps;

export const Header = observer(
  ({ options, navigation, ...props }: HeaderProps) => {
    const canGoBack = "back" in props && !!props.back;
    const insets = useSafeAreaInsets();
    const insetTop = insets.top;

    const HeaderRight = options?.headerRight?.({ canGoBack });
    const HeaderLeft = options?.headerLeft?.({ canGoBack });
    const hasLeftComponent = canGoBack || Boolean(HeaderLeft);

    const { title } = options;

    const store = useStore();
    const statusBarBackground = (
      <View
        style={{
          height: insetTop,
          backgroundColor: store.uiStore.safeAreaBackgroundColor,
        }}
      />
    );

    const { t } = store.i18n;

    return (
      <View style={S.container}>
        {statusBarBackground}
        <View flexDirectionRow alignItemsCenter style={S.headerContainer}>
          <View alignItemsCenter flexDirectionRow flex>
            {canGoBack && (
              <IconButton
                style={S.backButton}
                onPress={() => {
                  navigation.goBack();
                }}
                iconName="arrow-back"
                iconSize={28}
                iconColor={C.colorTextLight}
              />
            )}
            {HeaderLeft}
            {!hasLeftComponent && <Spacer large />}
            <Text
              colorLight
              sizeExtraLarge
              weightBold
              style={S.titleText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {t(title as any)}
            </Text>
          </View>

          <View justifyContentCenter flexDirectionRow>
            {HeaderRight}
          </View>
        </View>
      </View>
    );
  }
);
