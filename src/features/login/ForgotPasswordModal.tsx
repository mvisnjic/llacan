import { observer } from "mobx-react";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconButton } from "~/components/IconButton";
import { Modal } from "~/components/ModalProvider";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { styleConstants as C } from "~/style/styleConstants";

export interface ForgotPasswordModalProps {
  onClosePress: () => void;
}

const S = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    ...StyleSheet.absoluteFillObject,
  },
  forgotPasswordPopup: {
    position: "absolute",
    top: "50%",
    width: "90%",
    backgroundColor: C.colorBackgroundLight,
    borderColor: C.colorBackgroundDarkLighter,
    borderWidth: 1,
    flexDirection: "row",
  },
});

export const ForgotPasswordModal = observer(function ForgotPasswordModal({
  onClosePress,
}: ForgotPasswordModalProps) {
  return (
    <Modal>
      <Pressable style={S.backdrop} onPress={onClosePress} />
      <View style={S.forgotPasswordPopup}>
        <View paddingHorizontalExtraLarge paddingVerticalLarge>
          <Text sizeLarge weightBold>
            Zaboravili ste lozinku?
          </Text>
          <Text sizeMedium>
            Za oporavak lozinke kontaktirajte administratora
          </Text>
        </View>
        <View>
          <IconButton
            iconSize={C.fontSizeLarge}
            iconName="close"
            iconColor={C.colorBackgroundDark}
            onPress={onClosePress}
          />
        </View>
      </View>
    </Modal>
  );
});
