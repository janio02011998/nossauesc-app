import React, { createContext, ReactNode, useContext, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Auth } from "configs/firebase";
import firebase from "firebase/app";

type User = {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "414663250095-gbpkkhc0m1rluk3egbscshdmtr83tno9.apps.googleusercontent.com",
  });

  async function signIn() {
    try {
      setLoading(true);
      promptAsync();
    } catch {
      throw new Error("Não foi possível autenticar!");
    }
  }

  React.useEffect(() => {
    try {
      if (response?.type === "success") {
        const { id_token } = response.params;

        const provider: any = new firebase.auth.GoogleAuthProvider();
        const credential = provider.credential(id_token);
        Auth.signInWithCredential(credential);

        Auth.onAuthStateChanged((userResult: any) => {
          if (userResult) {
            setUser(userResult.providerData[0]);
          }
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        loading,
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
