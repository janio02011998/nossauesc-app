import { theme } from 'global/styles/theme';
import React from 'react';
import { ActivityIndicator, View } from "react-native";

import { styles } from "./styles";

export function Load() {
  return (
    <View style={[styles.containerAct, styles.horizontalAct]}>
      <ActivityIndicator size="large" color={theme.colors.heading} />
    </View>
  );
}