import React from "react";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Image, Text, View } from "react-native";

import { GuildIcon } from "../GuildIcon";

import happy from "assets/icons/happy.png";
import unHappy from "assets/icons/unhappy.png";

import goldMedal from "assets/icons/gold.png";
import plateMedal from "assets/icons/plate.png";
import bronzeMedal from "assets/icons/bronze.png";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "hooks/auth";

type AppointmentProps = {
  title: string;
  subtitle: string;
  icon?: string;
  uid?: string;
  connections: number;
  isSolidarity?: boolean;
};

type Props = RectButtonProps & {
  data: AppointmentProps;
};
export function Appointment({ data, ...rest }: Props) {
  const { user } = useAuth();
  const idPhrase = Math.floor(Math.random() * 5);

  const phraseSolidarity: any = {
    1: "Preciso de um dono",
    0: `To aqui esperando você`,
    2: "Me leva",
    3: "Oie, 👉👈",
    4: `Roi ${user.displayName.split(" ")[0]}`,
  };

  const phraseDisplay = phraseSolidarity[idPhrase];

  const owner = true;
  const { primary, on, secondary50, secondary70 } = theme.colors;

  const medalStep1 = data.connections < 2 ? bronzeMedal : plateMedal;
  const medal = data.connections > 6 ? goldMedal : medalStep1;

  return (
    <RectButton {...rest}>
      <View
        style={styles.container}
        accessible
        accessibilityLabel={`Botão para acessa informações de ${data.title}`}
      >
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}
        >
          <GuildIcon icon={data.icon} />
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.title}</Text>
            {/* <Text style={styles.category}>{data.subtitle}</Text> */}
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <Text style={styles.category}>{data.subtitle}</Text>

              {/* <Text style={styles.date}>{data.date}</Text> */}
            </View>
            <View style={styles.playersInfo}>
              {data.isSolidarity === true ? (
                <>
                  <Image
                    source={data.connections ? happy : unHappy}
                    style={{ resizeMode: "contain", width: 18, height: 18 }}
                  />
                  <Text
                    style={[styles.player, { color: owner ? primary : on }]}
                  >
                    {data.connections ? "Já fui eslhido :)" : phraseDisplay}
                  </Text>
                </>
              ) : (
                <>
                  <Image
                    source={medal}
                    style={{ resizeMode: "contain", width: 18, height: 18 }}
                  />
                  <Text
                    style={[styles.player, { color: owner ? primary : on }]}
                  >
                    Conexões {data.connections}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
