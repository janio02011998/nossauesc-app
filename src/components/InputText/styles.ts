import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 35,
    alignItems: "center",

    backgroundColor: theme.colors.secondary50,
    color: theme.colors.heading,
    borderRadius: 8,
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    marginRight: 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary50,
    paddingHorizontal: 16,
  },
});
