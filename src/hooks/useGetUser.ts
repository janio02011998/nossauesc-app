import { Firestore } from "configs/firebase";
import { useState } from "react";

export function useGetUser(user: string) {
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    setLoading(true);
    try {
      const userRef = Firestore.collection("users");
      const res = await userRef.doc(user).get();

      setLoading(false);
      if (res.data()) {
        return { ...res.data(), uid: res.id };
      } else {
        return undefined;
      }
    } catch (err) {
      setLoading(false);
      return new Error("Falha ao consultar!");
    }
  };

  return { loading, getUser };
}
