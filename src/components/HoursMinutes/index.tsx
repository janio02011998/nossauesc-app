import React from "react";
import { Text, View } from "react-native";
import { SmallInput } from "components/SmallInput";

import { styles } from "./styles";

type Props = {
  handleDataTimerWeek: any;
  day: string;
};

export function HoursMinutes({ handleDataTimerWeek, day }: Props) {
  return (
    <View style={styles.field}>
      <View>
        <Text style={[styles.label, { marginBottom: 12 }]}>Início</Text>
        <View style={styles.column}>
          <SmallInput
            maxLength={2}
            onChangeText={(value) =>
              handleDataTimerWeek({ startAtH: value }, day)
            }
          />
          <Text style={styles.divider}>:</Text>
          <SmallInput
            maxLength={2}
            onChangeText={(value) =>
              handleDataTimerWeek({ startAtM: value }, day)
            }
          />
        </View>
      </View>
      <View>
        <Text style={[styles.label, { marginBottom: 12 }]}>Fim</Text>
        <View style={styles.column}>
          <SmallInput
            maxLength={2}
            onChangeText={(value) =>
              handleDataTimerWeek({ finishAtH: value }, day)
            }
          />
          <Text style={styles.divider}>:</Text>
          <SmallInput
            maxLength={2}
            onChangeText={(value) =>
              handleDataTimerWeek({ finishAtM: value }, day)
            }
          />
        </View>
      </View>
    </View>
  );
}
