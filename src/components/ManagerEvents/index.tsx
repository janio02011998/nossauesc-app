import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import * as C from 'components';

interface IAllCategories {
  title: string,
  subtitle: string,
  icon?: string;
  uid: string,
}

type Props = {
  data: IAllCategories;
}

export function ManagerEvents({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleActivity = (uid: string, status: boolean) => {

  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <C.Appointment
          data={data}
          onPress={() => { }}
        />
      </TouchableOpacity>

      {isVisible && (
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>
            Desativar evento ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => handleActivity(data.uid, true)}
            >
              <Text style={styles.title}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleActivity(data.uid, false)}
            >
              <Text style={styles.title}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}