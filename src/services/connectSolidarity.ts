import { Firestore } from "configs/firebase";
import { UserProps } from "interfaces/ISolidarity";

export const connectSolidarity = async (doc: string, user: UserProps) => {
  try {
    Firestore.collection("solidarity").doc(doc).update({
      conection: user,
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
