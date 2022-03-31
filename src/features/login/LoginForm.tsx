import { observer } from "mobx-react";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "~/components/Button";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { useLoginForm } from "./useLoginForm";

function useStyle() {
  return StyleSheet.create({
    slogan: {
      padding: 32,
    },
    containerTextLlacan: {
      marginEnd: 237,
    },
    textLlacan: {
      fontSize: 32,
      lineHeight: 38,
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: 3,
    },
    textYellowL: {
      fontSize: 32,
      lineHeight: 38,
      backgroundColor: "#000000",
      padding: 2,
    },
  });
}

export const LoginForm = observer(function LoginForm() {
  const { fields, isSubmitting, isValid, submitForm } = useLoginForm();
  const S = useStyle();
  return (
    <View>
      <View style={S.slogan}>
        <Text weightBold style={{ fontSize: 32, lineHeight: 38 }}>
          S ovom aplikacijom nikad nećeš ostati
        </Text>
        <View style={S.containerTextLlacan}>
          <Text weightBold style={S.textLlacan}>
            <Text colorTheme weightBold style={S.textYellowL}>
              l
            </Text>
            lačan
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "#070707" }} paddingLarge>
        <Text
          weightBold
          alignCenter
          colorTheme
          style={{ fontSize: 40, lineHeight: 40, marginTop: 48 }}
        >
          Prijavi se
        </Text>
        <Spacer extraLarge />

        <TextInput
          label="Email"
          placeholder="john.doe@email.com"
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          spellCheck={false}
          blurOnSubmit={false}
          maxLength={50}
          value={fields.email.value}
          onChangeText={fields.email.onChangeText}
          onBlur={fields.email.onBlur}
          caption={fields.email.caption}
          error={fields.email.error}
          onSubmitEditing={fields.email.onSubmitEditing}
        />
        <Spacer small />

        <TextInput
          label="Password"
          placeholder="********"
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          spellCheck={false}
          textContentType="password"
          ref={fields.password.ref}
          value={fields.password.value}
          onChangeText={fields.password.onChangeText}
          onBlur={fields.password.onBlur}
          caption={fields.password.caption}
          error={fields.password.error}
          onSubmitEditing={fields.password.onSubmitEditing}
        />
        <Spacer small />

        <Button onPress={submitForm} disabled={!isValid} title="Sign in" />
        {isSubmitting && <Modal />}

        <Spacer large />

        <Button
          onPress={() => {
            console.warn("TODO");
          }}
          title="Forgot password?"
        />
      </View>
    </View>
  );
});
