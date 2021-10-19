import { Firestore } from "configs/firebase";
import { User } from "hooks/auth";

export async function getUser(user: User) {
  try {
    const userRef = Firestore.collection("users");
    const res = await userRef.doc(user.uid).get();
    return res.data();
  } catch (err) {
    return new Error("Falha ao consultar!");
  }
}
