import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { RectButton } from "react-native-gesture-handler";
import { Text, View, Image, ActivityIndicator } from "react-native";

import * as C from 'components';

import { useAuth } from "hooks/auth";

import GoogleIcon from "assets/icons/google.png";
import IllustrationImg from "assets/illustration.png";

import { styles } from "./style";
import { theme } from "global/styles/theme";

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const { signIn, loading, setAllInfosUser } = useAuth();

  const signInWithouLogin = () => {
    setAllInfosUser({
      displayName: "Usuário",
      email: "usernossauesc@gmail.com",
      phoneNumber: "access-basic",
      photoURL:
        "https://lh3.googleusercontent.com/proxy/https://firebasestorage.googleapis.com/v0/b/nossa-uesc.appspot.com/o/icons%2FBras%C3%A3o_da_UESC.png?alt=media&token=d1277b94-6587-4dc6-992c-e2724ba1a976",
      providerId: "access-basic",
      uid: "access-basic",
      course: "access-basic",
      role: "access-basic",
      registration: "access-basic",
      departament: "access-basic",
      searchArea: "access-basic",
      xp: 0,
    });


  };

  if (loading) {
    return <C.Load />
  }

  return (
    <C.Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Encontre {`\n`}
            suas ativides {`\n`}
            facilmente {`\n`}
          </Text>
          <Text style={styles.subtitle}>
            Esportes, grupos de estudos, {`\n`}
            iniciação ciêntifica, fique por dentro!
          </Text>

          {!loading ? (
            <View style={styles.wrapper}>
              <RectButton
                style={styles.buttonWithoutLogin}
                onPress={signInWithouLogin}
              >
                <View style={styles.buttonTextContainer}
                  accessible
                  accessibilityLabel="Entrar sem login"
                >
                  <Text style={styles.buttonTextWithLogin}>Entrar</Text>
                </View>
              </RectButton>
              <RectButton style={styles.buttonContainer} onPress={signIn}>
                <Image source={GoogleIcon} style={styles.googleIcon} />
                <View style={styles.buttonTextContainer}
                  accessible
                  accessibilityLabel="Entrar com Google">
                  <Text style={styles.buttonText}>Contiue com Google</Text>
                </View>
              </RectButton>
            </View>
          ) : (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
        </View>
      </View>
    </C.Background>
  );
}
