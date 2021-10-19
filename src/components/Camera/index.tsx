import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";

type Props = RectButtonProps;

export function CAM({ ...rest }: Props) {
  return (
    <View style={styles.container}>
      <RectButton style={styles.addButton} {...rest}>
        <Ionicons name="add" size={24} color="black" />
      </RectButton>
    </View>
  );
}
