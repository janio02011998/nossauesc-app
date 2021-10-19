import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import { useAuth, User } from "hooks/auth";

import { GuildIcon } from "components/GuildIcon";
import { GuildProps } from "components/Guild";
import { Background } from "components/Background";
import { Firestore } from "configs/firebase/index";

import studyIcon from "assets/icons/study.png";
import giveClassesIcon from "assets/icons/give-classes.png";

import { styles } from "./styles";
import { theme } from "global/styles/theme";
import { useNavigation } from "@react-navigation/core";
import { Guilds } from "screens/Guilds";
import { ModalView } from "components/ModalView";
import { HeaderAccountInfo } from "components/HeaderAccountInfo";
import { useGetUser } from "hooks/useGetUser";

export function AccountsInfo() {
  const { user, setAllInfosUser } = useAuth();

  const { displayName, email, phoneNumber, uid, photoURL } = user;
  const { navigate } = useNavigation();
  const [openCourses, setOpenCourses] = useState(false);

  const { loading, getUser } = useGetUser(uid);

  const [registration, setRegistration] = useState<string>("");
  const [searchArea, setSearchArea] = useState<string>("");
  const [departament, setDepartament] = useState<string>("");
  const [isTeach, setIsTeacher] = useState(false);
  const [course, setCourse] = useState({} as GuildProps);

  const handleOpenCourses = () => {
    setOpenCourses(true);
  };

  const handleCloseModal = () => {
    setOpenCourses(false);
  };

  const handleGuildSelect = (course: GuildProps) => {
    setOpenCourses(false);
    setCourse(course);
  };

  const onSubmit = () => {
    try {
      if (
        isTeach &&
        (departament.length === 0 ||
          registration.length === 0 ||
          searchArea.length === 0 ||
          course.name.length === 0)
      ) {
        ToastAndroid.show("Prencha todos os campos!", ToastAndroid.SHORT);
        return;
      }

      if (!isTeach && (registration.length === 0 || course.name.length === 0)) {
        ToastAndroid.show("Prencha todos os campos!", ToastAndroid.SHORT);
        return;
      }

      const data: any = {
        displayName,
        email,
        phoneNumber,
        course: course.name,
        registration,
        departament,
        searchArea,
        photoURL: user.photoURL,
        providerId: user.providerId,
        role: isTeach ? "teach" : "student",
        authorization: isTeach ? "pending" : "aproved",
      };

      // Object.entries(data).forEach((item) => {
      //   const [key, value] = item;
      //   if (value === "") delete data[key];
      // });
      Object.entries(data).forEach((item) => {
        const [key, value] = item;
        if (value === "") data[key] = null;
      });

      Firestore.collection("users").doc(uid).set(data);

      navigate("Home");
    } catch (error) {
      ToastAndroid.show("Prencha todos os campos!", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (uid === "access-basic") {
      navigate("Home");
    }
    async function fetchMyAPI() {
      const response: any | User = await getUser();
      if (response) {
        const user: User = response;
        setAllInfosUser(user);
        navigate("Home");
      }
    }

    fetchMyAPI();
  }, []);

  if (loading) {
    return (
      <View style={[styles.containerAct, styles.horizontalAct]}>
        <ActivityIndicator size="large" color={theme.colors.heading} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Background>
        <HeaderAccountInfo />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 40,
            paddingTop: 25,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: photoURL,
              }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.title}>
            Seja bem-vindo {displayName}, {"\n"}
            <Text style={styles.titleBold}>
              Organizando o ambiente para você :D
            </Text>
          </Text>

          <View style={styles.buttonsContainer}>
            <RectButton
              onPress={() => setIsTeacher(false)}
              style={
                isTeach ? [styles.button, styles.buttonPrimary] : styles.button
              }
            >
              <Image source={studyIcon} />

              <Text style={styles.buttonText}>Aluno</Text>
            </RectButton>

            <RectButton
              onPress={() => setIsTeacher(true)}
              style={
                !isTeach ? [styles.button, styles.buttonPrimary] : styles.button
              }
            >
              <Image source={giveClassesIcon} />

              <Text style={styles.buttonText}>Professor</Text>
            </RectButton>
          </View>
          <View>
            <View>
              <Text style={styles.title}>
                Matricula <Text style={{ color: "red" }}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Ex: 201620039"
                onChangeText={setRegistration}
              />
            </View>
            {isTeach && (
              <>
                <View style={styles.field}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Departamento <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <Text style={styles.caracteresLimit}>Max 80 caracteres</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="DCET"
                  onChangeText={setDepartament}
                />
                <View style={styles.field}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Aréa de pesquisa <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <Text style={styles.caracteresLimit}>Max 80 caracteres</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Processamento de imagens e segurança de redes"
                  onChangeText={setSearchArea}
                />
              </>
            )}
            <RectButton onPress={handleOpenCourses}>
              <View style={styles.select}>
                {course.icon ? <GuildIcon /> : <View style={styles.image} />}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {course.name ? course.name : "Selecione o curso"}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  size={18}
                  color={theme.colors.heading}
                />
              </View>
            </RectButton>
          </View>
          <View style={{ marginTop: 25, paddingBottom: 40 }}>
            <RectButton style={styles.buttonConfirm} onPress={() => onSubmit()}>
              <Text style={styles.titleButton}>Salvar</Text>
            </RectButton>
          </View>
          <ModalView visible={openCourses} closeModal={handleCloseModal}>
            <Guilds handleGuildSelect={handleGuildSelect} />
          </ModalView>
        </ScrollView>
      </Background>
    </KeyboardAvoidingView>
  );
}
