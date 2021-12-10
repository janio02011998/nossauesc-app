import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import { useAcademicResearch } from "hooks/useAcademicResearch";
import { useActitivityStudent } from "hooks/useActitivityStudent";
import { useSolidarity } from "hooks/useSolidarity";

import * as C from "components";

import { styles } from "./styles";

interface IAllCategories {
  title: string;
  subtitle: string;
  icon?: string;
  uid: string;
}

export function GroupsEvent() {
  const { academicResearch, isLoadingAR } = useAcademicResearch();
  const { activityStudent, isLoadingAS } = useActitivityStudent();
  const { solidarity, isLoading } = useSolidarity();

  const formartResearch = academicResearch.map((item) => {
    return {
      title: item.title,
      subtitle: item.searchArea,
      icon: undefined,
      uid: item.uid,
    };
  });

  const formartStudent = activityStudent.map((item) => {
    return {
      title: item.title,
      subtitle: item.phrase,
      icon: item.banner,
      uid: item.uid,
    };
  });

  const formartSolidarity = solidarity.map((item) => {
    const total = item.connection !== undefined ? 1 : 0;

    return {
      title: item.description,
      subtitle: `${total} conexões`,
      icon: item.banner,
      uid: item.uid,
    };
  });

  const allData: IAllCategories[] = [
    ...formartResearch,
    ...formartStudent,
    ...formartSolidarity,
  ];

  useEffect(() => {}, [academicResearch, activityStudent, solidarity]);

  if (allData.length === 0) {
    return (
      <View style={styles.container}>
        <C.PageHeader title="Professores" />
        <View style={styles.wrapper}>
          <Text style={styles.title}>Sem pedidos pendentes!</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <C.PageHeader title="Eventos ativos" />
      <View style={styles.wrapper}>
        {isLoadingAR || isLoadingAS || isLoading ? (
          <C.Load />
        ) : (
          <FlatList
            data={allData}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => {
              const data = {
                ...item,
              };
              return <C.ManagerEvents data={data} />;
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
