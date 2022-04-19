import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { PersonInstance } from "~/mobx/entities/person/Person";
import { styleConstants as C } from "~/style/styleConstants";
import { shadow } from "~/utils/shadow";
import { restaurantData } from "./restaurantData";

interface PersonListItemProps {
  person: PersonInstance;
}

interface Restaurant {
  id: string;
  title: string;
  phone: string;
  address: string;
  sms_accept: boolean;
  hasPommes: boolean;
  tags: any;
}

const allOrdersAreActive = true;
const userName = "User";

function useStyle() {
  return StyleSheet.create({
    container: {
      backgroundColor: allOrdersAreActive
        ? C.colorBackgroundThemeSofter
        : C.colorBackgroundLight,
      ...shadow(5),
    },
  });
}

const PersonListItem = observer(function PersonListItem({
  person,
}: PersonListItemProps) {
  const S = useStyle();
  const navigation = useNavigation();

  return (
    <View paddingHorizontalLarge paddingVerticalMedium>
      <View paddingLarge style={S.container}>
        <Spacer />
        <Text sizeLarge weightBold>
          {person.title}
        </Text>
        <Spacer small />
        <Text sizeSmall weightLight>
          {person.tags.join(", ").toLowerCase()}
          {person.hasPommes && ", pommes"}
        </Text>
        <Spacer large />

        <View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="home-outline"
              color={C.colorBackgroundDark}
            />
            <Spacer large />
            <Text sizeMedium weightLight>
              {person.address}
            </Text>
          </View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="phone-outline"
              color={C.colorBackgroundDark}
            />
            <Spacer large />
            <Text sizeMedium weightLight>
              {person.phone.replace(/ /g, "-")}
            </Text>
          </View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="circle-outline"
              color={allOrdersAreActive ? "#2DCB48" : C.colorBackgroundLight}
            />
            <Spacer large />
            <Text
              sizeMedium
              weightLight
              style={{
                color: allOrdersAreActive
                  ? C.colorBackgroundDark
                  : C.colorBackgroundLight,
              }}
            >
              Aktivna narudžba
            </Text>
          </View>
        </View>
        <Spacer large />
        <Button
          outline
          title="Menu i info"
          onPress={() => navigation.navigate("RestaurantMenuScreen")}
        />
        <Spacer />
        <Button title={allOrdersAreActive ? "Pridruži se" : "Nova narudžba"} />
      </View>
    </View>
  );
});

export const QueryExample = observer(function QueryExample() {
  const query = useQuery(["peopleList"], () => {
    return Promise.resolve<Restaurant[]>(restaurantData);
  });

  const restaurants = query.data;

  const insets = useSafeAreaInsets();

  return (
    <Screen preventScroll>
      <Spacer large />
      <Spacer small />

      <View paddingLarge>
        <Text sizeLarge weightBold>
          {userName}, odaberite željeni restoran
        </Text>
      </View>
      <Spacer extraLarge />
      <Spacer medium />

      <View
        paddingHorizontalLarge
        centerContent
        style={{ alignItems: "flex-end" }}
      >
        <Button outline title="Prošle narudžbe" paddingHorizontalLarge>
          <Icon
            size={C.fontSizeLarge}
            name="clock-outline"
            color={C.colorBackgroundDark}
          />
        </Button>
      </View>
      {/* <Text>{JSON.stringify(restaurants)}</Text> */}
      <Spacer extraLarge />

      <View style={{ flex: 1 }}>
        <FlatList
          data={restaurants}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          keyExtractor={(person) => String(person.id)}
          renderItem={({ item }) => <PersonListItem person={item} />}
        />
        <LinearGradient
          colors={[C.colorBackgroundLight, "rgba(255,255,255, 0)"]}
          style={{ width: "100%", height: 5, position: "absolute", top: 0 }}
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
        />
      </View>
    </Screen>
  );
});
