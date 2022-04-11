import { observer } from "mobx-react";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { StandardFlatList } from "~/components/StandardFlatList";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useInfiniteQuery } from "~/hooks/useInfiniteQuery";
import { PersonInstance } from "~/mobx/entities/person/Person";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { shadow } from "~/utils/shadow";

interface PersonListItemProps {
  person: PersonInstance;
}

const allOrdersAreActive = true;

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

  return (
    <View paddingHorizontalMedium paddingVerticalSmall>
      <View paddingLarge style={S.container}>
        <Spacer />
        <Text sizeExtraLarge weightBold>
          {person.name}
        </Text>
        <Spacer small />
        <Text sizeSmall weightLight>
          {person.gender}, {person.height}, {person.mass}
        </Text>
        <Spacer />

        <View>
          <View flexDirectionRow alignItemsCenter>
            <Icon
              size={C.fontSizeLarge}
              name="home-outline"
              color={C.colorBackgroundDark}
            />
            <Spacer large />
            <Text sizeMedium weightLight>
              {person.hair_color}, {person.skin_color}, {person.eye_color}
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
              {person.birth_year}
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
        <Button outline title="Menu i info" />
        <Spacer />
        <Button title={allOrdersAreActive ? "Pridruži se" : "Nova narudžba"} />
      </View>
    </View>
  );
});

const FlatlistHeader = observer(() => {
  return (
    <>
      <Image
        source={require("~/assets/street-fast-food-hamburger-with-bbq-grilled-steak-PE2NUQB 1.png")}
      />

      <Spacer extraLarge />

      <View paddingLarge>
        <Text sizeLarge weightBold>
          Fast food Forever
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
            prilaz Kikova 5, 52220, Labin
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
            092-246-0606
          </Text>
        </View>
        <Spacer large />
      </View>
      <View paddingMedium>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingMedium>
          <Text weightSemiBold sizeMediumLarge>
            Dodaci
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingMedium>
          <Text sizeMediumSmall>
            kečap, ajvar, majoneza, kiseli krastavci, zelena salata, rajčica,
            luk, chilli
          </Text>
        </View>
      </View>
      <View
        paddingMedium
        style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
      >
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingMedium>
          <Text weightSemiBold sizeMediumLarge>
            Kategorije
          </Text>
        </View>
        <View style={{ borderColor: "#EEEEEE", borderWidth: 1 }} paddingMedium>
          <Text weightSemiBold>BURGER</Text>
          <Text weightSemiBold>POMMES</Text>
        </View>
      </View>
    </>
  );
});

export const RestaurantMenuScreen = observer(function QueryExample() {
  const store = useStore();
  const query = useInfiniteQuery(["peopleList"], ({ pageParam }) => {
    return store.personStore.readPersonList({ page: pageParam });
  });

  const insets = useSafeAreaInsets();

  return (
    <Screen preventScroll>
      <View>
        <StandardFlatList
          query={query}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          keyExtractor={(person) => String(person)}
          renderItem={({ item }) => <PersonListItem person={item} />}
          ListHeaderComponent={FlatlistHeader}
        />
      </View>
    </Screen>
  );
});
