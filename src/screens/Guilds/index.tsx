import { Guild, GuildProps } from "components/Guild";
import { ListDivider } from "components/ListDivider";
import { COURSES } from "constants/courses";
import React from "react";
import { FlatList, View } from "react-native";

import { styles } from "./style";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

function Guilds({ handleGuildSelect }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        style={styles.guilds}
      />
    </View>
  );
}

export { Guilds };
