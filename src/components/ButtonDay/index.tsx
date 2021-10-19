import React, { useState } from "react";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { styles } from "./styles";

type Props = {
  day: string;
  handleSchedule: any;
};

export function ButtonDay({ day, handleSchedule, ...rest }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);

  function multiplesFunctions() {
    setIsActive(!isActive);
    handleSchedule();
  }

  return (
    <RectButton
      style={!isActive ? styles.wrapperButton : styles.wrapperButtonOverlay}
      onPress={multiplesFunctions}
    >
      <Text style={!isActive ? styles.title : styles.titleOverlay}>
        {day[0]}
      </Text>
    </RectButton>
  );
}
