import React from "react";
import { ScrollView } from "react-native";
import { categories } from "../../Utils/categories";
import { Category } from "../Category";

import { styles } from "./styles";

type Props = {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
  faqDisable?: boolean;
};

export function CategorySelect({
  faqDisable,
  categorySelected,
  hasCheckBox = false,
  setCategory,
}: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map((category) => {
        if (faqDisable && category.id === "6") {
          return;
        }
        return (
          <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
            hasCheckBox={hasCheckBox}
          />
        );
      })}
    </ScrollView>
  );
}
