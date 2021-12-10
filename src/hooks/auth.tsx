import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorages from "@react-native-async-storage/async-storage";

import { Auth } from "configs/firebase";
import firebase from "firebase/app";
import { ToastAndroid } from "react-native";

export type User = {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
  role: string;
  course: string;
  registration: string;
  departament: string;
  searchArea: string;
  xp: number;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  setAllInfosUser: (user: User) => void;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId:
      "414663250095-g9kq65gb9mohq0rgq7mfmsfnp6lcgia0.apps.googleusercontent.com",
    iosClientId:
      "414663250095-oj5ebq4sskgso3jemk03oa2b6bjfsr20.apps.googleusercontent.com",
    webClientId:
      "414663250095-gbpkkhc0m1rluk3egbscshdmtr83tno9.apps.googleusercontent.com",
    expoClientId:
      "414663250095-hdpteb9dqrpang7irlgerg04b3nn9udl.apps.googleusercontent.com",
  });

  async function signIn() {
    try {
      setLoading(true);
      const response = await promptAsync({ showInRecents: true });
      if (response.type === "dismiss") {
        setLoading(false);
        ToastAndroid.show(String(response.type), ToastAndroid.SHORT);
      }
    } catch {
      ToastAndroid.show("Não foi possível autenticar!", ToastAndroid.SHORT);
    }
  }

  const setAllInfosUser = (user: User) => {
    setUser(user);
  };

  const loadUserStorageData = async () => {
    try {
      setLoading(true);
      const storage = await AsyncStorages.getItem("@nossauesc:user");
      if (storage) {
        const useLogged = JSON.parse(storage);
        setUser(useLogged.user);
      }
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await Auth.signOut();
    await AsyncStorages.removeItem("@nossauesc:user");
    setUser({} as User);
  };

  useEffect(() => {
    try {
      if (response?.type === "success") {
        const { id_token } = response.params;

        const provider: any = new firebase.auth.GoogleAuthProvider();
        const credential = provider.credential(id_token);
        Auth.signInWithCredential(credential);

        Auth.onAuthStateChanged((userResult: any) => {
          if (userResult) {
            const displayName = userResult.providerData[0].displayName;
            const email = userResult.providerData[0].email;
            const phoneNumber = userResult.providerData[0].phoneNumber;
            const photoURL = userResult.providerData[0].photoURL;
            const providerId = userResult.providerData[0].uid;
            const uid = userResult.uid;

            setUser({
              displayName,
              email,
              phoneNumber,
              photoURL,
              providerId,
              uid,
              course: "",
              role: "",
              registration: "",
              departament: "",
              searchArea: "",
              xp: 0,
            });
          }
        });

        setLoading(false);
      }
    } catch (err: any) {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [response]);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        setAllInfosUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
