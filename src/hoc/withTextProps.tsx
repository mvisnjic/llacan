import React, { ReactNode, forwardRef } from "react";
import { TextStyle } from "react-native";
import { styleConstants as C } from "~/style/styleConstants";

export interface WithTextProps {
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeExtraSmall?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeSmall?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeMediumSmall?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeMedium?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeMediumLarge?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeLarge?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeExtraLarge?: boolean;
  /** extraSmall=10, small=12, mediumSmall=14, medium=16, mediumLarge=18, large=24, extraLarge=32, extraExtraLarge=40 */
  sizeExtraExtraLarge?: boolean;

  colorTheme?: boolean;
  colorAccent?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;
  colorDanger?: boolean;

  /** light=300, regular=400, semibold=500, bold=700, extrabold=800 */
  weightLight?: boolean;
  /** light=300, regular=400, semibold=500, bold=700, extrabold=800 */
  weightRegular?: boolean;
  /** light=300, regular=400, semibold=500, bold=700, extrabold=800 */
  weightSemiBold?: boolean;
  /** light=300, regular=400, semibold=500, bold=700, extrabold=800 */
  weightBold?: boolean;
  /** light=300, regular=400, semibold=500, bold=700, extrabold=800 */
  weightExtraBold?: boolean;

  alignCenter?: boolean;
  alignLeft?: boolean;
  alignRight?: boolean;
  alignJustify?: boolean;

  underline?: boolean;
  lineThrough?: boolean;

  children?: ReactNode;
}

export function withTextProps<Props extends { style?: any }>(
  Component: React.ComponentType<Props>
) {
  type NewProps = Omit<Props, keyof WithTextProps> & WithTextProps;
  return forwardRef<typeof Component, NewProps>(
    (
      {
        sizeExtraSmall,
        sizeSmall,
        sizeMediumSmall,
        sizeMedium,
        sizeMediumLarge,
        sizeLarge,
        sizeExtraLarge,
        sizeExtraExtraLarge,

        colorTheme,
        colorAccent,
        colorDark,
        colorDarkSoft,
        colorDarkSofter,
        colorLight,
        colorLightSoft,
        colorLightSofter,
        colorDanger,

        weightLight,
        weightRegular,
        weightSemiBold,
        weightBold,
        weightExtraBold,

        alignCenter,
        alignLeft,
        alignRight,
        alignJustify,

        underline,
        lineThrough,
        style: passThroughStyle,
        ...passThroughProps
      },
      ref
    ) => {
      const style: TextStyle = {};
      style.fontSize = C.fontSizeMedium;
      style.lineHeight = 28;

      if (sizeExtraSmall) {
        style.fontSize = C.fontSizeExtraSmall;
        style.lineHeight = 20;
      } else if (sizeSmall) {
        style.fontSize = C.fontSizeSmall;
        style.lineHeight = 20;
      } else if (sizeMediumSmall) {
        style.fontSize = C.fontSizeMediumSmall;
        style.lineHeight = 20;
      } else if (sizeMedium) {
        style.fontSize = C.fontSizeMedium;
        style.lineHeight = 24;
      } else if (sizeMediumLarge) {
        style.fontSize = C.fontSizeMediumLarge;
        style.lineHeight = 28;
      } else if (sizeLarge) {
        style.fontSize = C.fontSizeLarge;
        style.lineHeight = 32;
      } else if (sizeExtraLarge) {
        style.fontSize = C.fontSizeExtraLarge;
        style.lineHeight = 38;
      } else if (sizeExtraExtraLarge) {
        style.fontSize = C.fontSizeExtraExtraLarge;
        style.lineHeight = 48;
      }

      style.color = C.colorTextDark;
      if (colorTheme) style.color = C.colorTextTheme;
      else if (colorAccent) style.color = C.colorTextAccent;
      else if (colorDark) style.color = C.colorTextDark;
      else if (colorDarkSoft) style.color = C.colorTextDarkSoft;
      else if (colorDarkSofter) style.color = C.colorTextDarkSofter;
      else if (colorLight) style.color = C.colorTextLight;
      else if (colorLightSoft) style.color = C.colorTextLightSoft;
      else if (colorLightSofter) style.color = C.colorTextLightSofter;
      else if (colorDanger) style.color = C.colorTextDanger;

      style.fontWeight = C.fontWeightRegular;
      style.fontFamily = "TTNorms-Regular";
      if (weightLight) {
        style.fontWeight = C.fontWeightLight;
        style.fontFamily = "TTNorms-Light";
      } else if (weightRegular) {
        style.fontWeight = C.fontWeightRegular;
        style.fontFamily = "TTNorms-Regular";
      } else if (weightSemiBold) {
        style.fontWeight = C.fontWeightSemiBold;
        style.fontFamily = "TTNorms-Medium";
      } else if (weightBold) {
        style.fontWeight = C.fontWeightBold;
        style.fontFamily = "TTNorms-Bold";
      } else if (weightExtraBold) {
        style.fontWeight = C.fontWeightExtraBold;
        style.fontFamily = "TTNorms-ExtraBold";
      }

      style.textAlign = "auto";
      if (alignCenter) style.textAlign = "center";
      else if (alignLeft) style.textAlign = "left";
      else if (alignRight) style.textAlign = "right";
      else if (alignJustify) style.textAlign = "justify";

      style.textDecorationLine = "none";
      if (underline) style.textDecorationLine = "underline";
      else if (lineThrough) style.textDecorationLine = "line-through";

      return (
        <Component
          ref={ref}
          style={[style, passThroughStyle]}
          {...(passThroughProps as any)}
        />
      );
    }
  );
}
