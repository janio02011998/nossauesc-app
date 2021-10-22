import React, { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import logoImg from "assets/icons/uesc.png";

import styles from "./styles";
import { theme } from "global/styles/theme";

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation();
  const { heading } = theme.colors;

  function handleGoBack() {
    navigate("Home");
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <BorderlessButton onPress={() => handleGoBack()}>
            <Feather name="arrow-left" size={24} color={heading} />
          </BorderlessButton>
        </BorderlessButton>

        <Image
          source={logoImg}
          resizeMode="contain"
          style={{ width: 60, height: 60 }}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  );
};

export { PageHeader };
