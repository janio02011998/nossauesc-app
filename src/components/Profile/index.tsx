import React from "react";
import { Text, View } from "react-native";

import { useAuth } from "hooks/auth";
import { Avatar } from "../Avatar";

import { styles } from "./styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { PHRASES } from "constants/phrases";

type Props = {};

export function Profile({}: Props) {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const day = new Date().getDay();

  const goAccountsInfo = () => {
    if (user.uid !== "access-basic") {
      navigate("AccountsInfo");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goAccountsInfo}>
        <Avatar urlImage={user.photoURL} />
      </TouchableWithoutFeedback>
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
