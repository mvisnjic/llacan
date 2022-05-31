import { observer } from "mobx-react";
import React from "react";
import { Image } from "react-native";
import { Icon } from "~/components/Icon";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { restaurantData } from "~/features/restaurant-pick-screen/restaurantData";
import { styleConstants as C } from "~/style/styleConstants";
import { formatPhoneNumber } from "~/utils/formatPhoneNumber";
import { useStyle } from "./SelectionScreen";


export const Header = observer(function Header(props: {
  restaurant: typeof restaurantData[0];
}) {
  const S = useStyle();
  const { restaurant } = props;

  return (
    <View style={S.imageContainer}>
      <Image
        source={require("~/assets/street-fast-food-hamburger-with-bbq-grilled-steak-PE2NUQB1.png")}
        style={S.Image} />
      <View style={S.textContainer}>
        <Text sizeExtraLarge weightBold colorLight>
          {restaurant.title}
        </Text>
        <Spacer />
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeMediumLarge}
            name="home-outline"
            style={S.IconColor} />
          <Spacer />
          <Text sizeMediumSmall weightLight colorLight>
            {restaurant.address}
          </Text>
        </View>
        <Spacer />
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeMediumLarge}
            name="phone-outline"
            style={S.IconColor} />
          <Spacer />
          <Text sizeMediumSmall weightLight colorLight>
            {formatPhoneNumber(restaurant.phone)}
          </Text>
        </View>
      </View>
    </View>
  );
});
