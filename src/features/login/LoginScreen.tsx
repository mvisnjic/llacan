import { observer } from "mobx-react";
import React, { useState } from "react";
import { Screen } from "~/components/Screen";
import { LoginForm } from "~/features/login/LoginForm";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const LoginScreen = observer(function FormExample() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  return (
    <Screen withoutBottomTabBar>
      {isModalVisible && (
        <ForgotPasswordModal
          onClosePress={() => {
            setIsModalVisible(false);
          }}
        />
      )}
      <LoginForm />
    </Screen>
  );
});
