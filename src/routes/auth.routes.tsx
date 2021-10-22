import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { theme } from "global/styles/theme";

import { Home } from "screens/Home";
import { AppointmentDetails } from "screens/AppointmentDetails";
import { AppointmentCreate } from "screens/AppointmentCreate";
import { AccountsInfo } from "screens/AccountsInfo";
import { AppointmentDetailsSearch } from "screens/AppointmentDetailsSearch";
import StudyTabs from "./StudyTabs";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <Screen name="AccountsInfo" component={AccountsInfo} />
      <Screen name="Home" component={Home} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen
        name="AppointmentDetailsSearch"
        component={AppointmentDetailsSearch}
      />
      <Screen name="AppointmentCreate" component={AppointmentCreate} />
      <Screen name="Admin" component={StudyTabs} />
    </Navigator>
  );
}

export function AuthRoutesWithouLogin() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Screen
        name="AppointmentDetailsSearch"
        component={AppointmentDetailsSearch}
      />
    </Navigator>
  );
}
