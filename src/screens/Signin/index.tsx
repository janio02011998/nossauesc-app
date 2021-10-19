import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { RectButton } from "react-native-gesture-handler";
import { Text, View, Image, ActivityIndicator } from "react-native";

import { Background } from "components/Background";
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
        "https://lh3.googleusercontent.com/proxy/Zt8br8RsdsWV528JEFaN8CJeAuuL2X385rqFw7M0b_y59H8PZgsBboTBXOF6UwBPmFGZrtPsxlJ70nxtQE8ZZPMUL0OJ5JCxmdWiCrR3SK0uG6ozxYi3JFbX2vWP36c",
      providerId: "access-basic",
      uid: "access-basic",
      course: "access-basic",
      role: "access-basic",
      registration: "access-basic",
    });
  };

  return (
    <Background>
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
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonTextWithLogin}>Entrar</Text>
                </View>
              </RectButton>
              <RectButton style={styles.buttonContainer} onPress={signIn}>
                <Image source={GoogleIcon} style={styles.googleIcon} />
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.buttonText}>Contiue com Google</Text>
                </View>
              </RectButton>
            </View>
          ) : (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
        </View>
      </View>
    </Background>
  );
}
