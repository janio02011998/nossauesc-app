import { useEffect, useState } from "react";
import { Firestore } from "configs/firebase";

interface ISolidarity {
  banner: string;
  description: string;
  isActive: string;
  providerId: string;
  uid: string;
}

export const useSolidarity = () => {
  const [solidarity, setSolidarity] = useState<ISolidarity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = Firestore.collection("solidarity")
      .where("isAcitivity", "==", true)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.docs.length) {
            const allDocs: any = snapshot.docs.map((doc) => {
              return { ...doc.data(), uid: doc.id };
            });
            setSolidarity(allDocs);
            setIsLoading(false);
          } else {
            console.log("isEmpty");
            setIsLoading(false);
          }
        },
        (error) => {
          setError(error);
        }
      );

    return unsubscribe;
  }, []);

  return {
    solidarity,
    isLoading,
    error,
  };
};
