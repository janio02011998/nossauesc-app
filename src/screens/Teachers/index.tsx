import React from "react";
import { FlatList, Text, View } from "react-native";

import * as C from "components";
import { useGetAllUsers } from "hooks/useGetAllUsers";

import { styles } from "./styles";

export function Teachers() {
  const { loading, teachers } = useGetAllUsers();

  if (teachers.length === 0) {
    return (
      <View style={styles.container}>
        <C.PageHeader title="Professores" />
        <View style={styles.wrapper}>
          <Text style={styles.title}>Sem pedidos pendentes!</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <C.PageHeader title="Professores" />
      <View style={styles.wrapper}>
        {loading ? (
          <C.Load />
        ) : (
          <FlatList
            data={teachers}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => {
              const data = {
                id: item.uid,
                name: item.displayName,
                course: item.registration,
                avatar: item.photoURL,
                email: item.email,
                owner: true,
              };
              return <C.ManagerTeachers data={data} />

            }}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <C.ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        )}
      </View>
    </View>
  );
}
