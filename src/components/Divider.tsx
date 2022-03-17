import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { styleConstants as C } from "~/style/styleConstants";
import { View } from "./View";

export interface DividerProps {
  vertical?: boolean;
  width?: ViewStyle["borderWidth"];
  color?: ViewStyle["borderColor"];
  maxWidth?: ViewStyle["maxWidth"];
}

function useStyles({ vertical, width, color, maxWidth }: DividerProps) {
  return StyleSheet.create({
    divider: {
      width: vertical ? 1 : "100%",
      height: vertical ? "100%" : 1,
      borderColor: color,
      borderWidth: width,
      maxWidth: maxWidth ? maxWidth : undefined,
    },
  });
}

export function Divider({
  vertical,
  width = StyleSheet.hairlineWidth,
  color = C.colorTextDarkSofter,
  maxWidth,
}: DividerProps) {
  const S = useStyles({ vertical, width, color, maxWidth });

  return <View style={S.divider} />;
}
