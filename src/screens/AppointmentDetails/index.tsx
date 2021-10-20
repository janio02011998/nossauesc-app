import React from "react";
import {
  ActivityIndicator,
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

import {
  IActivityStudent,
  ISingleEvent,
  IWeekDays,
} from "interfaces/IActStudent";

export function AppointmentDetails({ route }: any) {
  const { data }: { data: IActivityStudent } = route.params;

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

  function renderStartAndFinishTime() {
    const dataF = Object.entries(data.weekSchedule).map((key, index) => {
      return {
        day: data.weekSchedule[index].day,
        startAt: data.weekSchedule[index].startAt,
        finishAt: data.weekSchedule[index].finishAt,
      };
    });

    return (
      <>
        {dataF.map((item: IWeekDays) => (
          <View style={styles.wrapperTime} key={item.day}>
            <Text style={styles.legend}>{item.day}</Text>
            <Text style={styles.legend}>
              {item.startAt} ~ {item.finishAt}
            </Text>
          </View>
        ))}
      </>
    );
  }
  function renderSingleEvent(item: ISingleEvent) {
    return (
      <View style={styles.wrapperTime}>
        <Text style={styles.legend}>Evento único</Text>
        <Text style={styles.legend}>
          {item.date} ~ {item.time}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.containerAct, styles.horizontalAct]}>
        <ActivityIndicator size="large" color={theme.colors.heading} />
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
      <ImageBackground source={{ uri: data.banner }} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subtitle}>{data.phrase}</Text>
        </View>
      </ImageBackground>
      <ScrollView style={styles.containerScroll}>
        <View style={styles.wrapperDescription}>
          <Text style={styles.legend}>{data.description}</Text>
        </View>
        <View style={styles.wrapperDescription}>
          <Text style={styles.legend}>Lugar: {data.location}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.legendTitle}>Horário</Text>
          {data.schedule ? (
            <>
              <View>{renderSingleEvent(data.schedule)}</View>
            </>
          ) : (
            <>{renderStartAndFinishTime()}</>
          )}
        </View>
        <ListHeader title="Membros" subtitle={data.members.length} />
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
