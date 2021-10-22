import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
