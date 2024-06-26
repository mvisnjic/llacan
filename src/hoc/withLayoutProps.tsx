import React, { ReactNode, forwardRef } from "react";
import { ViewStyle } from "react-native";
import { styleConstants as C } from "~/style/styleConstants";

export interface WithLayoutProps {
  aspectRatioOne?: boolean;

  /** paddingSmall=4 paddingMedium=8 paddingLarge=16 paddingExtraLarge=32  */
  paddingSmall?: boolean;
  /** paddingSmall=4 paddingMedium=8 paddingLarge=16 paddingExtraLarge=32  */
  paddingMedium?: boolean;
  /** paddingSmall=4 paddingMedium=8 paddingLarge=16 paddingExtraLarge=32  */
  paddingLarge?: boolean;
  /** paddingSmall=4 paddingMedium=8 paddingLarge=16 paddingExtraLarge=32  */
  paddingExtraLarge?: boolean;
  /** paddingHorizontalSmall=4 paddingHorizontalMedium=8 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=32  */
  paddingHorizontalSmall?: boolean;
  /** paddingHorizontalSmall=4 paddingHorizontalMedium=8 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=32  */
  paddingHorizontalMedium?: boolean;
  /** paddingHorizontalSmall=4 paddingHorizontalMedium=8 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=32  */
  paddingHorizontalLarge?: boolean;
  /** paddingHorizontalSmall=4 paddingHorizontalMedium=8 paddingHorizontalLarge=16 paddingHorizontalExtraLarge=32  */
  paddingHorizontalExtraLarge?: boolean;
  /** paddingVerticalSmall=4 paddingVerticalMedium=8 paddingVerticalLarge=16 paddingVerticalExtraLarge=32  */
  paddingVerticalSmall?: boolean;
  /** paddingVerticalSmall=4 paddingVerticalMedium=8 paddingVerticalLarge=16 paddingVerticalExtraLarge=32  */
  paddingVerticalMedium?: boolean;
  /** paddingVerticalSmall=4 paddingVerticalMedium=8 paddingVerticalLarge=16 paddingVerticalExtraLarge=32  */
  paddingVerticalLarge?: boolean;
  /** paddingVerticalSmall=4 paddingVerticalMedium=8 paddingVerticalLarge=16 paddingVerticalExtraLarge=32  */
  paddingVerticalExtraLarge?: boolean;
  centerContent?: boolean;
  justifyContentCenter?: boolean;
  alignItemsCenter?: boolean;
  flex?: boolean;
  flexDirectionRow?: boolean;
  flexDirectionColumn?: boolean;
  flexDirectionRowReverse?: boolean;
  flexDirectionColumnReverse?: boolean;

  absoluteTopLeft?: boolean;
  absoluteTopLeftSmall?: boolean;
  absoluteTopLeftMedium?: boolean;
  absoluteTopLeftLarge?: boolean;
  absoluteTopLeftExtraLarge?: boolean;

  absoluteTopRight?: boolean;
  absoluteTopRightSmall?: boolean;
  absoluteTopRightMedium?: boolean;
  absoluteTopRightLarge?: boolean;
  absoluteTopRightExtraLarge?: boolean;

  absoluteBottomLeft?: boolean;
  absoluteBottomLeftSmall?: boolean;
  absoluteBottomLeftMedium?: boolean;
  absoluteBottomLeftLarge?: boolean;
  absoluteBottomLeftExtraLarge?: boolean;

  absoluteBottomRight?: boolean;
  absoluteBottomRightSmall?: boolean;
  absoluteBottomRightMedium?: boolean;
  absoluteBottomRightLarge?: boolean;
  absoluteBottomRightExtraLarge?: boolean;

  children?: ReactNode;
}

