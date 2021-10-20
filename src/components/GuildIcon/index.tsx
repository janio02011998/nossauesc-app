import React from "react";
import { Image } from "react-native";

import uescPng from "assets/icons/uesc.png";
import { styles } from "./styles";

type Props = {
  icon?: string;
};

export function GuildIcon({ icon }: Props) {
  return (
    <Image
      source={icon ? { uri: icon } : uescPng}
      resizeMode="cover"
      style={styles.image}
    />
  );
}
