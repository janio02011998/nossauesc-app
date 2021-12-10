import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native";

import goldMedal from "assets/icons/gold.png";
import plateMedal from "assets/icons/plate.png";
import bronzeMedal from "assets/icons/bronze.png";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { LinearGradient } from "expo-linear-gradient";

type UserProps = {
  id: string;
  name: string;
  course: string;
  avatar: string;
  email: string;
  xp: number;
  owner?: boolean;
};

type Props = RectButtonProps & {
  data: UserProps;
};
export function User({ data, ...rest }: Props) {
  const owner = true;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  const medalStep1 = data.xp < 600 ? bronzeMedal : plateMedal;
  const medal = data.xp > 1600 ? goldMedal : medalStep1;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <Image source={{ uri: data.avatar }} style={styles.avatarImg} />
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.name}</Text>
            {/* <Text style={styles.category}>{category.}</Text> */}
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <Text style={styles.title}>{data.email}</Text>
              {/* <Text style={styles.date}>{data.date}</Text> */}
            </View>
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <Text style={styles.title}>{data.course}</Text>
              {/* <Text style={styles.date}>{data.date}</Text> */}
            </View>
            <View style={styles.playersInfo}>
              {/* <PlayerSvg fill={owner ? primary : on} /> */}
              <Image
                source={medal}
                style={{ resizeMode: "contain", width: 18, height: 18 }}
              />

              <Text style={[styles.player, { color: owner ? primary : on }]}>
                {data.owner ? "Docente" : "Discente"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
