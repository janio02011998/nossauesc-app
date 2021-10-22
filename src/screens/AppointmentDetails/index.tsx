import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { connectMembers } from "services/connectMembers";
import { useNavigation } from "@react-navigation/core";

import { useAuth } from "hooks/auth";
import { handleActivityEvent } from "services/handleActivityEvent";
import {
  IActivityStudent,
  IMembers,
  ISingleEvent,
  IWeekDays,
} from "interfaces/IActStudent";

import * as C from "components";

import { styles } from "./styles";
import { theme } from "global/styles/theme";

export function AppointmentDetails({ route }: any) {
  const { data }: { data: IActivityStudent } = route.params;
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const [addOrRemove, setAddOrRemove] = useState<boolean>(false);
  const userMember = {
    id: user.uid,
    userName: user.displayName,
    avatar_url: user.photoURL,
  };

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

  function renderMembers() {
    return (
      <FlatList
        data={data.members}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
            <C.Member data={item} />
          </View>
        )}
        ListHeaderComponent={() => <></>}
        numColumns={7}
        keyExtractor={(item) => item.id}
      />
    );
  }

  const handleEnterMember = () => {
    if (addOrRemove) {
      const removeMember: IMembers[] = data.members.filter(
        (member) => member.id !== user.uid
      );
      connectMembers("actitivity_student", data.uid, removeMember);
      ToastAndroid.show("Que pena :(", ToastAndroid.SHORT);
      goBack();
    } else {
      const newArray = data.members;
      newArray.push(userMember);
      connectMembers("actitivity_student", data.uid, newArray);
      ToastAndroid.show("Seja bem-vindo!", ToastAndroid.SHORT);
      goBack();
    }
  };

  const handleInactiveTopic = () => {
    handleActivityEvent("actitivity_student", data.uid, false);
    goBack();
  };

  if (!data) {
    return (
      <C.Load />
    );
  }

  useEffect(() => {
    if (
      data.members.filter((member) => member.id === userMember.id).length > 0
    ) {
      setAddOrRemove(true);
    } else {
      setAddOrRemove(false);
    }
  }, [data]);

  return (
    <C.Background>
      <C.Header
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

      <ScrollView>
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
        <C.ListHeader title="Membros" subtitle={String(data.members.length)} />
        <View style={styles.wrapperMembers}>{renderMembers()}</View>
      </ScrollView>
      {user.role !== "access-basic" && (
        <View style={styles.footer}>
          {user.uid === data.providerId ? (
            <C.ButtonIcon title="Fechar tópico" onPress={handleInactiveTopic} />
          ) : (
            <C.ButtonIcon
              title={addOrRemove ? "Sair do grupo" : "Entrar na grupo"}
              onPress={handleEnterMember}
            />
          )}
        </View>
      )}
    </C.Background>
  );
}
