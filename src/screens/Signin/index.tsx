import * as React from "react";
import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
import { Text, View, Image, Alert, ActivityIndicator } from "react-native";

// import firebase from "firebase/app";
// import "firebase/auth";

import IllustrationImg from "assets/illustration.png";
import { ButtonIcon } from "components/ButtonIcon";
import { Background } from "components/Background";

import { theme } from "global/styles/theme";

import { styles } from "./style";
import { useAuth } from "hooks/auth";

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const { signIn, loading } = useAuth();

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     "414663250095-gbpkkhc0m1rluk3egbscshdmtr83tno9.apps.googleusercontent.com",
  // });

  // React.useEffect(() => {
  //   try {
  //     if (response?.type === "success") {
  //       const { id_token } = response.params;

  //       const auth = firebase.auth();
  //       const provider: any = new firebase.auth.GoogleAuthProvider();
  //       const credential = provider.credential(id_token);
  //       auth.signInWithCredential(credential);

  //       firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           // User logged in already or has just logged in.
  //           console.log(user);
  //         } else {
  //           // User not logged in or has just logged out.
  //         }
  //       });

  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // }, [response]);

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
            <ButtonIcon title="Entrar com Google" onPress={signIn} />
          ) : (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          )}
        </View>
      </View>
    </Background>
  );
}
