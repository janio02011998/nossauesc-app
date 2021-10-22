import React from "react";
import { ScrollView, View } from "react-native";

import * as C from "components";

export function FAQ() {
  return (
    <ScrollView style={{ marginTop: 24 }}>
      {C.FAQ.map((item, index) => (
        <View key={index}>
          <C.ExpandableComponent item={item} />
        </View>
      ))}
    </ScrollView>
  );
}
