import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
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
const iconSize = 24;
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
              size={iconSize}
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
              size={iconSize}
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
              size={iconSize}
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

export const QueryExample = observer(function QueryExample() {
  const store = useStore();
  const query = useInfiniteQuery(["peopleList"], ({ pageParam }) => {
    return store.personStore.readPersonList({ page: pageParam });
  });

  const insets = useSafeAreaInsets();

  return (
    <Screen preventScroll>
      <Spacer extraLarge />

      <View paddingHorizontalLarge>
        <Text sizeExtraLarge weightBold>
          {userName}, odaberite željeni restoran
        </Text>
      </View>
      <Spacer extraLarge />

      <View
        paddingHorizontalMedium
        centerContent
        style={{ alignItems: "flex-end" }}
      >
        <Button outline title="Prošle narudžbe" paddingHorizontalLarge>
          <Icon
            size={iconSize}
            name="clock-outline"
            color={C.colorBackgroundDark}
          />
        </Button>
      </View>
      <Spacer large />

      <View>
        <StandardFlatList
          query={query}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          keyExtractor={(person) => String(person)}
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
