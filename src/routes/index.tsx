import React from "react";
import "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthRoutes } from "./auth.routes";
import { AuthRoutesWithouLogin } from "./auth.routes";
import { useAuth } from "hooks/auth";
import { SignIn } from "../screens/Signin";
import { theme } from "global/styles/theme";

export function Routes() {
  const { user } = useAuth();
  const { Navigator, Screen } = createStackNavigator();

  function renderAuth() {
    if (user.uid === "access-basic")
      return <AuthRoutesWithouLogin />

    return <AuthRoutes />
  }

  return (
    <NavigationContainer>
      {user.providerId ? (
        <>
          {renderAuth()}
        </>
      ) : (
        <Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: theme.colors.secondary100,
            },
          }}
        >
          <Screen name="SignIn" component={SignIn} />
        </Navigator>
      )}
    </NavigationContainer>
  );
}
