import { Firestore } from "configs/firebase";
import { IMembersAcademic } from "interfaces/IAcadResearch";

export const connectMembersAcademic = async (
  collection: string,
  doc: string,
  members: IMembersAcademic[]
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
