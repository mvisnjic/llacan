import { observer } from "mobx-react";
import React from "react";
import { Screen } from "~/components/Screen";
import { LoginForm } from "~/features/login/LoginForm";

export const LoginScreen = observer(function FormExample() {
  return (
    <Screen withoutBottomTabBar>
      <LoginForm />
    </Screen>
  );
});
