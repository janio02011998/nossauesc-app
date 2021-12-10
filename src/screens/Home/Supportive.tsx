import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import { RectButton } from "react-native-gesture-handler";

import * as C from "components";

import { ISolidarity } from "interfaces/ISolidarity";
import { connectSolidarity } from "services/connectSolidarity";
import { handleActivityEvent } from "services/handleActivityEvent";

import { User } from "hooks/auth";

import { theme } from "global/styles/theme";
import { styles } from "./styles";

export function Supportive(solidarity: ISolidarity[], user: User) {
  const [isOwnerSearchSupportive, setIsOwnerSwitchSupportive] =
    useState<boolean>(false);

  const ownerSupportive = solidarity.filter(
    (item) => item.providerId === user.uid
  );
  const allSupportive = solidarity.filter(
    (item) => item.providerId !== user.uid
  );

  const handleConectSolidarity = (doc: string) => {
    const userProps = {
      id: user.uid,
      name: user.displayName,
      course: user.course,
      avatar: user.photoURL,
      email: user.email,
    };
    connectSolidarity(doc, userProps);
  };

  const toggleSwitchSupportive = (status: boolean) => {
    setIsOwnerSwitchSupportive(status);
  };

  const handleInactiveTopic = (uid: string) => {
    handleActivityEvent("solidarity", uid, false);
  };

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
          const total = item.connection !== undefined ? 1 : 0;
          const data = {
            title: item.description,
            subtitle: `${total} conexões`,
            icon: item.banner,
          };
          return (
            <Popover
              popoverStyle={{
                backgroundColor: theme.colors.overlay,
                borderRadius: 10,
                borderBottomColor: "transparent",
                padding: 8,
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
                  <View>
                    {total ? (
                      <C.User data={item.connection} onPress={() => {}} />
                    ) : (
                      <Text style={[styles.title, { marginBottom: 30 }]}>
                        Sem conexões
                      </Text>
                    )}
                    <TouchableOpacity
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
                    width: 285,
                    height: 155,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleConectSolidarity(item.uid)}
                  >
                    <C.ButtonIcon title="Conectar" />
                  </TouchableOpacity>
                </View>
              )}
            </Popover>
          );
        }}
        style={styles.matches}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <C.ListDivider />}
        contentContainerStyle={{ paddingBottom: 69 }}
      />
      <View style={styles.switchSearch}>
        <RectButton onPress={() => toggleSwitchSupportive(true)}>
          <Text
            style={
              isOwnerSearchSupportive
                ? [styles.title, { fontSize: 20, color: theme.colors.primary }]
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
                ? [styles.title, { fontSize: 20, color: theme.colors.primary }]
                : styles.title
            }
          >
            Todas as doações
          </Text>
        </RectButton>
      </View>
    </>
  );
}
