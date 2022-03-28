import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
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

function useStyle() {
  return StyleSheet.create({
    container: {
      // borderRadius: 4,
      // borderWidth: 1,
      // borderColor: C.colorBackgroundLight,
      backgroundColor: C.colorBackgroundLight,
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
        <Text sizeExtraLarge weightBold>
          {person.name}
        </Text>
        <Spacer small />
        <Text sizeSmall weightLight>
          {person.gender}, {person.height}, {person.mass}
        </Text>
        <Spacer />
        <Text sizeMedium weightLight>
          {person.hair_color}, {person.skin_color}, {person.eye_color}
        </Text>
        <Spacer small />
        <Text sizeMedium weightLight>
          {person.birth_year}
        </Text>
        <Spacer extraLarge />
        <Button title="Menu i info" />
        <Spacer />
        <Button title="Nova narudžba" />
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
      <Text
        sizeExtraLarge
        weightBold
        style={{
          paddingHorizontal: 16,
        }}
      >
        User, odaberite željeni restoran
      </Text>
      <Spacer extraLarge />

      <Spacer extraLarge />

      <StandardFlatList
        query={query}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        keyExtractor={(person) => String(person)}
        renderItem={({ item }) => <PersonListItem person={item} />}
      />
    </Screen>
  );
});
