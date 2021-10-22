import { useEffect, useState } from "react";
import { Firestore } from "configs/firebase";
import { User } from "./auth";

export function useGetAllUsers() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [teachers, setTeacher] = useState<User[]>([]);

  useEffect(() => {
    const unsubscribe = Firestore.collection("users")
      .where("role", "==", "waiting-authorization")
      .onSnapshot(
        (snapshot) => {
          if (snapshot.docs.length) {
            const allDocs: any = snapshot.docs.map((doc) => {
              return { ...doc.data(), uid: doc.id };
            });
            setTeacher(allDocs);
            setLoading(false);
          } else {
            setLoading(false);
          }
        },
        (error) => {
          setError(error);
        }
      );

    return unsubscribe;
  }, []);

  return { loading, teachers, error };
}
