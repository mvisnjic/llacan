import { observer } from "mobx-react";
import React from "react";
import { Image, StyleSheet } from "react-native";
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
      paddingTop: 32,
      paddingLeft: 32,
      paddingRight: 32,
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
    hamburger: {
      width: 182,
      height: 182,
    },
    logoContainer: {
      alignSelf: "flex-end",
      left: 32,
      right: 32,
      bottom: 32,
    },
    logo: {
      width: 120,
      height: 15,
    },
    forgotPassword: {
      alignSelf: "center",
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

      <View style={{ flexDirection: "row" }}>
        <View style={{}}>
          <Image
            style={S.hamburger}
            source={require("./images/hamburger.png")}
          />
        </View>
        <View style={S.logoContainer}>
          <Image style={S.logo} source={require("./images/lloydsLogo.png")} />
        </View>
      </View>
      <View style={{ backgroundColor: "#070707" }}>
        <View paddingLarge>
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

          <Spacer extraLarge />

          <Text
            onPress={() => {
              console.warn("TODO");
            }}
            colorTheme
            weightSemiBold
            style={S.forgotPassword}
          >
            Zaboravili ste lozinku?
          </Text>
        </View>

        <View style={{ width: 48 }}>
          <Image source={require("./images/kico.png")} />
        </View>
      </View>
    </View>
  );
});
