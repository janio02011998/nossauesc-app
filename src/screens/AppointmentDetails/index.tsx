import React from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { Member } from "components/Member";
import { Header } from "components/Header";
import { ListHeader } from "components/ListHeader";
import { Background } from "components/Background";
import { ListDivider } from "components/ListDivider";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { ButtonIcon } from "components/ButtonIcon";
import { HoursMinutes } from "components/HoursMinutes";

type Props = {
  route: {
    params: {
      category: string;
    };
  };
};

type Schedule = {
  id: string;
  startAt: string;
  finishAt: string;
};

export function AppointmentDetails({ route }: any) {
  const { item } = route.params;

  const members = [
    {
      id: "1",
      userName: "Jânio",
      avatar_url: "https://github.com/janio02011998.png",
      status: "online",
    },
    {
      id: "2",
      userName: "Jânio",
      avatar_url: "https://github.com/janio02011998.png",
      status: "offline",
    },
  ];

  const schedule = [
    {
      id: "SEGUNDA",
      startAt: "15:00",
      finishAt: "19:00",
    },
    {
      id: "QUARTA",
      startAt: "15:00",
      finishAt: "19:00",
    },
    {
      id: "SEXTA",
      startAt: "15:00",
      finishAt: "19:00",
    },
  ];

  function renderStartAndFinishTime(item: Schedule) {
    return (
      <View style={styles.wrapperTime}>
        <Text style={styles.legend}>{item.id}</Text>
        <Text style={styles.legend}>
          {item.startAt} ~ {item.finishAt}
        </Text>
      </View>
    );
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />
      <ImageBackground source={{ uri: item.guild.icon }} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{item.guild.name}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.containerScroll}>
        <View style={styles.wrapperDescription}>
          <Text style={styles.legend}>Descrição</Text>
          <Text style={styles.legend}>
            A expressão Lorem ipsum em design gráfico e editoração é um texto
            padrão em latim utilizado na produção gráfica para preencher os
            espaços de texto em publicações para testar e ajustar aspectos
            visuais antes de utilizar conteúdo real.
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.legendTitle}>Horário</Text>
          {schedule.map((item) => (
            <View key={item.id}>{renderStartAndFinishTime(item)}</View>
          ))}
        </View>
        <ListHeader title="Membros" subtitle="3" />
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Member data={item} />}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.members}
        />
      </ScrollView>
      <View style={styles.footer}>
        <ButtonIcon title="Entrar na grupo" />
      </View>
    </Background>
  );
}
