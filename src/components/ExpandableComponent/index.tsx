import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  item: any;
};

const ExpandableComponent = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.title}>{item.TITLE}</Text>
      </TouchableOpacity>
      {isOpen && <Text style={styles.subtitle}>{item.ANSWER}</Text>}
    </View>
  );
};

export { ExpandableComponent };
