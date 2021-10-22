import React from "react";
import { Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import uescPng from "assets/icons/uesc.png";

import { theme } from "../../global/styles/theme";

import { styles } from "./styles";
import { useAuth } from "hooks/auth";

type Props = {
  urlImage: string;
};

export function Avatar({ urlImage }: Props) {
  const { user } = useAuth();
  const { secondary50, secondary70 } = theme.colors;

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary50, secondary70]}
      accessible
      accessibilityLabel="Sua foto do perfil"
    >
      <Image
        source={user.uid === "access-basic" ? uescPng : { uri: urlImage }}
        style={styles.avatar}
      />
    </LinearGradient>
  );
}
