import Color from "color";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");

const colorBackgroundTheme = "#fbde07";
const colorBackgroundLight = "rgba(250,250,250,1)";
const colorBackgroundDark = "#070707";

const colorTextLight = "rgba(255, 255, 255, 0.9)";
const colorTextDark = "rgba(0, 0, 0, 0.9)";

export const styleConstants = {
  windowWidth: window.width,
  windowHeight: window.height,
  colorBackgroundAccent: "#000000",
  colorBackgroundDanger: "#ff4444",
  colorBackgroundDark,
  colorBackgroundDarkLight: Color("#070707").lighten(0.15).rgb().string(2),
  colorBackgroundDarkLighter: Color("#070707").lighten(0.25).rgb().string(2),
  colorBackgroundLight,
  colorBackgroundLightDark: Color(colorBackgroundLight)
    .darken(0.015)
    .rgb()
    .string(2),
  colorBackgroundLightDarker: Color(colorBackgroundLight)
    .darken(0.25)
    .rgb()
    .string(2),
  colorBackgroundTheme,
  colorBackgroundThemeHard: Color(colorBackgroundTheme)
    .darken(0.25)
    .rgb()
    .string(2),
  colorBackgroundThemeHarder: Color(colorBackgroundTheme)
    .darken(0.5)
    .rgb()
    .string(2),
  colorBackgroundThemeSoft: Color(colorBackgroundTheme)
    .lighten(0.5)
    .rgb()
    .string(2),
  colorBackgroundThemeSofter: Color(colorBackgroundTheme)
    .lighten(0.75)
    .rgb()
    .string(2),

  colorTextTheme: "#fbde07",
  colorTextAccent: "#000000",
  colorTextLight,
  colorTextDark,
  colorTextDanger: "#ff4444",
  colorTextLightSoft: Color(colorTextLight).fade(0.3).rgb().string(2),
  colorTextLightSofter: Color(colorTextLight).fade(0.5).rgb().string(2),
  colorTextDarkSoft: Color(colorTextDark).fade(0.3).rgb().string(2),
  colorTextDarkSofter: Color(colorTextDark).fade(0.5).rgb().string(2),

  spacingSmall: 4,
  spacingMedium: 8,
  spacingLarge: 16,
  spacingExtraLarge: 32,

  fontSizeExtraSmall: 10,
  fontSizeSmall: 12,
  fontSizeMediumSmall: 14,
  fontSizeMedium: 16,
  fontSizeMediumLarge: 18,
  fontSizeLarge: 24,
  fontSizeExtraLarge: 32,
  fontSizeExtraExtraLarge: 40,

  fontWeightLight: "300" as const,
  fontWeightRegular: "400" as const,
  fontWeightSemiBold: "500" as const,
  fontWeightBold: "700" as const,
  fontWeightExtraBold: "800" as const,
};
