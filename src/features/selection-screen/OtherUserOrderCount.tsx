import { observer } from "mobx-react";
import React from "react";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useStyle } from "./SelectionScreen";

export const OtherUserOrderCount = observer(function OtherUserOrderCount() {
  const S = useStyle();

  return (
    <View
      paddingLarge
      flexDirectionRow
      alignItemsCenter
      style={S.mySelectionContainer}
    >
      <Text sizeMediumLarge weightSemiBold>
        Ostali(0)
      </Text>
    </View>
  );
});
