import React from "react";
import { TextStyle } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styleConstants as C } from "~/style/styleConstants";

export interface IconProps {
  name:
    | "arrow-back"
    | "checkbox-marked-outline"
    | "checkbox-blank-outline"
    | "radio-button-on"
    | "radio-button-off";

  color?: string;
  size?: number;
  style?: TextStyle;
}

export function Icon({
  name,
  color = C.colorTextLight,
  size = 28,
  ...props
}: IconProps) {
  switch (name) {
    case "arrow-back":
    case "radio-button-on":
    case "radio-button-off":
      return <MaterialIcons size={size} color={color} name={name} {...props} />;
    default:
      return (
        <MaterialCommunityIcons
          size={size}
          color={color}
          name={name}
          {...props}
        />
      );
  }
}
