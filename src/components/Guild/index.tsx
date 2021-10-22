import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { GuildIcon } from "../GuildIcon";

import { styles } from "./styles";
import { theme } from "global/styles/theme";

export type GuildProps = {
  id: string;
  name: string;
  icon: any;
  owner: boolean;
};

type Props = TouchableOpacityProps & {
  data: GuildProps;
};

export function Guild({ data, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      accessible
      accessibilityLabel={data.name}
      {...rest}
    >
      <GuildIcon icon={data.icon} />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}> {data.name}</Text>
        </View>
      </View>
      <Feather name="chevron-right" color={theme.colors.heading} size={24} />
    </TouchableOpacity>
  );
}
