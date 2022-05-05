import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Button } from "~/components/Button";
import { IconButton, IconButtonProps } from "~/components/IconButton";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
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
  const { fields, isSubmitting, isValid /* submitForm */ } = useLoginForm();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [iconName, setIconName] =
    useState<IconButtonProps["iconName"]>("eye-outline");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const S = useStyle();
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
          <Image style={S.logo} source={require("./images/lloydsLogo.png")} />
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
                    if (iconName == "eye-outline") {
                      setIconName("eye-off-outline");
                      setPasswordVisible(false);
                    }
                    if (iconName == "eye-off-outline") {
                      setIconName("eye-outline");
                      setPasswordVisible(true);
                    }
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
            onPress={() => navigation.navigate("RestaurantPickScreen")}
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
        <Image style={{ width: 48 }} source={require("./images/kico.png")} />
        <View />
      </View>
    </View>
  );
});
