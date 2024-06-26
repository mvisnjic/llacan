import { useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { CondimentInstance } from "~/mobx/entities/condiment/Condiment";
import { RestaurantInstance } from "~/mobx/entities/restaurant/Restaurant";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { removeBracketsAroundText } from "~/utils/removeBracketsAroundText";
import { titleCase } from "~/utils/titleCase";

function useStyle() {
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    orderButton: {
      position: "absolute",
      bottom: C.spacingLarge,
      paddingBottom: insets.bottom,
      alignSelf: "center",
      width: "100%",
    },
  });
}

const CondimentItem = observer(function CondimentItem(props: {
  condiment: CondimentInstance;
  restaurant: RestaurantInstance;
}) {
  const { condiment, restaurant } = props;
  const colorOfBackground = condiment.isChosen
    ? C.colorBackgroundThemeSoft
    : C.colorBackgroundLightDark;

  return (
    <View style={{ backgroundColor: colorOfBackground, borderRadius: 40 }}>
      <TouchableOpacity
        onPress={() => {
          condiment.chooseCondiment();
          restaurant.addCondiment(condiment);
        }}
        paddingHorizontalLarge
        paddingVerticalMedium
      >
        <Text>{condiment.name}</Text>
      </TouchableOpacity>
    </View>
  );
});

export const ItemDetailsScreen = observer(function ItemDetailsScreen() {
  const S = useStyle();
  const navigation = useNavigation();
  const route = useRoute();
  const store = useStore();

  const { menuItem, restaurant } = route.params as {
    menuItem: any;
    restaurant: RestaurantInstance;
  };

  const condimentsQuery = useQuery(["condimentList"], () => {
    return store.condimentStore.readCondimentsList();
  });

  const condiments = condimentsQuery.data;

  if (condimentsQuery.isLoading || condimentsQuery.isIdle) {
    return (
      <View flex centerContent paddingExtraLarge>
        <Spinner />
      </View>
    );
  } else if (condimentsQuery.isError) {
    return (
      <View flex centerContent paddingExtraLarge>
        <Spinner />
      </View>
    );
  } else {
    return (
      <Screen preventScroll>
        <View paddingExtraLarge>
          <Text alignCenter sizeExtraLarge weightBold>
            {menuItem.name}
          </Text>
          {menuItem.description !== "" && (
            <>
              <Spacer />
              <Text alignCenter>
                {titleCase(
                  removeBracketsAroundText(
                    menuItem.description.replace(/,(?=[^\s])/g, ", ").trim()
                  )
                )}
              </Text>
            </>
          )}
          <Spacer large />
          <Text weightSemiBold>Odaberite dodatke</Text>
          <Spacer />
          {condiments &&
            condiments.map((condiment) => (
              <View key={condiment.name} paddingSmall>
                <CondimentItem condiment={condiment} restaurant={restaurant} />
              </View>
            ))}
        </View>
        <View paddingHorizontalLarge style={S.orderButton}>
          <Button
            title={"Dodaj za " + menuItem.price + ",00 kn"}
            onPress={() =>
              restaurant.hasPommes
                ? navigation.navigate("SecondSelectionScreen", {
                    restaurant: restaurant,
                  })
                : navigation.navigate("SelectionScreen", {
                    restaurant: restaurant,
                    order: {
                      name: menuItem.name,
                      price: menuItem.price,
                      condiments: restaurant.selectedCondiments,
                    },
                  })
            }
          />
        </View>
      </Screen>
    );
  }
});
