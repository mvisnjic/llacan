import React, { forwardRef, ReactNode, useState } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";
import { styleConstants as C } from "~/style/styleConstants";
import { Text } from "./Text";
import { View } from "./View";

const S = StyleSheet.create({
  textInput: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: C.spacingMedium,
  },
  spacer: { height: 8 },
  container: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: C.spacingLarge,
  },
});

export interface TextInputProps extends RNTextInputProps {
  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;

  weightLight?: boolean;
  weightRegular?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;
  weightExtraBold?: boolean;
  forwardedRef?: React.Ref<RNTextInput>;

  label?: string;
  error?: boolean;
  caption?: string;

  leftComponent?: () => ReactNode;
  rightComponent?: () => ReactNode;

  children?: ReactNode;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorDark,
      colorDarkSoft,
      colorDarkSofter,
      colorLight,
      colorLightSoft,
      colorLightSofter,

      weightLight,
      weightRegular,
      weightSemiBold,
      weightBold,
      weightExtraBold,

      style,

      label,
      error = false,
      caption = " ",

      leftComponent,
      rightComponent,

      ...props
    },
    ref
  ) => {
    const [_isFocused, setIsFocused] = useState(false);

    let fontSize: TextStyle["fontSize"] = C.fontSizeMedium;
    if (sizeExtraSmall) fontSize = C.fontSizeExtraSmall;
    else if (sizeSmall) fontSize = C.fontSizeSmall;
    else if (sizeMedium) fontSize = C.fontSizeMedium;
    else if (sizeLarge) fontSize = C.fontSizeLarge;
    else if (sizeExtraLarge) fontSize = C.fontSizeExtraLarge;

    let color: TextStyle["color"] = C.colorTextDark;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    const fontFamily: TextStyle["fontFamily"] = "TTNorms-Regular";
    if (weightLight) {
      fontWeight = C.fontWeightLight;
      // fontFamily = "TTNorms-Light";
    } else if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      // fontFamily = "TTNorms-Regular";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      // fontFamily = "TTNorms-Medium";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      // fontFamily = "TTNorms-Bold";
    } else if (weightExtraBold) {
      fontWeight = C.fontWeightExtraBold;
      // fontFamily = "TTNorms-ExtraBold";
    }

    const editable = props.editable ?? true;

    const backgroundColor = editable
      ? C.colorBackgroundLight
      : C.colorBackgroundLightDark;

    return (
      <View>
        {!!label && (
          <>
            <Text sizeSmall weightBold>
              {label}
            </Text>
            <View style={S.spacer} />
          </>
        )}
        <View centerContent style={[S.container, { backgroundColor }]}>
          {leftComponent ? leftComponent() : null}
          <RNTextInput
            ref={ref}
            placeholderTextColor={C.colorTextDarkSofter}
            selectionColor={C.colorBackgroundThemeSofter}
            onFocus={() => setIsFocused(true)}
            onEndEditing={() => setIsFocused(false)}
            style={[
              S.textInput,
              {
                fontSize,
                color,
                fontWeight,
                fontFamily,
              },
              style,
            ]}
            {...props}
          />
          {rightComponent ? rightComponent() : null}
        </View>
        <View style={S.spacer} />
        <Text sizeSmall colorDanger={error} weightBold>
          {caption}
        </Text>
      </View>
    );
  }
);
