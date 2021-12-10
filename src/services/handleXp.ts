import { Firestore } from "configs/firebase";

export const handleXp = async (doc: string, xp: number) => {
  try {
    Firestore.collection("users").doc(doc).update({
      xp: xp,
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
