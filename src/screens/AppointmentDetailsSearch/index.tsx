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

export function AppointmentDetailsSearch({ route }: any) {
  const { item } = route.params;
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
                uri: "https://lh3.googleusercontent.com/a-/AOh14GhA_moxdJBiZKL55ekpkx5hEMZedMKVhWIAZKDqyw=s40",
              }}
              style={styles.avatar}
            />
          </LinearGradient>
          <Text style={styles.title}>Professor: Elinaldo Santos</Text>
        </View>
        <View style={styles.containerDivider}>
          <Text style={styles.title}>Área de atuação</Text>
        </View>
        <View style={styles.aditionalInfo}>
          <Text style={styles.subTitle}>Departamento: DCET</Text>
          <Text style={styles.subTitle}>Curso: CIÊNCIA DA COMPUTAÇÃO</Text>
          <Text style={styles.subTitle}>
            Área de pesquisa: JOGOS; SISTEMA OPERACIONAIS; CAPTURA E DETECÇÃO DE
            IMAGENS{" "}
          </Text>
        </View>
        <View style={styles.containerDivider}>
          <Text style={styles.title}>Descriçaõ do projeto</Text>
        </View>
        <ScrollView style={styles.resume}>
          <Text style={styles.subTitle}>
            Este projeto teve como foco a criação de um middleware com
            arquitetura REST que suporte diversas aplicações e abstraindo a
            complexidade e o hardware de sensores e atuadores voltados
            principalmente para IoT. O Middleware foi construído em Java e
            permite serializar os objetos inteligentes em objetos java,
            permitindo assim a programação e manipulação de tais objetos,
            tratando as informações enviadas no formato JSON (Javascript
            Nation). Os resultados obtidos com a serialização dos objetos em
            Java resultou em classes que apresentam uma abstração real dos
            dispositivos testados, sensor de umidade e temperatura, sensores de
            nível e fluxo de água e válvulas solenoide, evidenciando exito nesta
            etapa do projeto. Para os teste foram utilizados placas ESP8266,
            Arduino e Wemos para a troca de mensagem com o midddleware, através
            da arquitetura REST, implementada em Java, ao qual tinha como
            objetivo reconhecer e tratar os dados enviado pelas placas, partindo
            disso temos como excelente os resultados obtidos. O middleware então
            foi integrado ao software de gerenciamento de bens, constante no
            outro plano de trabalho deste projeto.
          </Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <ButtonIcon title="Candidatar" />
      </View>
    </Background>
  );
}
