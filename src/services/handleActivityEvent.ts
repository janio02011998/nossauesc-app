import { Firestore } from "configs/firebase";
import { IMembers } from "interfaces/IActStudent";

export const handleActivityEvent = async (
  collection: string,
  doc: string,
  status: boolean
) => {
  try {
    Firestore.collection(collection).doc(doc).update({
      isActivity: status,
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
