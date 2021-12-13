import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import Popover from "react-native-popover-view";

import * as C from "components";

import { useAuth } from "hooks/auth";
import { useSolidarity } from "hooks/useSolidarity";
import { useAcademicResearch } from "hooks/useAcademicResearch";
import { useActitivityStudent } from "hooks/useActitivityStudent";

import { handleActivityEvent } from "services/handleActivityEvent";
import { connectSolidarity } from "services/connectSolidarity";

import { IActivityStudent } from "interfaces/IActStudent";
import { IAcademicResearch } from "interfaces/IAcadResearch";

import { theme } from "global/styles/theme";
import { styles } from "./styles";
import { FAQ } from "./Faq";
import { handleXp } from "services/handleXp";

export function Home() {
  const [category, setCategory] = useState("1");
  const [isOwnerSearch, setIsOwnerSwitch] = useState<boolean>(false);
  const [isOwnerSearchSupportive, setIsOwnerSwitchSupportive] =
    useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const { academicResearch, isLoadingAR } = useAcademicResearch();
  const { user } = useAuth();
  const { activityStudent, isLoadingAS } = useActitivityStudent();
  const { solidarity, isLoading } = useSolidarity();

  const study = activityStudent.filter((item) => item.categoryId === "2");
  const studentEngagement = activityStudent.filter(
    (item) => item.categoryId === "3"
  );
  const sport = activityStudent.filter((item) => item.categoryId === "4");

  const { navigate } = useNavigation();

  const handleConectSolidarity = (doc: string) => {
    const userProps = {
      id: user.uid,
      name: user.displayName,
      course: user.course,
      avatar: user.photoURL,
      email: user.email,
      xp: user.xp,
    };
    connectSolidarity(doc, userProps);
    handleXp(user.uid, user.xp + 50);
  };

  const toggleSwitch = (status: boolean) => {
    setIsOwnerSwitch(status);
  };

  const toggleSwitchSupportive = (status: boolean) => {
    setIsOwnerSwitchSupportive(status);
  };

  const handleInactiveTopic = (uid: string) => {
    handleActivityEvent("solidarity", uid, false);
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
              subtitle: item.searchArea,
              connections: item.members.length,
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
          ItemSeparatorComponent={() => <C.ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
        {user.role === "teacher" && (
          <View style={styles.switchSearch}>
            <RectButton onPress={() => toggleSwitch(true)}>
              <Text
                style={
                  isOwnerSearch
                    ? [
                        styles.title,
                        { fontSize: 20, color: theme.colors.primary },
                      ]
                    : styles.title
                }
              >
                Minhas pesquisas
              </Text>
            </RectButton>
            <View style={styles.separtorView} />
            <RectButton onPress={() => toggleSwitch(false)}>
              <Text
                style={
                  !isOwnerSearch
                    ? [
                        styles.title,
                        { fontSize: 20, color: theme.colors.primary },
                      ]
                    : styles.title
                }
              >
                Todas as pesquisas
              </Text>
            </RectButton>
          </View>
        )}
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
        <C.FlatListStudent study={study} />
      </>
    );
  }
  function renderSports() {
    return (
      <>
        <C.ListHeader title="Esportes" subtitle={`Total ${sport.length}`} />
        <C.FlatListStudent study={sport} />
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
        <C.FlatListStudent study={studentEngagement} />
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
            const total = item.connection.name ? 1 : 0;
            const data = {
              title: item.description,
              subtitle: `${total} conexões`,
              icon: item.banner,
              connections: total,
              isSolidarity: true,
              xp: item.connection.xp,
            };
            return (
              <Popover
                popoverStyle={{
                  backgroundColor: theme.colors.overlay,
                  borderRadius: 10,
                  borderBottomColor: "transparent",
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  minWidth: 325,
                  height: 150,
                }}
                from={
                  <TouchableOpacity>
                    <C.Appointment data={data} onPress={() => {}} />
                  </TouchableOpacity>
                }
              >
                {isOwnerSearchSupportive ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      {total ? (
                        <C.User data={item.connection} onPress={() => {}} />
                      ) : (
                        <Text style={[styles.title, { marginBottom: 30 }]}>
                          Sem conexões
                        </Text>
                      )}
                      <TouchableOpacity
                        style={{ marginTop: 45 }}
                        onPress={() => handleInactiveTopic(item.uid)}
                      >
                        <C.ButtonIcon title="Fechar tópico" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      paddingHorizontal: 24,
                      width: 225,
                      height: 115,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!total ? (
                      <>
                        {user.uid !== "basic-access" && (
                          <TouchableOpacity
                            onPress={() => handleConectSolidarity(item.uid)}
                          >
                            <C.ButtonIcon title="Conectar" />
                          </TouchableOpacity>
                        )}
                      </>
                    ) : (
                      <Text style={styles.title}>
                        Este objeto já encontrou um novo dono ;D
                      </Text>
                    )}
                  </View>
                )}
              </Popover>
            );
          }}
          style={styles.matches}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <C.ListDivider isCentered />}
          contentContainerStyle={{ paddingBottom: 69 }}
        />
        {user.uid !== "access-basic" && (
          <View style={styles.switchSearch}>
            <RectButton onPress={() => toggleSwitchSupportive(true)}>
              <Text
                style={
                  isOwnerSearchSupportive
                    ? [
                        styles.title,
                        { fontSize: 20, color: theme.colors.primary },
                      ]
                    : styles.title
                }
              >
                Minhas doações
              </Text>
            </RectButton>
            <View style={styles.separtorView} />
            <RectButton onPress={() => toggleSwitchSupportive(false)}>
              <Text
                style={
                  !isOwnerSearchSupportive
                    ? [
                        styles.title,
                        { fontSize: 20, color: theme.colors.primary },
                      ]
                    : styles.title
                }
              >
                Todas as doações
              </Text>
            </RectButton>
          </View>
        )}
      </>
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
      return FAQ();
    }
  }

  useEffect(() => {}, [academicResearch, solidarity, activityStudent]);

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
