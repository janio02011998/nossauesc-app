import { useEffect, useState } from "react";
import { Firestore } from "configs/firebase";
import { IActivityStudent } from "interfaces/IActStudent";

export const useActitivityStudent = () => {
  const [activityStudent, setActivityStudent] = useState<IActivityStudent[]>(
    []
  );
  const [isLoadingAS, setIsLoadingAS] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = Firestore.collection("actitivity_student").onSnapshot(
      (snapshot) => {
        if (snapshot.docs.length) {
          const allDocs: any = snapshot.docs.map((doc) => {
            return { ...doc.data(), uid: doc.id };
          });
          setActivityStudent(allDocs);
          setIsLoadingAS(false);
        } else {
          setIsLoadingAS(false);
        }
      },
      (error) => {
        setError(error);
      }
    );

    return unsubscribe;
  }, []);

  return {
    activityStudent,
    isLoadingAS,
    error,
  };
};
