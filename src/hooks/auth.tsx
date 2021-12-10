import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorages from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";

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

  // PROD => com.nossauesc.app
  // DEV => host.exp.exponent
  async function signIn() {
    const config = {
      webClientId:
        "414663250095-gbpkkhc0m1rluk3egbscshdmtr83tno9.apps.googleusercontent.com",

      androidClientId:
        "414663250095-g9kq65gb9mohq0rgq7mfmsfnp6lcgia0.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    };

    Google.logInAsync(config)
      .then((result: any) => {
        setLoading(true);
        const { idToken } = result;

        const provider: any = new firebase.auth.GoogleAuthProvider();
        const credential = provider.credential(idToken);
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
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        ToastAndroid.show("Não foi possível autenticar!", ToastAndroid.SHORT);
      });
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
