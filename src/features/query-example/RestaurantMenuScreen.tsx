import { observer } from "mobx-react";
import React from "react";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

interface PersonListItemProps {
  person: PersonInstance;
}

const PersonListItem = observer(function PersonListItem({
  person,
}: PersonListItemProps) {
  return (
    <View
      paddingHorizontalLarge
      paddingVerticalSmall
      flexDirectionRow
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        marginBottom: -10,
      }}
    >
      <View>
        <Text sizeMedium weightSemiBold>
          {person.name}
        </Text>
        <Text sizeExtraSmall>
          {person.eye_color}, {person.gender}, {person.hair_color},{" "}
          {person.skin_color}
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }} centerContent>
        <Text>{person.height},00</Text>
      </View>
    </View>
  );
});

const FlatlistHeader = observer((props: { restaurant: any }) => {
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
            kečap, ajvar, majoneza, kiseli krastavci, zelena salata, rajčica,
            luk, chilli
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
      {props.restaurant.tags.map((tag: string) => (
        <View
          key={tag}
          paddingHorizontalLarge
          paddingVerticalMedium
          style={{ borderBottomWidth: 1, borderBottomColor: "#EEEEEE" }}
          flexDirectionRow
          alignItemsCenter
        >
          <Text sizeLarge weightBold>
            {tag}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Icon
              size={C.fontSizeLarge}
              name="menu-down-outline"
              color={C.colorBackgroundDark}
            />
          </View>
        </View>
      ))}
    </>
  );
});

export const RestaurantMenuScreen = observer(function RestaurantMenuScreen({
  route,
}) {
  const store = useStore();
  const query = useInfiniteQuery(["peopleList"], ({ pageParam }) => {
    return store.personStore.readPersonList({ page: pageParam });
  });
  const { restaurant } = route.params;

  const insets = useSafeAreaInsets();

  return (
    <Screen preventScroll>
      <View style={{ paddingBottom: 10 }}>
        <StandardFlatList
          query={query}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          keyExtractor={(person) => String(person)}
          renderItem={({ item }) => <PersonListItem person={item} />}
          ListHeaderComponent={<FlatlistHeader restaurant={restaurant} />}
        />
      </View>
    </Screen>
  );
});
