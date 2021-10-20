import { Avatar } from "components/Avatar";
import { theme } from "global/styles/theme";
import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

export type MemberProps = {
  id: string;
  userName: string;
  avatar_url: string;
};

type Props = {
  data: MemberProps;
};

export function Member({ data }: Props) {
  // const isOnline = data.status === "online";
  const { on, primary } = theme.colors;

  return (
    <View style={styles.container}>
      <Avatar urlImage={data.avatar_url} />
      <View style={styles.wrapperInfoUser}>
        {/* <Text style={styles.title}>{data.userName}</Text> */}
        {/* <Text style={styles.nameStatus}>Ciência da Computação</Text> */}
        {/* <View style={styles.status}>
          <View
            style={[
              styles.bulletStatus,
              { backgroundColor: isOnline ? on : primary },
            ]}
          />
        </View> */}
      </View>
    </View>
  );
}
