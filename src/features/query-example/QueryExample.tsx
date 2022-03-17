import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen } from "~/components/Screen";
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

function useStyle() {
  return StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: C.colorTextAccent,
      backgroundColor: C.colorBackgroundThemeSofter,
      ...shadow(2),
    },
  });
}

const PersonListItem = observer(function PersonListItem({
  person,
}: PersonListItemProps) {
  const S = useStyle();

  return (
    <View paddingHorizontalMedium paddingVerticalSmall>
      <View paddingMedium style={S.container} flexDirectionRow>
        <View flex>
          <Text>
            <Text colorDarkSoft>Name:</Text> {person.name}
          </Text>
          <Text>
            <Text colorDarkSoft>Gender:</Text> {person.gender}
          </Text>
          <Text>
            <Text colorDarkSoft>Height (cm):</Text> {person.height}
          </Text>
          <Text>
            <Text colorDarkSoft>Mass (kg):</Text> {person.mass}
          </Text>
        </View>
        <View flex>
          <Text>
            <Text colorDarkSoft>Hair color:</Text> {person.hair_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Skin color:</Text> {person.skin_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Eye color:</Text> {person.eye_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Birth year:</Text> {person.birth_year}
          </Text>
        </View>
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
      <StandardFlatList
        query={query}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        keyExtractor={(person) => String(person)}
        renderItem={({ item }) => <PersonListItem person={item} />}
      />
    </Screen>
  );
});
