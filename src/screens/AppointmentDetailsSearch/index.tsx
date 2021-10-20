import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { Header } from "components/Header";
import { Background } from "components/Background";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { ButtonIcon } from "components/ButtonIcon";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  route: {
    params: {
      category: string;
    };
  };
};
type IAcademicResearch = {
  course: string;
  department: string;
  description: string;
  email: string;
  isActive: boolean;
  courses: string;
  members: any;
  photo: any;
  providerId: string;
  searchArea: string;
  teacher: string;
  title: string;
  uid: string;
};

export function AppointmentDetailsSearch({ route }: any) {
  const { item }: { item: IAcademicResearch } = route.params;
  const { secondary50, secondary70 } = theme.colors;

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
        <View style={styles.containerDivider}>
          <Text style={styles.title}>Área de atuação</Text>
        </View>
        <View style={styles.aditionalInfo}>
          <Text style={styles.subTitle}>Departamento: {item.department}</Text>
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
      </View>
      <View style={styles.footer}>
        <ButtonIcon title="Candidatar" />
      </View>
    </Background>
  );
}
