import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

import { BorderlessButton } from "react-native-gesture-handler";
import { useAuth } from "hooks/auth";

import { theme } from "../../global/styles/theme";
import { styles } from "./style";

type Props = {
  title: string;
  action?: ReactNode;
};

export function Header({ title, action }: Props) {
  const { secondary100, secondary40, heading } = theme.colors;
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {/* {action ? <View>{action}</View> : <View style={{ width: 24 }} />} */}
    </LinearGradient>
  );
}
