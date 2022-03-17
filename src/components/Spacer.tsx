import React from "react";
import { StyleSheet } from "react-native";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";

const S = StyleSheet.create({
  spacingSmall: { width: C.spacingSmall, height: C.spacingSmall },
  spacingMedium: { width: C.spacingMedium, height: C.spacingMedium },
  spacingLarge: { width: C.spacingLarge, height: C.spacingLarge },
  spacingExtraLarge: {
    width: C.spacingExtraLarge,
    height: C.spacingExtraLarge,
  },
});

export interface SpacerProps {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
}

export const Spacer = ({ small, medium, large, extraLarge }: SpacerProps) => {
  let style = S.spacingMedium;
  if (small) style = S.spacingSmall;
  else if (medium) style = S.spacingMedium;
  else if (large) style = S.spacingLarge;
  else if (extraLarge) style = S.spacingExtraLarge;

  return <View style={style} />;
};
