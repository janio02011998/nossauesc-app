import { useEffect, useState } from "react";
import { Firestore } from "configs/firebase";
import { IAcademicResearch } from "interfaces/IAcadResearch";

export const useAcademicResearch = () => {
  const [academicResearch, setAcademicResearch] = useState<IAcademicResearch[]>(
    []
  );
  const [isLoadingAR, setIsLoadingAR] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = Firestore.collection("academic_research").onSnapshot(
      (snapshot) => {
        if (snapshot.docs.length) {
          const allDocs: any = snapshot.docs.map((doc) => {
            return { ...doc.data(), uid: doc.id };
          });
          setAcademicResearch(allDocs);
          setIsLoadingAR(false);
        } else {
          setIsLoadingAR(false);
        }
      },
      (error) => {
        setError(error);
      }
    );

    return unsubscribe;
  }, []);

  return {
    academicResearch,
    isLoadingAR,
    error,
  };
};
