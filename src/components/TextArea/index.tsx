import React from "react";
import { TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { styles } from "./styles";

export function TextArea({ ...rest }: TextInputProps) {
  return <TextInput style={styles.container} {...rest} />;
}
