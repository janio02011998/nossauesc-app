import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import * as C from "components";

import { useAuth } from "hooks/auth";
import { useSolidarity } from "hooks/useSolidarity";
import { useAcademicResearch } from "hooks/useAcademicResearch";
import { useActitivityStudent } from "hooks/useActitivityStudent";

import { IActivityStudent } from "interfaces/IActStudent";
import { IAcademicResearch } from "interfaces/IAcadResearch";

import { theme } from "global/styles/theme";
import { styles } from "./styles";

export function Home() {
  const [category, setCategory] = useState("1");
  const [isOwnerSearch, setIsOwnerSwitch] = useState<boolean>(true);
  const [isOwnerSearchSupportive, setIsOwnerSwitchSupportive] =
    useState<boolean>(true);
  const { user } = useAuth();
  const { academicResearch, isLoadingAR } = useAcademicResearch();
  const { activityStudent, isLoadingAS } = useActitivityStudent();
  const { solidarity, isLoading } = useSolidarity();

  const study = activityStudent.filter((item) => item.categoryId === "2");
  const studentEngagement = activityStudent.filter(
    (item) => item.categoryId === "3"
  );
  const sport = activityStudent.filter((item) => item.categoryId === "4");

  const { navigate } = useNavigation();

  const toggleSwitch = (status: boolean) => {
    setIsOwnerSwitch(status);
  };

  const toggleSwitchSupportive = (status: boolean) => {
    setIsOwnerSwitchSupportive(status);
  };

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleAppointmentDetails(data: IActivityStudent) {
    navigate("AppointmentDetails", {
      data,
    });
  }
  function handleAppointmentDetailsSearch(item: IAcademicResearch) {
    navigate("AppointmentDetailsSearch", {
      item,
    });
  }

  function handleAppointmentCreate() {
    navigate("AppointmentCreate");
  }

  function renderSearch() {
    const ownerResearch = academicResearch.filter(
      (item) => item.providerId === user.uid
    );
    const allResearch = academicResearch.filter(
      (item) => item.providerId !== user.uid
    );
    return (
      <>
        <C.ListHeader
          title="Pesquisa ciêntifica"
          subtitle={
            isOwnerSearch
              ? `Total ${ownerResearch.length}`
              : `Total ${allResearch.length}`
          }
        />
        <FlatList
          data={isOwnerSearch ? ownerResearch : allResearch}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => {
            const data = {
              title: item.title,
              subtitle: "testando aidna",
            };
            return (
              <C.Appointment
                data={data}
                onPress={() => handleAppointmentDetailsSearch(item)}
              />
            );
          }}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <C.ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
        <View style={styles.switchSearch}>
          <RectButton onPress={() => toggleSwitch(true)}>
            <Text style={styles.title}>Minhas pesquisas</Text>
          </RectButton>
          <View style={styles.separtorView} />
          <RectButton onPress={() => toggleSwitch(false)}>
            <Text style={styles.title}>Todas as pesquisas</Text>
          </RectButton>
        </View>
      </>
    );
  }

  function renderStudy() {
    return (
      <>
        <C.ListHeader
          title="Grupo de Estudos"
          subtitle={`Total ${study.length}`}
        />
        <FlatList
          data={study}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => {
            const data = {
              title: item.title,
              subtitle: item.phrase,
              icon: item.banner,
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
          ItemSeparatorComponent={() => <C.ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }
  function renderSports() {
    return (
      <>
        <C.ListHeader title="Esportes" subtitle="Total 6" />
        <FlatList
          data={sport}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => {
            const data = {
              title: item.title,
              subtitle: item.phrase,
              icon: item.banner,
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
          ItemSeparatorComponent={() => <C.ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }

  function renderStudentEngagement() {
    return (
      <>
        <C.ListHeader
          title="Movimento estudantil"
          subtitle={`Total ${studentEngagement.length}`}
        />
        <FlatList
          data={studentEngagement}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => {
            const data = {
              title: item.title,
              subtitle: item.phrase,
              icon: item.banner,
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
          ItemSeparatorComponent={() => <C.ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
      </>
    );
  }

  function renderSupportive() {
    const ownerSupportive = solidarity.filter(
      (item) => item.providerId === user.uid
    );
    const allSupportive = solidarity.filter(
      (item) => item.providerId !== user.uid
    );
    return (
      <>
        <C.ListHeader
          title="Solidário"
          subtitle={
            isOwnerSearchSupportive
              ? `Total ${ownerSupportive.length}`
              : `Total ${allSupportive.length}`
          }
        />
        <FlatList
          data={isOwnerSearchSupportive ? ownerSupportive : allSupportive}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => {
            const data = {
              title: item.description,
              subtitle: `0 conexões`,
              icon: item.banner,
            };
            return <C.Appointment data={data} onPress={() => {}} />;
          }}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <C.ListDivider />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
        <View style={styles.switchSearch}>
          <RectButton onPress={() => toggleSwitchSupportive(true)}>
            <Text style={styles.title}>Minhas doações</Text>
          </RectButton>
          <View style={styles.separtorView} />
          <RectButton onPress={() => toggleSwitchSupportive(false)}>
            <Text style={styles.title}>Todas as doações</Text>
          </RectButton>
        </View>
      </>
    );
  }

  function renderFAQ() {
    return (
      <ScrollView style={{ marginTop: 24 }}>
        {C.FAQ.map((item, index) => (
          <View key={index}>
            <C.ExpandableComponent item={item} />
          </View>
        ))}
      </ScrollView>
    );
  }

  function renderCategories() {
    if (isLoading || isLoadingAR || isLoadingAS) {
      return (
        <View style={[styles.containerAct, styles.horizontalAct]}>
          <ActivityIndicator size="large" color={theme.colors.heading} />
        </View>
      );
    }

    if (category === "1") {
      return renderSearch();
    }
    if (category === "2") {
      return renderStudy();
    }
    if (category === "3") {
      return renderStudentEngagement();
    }
    if (category === "4") {
      return renderSports();
    }
    if (category === "5") {
      return renderSupportive();
    }
    if (category === "6") {
      return renderFAQ();
    }
  }

  return (
    <C.Background>
      <View style={styles.header}>
        <C.Profile />
        {user.uid !== "access-basic" && (
          <C.ButtonAdd onPress={handleAppointmentCreate} />
        )}
      </View>
      <View>
        <C.CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>
      {renderCategories()}
    </C.Background>
  );
}
