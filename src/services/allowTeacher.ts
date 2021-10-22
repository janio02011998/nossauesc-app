import { Firestore } from "configs/firebase";
import { IMembers } from "interfaces/IActStudent";

export const allowTeacher = async (doc: string, type: string) => {
  try {
    Firestore.collection("users").doc(doc).update({
      role: type,
    });

    return "Acesso liberado!";
  } catch (message) {
    return new Error("Erro ao gravar registro!");
  }
};
