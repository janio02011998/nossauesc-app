import { Firestore } from "configs/firebase";
import { IMembers } from "interfaces/IActStudent";

export const connectMembers = async (
  collection: string,
  doc: string,
  members: IMembers[]
) => {
  try {
    Firestore.collection(collection).doc(doc).update({
      members: members,
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
