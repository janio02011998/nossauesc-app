import { Firestore } from "configs/firebase";
import { useAuth, User } from "hooks/auth";

export const createUser = async (user: User) => {
  const { displayName, email, phoneNumber, role, course, registration } = user;

  try {
    Firestore.collection("users")
      .doc(user.uid)
      .set({ displayName, email, phoneNumber, role, course, registration });

    return "Usuário registrado!";
  } catch (message) {
    return new Error("Erro ao criar usuário!");
  }
};
