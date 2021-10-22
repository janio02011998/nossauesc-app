import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

import { BorderlessButton } from "react-native-gesture-handler";

import { theme } from "../../global/styles/theme";
import { styles } from "./style";
import { useAuth, User } from "hooks/auth";

type Props = {
  action?: ReactNode;
};

export function HeaderAccountInfo({ action }: Props) {
  const { heading } = theme.colors;
  const { user, logout } = useAuth();
  const { navigate } = useNavigation();

  async function navigateSignIn() {
    if (user.role === "") {
      await logout();
    } else {
      navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={() => navigateSignIn()}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>

      {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </View>
  );
}
