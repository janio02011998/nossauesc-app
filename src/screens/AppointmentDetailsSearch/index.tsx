import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import {
  BorderlessButton,
  FlatList,
  RectButton,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

import * as C from "components";
import { Header } from "components/Header";
import { Background } from "components/Background";
import { ButtonIcon } from "components/ButtonIcon";
import { IAcademicResearch, IMembersAcademic } from "interfaces/IAcadResearch";
import { useAuth } from "hooks/auth";
import { connectMembersAcademic } from "services/connectMembersAcademic";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { handleActivityEvent } from "services/handleActivityEvent";

type Props = {
  route: {
    params: {
      category: string;
    };
  };
};

export function AppointmentDetailsSearch({ route }: any) {
  const { item }: { item: IAcademicResearch } = route.params;
  const { user } = useAuth();
  const userMember = {
    id: user.uid,
    name: user.displayName,
    course: user.course,
    avatar: user.photoURL,
    email: user.email,
  };
  const { secondary50, secondary70 } = theme.colors;
  const [addOrRemove, setAddOrRemove] = useState<boolean>(false);
  const [isConnectionsOrDescription, setIsConnectionOrDescription] =
    useState<boolean>(true);

  const handleEnterMember = () => {
    if (addOrRemove) {
      const removeMember: IMembersAcademic[] = item.members.filter(
        (member) => member.id !== user.uid
      );
      connectMembersAcademic("academic_research", item.uid, removeMember);
      ToastAndroid.show("Que pena :(", ToastAndroid.SHORT);
    } else {
      const newArray = item.members;
      newArray.push(userMember);
      connectMembersAcademic("academic_research", item.uid, newArray);
      ToastAndroid.show("Seja bem-vindo!", ToastAndroid.SHORT);
    }
  };

  const toggleSwitch = (status: boolean) => {
    setIsConnectionOrDescription(status);
  };

  const handleInactiveTopic = () => {
    handleActivityEvent("academic_research", item.uid, false);
  };

  useEffect(() => {
    if (
      item.members.filter((member) => member.id === userMember.id).length > 0
    ) {
      setAddOrRemove(true);
    } else {
      setAddOrRemove(false);
    }
  }, []);

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
      <View style={styles.container}>
        <View style={{ justifyContent: "flex-end" }}>
          <View style={styles.autor}>
            <LinearGradient
              style={styles.containerGradient}
              colors={[secondary50, secondary70]}
            >
              <Image
                source={{
                  uri: item.photo,
                }}
                style={styles.avatar}
              />
            </LinearGradient>
            <Text style={styles.title}> {item.teacher}</Text>
          </View>
          <View style={styles.switchSearch}>
            <RectButton onPress={() => toggleSwitch(true)}>
              <Text style={styles.titleButton}>Projeto</Text>
            </RectButton>
            <View style={styles.separtorView} />
            <RectButton onPress={() => toggleSwitch(false)}>
              <Text style={styles.titleButton}>Conexões</Text>
            </RectButton>
          </View>
        </View>

        {isConnectionsOrDescription ? (
          <>
            <View style={styles.containerDivider}>
              <Text style={styles.title}>Área de atuação</Text>
            </View>
            <View style={styles.aditionalInfo}>
              <Text style={styles.subTitle}>
                Departamento: {item.department}
              </Text>
              <Text style={styles.subTitle}>Curso: {item.course}</Text>
              <Text style={styles.subTitle}>
                Área de pesquisa: {item.searchArea}
              </Text>
            </View>
            <View style={styles.containerDivider}>
              <Text style={styles.title}>Descriçaõ do projeto</Text>
            </View>
            <ScrollView style={styles.resume}>
              <Text style={styles.subTitle}>{item.description}</Text>
            </ScrollView>
            {user.uid !== item.providerId ? (
              <View style={styles.footer}>
                <ButtonIcon
                  title={addOrRemove ? "Candidatar-se" : "Remover candidatura"}
                  onPress={handleEnterMember}
                />
              </View>
            ) : (
              <View style={styles.footer}>
                <ButtonIcon
                  title="Fechar tópico"
                  onPress={handleInactiveTopic}
                />
              </View>
            )}
          </>
        ) : (
          <FlatList
            data={item.members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <C.User data={item} onPress={() => {}} />}
            style={styles.matches}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <C.ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        )}
      </View>
    </Background>
  );
}
