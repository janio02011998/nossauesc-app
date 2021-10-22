import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { Teachers } from "screens/Teachers";
import { GroupsEvent } from "screens/GroupsEvent";
import { theme } from "global/styles/theme";

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
        },
        cardStyle: {
          backgroundColor: theme.colors.secondary100,
        },
        tabStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: theme.fonts.title700,
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: "#fafafc",
        activeBackgroundColor: "#ebebf5",
        inactiveTintColor: "#c1bccc",
        activeTintColor: theme.colors.secondary100,
      }}
    >
      <Screen
        name="Teachers"
        component={Teachers}
        options={{
          tabBarLabel: "Professores",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-easel"
                color={focused ? theme.colors.secondary100 : color}
                size={size}
              />
            );
          },
        }}
      />
      <Screen
        name="GroupsEvent"
        component={GroupsEvent}
        options={{
          tabBarLabel: "Eventos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialIcons
                name="event"
                size={size}
                color={focused ? theme.colors.secondary100 : color}
              />
            );
          },
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;
