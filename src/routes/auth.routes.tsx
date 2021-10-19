import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "global/styles/theme";

import { Home } from "screens/Home";
import { AppointmentDetails } from "screens/AppointmentDetails";
import { AppointmentCreate } from "screens/AppointmentCreate";
import { AccountsInfo } from "screens/AccountsInfo";
import { AppointmentDetailsSearch } from "screens/AppointmentDetailsSearch";
import { useAuth } from "hooks/auth";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  const { user } = useAuth();
  function handleAccess() {
    if (user.uid === "access-basic") {
      return (
        <>
          <Screen name="Home" component={Home} />
        </>
      );
    } else {
      return (
        <>
          <Screen name="AccountsInfo" component={AccountsInfo} />
          <Screen name="Home" component={Home} />
        </>
      );
    }
  }
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      {handleAccess()}
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen
        name="AppointmentDetailsSearch"
        component={AppointmentDetailsSearch}
      />
      <Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Navigator>
  );
}
