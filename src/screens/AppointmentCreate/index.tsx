import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { RectButton } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";

import { Firestore } from "configs/firebase";
import { Guilds } from "screens/Guilds";
import { useAuth } from "hooks/auth";

import { CategorySelect } from "components/CategorySelect";
import { Background } from "components/Background";
import { HoursMinutes } from "components/HoursMinutes";
import { GuildIcon } from "components/GuildIcon";
import { TextArea } from "components/TextArea";
import { Header } from "components/Header";
import { Button } from "components/Button";
import { GuildProps } from "components/Guild";
import { ButtonDay } from "components/ButtonDay";
import { ModalView } from "components/ModalView";
import { SingleEvent } from "components/SingleEvent";
import { InputText } from "components/InputText";
import { CAM } from "components/Camera";

import { createAcademicResearch } from "services/createAcademicResearch";
import { daysOfWeek } from "Utils/daysOfWeek";

import { theme } from "global/styles/theme";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

interface IFormData {
  banner: string;
  description: string;
  phrase: string;
  location: string;
  title: string;
}

export function AppointmentCreate() {
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const [days, setDays] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("1");
  const [bannerURI, setBannerURI] = useState<string>("");

  const categoriesWithFieldsRequired: string[] = ["2", "3", "4"];
  const [course, setCourse] = useState<GuildProps>({} as GuildProps);

  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [dataTimer, setDataTimer] = useState({
    date: "",
    mounth: "",
    hours: "",
    minute: "",
  });
  const [dataTimerWeek, setDataTimerWeek] = useState<any>({});
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IFormData>({ mode: "onBlur" });

  const onSubmit = (data: any) => {
    if (category === "1" && (!course.name || course.name === "")) {
      ToastAndroid.show("Prencha todos os campos!", ToastAndroid.SHORT);
      return;
    }

    const formartDataTimerWeek = Object.keys(dataTimerWeek).map(
      (i: string, value: any) => {
        const startAt =
          dataTimerWeek[i].startAtH.padStart(2, "0") +
          ":" +
          dataTimerWeek[i].startAtM.padStart(2, "0");
        const finishAt =
          dataTimerWeek[i].finishAtH.padStart(2, "0") +
          ":" +
          dataTimerWeek[i].finishAtM.padStart(2, "0");

        return {
          day: i,
          startAt,
          finishAt,
        };
      }
    );

    // [
    //   {
    //     day: "Sun",
    //     date: "asdasd"
    //     time: "asdasd"
    //   }
    // ]

    // const collections: any = {
    //   1: "academic_research",
    //   2: "actitivity_student",
    //   3: "actitivity_student",
    // };

    // if (category === "1") {
    //   const formData = {
    //     course: course.name,
    //     ...data,
    //   };
    //   Object.entries(formData).forEach((item) => {
    //     const [key, value] = item;
    //     if (value === "") delete formData[key];
    //   });
    //   createAcademicResearch("academic_research", formData, user);
    // }

    // if (categoriesWithFieldsRequired.includes(category)) {
    //   const d =
    //     dataTimer.date.padStart(2, "0") +
    //     "/" +
    //     dataTimer.mounth.padStart(2, "0");

    //   const t =
    //     dataTimer.hours.padStart(2, "0") +
    //     ":" +
    //     dataTimer.minute.padStart(2, "0");

    //   const schedule = isSchedule
    //     ? []
    //     : [{ day: "singleEvent", date: d, time: t }];

    //   const formData = {
    //     course: course.name,
    //     schedule,
    //     ...data,
    //   };

    //   Object.entries(formData).forEach((item) => {
    //     const [key, value] = item;
    //     if (!value) delete formData[key];
    //   });

    //   console.log(formData);
    // }
    // clearFields();
    // goBack();
  };

  const clearFields = () => {
    setDays([]);
    setCategory("1");
    setBannerURI("");
    setCourse({} as GuildProps);
    setOpenGuildsModal(false);
    setIsSchedule(false);
    setDataTimer({
      date: "",
      mounth: "",
      hours: "",
      minute: "",
    });
  };

  const totalDaysSchedule = (day: string) => {
    if (days.includes(day)) {
      const clearArray = days.filter((item) => day !== item);
      setDays(clearArray);
    } else {
      setDays([...days, day]);
    }
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult: any = await ImagePicker.launchImageLibraryAsync();
    setBannerURI(pickerResult.uri);
    return pickerResult.uri;
  };

  const toggleSwitch = () => {
    setIsSchedule(!isSchedule);
  };

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true);
  };

  const handleCloseModal = () => {
    setOpenGuildsModal(false);
  };

  const handleCourseSelect = (courseSelect: GuildProps) => {
    setOpenGuildsModal(false);
    setCourse(courseSelect);
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
  };

  const handleDataTimer = (value: any) => {
    setDataTimer((prevState) => {
      return { ...prevState, ...value };
    });
  };
  const handleDataTimerWeek = (value: any, day: string) => {
    setDataTimerWeek((prevState) => {
      const daySelect = {
        [day]: {
          ...prevState[day],
          ...value,
        },
      };

      return { ...prevState, ...daySelect };
    });
  };

  function renderScheduleOrSingleEvent() {
    return (
      <>
        {isSchedule ? (
          <>
            <View>
              <Text style={[styles.label, { marginTop: 12 }]}>Agenda</Text>
              <View style={styles.week}>
                {daysOfWeek.map((dayItem) => (
                  <ButtonDay
                    key={dayItem}
                    day={dayItem}
                    handleSchedule={() => totalDaysSchedule(dayItem)}
                  />
                ))}
              </View>
            </View>

            {days.map((item) => (
              <View>
                <Text style={styles.title}>{item}</Text>
                <HoursMinutes
                  handleDataTimerWeek={handleDataTimerWeek}
                  day={item}
                />
              </View>
            ))}
          </>
        ) : (
          <SingleEvent handleDataTimer={handleDataTimer} />
        )}
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <Header title="Agendar evento" />
        <ScrollView>
          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 36 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            faqDisable
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            {category === "1" ? (
              <RectButton onPress={handleOpenGuilds}>
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
            ) : (
              <>
                <View>
                  {bannerURI === "" ? (
                    <View>
                      <Text style={styles.title}>Adicionar banner</Text>
                      <Controller
                        control={control}
                        name="banner"
                        defaultValue=""
                        render={({ field: { onChange, value, onBlur } }) => (
                          <CAM
                            onPress={async () => {
                              const uri = await openImagePickerAsync();
                              onChange(uri);
                            }}
                          />
                        )}
                        rules={{
                          required: {
                            value: categoriesWithFieldsRequired.includes(
                              category
                            )
                              ? true
                              : false,
                            message: "Preencha todos os campos!",
                          },
                        }}
                      />
                    </View>
                  ) : (
                    <View>
                      <RectButton onPress={() => setBannerURI("")}>
                        <Text style={styles.title}>Remover banner</Text>
                      </RectButton>
                      <ImageBackground
                        source={{
                          uri: bannerURI,
                        }}
                        style={styles.bannerWrapper}
                      />
                    </View>
                  )}
                </View>
                {category !== "5" && (
                  <>
                    <View>
                      <Switch
                        style={{ marginTop: 12 }}
                        onValueChange={toggleSwitch}
                        value={isSchedule}
                      />
                    </View>
                    {renderScheduleOrSingleEvent()}
                  </>
                )}
              </>
            )}

            <View style={styles.field}>
              <Text style={[styles.label, { marginBottom: 12 }]}>
                Descrição
              </Text>
              <Text style={styles.caracteresLimit}>Max 500 caracteres</Text>
            </View>
            <Controller
              control={control}
              name="description"
              defaultValue=""
              render={({ field: { onChange, value, onBlur } }) => (
                <TextArea
                  multiline
                  maxLength={500}
                  numberOfLines={5}
                  autoCorrect={false}
                  onChangeText={(value) => onChange(value)}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "Descrição não pode está vazia",
                },
              }}
            />
            {category !== "5" && category !== "1" && (
              <>
                <View style={styles.field}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Nome do grupo
                  </Text>
                  <Text style={styles.caracteresLimit}>Max 15 caracteres</Text>
                </View>
                <Controller
                  control={control}
                  name="title"
                  defaultValue=""
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputText
                      maxLength={80}
                      placeholder="Cinema"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  rules={{
                    required: {
                      value: categoriesWithFieldsRequired.includes(category)
                        ? true
                        : false,
                      message: "Preencha todos os campos!",
                    },
                  }}
                />
                <View style={styles.field}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Frase de apresentação
                  </Text>
                  <Text style={styles.caracteresLimit}>Max 80 caracteres</Text>
                </View>
                <Controller
                  control={control}
                  name="phrase"
                  defaultValue=""
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputText
                      maxLength={80}
                      placeholder="Junte-se ao nosso grupo :D"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  rules={{
                    required: {
                      value: categoriesWithFieldsRequired.includes(category)
                        ? true
                        : false,
                      message: "Preencha todos os campos!",
                    },
                  }}
                />

                <View style={styles.field}>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Localização
                  </Text>
                  <Text style={styles.caracteresLimit}>Max 80 caracteres</Text>
                </View>
                <Controller
                  control={control}
                  name="location"
                  defaultValue=""
                  render={({ field: { onChange, value, onBlur } }) => (
                    <InputText
                      maxLength={80}
                      placeholder="Pavilhão Adonias Filho, Sala 19B5"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                    />
                  )}
                  rules={{
                    required: {
                      value: categoriesWithFieldsRequired.includes(category)
                        ? true
                        : false,
                      message: "Preencha todos os campos!",
                    },
                  }}
                />
              </>
            )}
            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </ScrollView>
        <ModalView visible={openGuildsModal} closeModal={handleCloseModal}>
          <Guilds handleGuildSelect={handleCourseSelect} />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  );
}