export function withLayoutProps<Props extends { style?: any }>(
  Component: React.ComponentType<Props>
) {
  type NewProps = Omit<Props, keyof WithLayoutProps> & WithLayoutProps;
  return forwardRef<typeof Component, NewProps>(
    (
      {
        paddingSmall,
        paddingMedium,
        paddingLarge,
        paddingExtraLarge,
        paddingHorizontalSmall,
        paddingHorizontalMedium,
        paddingHorizontalLarge,
        paddingHorizontalExtraLarge,
        paddingVerticalSmall,
        paddingVerticalMedium,
        paddingVerticalLarge,
        paddingVerticalExtraLarge,
        centerContent,
        justifyContentCenter,
        alignItemsCenter,
        flexDirectionRow,
        flexDirectionColumn,
        flexDirectionRowReverse,
        flexDirectionColumnReverse,
        absoluteTopLeft,
        absoluteTopLeftSmall,
        absoluteTopLeftMedium,
        absoluteTopLeftLarge,
        absoluteTopLeftExtraLarge,
        absoluteTopRight,
        absoluteTopRightSmall,
        absoluteTopRightMedium,
        absoluteTopRightLarge,
        absoluteTopRightExtraLarge,
        absoluteBottomLeft,
        absoluteBottomLeftSmall,
        absoluteBottomLeftMedium,
        absoluteBottomLeftLarge,
        absoluteBottomLeftExtraLarge,
        absoluteBottomRight,
        absoluteBottomRightSmall,
        absoluteBottomRightMedium,
        absoluteBottomRightLarge,
        absoluteBottomRightExtraLarge,
        flex,
        aspectRatioOne,
        style: passThroughStyle,
        ...passThroughProps
      },
      ref
    ) => {
      const style: ViewStyle = {};
      if (paddingSmall) style.padding = C.spacingSmall;
      if (paddingMedium) style.padding = C.spacingMedium;
      if (paddingLarge) style.padding = C.spacingLarge;
      if (paddingExtraLarge) style.padding = C.spacingExtraLarge;

      if (paddingHorizontalSmall) style.paddingHorizontal = C.spacingSmall;
      if (paddingHorizontalMedium) style.paddingHorizontal = C.spacingMedium;
      if (paddingHorizontalLarge) style.paddingHorizontal = C.spacingLarge;
      if (paddingHorizontalExtraLarge)
        style.paddingHorizontal = C.spacingExtraLarge;

      if (paddingVerticalSmall) style.paddingVertical = C.spacingSmall;
      if (paddingVerticalMedium) style.paddingVertical = C.spacingMedium;
      if (paddingVerticalLarge) style.paddingVertical = C.spacingLarge;
      if (paddingVerticalExtraLarge)
        style.paddingVertical = C.spacingExtraLarge;

      if (centerContent) {
        style.justifyContent = "center";
        style.alignItems = "center";
      }
      if (justifyContentCenter) style.justifyContent = "center";
      if (alignItemsCenter) style.alignItems = "center";

      if (flexDirectionRow) style.flexDirection = "row";
      if (flexDirectionColumn) style.flexDirection = "column";
      if (flexDirectionRowReverse) style.flexDirection = "row-reverse";
      if (flexDirectionColumnReverse) style.flexDirection = "column-reverse";

      if (absoluteTopLeft) {
        style.position = "absolute";
        style.top = 0;
        style.left = 0;
      }
      if (absoluteTopLeftSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteTopLeftMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteTopLeftLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteTopLeftExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteTopRight) {
        style.position = "absolute";
        style.top = 0;
        style.right = 0;
      }
      if (absoluteTopRightSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteTopRightMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteTopRightLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteTopRightExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }
      if (absoluteBottomLeft) {
        style.position = "absolute";
        style.bottom = 0;
        style.left = 0;
      }
      if (absoluteBottomLeftSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteBottomLeftMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteBottomLeftLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteBottomLeftExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteBottomRight) {
        style.position = "absolute";
        style.bottom = 0;
        style.right = 0;
      }
      if (absoluteBottomRightSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteBottomRightMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteBottomRightLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteBottomRightExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }

      if (flex) style.flex = 1;

      if (aspectRatioOne) {
        style.aspectRatio = 1;
      }

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
