import { Storage, Firestore } from "configs/firebase";

import { User } from "hooks/auth";
import { currentDate } from "Utils/currentDate";

export const createSolidarity = async (
  collection: string,
  data: any,
  user: User
) => {
  try {
    Object.entries(data).forEach((item) => {
      const [key, value] = item;
      if (!value) delete data[key];
    });

    const { banner, categoryId } = data;
    const response = await fetch(banner);
    const blob = await response.blob();

    var metadata = {
      contentType: "image/jpeg",
    };

    const time = currentDate();
    const child = `nossauesc@categoryId-${categoryId}-${time}`;

    const ref = Storage.ref().child(`images/${child}.jpg`);
    const snapshot = await ref.put(blob, metadata);

    await snapshot.ref.getDownloadURL().then((url) => {
      Firestore.collection(collection).add({
        ...data,
        providerId: user.uid,
        isAcitivity: true,
        banner: url,
      });
    });

    return "Registrado!";
  } catch (message) {
    return new Error("Erro ao registar evento!");
  }
};
