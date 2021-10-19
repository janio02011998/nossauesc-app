import { theme } from "global/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
  },

  field: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    fontFamily: theme.fonts.text400,
    fontSize: 18,
    marginRight: 4,
    color: theme.colors.highlight,
  },
  caracteresLimit: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  footer: {
    marginVertical: 60,
    marginBottom: 20,
  },
});
