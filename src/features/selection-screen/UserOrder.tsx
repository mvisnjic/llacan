import { observer } from "mobx-react";
import React from "react";
import { IconButton } from "~/components/IconButton";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { styleConstants as C } from "~/style/styleConstants";
import { useStyle } from "./SelectionScreen";

export const UserOrder = observer(function UserOrder(props: {
  orderInCart: {
    name: string;
    price: number;
    condiments: string[];
  };
  setOrderInCart: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          price: number;
          condiments: string[];
        }
      | undefined
    >
  >;
}) {
  const S = useStyle();
  const store = useStore();
  const { orderInCart, setOrderInCart } = props;

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
        display: "flex",
      }}
      paddingMedium
      flexDirectionRow
    >
      <View centerContent style={{ width: 70 }}>
        <View style={S.circle} />
        <Text sizeMedium weightSemiBold ellipsizeMode="tail" numberOfLines={1}>
          User
        </Text>
      </View>
      <Spacer />
      <View>
        <View flexDirectionRow>
          <Text sizeMediumLarge weightSemiBold style={{ width: 220 }}>
            {orderInCart.name}
          </Text>
          <View centerContent>
            <Text sizeMediumLarge alignCenter>
              {orderInCart.price},00 kn
            </Text>
          </View>
        </View>
        <View flexDirectionRow>
          <Text sizeMediumSmall style={{ width: 220 }}>
            {store.condimentStore.selectedCondimentsAsStrings.join(", ")}
          </Text>
          <IconButton
            iconName="trash-can-outline"
            iconColor={C.colorTextDanger}
            centerContent
            style={{ flex: 1 }}
            onPress={() => setOrderInCart(undefined)}
          />
        </View>
      </View>
    </View>
  );
});
