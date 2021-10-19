import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SmallInput } from "components/SmallInput";

import { styles } from "./styles";

type Props = {
  handleDataTimer: any;
};

export function SingleEvent({ handleDataTimer }: Props) {
  return (
    <View style={styles.field}>
      <View>
        <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>

        <View style={styles.column}>
          <SmallInput
            maxLength={2}
            onChangeText={(value) => handleDataTimer({ date: value })}
          />
          <Text style={styles.divider}>/</Text>
          <SmallInput
            maxLength={2}
            onChangeText={(value) => handleDataTimer({ mounth: value })}
          />
        </View>
      </View>
      <View>
        <Text style={[styles.label, { marginBottom: 12 }]}>Hora e minuto</Text>

        <View style={styles.column}>
          <SmallInput
            maxLength={2}
            onChangeText={(value) => handleDataTimer({ hours: value })}
          />
          <Text style={styles.divider}>:</Text>
          <SmallInput
            maxLength={2}
            onChangeText={(value) => handleDataTimer({ minute: value })}
          />
        </View>
      </View>
    </View>
  );
}
