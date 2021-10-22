import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

import * as C from 'components';
import { allowTeacher } from 'services/allowTeacher';

type UserProps = {
  id: string;
  name: string;
  course: string;
  avatar: string;
  email: string;
  owner?: boolean;
};

type Props = {
  data: UserProps;
}

export function ManagerTeachers({ data }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleAuthorization = (uid: string, type: string) => {
    allowTeacher(uid, type);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <C.User data={data} onPress={() => { }} />
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
            Liberar acesso como professor ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => handleAuthorization(data.id, "teacher")}
            >
              <Text style={styles.title}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAuthorization(data.id, "student")}
            >
              <Text style={styles.title}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}