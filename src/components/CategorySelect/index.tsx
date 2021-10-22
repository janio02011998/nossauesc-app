import React from "react";
import { ScrollView } from "react-native";
import { categories, categoriesTeacher, categoriesStudentAndTeacher } from "constants/categories";
import { Category } from "../Category";

import { styles } from "./styles";
import { useAuth } from "hooks/auth";

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
  const { user } = useAuth();

  if (user.role === "teacher" && faqDisable) {
    return (
      <ScrollView
        horizontal
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 40 }}
      >
        {categoriesTeacher.map((category) => {
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

  if (user.role === "student" && faqDisable) {
    return (
      <ScrollView
        horizontal
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 40 }}
      >
        {categoriesStudentAndTeacher.map((category) => {
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
