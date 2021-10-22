import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native";

import { GuildIcon } from "../GuildIcon";
import { categories } from "constants/categories";

import PlayerSvg from "../../assets/player.svg";
import CalendarSvg from "../../assets/calendar.svg";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import goldMedal from "assets/icons/gold.png";

type UserProps = {
  id: string;
  name: string;
  course: string;
  avatar: string;
  email: string;
  owner?: boolean;
};

type Props = RectButtonProps & {
  data: UserProps;
};
export function User({ data, ...rest }: Props) {
  // const [category] = categories.filter((item) => item.id === data.category);
  const owner = true;
  const { primary, on, secondary50, secondary70 } = theme.colors;

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
                source={goldMedal}
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
