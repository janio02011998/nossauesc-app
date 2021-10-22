import React from 'react';
import { FlatList } from "react-native";

import * as C from 'components';

import { IActivityStudent } from 'interfaces/IActStudent';

import { styles } from './styles';
import { useNavigation } from '@react-navigation/core';

type Props = {
  study: IActivityStudent[];
}

export function FlatListStudent({ study }: Props) {

  const { navigate } = useNavigation();

  function handleAppointmentDetails(data: IActivityStudent) {
    navigate("AppointmentDetails", {
      data,
    });
  }

  return (
    <FlatList
      data={study}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => {
        const data = {
          title: item.title,
          subtitle: item.phrase,
          icon: item.banner,
          connections: item.members.length
        };
        return (
          <C.Appointment
            data={data}
            onPress={() => handleAppointmentDetails(item)}
          />
        );
      }}
      style={styles.matches}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <C.ListDivider isCentered />}
      contentContainerStyle={{ paddingBottom: 69 }}
    />
  )
}