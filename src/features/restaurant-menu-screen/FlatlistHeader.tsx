import { observer } from "mobx-react";
import React from "react";
import { Image } from "react-native";
import { Icon } from "~/components/Icon";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";

export const FlatlistHeader = observer(function FlatlistHeader(props: {
  restaurant: RestaurantInstance;
}) {
  const store = useStore();
  return (
    <>
      <Image
        source={require("~/assets/street-fast-food-hamburger-with-bbq-grilled-steak-PE2NUQB1.png")}
        style={{ width: "100%" }}
      />

      <View paddingLarge>
        <Text sizeLarge weightBold>
          {props.restaurant.title}
        </Text>
      </View>

      <View
        paddingHorizontalLarge
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
      >
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeLarge}
            name="home-outline"
            color={C.colorBackgroundDark}
          />
          <Spacer />
          <Text sizeMediumSmall weightLight>
            {props.restaurant.address}
          </Text>
        </View>
        <View flexDirectionRow alignItemsCenter>
          <Icon
            size={C.fontSizeLarge}
            name="phone-outline"
            color={C.colorBackgroundDark}
          />
          <Spacer />
          <Text sizeMediumSmall weightLight>
            {props.restaurant.phone.replace(/ /g, "-").replace(/385-/g, "0")}
          </Text>
        </View>
        <Spacer large />
        <Spacer />
      </View>
      <View paddingHorizontalLarge paddingVerticalMedium>
        <View
          style={{ borderColor: "#EEEEEE", borderWidth: 1 }}
          paddingHorizontalLarge
          paddingVerticalMedium
        >
          <Text weightSemiBold sizeMediumLarge>
            Dodaci
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingLarge>
          <Text sizeMediumSmall>
            {store.condimentStore.condimentsAsStrings.join(", ")}
          </Text>
        </View>
      </View>
      <View
        paddingHorizontalLarge
        paddingVerticalMedium
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
      >
        <View
          style={{ borderColor: "#EEEEEE", borderWidth: 1 }}
          paddingHorizontalLarge
          paddingVerticalMedium
        >
          <Text weightSemiBold sizeMediumLarge>
            Kategorije
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingLarge>
          {props.restaurant.tags.map((tag: string) => (
            <Text weightSemiBold key={tag}>
              {tag.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>
    </>
  );
});
