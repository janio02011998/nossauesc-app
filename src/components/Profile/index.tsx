import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";

import { useAuth } from "hooks/auth";
import { Avatar } from "../Avatar";

import { styles } from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { PHRASES } from "constants/phrases";
import { theme } from "global/styles/theme";

type Props = {};

export function Profile({}: Props) {
  const { user, logout } = useAuth();
  const { navigate } = useNavigation();

  const day = new Date().getDay();

  const goAccountsInfo = () => {
    if (user.uid !== "access-basic") {
      navigate("AccountsInfo");
    }
  };

  return (
    <View style={styles.container}>
      <Popover
        popoverStyle={{
          backgroundColor: theme.colors.overlay,
          borderRadius: 10,
          borderBottomColor: "transparent",
          padding: 8,
        }}
        from={
          <TouchableWithoutFeedback>
            <Avatar urlImage={user.photoURL} />
          </TouchableWithoutFeedback>
        }
      >
        <TouchableOpacity onPress={goAccountsInfo}>
          <Text style={styles.greeting}>Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.greeting}>Sair</Text>
        </TouchableOpacity>
      </Popover>

      <View>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.displayName.split(" ")[0]}</Text>
        </View>
        <Text style={styles.message}>{PHRASES[day]}</Text>
      </View>
    </View>
  );
}
