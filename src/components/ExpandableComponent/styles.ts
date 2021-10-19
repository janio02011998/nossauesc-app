import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  wrapper: {
    justifyContent: "center",
    borderRadius: 4,
    height: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.highlight,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: theme.fonts.text500,
    color: theme.colors.heading,
    textAlign: "justify",
  },
});
