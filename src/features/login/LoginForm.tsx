import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Button } from "~/components/Button";
import { IconButton } from "~/components/IconButton";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import LloydsLogo from "./images/lloyds-logo";
import { useLoginForm } from "./useLoginForm";

function useStyle() {
  return StyleSheet.create({
    sloganContainer: {
      padding: 32,
      paddingBottom: 0,
    },
    textLlacan: {
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: 6,
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
    forgotPassword: {
      alignSelf: "center",
    },
  });
}

export const LoginForm = observer(function LoginForm() {
  const { fields, isSubmitting, isValid /* submitForm */ } = useLoginForm();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const S = useStyle();
  const iconName = passwordVisible ? "eye-outline" : "eye-off-outline";
  const togglePasswordVisible = () => {
    setPasswordVisible((currentPasswordVisible) => {
      return !currentPasswordVisible;
    });
  };
  return (
    <View>
      <View style={S.sloganContainer}>
        <View paddingHorizontalSmall>
          <Text weightBold sizeExtraLarge>
            S ovom aplikacijom nikad nećeš ostati
          </Text>
        </View>
        <View flexDirectionRow>
          <Text weightBold sizeExtraLarge style={S.textLlacan}>
            <Text colorTheme weightBold sizeExtraLarge>
              l
            </Text>
            lačan
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            style={S.hamburger}
            source={require("./images/hamburger.png")}
          />
        </View>
        <View style={S.logoContainer}>
          <LloydsLogo />
        </View>
      </View>
      <View style={{ backgroundColor: "#070707" }}>
        {isModalVisible && (
          <ForgotPasswordModal
            onClosePress={() => {
              setIsModalVisible(false);
            }}
          />
        )}
        <View paddingLarge>
          <Text
            weightBold
            alignCenter
            colorTheme
            sizeExtraExtraLarge
            style={{ marginTop: 48 }}
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
            secureTextEntry={passwordVisible}
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
            rightComponent={() => (
              <View>
                <IconButton
                  onPress={() => {
                    togglePasswordVisible();
                  }}
                  iconName={iconName}
                  iconColor="black"
                />
              </View>
            )}
          />

          <Spacer small />

          <Button
            // onPress={submitForm}
            onPress={() => navigation.navigate("HomeScreen")}
            disabled={!isValid}
            title="Sign in"
          />
          {isSubmitting && <Modal />}

          <Spacer extraLarge />

          <Text
            onPress={() => {
              setIsModalVisible(true);
            }}
            colorTheme
            weightSemiBold
            style={S.forgotPassword}
          >
            Zaboravili ste lozinku?
          </Text>
        </View>
        <Image source={require("./images/kico.png")} style={{ width: 50 }} />
        <View />
      </View>
    </View>
  );
});
