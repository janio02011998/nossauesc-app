import React from "react";
import { Image } from "react-native";

import { styles } from "./styles";

type Props = {
  icon?: string;
};

export function GuildIcon({ icon }: Props) {
  const uri =
    "https://lh3.googleusercontent.com/proxy/Zt8br8RsdsWV528JEFaN8CJeAuuL2X385rqFw7M0b_y59H8PZgsBboTBXOF6UwBPmFGZrtPsxlJ70nxtQE8ZZPMUL0OJ5JCxmdWiCrR3SK0uG6ozxYi3JFbX2vWP36c";

  return (
    <Image
      source={{ uri: icon ? icon : uri }}
      resizeMode="cover"
      style={styles.image}
    />
  );
}
