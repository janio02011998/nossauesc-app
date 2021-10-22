import { Guild, GuildProps } from "components/Guild";
import { ListDivider } from "components/ListDivider";
import { COURSES } from "constants/courses";
import React from "react";
import { FlatList, View } from "react-native";

import { styles } from "./style";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

function Courses({ handleGuildSelect }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={COURSES}
        keyExtractor={(item) => item.id}
        accessible
        renderItem={({ item }) => {
          const data = {
            ...item,
            icon: null,
          };
          return <Guild data={data} onPress={() => handleGuildSelect(item)} />;
        }}
        accessibilityLabel="Lista de cursos"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        style={styles.guilds}
      />
    </View>
  );
}

export { Courses };
