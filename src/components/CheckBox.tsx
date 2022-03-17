import React, { ReactNode } from "react";
import { Icon } from "~/components/Icon";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View, ViewProps } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";

interface CheckBoxProps {
  size?: number;
  checked: boolean;
  children?: ReactNode;
  style?: ViewProps["style"];
  onChange: (isChecked: boolean) => any;
}

function CheckBox({
  checked,
  size = 28,
  style,
  children,
  onChange,
}: CheckBoxProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onChange(!checked);
      }}
    >
      <View flexDirectionRow alignItemsCenter style={style}>
        <Icon
          size={size}
          name={checked ? "checkbox-marked-outline" : "checkbox-blank-outline"}
          color={C.colorBackgroundTheme}
        />
        {children}
      </View>
    </TouchableOpacity>
  );
}

export { CheckBox };
