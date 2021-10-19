import { Firestore } from "configs/firebase";
import { User } from "hooks/auth";

export const createAcademicResearch = async (
  collection: string,
  data: any,
  user: User
) => {
  try {
    Firestore.collection(collection).add({
      providerId: user.uid,
      teacher: user.displayName,
      department: user.departament,
      photo: user.photoURL,
      searchArea: user.searchArea,
      email: user.email,
      ...data,
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
